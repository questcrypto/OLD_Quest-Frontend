import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useStyles, StyledLinearProgress, HeaderTitle, ProgressText } from 'shared/styles/dashboardStyle'
import { NewPropertyTable, ApprovePropertyTable, PublishedPropertyTable, PreAuctionTable, OnAuctionTable } from 'modules/Tables'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Grid from '@material-ui/core/Grid'
import ComponentLoader from 'shared/loader-components/component-loader'
import TabComponent from 'shared/tab-component'
import { propertyTabList } from 'shared/helpers/dataConstant'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'

const OwnerDashboard = (props: any) => {
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState('new')
  const [propertiesList, setPropertiesList] = useState<any>([])
  const [dataLoading, setDataLoading] = useState(false)
  const [approvedProperties, setApprovedProperties] = useState<any>([])
  const [approvedLoading, setApprovedLoading] = useState(false)
  const [publishedProperties, setPublishedProperties] = useState<any>([])
  const [publishedLoading, setPublishedLoading] = useState(false)
  const [preAuctionProperties, setPreAuctionProperties] = useState<any>([])
  const [preAuctionLoading, setPreAuctionLoading] = useState(false)
  const [onAuctionProperties, setOnAuctionProperties] = useState<any>([])
  const [onAuctionLoading, setOnAuctionLoading] = useState(false)

  const { userInfo } = props

  useEffect(() => {
    const getPropertiesList = async () => {
      try {
        setDataLoading(true)
        const res = await axios.get(`${apiBaseUrl}/properties/GetProperty/${userInfo.publicaddress}`)
        setPropertiesList(res.data)
      } catch (error) {
      } finally {
        setDataLoading(false)
      }
    }
    const getApproveProperties = async () => {
      try {
        setApprovedLoading(true)
        const res = await axios.get(`${apiBaseUrl}/properties/GetApprovedPropertyOwner/${userInfo.publicaddress}`)
        setApprovedProperties(res.data)
      } catch (error) {
      } finally {
        setApprovedLoading(false)
      }
    }
    const getPublishedProperties = async () => {
      try {
        setPublishedLoading(true)
        const res = await axios.get(`${apiBaseUrl}/properties/GetPublishedPropertyOwner/${userInfo.publicaddress}`)
        setPublishedProperties(res.data)
      } catch (error) {
      } finally {
        setPublishedLoading(false)
      }
    }
    const getPreAuctionProperties = async () => {
      try {
        setPreAuctionLoading(true)
        const res = await axios.get(`${apiBaseUrl}/auction/ListofNewAuction/${userInfo.publicaddress}`)
        setPreAuctionProperties(res.data)
      } catch (error) {
      } finally {
        setPreAuctionLoading(false)
      }
    }
    const getOnAuctionProperties = async () => {
      try {
        setOnAuctionLoading(true)
        const res = await axios.get(`${apiBaseUrl}/auction/myListOfActiveAuction/${userInfo.publicaddress}`)
        setOnAuctionProperties(res.data)
      } catch (error) {
      } finally {
        setOnAuctionLoading(false)
      }
    }
    getPropertiesList()
    getApproveProperties()
    getPublishedProperties()
    getPreAuctionProperties()
    getOnAuctionProperties()
  }, [userInfo])

  const updatePreAuction = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/auction/ListofNewAuction/${userInfo.publicaddress}`)
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
          <TabComponent tabOptions={propertyTabList} activeTab={activeTab} setActiveTab={setActiveTab} />
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
            {activeTab === 'new' && <NewPropertyTable data={propertiesList} />}
            {activeTab === 'approved' && <ApprovePropertyTable data={approvedProperties} dataLoading={approvedLoading} />}
            {activeTab === 'published' && <PublishedPropertyTable data={publishedProperties} dataLoading={publishedLoading} />}
            {activeTab === 'preAuction' && (
              <PreAuctionTable
                data={preAuctionProperties}
                type="owner"
                dataLoading={preAuctionLoading}
                updatePreAuction={updatePreAuction}
              />
            )}
            {activeTab === 'onAuction' && <OnAuctionTable data={onAuctionProperties} dataLoading={onAuctionLoading} />}
            {activeTab === 'postAuction' && <p>Content can be added here</p>}
          </div>
        )}
      </div>
    </Grid>
  )
}

const mapStateToProps = (state: any) => ({
  userInfo: state.user.userInfo,
})
export default connect(mapStateToProps)(OwnerDashboard)
