import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useStyles, StyledLinearProgress, HeaderTitle, ProgressText } from 'shared/styles/dashboardStyle'
import { NewPropertyTable, ApprovePropertyTable, PublishedPropertyTable } from 'modules/Tables'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Grid from '@material-ui/core/Grid'
import ComponentLoader from 'shared/loader-components/component-loader'
import TabComponent from 'shared/tab-component'
import { propertyTabList } from 'shared/helpers/dataConstant'
import { PreAuctionTable } from 'modules/Tables'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'

const AdminDashboard = (props: any) => {
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

  useEffect(() => {
    const getPropertiesList = async () => {
      try {
        setDataLoading(true)
        const res = await axios.get(`${apiBaseUrl}/properties/GetAllProperty`)
        setPropertiesList(res.data)
      } catch (error) {
      } finally {
        setDataLoading(false)
      }
    }
    const getApproveProperties = async () => {
      try {
        setApprovedLoading(true)
        const res = await axios.get(`${apiBaseUrl}/properties/GetApprovedPropertyHOA`)
        setApprovedProperties(res.data)
      } catch (error) {
      } finally {
        setApprovedLoading(false)
      }
    }
    const getPublishedProperties = async () => {
      try {
        setPublishedLoading(true)
        const res = await axios.get(`${apiBaseUrl}/properties/GetPublishedProperty`)
        setPublishedProperties(res.data)
      } catch (error) {
      } finally {
        setPublishedLoading(false)
      }
    }
    const getPreAuctionProperties = async () => {
      try {
        setPreAuctionLoading(true)
        const res = await axios.get(`${apiBaseUrl}/auction/listOfAllNewAuction`)
        console.log('res->', res.data)
        setPreAuctionProperties(res.data)
      } catch (error) {
      } finally {
        setPreAuctionLoading(false)
      }
    }
    getPropertiesList()
    getApproveProperties()
    getPublishedProperties()
    getPreAuctionProperties()
  }, [])

  const handleAddProperty = () => {
    history.push(Paths.addPropertyForm)
  }

  const updateApprovedProperty = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/properties/GetApprovedPropertyHOA`)
      setApprovedProperties(res.data)
    } catch (error) {}
  }
  const updatePublishedProperty = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/properties/GetPublishedProperty`)
      setPublishedProperties(res.data)
    } catch (error) {}
  }

  const updateApprove = () => {
    updateApprovedProperty()
    updatePublishedProperty()
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
        <Grid item xs={7}>
          <TabComponent tabOptions={propertyTabList} activeTab={activeTab} setActiveTab={setActiveTab} />
        </Grid>
        <Grid item xs={3}>
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
        <Grid item xs={2}>
          <Button onClick={() => handleAddProperty()} className={classes.addPropertyBtnStyle}>
            Add New Property
          </Button>
        </Grid>
      </Grid>
      <div>
        {dataLoading ? (
          <ComponentLoader />
        ) : (
          <div>
            {activeTab === 'new' && <NewPropertyTable data={propertiesList} />}
            {activeTab === 'approved' && (
              <ApprovePropertyTable
                type="admin"
                data={approvedProperties}
                approvedLoading={approvedLoading}
                setActiveTab={setActiveTab}
                updateApprove={updateApprove}
              />
            )}
            {activeTab === 'published' && <PublishedPropertyTable data={publishedProperties} dataLoading={publishedLoading} />}
            {activeTab === 'preAuction' && <PreAuctionTable data={preAuctionProperties} dataLoading={preAuctionLoading} />}
            {activeTab === 'onAuction' && <p>Content can be added here</p>}
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
export default connect(mapStateToProps)(AdminDashboard)
