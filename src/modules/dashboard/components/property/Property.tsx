import React, { useState } from 'react'
import PropertyTable from '../property-table/PropertyTable'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Pagination from '@material-ui/lab/Pagination'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'
import { useStyles, PropertyHeader, HeaderTitle, ProgressText, PropertyTabCont, TabTitle, PropertySearchBox } from './style'
import { Grid, withStyles } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import './Property.css'


const StyledLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#E5E5E5',
  },
  barColorPrimary: {
    backgroundColor: '#1E3444',
  },
})(LinearProgress)

const Property = () => {
  const classes = useStyles()
  const [progress, setProgress] = useState(60)
  const [activeTab, setActiveTab] = useState('new')

  const handleAddProperty = () => {
    history.push(Paths.addPropertyForm)
  }

  return (
    <div>
      <PropertyHeader>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <HeaderTitle className="headtitle">Properties</HeaderTitle>
          </Grid>
          <Grid item xs={3}>
            <StyledLinearProgress variant="determinate" value={progress} className={classes.progressStyle} />
          </Grid>
          <Grid item xs={3}>
            <ProgressText>
              <span style={{ color: '#302E35', fontWeight: 'bold' }}>643</span> new properties to onboard
            </ProgressText>
          </Grid>
        </Grid>
      </PropertyHeader>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <PropertyTabCont className="Property_tabs">
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
          <PropertySearchBox className="Property_search">
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

      <div className="FlexForFlexforpaginationpa">
        <div className="Flexforpagination01">Showing 1 to 15 of 35 element</div>
        <div className="Flexforpagination02">
          <Pagination count={10} showFirstButton showLastButton />
        </div>
      </div>
    </div>
  )
}

export default Property
