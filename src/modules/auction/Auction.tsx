import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useStyles, HeaderTitle } from './style'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { auctionTabList } from 'shared/helpers/dataConstant'
import TabComponent from 'shared/tab-component'
import OnGoingProperties from './components/OnGoingProperties'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'

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

const Auction = (props: any) => {
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState('participating')
  const [onGoingProperties, setOnGoingProperties] = useState<any>([])
  const [onGoingLoading, setOnGoingLoading] = useState(false)
  const { userInfo } = props

  useEffect(() => {
    const getOnGoingProperties = async () => {
      try {
        setOnGoingLoading(true)
        const res = await axios.get(`${apiBaseUrl}/auction/NonParticipatedAuctions/${userInfo.publicaddress}`)
        setOnGoingProperties(res.data)
      } catch (error) {
      } finally {
        setOnGoingLoading(false)
      }
    }
    getOnGoingProperties()
  }, [userInfo])
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
      {activeTab === 'ongoing' && <OnGoingProperties data={onGoingProperties} dataLoading={onGoingLoading} />}
    </Box>
  )
}

const mapStateToProps = (state: any) => ({
  userInfo: state.user.userInfo,
})
export default connect(mapStateToProps)(Auction)
