import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useStyles, StyledLinearProgress, HeaderTitle, ProgressText, TabTitle } from './style'
import PublishedProperty from './components/PublishedProperty'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Grid from '@material-ui/core/Grid'
import ComponentLoader from 'shared/loader-components/component-loader'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'

const TreasuryDashboard = (props: any) => {
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState('published')
  const [dataLoading, setDataLoading] = useState(false)
  const [publishedProperties, setPublishedProperties] = useState<any>([])
  const { userInfo } = props  
  const [searchTerm, setSearchTerm] = useState('')
  const [currentData, setCurrentData] = useState<any>([])

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

    getPublishedProperties()
  }, [])

  const handleChange = (e: any) => {
    const { value } = e.target

    if (!value) {
      setCurrentData([...publishedProperties])
    } else {
      filterData(value)
    }
  }
  const filterData = (dataVal: any) => {
    const FilteredValue = publishedProperties.filter(
      (value: {
        Address1: string
        State: string
        Country: string
        Fname: string
        Lname: string
        PropertyType: string
        CurrentValue: string
      }) => {
        return (
          value.Address1.toLowerCase().includes(dataVal.toLowerCase()) ||
          value.State.toLowerCase().includes(dataVal.toLowerCase()) ||
          value.Country.toLowerCase().includes(dataVal.toLowerCase()) ||
          value.Fname.toLowerCase().includes(dataVal.toLowerCase()) ||
          value.Lname.toLowerCase().includes(dataVal.toLowerCase()) ||
          value.PropertyType.toString().toLowerCase().includes(dataVal.toLowerCase()) ||
          value.CurrentValue.toString().toLowerCase().includes(dataVal.toLowerCase())
        )
      }
    )

    setCurrentData([...FilteredValue])
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
          <Grid container spacing={3}>
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
              onChange={handleChange}
            />
          </div>
        </Grid>
      </Grid>
      <div>
        {dataLoading ? (
          <ComponentLoader />
        ) : (
          <div>
            {activeTab === 'published' && <PublishedProperty data={publishedProperties} userInfo={userInfo} />}
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
export default connect(mapStateToProps)(TreasuryDashboard)
