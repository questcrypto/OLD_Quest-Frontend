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
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'

const Property = () => {
  const classes = useStyles()
  const [progress, setProgress] = useState(60)
  const [activeTab, setActiveTab] = useState('new')
  const [propertyInfo, setPropertyInfo] = useState<any>()
  const [dataLoading, setDataLoading] = useState(false)

  useEffect(() => {
    const getPropertyDetails = async () => {
      try {
        setDataLoading(true)
        const res = await axios.get(`${apiBaseUrl}/properties/GetProperty/0x8479F317d952998bB398e9C082e4f5145A182B6E`)
        setPropertyInfo(res.data)
      } catch (error) {
      } finally {
        setDataLoading(false)
      }
    }
    getPropertyDetails()
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
            <StyledLinearProgress variant="determinate" value={progress} className={classes.progressStyle} />
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
          <div>Loading</div>
        ) : (
          <div>
            {activeTab === 'new' && <PropertyTable data={propertyInfo} />}
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
