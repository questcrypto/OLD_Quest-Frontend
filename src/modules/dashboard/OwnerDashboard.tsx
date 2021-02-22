import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useStyles, StyledLinearProgress, HeaderTitle, ProgressText, TabTitle } from './style'
import PropertyTable from './components/PropertyTable'
import ApprovedProperty from './components/ApprovedProperty'
import PublishedProperty from './components/PublishedProperty'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Grid from '@material-ui/core/Grid'
import ComponentLoader from 'shared/loader-components/component-loader'
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
    getPropertiesList()
    getApproveProperties()
    getPublishedProperties()
  }, [userInfo])

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
          <Grid container spacing={3}>
            <Grid item>
              <TabTitle onClick={() => setActiveTab('new')} active={activeTab === 'new'}>
                New
              </TabTitle>
            </Grid>
            <Grid item>
              <TabTitle onClick={() => setActiveTab('approved')} active={activeTab === 'approved'}>
                Approved
              </TabTitle>
            </Grid>
            <Grid item>
              <TabTitle onClick={() => setActiveTab('published')} active={activeTab === 'published'}>
                Published
              </TabTitle>
            </Grid>
            <Grid item>
              <TabTitle onClick={() => setActiveTab('preAuctions')} active={activeTab === 'preAuctions'}>
                Pre-Auction
              </TabTitle>
            </Grid>
            <Grid item>
              <TabTitle onClick={() => setActiveTab('onAuctions')} active={activeTab === 'onAuctions'}>
                On-Auction
              </TabTitle>
            </Grid>
            <Grid item>
              <TabTitle onClick={() => setActiveTab('postAuctions')} active={activeTab === 'postAuctions'}>
                Post-Auction
              </TabTitle>
            </Grid>
          </Grid>
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
            {activeTab === 'new' && <PropertyTable data={propertiesList} />}
            {activeTab === 'approved' && (
              <ApprovedProperty data={approvedProperties} approvedLoading={approvedLoading} userInfo={userInfo} />
            )}
            {activeTab === 'published' && <PublishedProperty data={publishedProperties} publishedLoading={publishedLoading} />}
            {activeTab === 'preAuctions' && <p>Content can be added here</p>}
            {activeTab === 'onAuctions' && <p>Content can be added here</p>}
            {activeTab === 'postAuctions' && <p>Content can be added here</p>}
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
