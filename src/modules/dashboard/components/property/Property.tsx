import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useStyles, StyledLinearProgress, HeaderTitle, ProgressText, TabTitle } from './style'
import PropertyTable from '../property-table/PropertyTable'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Grid from '@material-ui/core/Grid'
import ComponentLoader from 'shared/loader-components/component-loader'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'
import { getPublicAddress } from 'modules/auth/authFunction'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'

const Property = (props: any) => {
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState('new')
  const [propertiesList, setPropertiesList] = useState<any>([])
  const [dataLoading, setDataLoading] = useState(false)
  const { userInfo } = props

  const [searchTerm, setSearchTerm] = useState("");

  const [currentData, setCurrentData] = useState<any>([])

  useEffect(() => {
    const getPropertiesList = async () => {
      try {
        setDataLoading(true)
        if (!!userInfo && userInfo.role === 1) {
          const res = await axios.get(`${apiBaseUrl}/properties/GetAllProperty`)
          setPropertiesList(res.data)
          setCurrentData(res.data)
        }
        if (!!userInfo && userInfo.role === 2) {
          const publicaddress = await getPublicAddress()
          if (publicaddress) {
            const res = await axios.get(`${apiBaseUrl}/properties/GetProperty/${publicaddress}`) 
            setPropertiesList(res.data)
          }
        }
      } catch (error) {
      } finally {
        setDataLoading(false)
      }
    }
    getPropertiesList()
  }, [userInfo])

  const handleAddProperty = () => {
    history.push(Paths.addPropertyForm)
  }

const handleChange = (e:any) =>{
const {value} = e.target

if(!value){
  setCurrentData([...propertiesList])
}
else{

filterData(value)
}



}
const filterData = (dataVal:any) => {
const  FilteredValue = propertiesList.filter(
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
        <Grid item xs={6}>
          <Grid container spacing={3}>
            <Grid item>
              <TabTitle onClick={() => setActiveTab('new')} active={activeTab === 'new'}>
                New
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
              onChange={handleChange}
            />
          </div>
        </Grid>
        <Grid item xs={3}>
          {!!userInfo && userInfo.role === 1 && (
            <Button onClick={() => handleAddProperty()} className={classes.addPropertyBtnStyle}>
              Add New Property
            </Button>
          )}
        </Grid>
      </Grid>
      <div>
        {dataLoading ? (
          <ComponentLoader />
        ) : (
          <div>
            {activeTab === 'new' && <PropertyTable searchquery={searchTerm} data={currentData} />}
            {activeTab === 'published' && <p>Content can be added here</p>}
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
export default connect(mapStateToProps)(Property)