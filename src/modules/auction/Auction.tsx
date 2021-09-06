import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { errorAlert } from 'logic/actions/alerts.actions'
import { useStyles, HeaderTitle } from './style'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { auctionTabList } from 'shared/helpers/dataConstant'
import TabComponent from 'shared/tab-component'
import OnGoingProperties from './components/OnGoingProperties'
import ParticipateProperties from './components/ParticipateProperties'
import UpcomingProperties from './components/UpcomingProperties'
import PassedProperties from './components/PassedProperties'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'
// import { getApprovedTokens } from '../../modules/block-chain/BlockChainMethods'
// import { withRouter } from 'react-router'

const Auction = (props: any) => {
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState('ongoing')
  const [onGoingGlobal, setOnGoingGlobal] = useState<any>([])
  const [onGoingProperties, setOnGoingProperties] = useState<any>([])
  const [onGoingLoading, setOnGoingLoading] = useState(false)
  const [participateProperties, setParticipateProperties] = useState<any>([])
  const [participateLoading, setParticipateLoading] = useState(false)
  const [upcomingProperties, setUpcomingProperties] = useState<any>([])
  const [upcomingLoading, setUpcomingLoading] = useState(false)
  const [passedProperties, setPassedProperties] = useState<any>([])
  const [passedLoading, setPassedLoading] = useState(false)
  const [approvedTokens, setApprovedTokens] = useState(0)

  const { userInfo, errorAlert, loggedIn } = props

  useEffect(() => {
    const getOnGoingProperties = async () => {
      try {
        setOnGoingLoading(true)
        if (loggedIn) {
          const res = await axios.get(`${apiBaseUrl}/auction/NonParticipatedAuctions/${userInfo.publicaddress}`)
          setOnGoingGlobal(res.data)
          setOnGoingProperties(res.data)
        } else {
          const res = await axios.get(`${apiBaseUrl}/auction/AllonGoingAuctionList`)
          setOnGoingGlobal(res.data)
          setOnGoingProperties(res.data)
        }

      } catch (error) {
        setOnGoingProperties([])
      } finally {
        setOnGoingLoading(false)
      }
    }
    const getParticipateProperties = async () => {
      try {
        setParticipateLoading(true)
        const res = await axios.get(`${apiBaseUrl}/auction/getListOfParticipatedAuctions/${userInfo.publicaddress}`)
        setParticipateProperties(res.data)
      } catch (error) {
        setParticipateProperties([])
      } finally {
        setParticipateLoading(false)
      }
    }
    const getUpcomingProperties = async () => {
      try {
        setUpcomingLoading(true)
        const res = await axios.get(`${apiBaseUrl}/auction/getupcomingauction`)
        setUpcomingProperties(res.data)
      } catch (error) {
        setUpcomingProperties([])
      } finally {
        setUpcomingLoading(false)
      }
    }
    const getPassedProperties = async () => {
      try {
        setOnGoingLoading(true)
        // if (loggedIn) {
        const res = await axios.get(`${apiBaseUrl}/auction/getDetailsOfParticipatedCompletedAuction/${userInfo.publicaddress}`)
        setPassedProperties(res.data)
        // } else {
        //   const res = await axios.get(`${apiBaseUrl}/auction/getAllEndAuctionList`)
        //   setPassedProperties(res.data)
        // }
      } catch (error) {
        setPassedProperties([])
      } finally {
        setOnGoingLoading(false)
      }
    }

    getOnGoingProperties()
    getParticipateProperties()
    getUpcomingProperties()
    getPassedProperties()
  }, [userInfo])

  const handleOnChange = (e: any) => {
    const value = e.target.value

    if (!!value) {
      setOnGoingProperties(
        onGoingGlobal.filter(
          (v: any) =>
            v.PropertyDetails.propertyDetails.PropertyName.toLowerCase().includes(value.toLowerCase()) ||
            v.PropertyDetails.propertyDetails.id.toLowerCase().includes(value.toLowerCase()) ||
            v.PropertyDetails.propertyDetails.PostalCode.toString().includes(value) ||
            v.PropertyDetails.propertyDetails.Address1.toLowerCase().includes(value.toLowerCase()) ||
            v.PropertyDetails.propertyDetails.City.toLowerCase().includes(value.toLowerCase()) ||
            v.PropertyDetails.propertyDetails.State.toLowerCase().includes(value.toLowerCase())
        )
      )
    } else {
      setOnGoingProperties(onGoingGlobal)
    }
  }

  const updatePassedProp = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/auction/getDetailsOfParticipatedCompletedAuction/${userInfo.publicaddress}`)
      setPassedProperties(res.data)
    } catch (error) { }
  }
  return (
    <Box className={classes.root}>
      <Grid container spacing={2} className={classes.headerStyle} alignItems="center">
        <Grid item xs={12} sm={6} md={8}>
          <HeaderTitle>Auctions</HeaderTitle>
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
              onChange={handleOnChange}
            />
          </div>
        </Grid>
      </Grid>
      <TabComponent tabOptions={auctionTabList} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'ongoing' && (
        <OnGoingProperties data={onGoingProperties} dataLoading={onGoingLoading} approvedTokens={approvedTokens} />
      )}
      {activeTab === 'participating' && <ParticipateProperties data={participateProperties} dataLoading={participateLoading} />}
      {activeTab === 'upcoming' && <UpcomingProperties data={upcomingProperties} dataLoading={upcomingLoading} />}
      {activeTab === 'passed' && (
        <PassedProperties
          data={passedProperties}
          dataLoading={passedLoading}
          setActiveTab={setActiveTab}
          updatePassedProp={updatePassedProp}
          errorAlert={errorAlert}
        />
      )}
    </Box>
  )
}

const mapStateToProps = (state: any) => ({
  userInfo: state.user.userInfo,
  loggedIn: state.user.loggedIn
})
export default connect(mapStateToProps, { errorAlert })(Auction)
