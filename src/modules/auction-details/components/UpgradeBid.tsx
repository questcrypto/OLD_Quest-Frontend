import React, { useState } from 'react'
import { Error } from 'shared/styles/styled'
import {
  auctionBidStyle,
  LightText,
  UpgradeInfoText,
  BoldText,
  Title,
  CurrentBidInfo,
  StyledSlider,
  SliderWrap,
  ShareLinkCont,
  MakeBidCont,
} from './style'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
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

const UpgradeBid = (props: any) => {
  const classes = auctionBidStyle()
  const [tokenError, setTokenError] = useState(false)
  const [bidError, setBidError] = useState(false)
  const [minBidError, setMinBidError] = useState(false)
  const [minBid, setMinBid] = useState(0)
  const [showBidModal, setShowBidModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showBidDetails, setShowBidDetails] = useState(false)
  const { propertyName, currentBid, biddersID, propertyID, auctionID, totalToken, userEmail, bidDetails } = props

  const sliderDefaultValue = bidDetails[0]?.currentAllotment! / totalToken! * 100
  const [token, setToken] = useState(bidDetails[0]?.currentAllotment! || 0)
  const [equityValue, setEquityValue] = useState(sliderDefaultValue! || 0)
  const [bidValue, setBidValue] = useState(bidDetails[0]?.bidPrice! || '0.00')


  const handleTokenChange = (event: any) => {
    const { value } = event.target
    if (integerNumberRegex.test(value.toString())) {
      const tokenVal = parseInt(value)
      if (tokenVal <= totalToken) {
        setToken(parseInt(value))
        const equityVal: any = (tokenVal / totalToken) * 100
        setEquityValue(parseInt(equityVal))
      }
      if (tokenVal < bidDetails[0]?.currentAllotment!) {
        setTokenError(true)
      }
      else setTokenError(false)
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
  const handleUpgradeBid = async () => {
    if (parseFloat(bidValue) > 0 && token > 0) {
      try {
        setLoading(true)
        const data = {
          bidPrice: parseFloat(bidValue),
          totalQuantity: totalToken,
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
        {showBidDetails ? (
          <div>
            <Box className={classes.actionBidContStyle}>
              <Grid container justify="space-between" spacing={2}>
                <Grid item>
                  <LightText>Equity %</LightText>
                </Grid>
                <Grid item className={classes.tokenStyle}>
                  <TextInputField name="token" label="Token" value={token} handleChange={handleTokenChange} />
                  {tokenError && <Error>Token value cannot be less than {bidDetails[0]?.currentAllotment!}</Error>}
                </Grid>
              </Grid>
              <SliderWrap>
                <StyledSlider
                  value={equityValue}
                  onChange={(e: any, val: any) => handleEquityValue(e, val)}
                  valueLabelFormat={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="on"
                  step={0.1}
                  min={sliderDefaultValue! || 0}
                  max={100}
                />
              </SliderWrap>
              <Grid container spacing={2}>
                <Grid item className={classes.makeBidStyle}>
                  <MakeBidCont>
                    <TextInputField name="upgradeBid" label="Upgrade Bid" value={bidValue} handleChange={handleBidValueChange} />
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
              <Grid container spacing={2} alignItems="center">
                <Grid item className={classes.totalBid} style={{ width: '250px' }}>
                  <TextInputField name="total" label="Total" value={getTotalValue()} isDisabled />
                </Grid>
                <Grid item>
                  <PrimaryButton onClick={() => handleUpgradeBid()}>{loading ? <Spinner /> : 'UPGRADE BID'}</PrimaryButton>
                </Grid>
              </Grid>
              <LightText style={{ marginTop: '10px' }}>Total wallet balance = 2597.88 USDC</LightText>
            </Box>
          </div>
        ) : (
            <Box className={classes.upgradeBidInfoStyle}>
              <UpgradeInfoText>
                If your bid is below current bid you will be kicked out. To stay in the auction upgrade you bid.
            </UpgradeInfoText>
              <Divider className={classes.upgradeDividerStyle} />
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <LightText>Your Bid</LightText>
                  <BoldText>$ 68.22</BoldText>
                </Grid>
                <Grid item xs={6}>
                  <PrimaryButton fullWidth onClick={() => setShowBidDetails(true)}>
                    Upgrade your bid
                </PrimaryButton>
                </Grid>
              </Grid>
            </Box>
          )}
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
          upgrade={true}
          email={userEmail}
        />
      </CustomModal>
    </Box>
  )
}
export default UpgradeBid
