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
import {
  getApproveProperties,
  getOnAuctionProperties,
  getPostAuctionProperties,
  getPreAuctionProperties,
  getPublishedProperties,
  getAllPropertiesList
} from 'logic/api/propertiesService'
import { refreshPublishedPropertiesList } from 'logic/api/ownerPropertiesServices'

const GeneralUserDashboard = (props: any) => {
  console.log('GeneralUserDashboard');
  const classes = useStyles()
  // const [activeTab, setActiveTab] = useState('published')
  const [activeTab, setActiveTab] = useState('All')
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
    getAllPropertiesList(setNewPropertiesList, setNewPropertiesList);
    getApproveProperties(setApprovedLoading, setApprovedProperties);
    getPublishedProperties(setPublishedLoading, setPublishedProperties);
    getPreAuctionProperties(setPreAuctionLoading, setPreAuctionProperties);
    getOnAuctionProperties(setOnAuctionLoading, setOnAuctionProperties);
    getPostAuctionProperties(setPostAuctionLoading, setPostAuctionProperties);
  }, [userInfo])

  // console.log('owner page')
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
            {activeTab === 'All' && <PropertyCards list={newPropertiesList} dataLoading={newPropertyLoading} />}
            {activeTab === 'new' && <PropertyCards list={[]} dataLoading={newPropertyLoading} />}
            {activeTab === 'approved' && <PropertyCards list={approvedProperties} dataLoading={approvedLoading} />}
            {activeTab === 'published' && (
              <PropertyCards refresh={() => refreshPublishedPropertiesList(setPublishedLoading, setPublishedProperties, userInfo)} list={publishedProperties} dataLoading={publishedLoading} />
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
export default connect(mapStateToProps)(GeneralUserDashboard)
