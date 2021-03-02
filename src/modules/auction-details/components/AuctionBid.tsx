import React, { useState } from 'react'
import { Error } from 'shared/styles/styled'
import { auctionBidStyle, LightText, BoldText, Title, CurrentBidInfo, StyledSlider, SliderWrap, ShareLinkCont, MakeBidCont } from './style'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import coin from 'assets/images/coin.svg'
import TextInputField from './TextInputField'
import { PrimaryButton } from 'shared/components/buttons'
import TelegramIcon from '@material-ui/icons/Telegram'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import NotificationsIcon from '@material-ui/icons/Notifications'
import CustomModal from 'shared/custom-modal'
import Spinner from 'shared/loader-components/spinner'
import Bid from './Bid'
import { integerNumberRegex, floatNumRegex } from 'shared/helpers/regexConstants'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'

const valuetext = (value: number) => {
  return `${value}%`
}

const AuctionBid = (props: any) => {
  const classes = auctionBidStyle()
  const [token, setToken] = useState(0)
  const [bidValue, setBidValue] = useState('0.00')
  const [bidError, setBidError] = useState(false)
  const [minBidError, setMinBidError] = useState(false)
  const [minBid, setMinBid] = useState(0)
  const [equityValue, setEquityValue] = useState(0)
  const [showBidModal, setShowBidModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const { propertyName, currentBid, biddersID, propertyID, auctionID, totalToken } = props

  const handleTokenChange = (event: any) => {
    const { value } = event.target
    if (integerNumberRegex.test(value.toString())) {
      const tokenVal = parseInt(value)
      if (tokenVal <= totalToken) {
        setToken(parseInt(value))
        const equityVal: any = (tokenVal / totalToken) * 100
        setEquityValue(parseInt(equityVal))
      }
    }
    if (!value) {
      setToken(0)
      setEquityValue(0)
    }
  }
  const handleEquityValue = (e: any, equityVal: number) => {
    setEquityValue(equityVal)
    const tokenValData: any = (totalToken / 100) * equityVal
    setToken(parseInt(tokenValData))
  }
  const handleBidValueChange = (event: any) => {
    setMinBidError(false)
    const { value } = event.target
    if (value) {
      if (floatNumRegex.test(value.toString())) {
        setBidValue(value)
        setBidError(false)
      }
    } else {
      setBidValue('')
      setBidError(true)
    }
  }
  const getTotalValue = () => {
    if (bidValue) {
      const totalVal = token * parseFloat(bidValue)
      return `${totalVal.toFixed(2)} USDC`
    } else {
      return `0.00 USDC`
    }
  }
  const handleMakeBid = async () => {
    if (parseFloat(bidValue) > 0 && token > 0) {
      try {
        setLoading(true)
        const data = {
          bidPrice: parseFloat(bidValue),
          totalQuantity: token,
          id: auctionID,
        }
        const res = await axios.post(`${apiBaseUrl}/auction/getEligibilty`, data)
        setMinBid(res.data)
        if (!!res && res.data && res.data <= parseFloat(bidValue)) {
          setShowBidModal(true)
          setMinBidError(false)
        } else {
          setMinBidError(true)
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
  }
  return (
    <Box>
      <Title>{propertyName}</Title>
      <CurrentBidInfo>
        <img src={coin} alt="" />
        <div>
          <LightText>Current Bid</LightText>
          <BoldText>{`$ ${parseFloat(currentBid).toFixed(2)}`}</BoldText>
        </div>
      </CurrentBidInfo>
      <Paper className={classes.bidContStyle} elevation={0}>
        <Box className={classes.actionBidContStyle}>
          <Grid container justify="space-between" spacing={2}>
            <Grid item>
              <LightText>Equity %</LightText>
            </Grid>
            <Grid item className={classes.tokenStyle}>
              <TextInputField name="token" label="Token" value={token} handleChange={handleTokenChange} />
            </Grid>
          </Grid>
          <SliderWrap>
            <StyledSlider
              value={equityValue}
              onChange={(e: any, val: any) => handleEquityValue(e, val)}
              valueLabelFormat={valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="on"
              step={1}
              min={0}
              max={100}
            />
          </SliderWrap>
          <Grid container spacing={2}>
            <Grid item className={classes.makeBidStyle}>
              <MakeBidCont>
                <TextInputField name="makeBid" label="Make a Bid" value={bidValue} handleChange={handleBidValueChange} />
                {bidValue && <p>$</p>}
              </MakeBidCont>
            </Grid>
            <Grid item>
              <LightText>Per property token</LightText>
            </Grid>
          </Grid>
          {bidError && <Error>This field is required</Error>}
          {minBidError && <Error>{`Minimum required bid $${minBid}`}</Error>}
        </Box>
        <Box className={classes.totalBidContStyle}>
          <Grid container spacing={2}>
            <Grid item className={classes.totalBid}>
              <TextInputField name="total" label="Total" value={getTotalValue()} isDisabled />
            </Grid>
            <Grid item>
              <PrimaryButton onClick={() => handleMakeBid()}>{loading ? <Spinner /> : 'MAKE BID'}</PrimaryButton>
            </Grid>
          </Grid>
          <LightText style={{ marginTop: '10px' }}>Total wallet balance = 2597.88 USDC</LightText>
        </Box>
      </Paper>
      <Grid container spacing={3} justify="space-between" className={classes.linkContStyle}>
        <Grid item>
          <LightText>Share Links</LightText>
          <ShareLinkCont>
            <FileCopyIcon />
            <FacebookIcon />
            <TwitterIcon />
            <TelegramIcon />
          </ShareLinkCont>
        </Grid>
        <Grid item>
          <ShareLinkCont>
            <NotificationsIcon />
            <LightText>Register for notification</LightText>
          </ShareLinkCont>
        </Grid>
      </Grid>
      <CustomModal show={showBidModal} toggleModal={setShowBidModal}>
        <Bid
          setShowBidModal={setShowBidModal}
          equityValue={equityValue}
          token={token}
          bidValue={bidValue}
          auctionID={auctionID}
          biddersID={biddersID}
          propertyID={propertyID}
        />
      </CustomModal>
    </Box>
  )
}
export default AuctionBid
