import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useStyles, StyledLinearProgress, HeaderTitle, ProgressText } from 'shared/styles/dashboardStyle'
import { PublishedPropertyTable, PreAuctionTable, TokenToMintTable } from 'modules/Tables'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Grid from '@material-ui/core/Grid'
import ComponentLoader from 'shared/loader-components/component-loader'
import TabComponent from 'shared/tab-component'
import { treasuryTabList } from 'shared/helpers/dataConstant'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'

const TreasuryDashboard = (props: any) => {
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState('published')
  const [dataLoading, setDataLoading] = useState(false)
  const [publishedProperties, setPublishedProperties] = useState<any>([])
  const [tokenToMintData, setTokenToMintData] = useState<any>([])
  const [transactionLoading, setTransactionLoading] = useState(false)
  const [preAuctionProperties, setPreAuctionProperties] = useState<any>([])
  const [preAuctionLoading, setPreAuctionLoading] = useState(false)
  const { userInfo } = props

  useEffect(() => {
    const getPublishedProperties = async () => {
      try {
        setDataLoading(true)
        const res = await axios.get(`${apiBaseUrl}/properties/GetPublishedProperty`)
        setPublishedProperties(res.data)
      } catch (error) {
      } finally {
        setDataLoading(false)
      }
    }
    const getTokenToMintData = async () => {
      try {
        setTransactionLoading(true)
        const data = {
          publicaddress: !!userInfo && userInfo.publicaddress,
        }
        const res = await axios.post(`${apiBaseUrl}/properties/getAllPendingTransaction`, data)
        setTokenToMintData(res.data)
      } catch (error) {
      } finally {
        setTransactionLoading(false)
      }
    }
    const getPreAuctionProperties = async () => {
      try {
        setPreAuctionLoading(true)
        const res = await axios.get(`${apiBaseUrl}/auction/listOfAllNewAuction`)
        setPreAuctionProperties(res.data)
      } catch (error) {
      } finally {
        setPreAuctionLoading(false)
      }
    }

    getPublishedProperties()
    getPreAuctionProperties()
    getTokenToMintData()
  }, [userInfo])

  const updatePreAuction = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/auction/listOfAllNewAuction`)
      setPreAuctionProperties(res.data)
    } catch (error) {}
  }

  return (
    <Grid>
      <Grid container spacing={2} className={classes.headerStyle}>
        <Grid item xs={6}>
          <HeaderTitle>Properties</HeaderTitle>
        </Grid>
        <Grid item xs={3}>
          <StyledLinearProgress variant="determinate" value={60} className={classes.progressStyle} />
        </Grid>
        <Grid item xs={3}>
          <ProgressText>643 new properties to onboard</ProgressText>
        </Grid>
      </Grid>

      <Grid container spacing={3} className={classes.tabStyle}>
        <Grid item xs={8}>
          <TabComponent tabOptions={treasuryTabList} activeTab={activeTab} setActiveTab={setActiveTab} />
        </Grid>
        <Grid item xs={4}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Grid>
      </Grid>
      <div>
        {dataLoading ? (
          <ComponentLoader />
        ) : (
          <div>
            {activeTab === 'published' && (
              <PublishedPropertyTable type="treasuryAdmin" data={publishedProperties} dataLoading={dataLoading} />
            )}
            {activeTab === 'preAuction' && (
              <PreAuctionTable
                data={preAuctionProperties}
                dataLoading={preAuctionLoading}
                type="treasuryAdmin"
                refreshPreAuction={updatePreAuction}
              />
            )}
            {activeTab === 'onAuction' && <p>Content can be added here</p>}
            {activeTab === 'postAuction' && <p>Content can be added here</p>}
            {activeTab === 'tokenToMint' && <TokenToMintTable data={tokenToMintData} dataLoading={transactionLoading} />}
          </div>
        )}
      </div>
    </Grid>
  )
}

const mapStateToProps = (state: any) => ({
  userInfo: state.user.userInfo,
})
export default connect(mapStateToProps)(TreasuryDashboard)
