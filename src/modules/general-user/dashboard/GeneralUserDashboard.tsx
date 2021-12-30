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
  getAllPropertiesList,
} from 'logic/api/propertiesService'
import { refreshPublishedPropertiesList } from 'logic/api/ownerPropertiesServices'
import FilterSideBar from 'modules/app/components/filtersidebar/FilterSideBar'
import FilterButton from 'modules/app/components/filterbuttons/FilterButton'

const GeneralUserDashboard = (props: any) => {
  console.log('GeneralUserDashboard')
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
  const [showFilterSideBar, setShowFilterSideBar] = useState(false)
  const [showButtonName, setShowButtonName] = useState<any>([])
  const [showPropertyList, setShowPropertyList] = useState<any>([])
  const { userInfo } = props

  useEffect(() => {
    getAllPropertiesList(setNewPropertiesList, setNewPropertiesList)
    getApproveProperties(setApprovedLoading, setApprovedProperties)
    getPublishedProperties(setPublishedLoading, setPublishedProperties)
    getPreAuctionProperties(setPreAuctionLoading, setPreAuctionProperties)
    getOnAuctionProperties(setOnAuctionLoading, setOnAuctionProperties)
    getPostAuctionProperties(setPostAuctionLoading, setPostAuctionProperties)
  }, [userInfo])

  useEffect(()=>{
   console.log(publishedProperties,"publishedProperties");
   console.log(approvedProperties,"approvedProperties");
   console.log(publishedProperties,"publishedProperties");
   console.log(onAuctionProperties,"onAuctionProperties");
   console.log(postAuctionProperties,"postAuctionProperties");
  })
  //handlefiltersidebar
  const showFilterSidebar = () => {
    if (showFilterSideBar === true) {
      setShowFilterSideBar(false)
    } else {
      setShowFilterSideBar(true)
    }
  }

  const handleSearch = (event: any) => {
    const searchWord = event.target.value
    const searchData = newPropertiesList?.filter((value: any) => {
      return value.PropertyName.toLowerCase().includes(searchWord.toLowerCase())
    })
    console.log(searchData)
    if (searchWord === '') {
      setNewPropertiesList(showPropertyList)
    } else {
      setNewPropertiesList([...searchData])
    }
  }

  return (
    <Grid>
      {/* <Grid container spacing={2} className={classes.headerStyle}>
        <Grid item xs={12} md={6}>
          <HeaderTitle>Properties</HeaderTitle>
        </Grid>
        <PropertiesOnboard />
      </Grid> */}
      <Grid className={classes.filterSection}>
        <Grid container spacing={3} className={classes.tabStyle}>
          {/* <Grid item xs={12} md={8}>
          <TabComponent tabOptions={propertyTabList} activeTab={activeTab} setActiveTab={setActiveTab} />
        </Grid> */}
          <Grid className={classes.filterSearch}>
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
                onChange={(event: any) => {
                  handleSearch(event)
                }}
              />
            </div>
            <select name="all" className={classes.selectAll}>
              {propertyTabList.map((property: any, index: number) => (
                <option key={index} onClick={() => setActiveTab(property.value)} value={property.value}>
                  {property.label}
                </option>
              ))}
            </select>
          </Grid>
          {/* <Grid
            className={classes.filterIcon}
            onClick={() => {
              showFilterSidebar()
              console.log('clicked')
            }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.2686 5.09473H1.73145V6.24902H13.2686V5.09473Z" fill="#8C8C8C" />
              <path d="M10.6729 8.75098H4.32715V9.90528H10.6729V8.75098Z" fill="#8C8C8C" />
              <path d="M8.94433 12.4043H6.05859V13.5586H8.94433V12.4043Z" fill="#8C8C8C" />
              <path d="M15 1.44141H0V2.5957H15V1.44141Z" fill="#8C8C8C" />
            </svg>{' '}
            <span className={classes.filterText}>Filter</span>
          </Grid> */}
        </Grid>
      </Grid>
      <div>
        <FilterButton showButtonName={showButtonName} setShowButtonName={setShowButtonName} />
        {newPropertyLoading ? (
          <ComponentLoader />
        ) : (
          <>
            <div>
              {activeTab === 'All' && <PropertyCards list={newPropertiesList} dataLoading={newPropertyLoading} />}
              {activeTab === 'new' && <PropertyCards list={[]} dataLoading={newPropertyLoading} />}
              {activeTab === 'approved' && <PropertyCards list={approvedProperties} dataLoading={approvedLoading} />}
              {activeTab === 'published' && (
                <PropertyCards
                  refresh={() => refreshPublishedPropertiesList(setPublishedLoading, setPublishedProperties, userInfo)}
                  list={publishedProperties}
                  dataLoading={publishedLoading}
                />
              )}
              {activeTab === 'preAuction' && <PropertyCards list={preAuctionProperties} dataLoading={preAuctionLoading} />}
              {activeTab === 'onAuction' && <PropertyCards list={onAuctionProperties} dataLoading={onAuctionLoading} />}
              {activeTab === 'postAuction' && <PropertyCards list={postAuctionProperties} dataLoading={postAuctionLoading} />}
            </div>
          </>
        )}
      </div>
      <div>
        {showFilterSideBar ? (
          <FilterSideBar
            setShowFilterSideBar={setShowFilterSideBar}
            showButtonName={showButtonName}
            setShowButtonName={setShowButtonName}
          />
        ) : null}
      </div>
    </Grid>
  )
}

const mapStateToProps = (state: any) => ({
  userInfo: state.user.userInfo,
})
export default connect(mapStateToProps)(GeneralUserDashboard)
