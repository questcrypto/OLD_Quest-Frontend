import React, { useState, useEffect } from 'react'
import {
  useStyles,
  StyledLinearProgress,
  PropertyContainer,
  PropertyHeader,
  HeaderTitle,
  ProgressText,
  PropertyTabCont,
  TabTitle,
  PropertySearchBox,
} from './style'
import PropertyTable from '../property-table/PropertyTable'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { Grid } from '@material-ui/core'
import ComponentLoader from 'shared/loader-components/component-loader'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'
import Web3 from 'web3'

const Property = () => {
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState('new')
  const [propertiesList, setPropertiesList] = useState<any>([])
  const [dataLoading, setDataLoading] = useState(false)

  useEffect(() => {
    const web3: Web3 = new Web3(window.ethereum)
    const getPropertiesList = async () => {
      try {
        const coinbase = await web3.eth.getCoinbase()
        if (!coinbase) {
          window.alert('Please activate MetaMask first.')
          return
        } else {
          const publicaddress = coinbase.toLowerCase()
          setDataLoading(true)
          const res = await axios.get(`${apiBaseUrl}/properties/GetProperty/${publicaddress}`)
          setPropertiesList(res.data)
        }
      } catch (error) {
      } finally {
        setDataLoading(false)
      }
    }
    getPropertiesList()
  }, [])

  const handleAddProperty = () => {
    history.push(Paths.addPropertyForm)
  }

  return (
    <PropertyContainer>
      <PropertyHeader>
        <Grid container spacing={2}>
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
      </PropertyHeader>

      <Grid container spacing={2}>
        <Grid item xs={7}>
          <PropertyTabCont>
            <TabTitle onClick={() => setActiveTab('new')} active={activeTab === 'new'}>
              New
            </TabTitle>
            <TabTitle onClick={() => setActiveTab('published')} active={activeTab === 'published'}>
              Published
            </TabTitle>
            <TabTitle onClick={() => setActiveTab('preAuctions')} active={activeTab === 'preAuctions'}>
              Pre-Auction
            </TabTitle>
            <TabTitle onClick={() => setActiveTab('onAuctions')} active={activeTab === 'onAuctions'}>
              On-Auction
            </TabTitle>
            <TabTitle onClick={() => setActiveTab('postAuctions')} active={activeTab === 'postAuctions'}>
              Post-Auction
            </TabTitle>
          </PropertyTabCont>
        </Grid>
        <Grid item xs={5}>
          <PropertySearchBox>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                style={{ zIndex: 1 }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <Button onClick={() => handleAddProperty()} className={classes.addPropertyBtnStyle}>
              Add New Property
            </Button>
          </PropertySearchBox>
        </Grid>
      </Grid>
      <div>
        {dataLoading ? (
          <ComponentLoader />
        ) : (
          <div>
            {activeTab === 'new' && <PropertyTable data={propertiesList} />}
            {activeTab === 'published' && <p>Content can be added here</p>}
            {activeTab === 'preAuctions' && <p>Content can be added here</p>}
            {activeTab === 'onAuctions' && <p>Content can be added here</p>}
            {activeTab === 'postAuctions' && <p>Content can be added here</p>}
          </div>
        )}
      </div>
    </PropertyContainer>
  )
}

export default Property
