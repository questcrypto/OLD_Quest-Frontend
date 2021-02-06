import React, { useState } from 'react'
import PropertyTable from '../property-table/PropertyTable'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Pagination from '@material-ui/lab/Pagination'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'
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
  PaginationCont,
  PaginationText,
} from './style'
import { Grid } from '@material-ui/core'

const Property = () => {
  const classes = useStyles()
  const [progress, setProgress] = useState(60)
  const [activeTab, setActiveTab] = useState('new')

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
                placeholder="Search…"
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
        {activeTab === 'new' && <PropertyTable />}
        {activeTab === 'published' && <p>Content can be added here</p>}
        {activeTab === 'preAuctions' && <p>Content can be added here</p>}
        {activeTab === 'onAuctions' && <p>Content can be added here</p>}
        {activeTab === 'postAuctions' && <p>Content can be added here</p>}
      </div>

      <PaginationCont>
        <PaginationText>Showing 1 to 15 of 35 element</PaginationText>

        <Pagination count={10} showFirstButton showLastButton />
      </PaginationCont>
    </PropertyContainer>
  )
}

export default Property
