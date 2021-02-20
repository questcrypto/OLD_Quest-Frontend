import React, { useState } from 'react'
import { useStyles, HeaderTitle } from './style'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { auctionTabList } from 'shared/helpers/dataConstant'
import TabComponent from 'shared/tab-component'
import PropertyCard from './components/PropertyCard'

const data = [
  {
    name: '1024 Somma Way',
    id: 'QUEST24567',
    averageBid: '$ 98.22',
    dayRemaining: 4,
    selfBid: '$ 95.12',
  },
  {
    name: '1024 Somma Way',
    id: 'QUEST24567',
    averageBid: '$ 98.22',
    dayRemaining: 4,
    selfBid: '$ 95.12',
  },
  {
    name: '1024 Somma Way',
    id: 'QUEST24567',
    averageBid: '$ 98.22',
    dayRemaining: 4,
    selfBid: '$ 95.12',
  },
  {
    name: '1024 Somma Way',
    id: 'QUEST24567',
    averageBid: '$ 98.22',
    dayRemaining: 4,
    selfBid: '$ 95.12',
  },
  {
    name: '1024 Somma Way',
    id: 'QUEST24567',
    averageBid: '$ 98.22',
    dayRemaining: 4,
    selfBid: '$ 95.12',
  },
  {
    name: '1024 Somma Way',
    id: 'QUEST24567',
    averageBid: '$ 98.22',
    dayRemaining: 4,
    selfBid: '$ 95.12',
  },
]

const Auction = () => {
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState('participating')
  return (
    <Box className={classes.root}>
      <Grid container spacing={2} className={classes.headerStyle} alignItems="center">
        <Grid item xs={12} sm={6} md={8}>
          <HeaderTitle>Auction</HeaderTitle>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
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
      <TabComponent tabOptions={auctionTabList} activeTab={activeTab} setActiveTab={setActiveTab} />
      <Grid container spacing={3}>
        {data.map((item: any, k: number) => (
          <Grid item key={k}>
            <PropertyCard data={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Auction
