import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useStyles, HeaderTitle } from 'shared/styles/dashboardStyle'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Grid from '@material-ui/core/Grid'
import ComponentLoader from 'shared/loader-components/component-loader'
import TabComponent from 'shared/tab-component'
import { propertyTabList } from 'shared/helpers/dataConstant'
import PropertiesOnboard from 'shared/properties-onboard/PropertiesOnboard'
import PropertyCards from 'shared/components/property-cards'
import { apiBaseUrl } from 'services/global-constant'
import axios from 'axios'

const OwnerDashboard = (props: any) => {
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState('new')
  const [newPropertiesList, setNewPropertiesList] = useState<any>([])
  const [newPropertyLoading, setNewPropertyLoading] = useState(false)
  const [approvedProperties, setApprovedProperties] = useState<any>([])
  const [approvedLoading, setApprovedLoading] = useState(false)
  const [publishedProperties, setPublishedProperties] = useState<any>([])
  const [publishedLoading, setPublishedLoading] = useState(false)
  const [preAuctionProperties, setPreAuctionProperties] = useState<any>([])
  const [preAuctionLoading, setPreAuctionLoading] = useState(false)
  const [onAuctionProperties, setOnAuctionProperties] = useState<any>([])
  const [onAuctionLoading, setOnAuctionLoading] = useState(false)
  const [postAuctionProperties, setPostAuctionProperties] = useState<any>([])
  const [postAuctionLoading, setPostAuctionLoading] = useState(false)

  const { userInfo } = props

  useEffect(() => {
    const getPropertiesList = async () => {
      try {
        setNewPropertyLoading(true)
        const res = await axios.get(`${apiBaseUrl}/properties/GetProperty/${userInfo.publicaddress}`)
        setNewPropertiesList(res.data)
      } catch (error) {
        setNewPropertiesList([])
      } finally {
        setNewPropertyLoading(false)
      }
    }
    const getApproveProperties = async () => {
      try {
        setApprovedLoading(true)
        const res = await axios.get(`${apiBaseUrl}/properties/GetApprovedPropertyOwner/${userInfo.publicaddress}`)
        setApprovedProperties(res.data)
      } catch (error) {
        setApprovedProperties([])
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
        setPublishedProperties([])
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
        setPreAuctionProperties([])
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
        setOnAuctionProperties([])
      } finally {
        setOnAuctionLoading(false)
      }
    }
    const getPostAuctionProperties = async () => {
      try {
        setPostAuctionLoading(true)
        const res = await axios.get(`${apiBaseUrl}/auction/getPostAuctionListUser/${userInfo.publicaddress}`)
        setPostAuctionProperties(res.data)
      } catch (error) {
        setPostAuctionProperties([])
      } finally {
        setPostAuctionLoading(false)
      }
    }
    getPropertiesList()
    getApproveProperties()
    getPublishedProperties()
    getPreAuctionProperties()
    getOnAuctionProperties()
    getPostAuctionProperties()
  }, [userInfo])

  const refreshPublishedPropertiesList = async () => {
    try {
      setPublishedLoading(true)
      const res = await axios.get(`${apiBaseUrl}/properties/GetPublishedPropertyOwner/${userInfo.publicaddress}`)
      setPublishedProperties(res.data)
    } catch (error) {
      setPublishedProperties([])
    } finally {
      setPublishedLoading(false)
    }
  }

  return (
    <Grid>
      <Grid container spacing={2} className={classes.headerStyle}>
        <Grid item xs={12} md={6}>
          <HeaderTitle>Properties</HeaderTitle>
        </Grid>
        <PropertiesOnboard />
      </Grid>

      <Grid container spacing={3} className={classes.tabStyle}>
        <Grid item xs={12} md={8}>
          <TabComponent tabOptions={propertyTabList} activeTab={activeTab} setActiveTab={setActiveTab} />
        </Grid>
        <Grid item xs={12} md={4}>
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
        {newPropertyLoading ? (
          <ComponentLoader />
        ) : (
          <div>
            {activeTab === 'new' && <PropertyCards list={newPropertiesList} dataLoading={newPropertyLoading} />}
            {activeTab === 'approved' && <PropertyCards list={approvedProperties} dataLoading={approvedLoading} />}
            {activeTab === 'published' && (
              <PropertyCards refresh={refreshPublishedPropertiesList} list={publishedProperties} dataLoading={publishedLoading} />
            )}
            {activeTab === 'preAuction' && <PropertyCards list={preAuctionProperties} dataLoading={preAuctionLoading} />}
            {activeTab === 'onAuction' && <PropertyCards list={onAuctionProperties} dataLoading={onAuctionLoading} />}
            {activeTab === 'postAuction' && <PropertyCards list={postAuctionProperties} dataLoading={postAuctionLoading} />}
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
