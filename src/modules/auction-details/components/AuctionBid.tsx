import React, { useState } from 'react'
import { auctionBidStyle, LightText, BoldText, Title, CurrentBidInfo, StyledSlider, SliderWrap, ShareLinkCont } from './style'
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
import Bid from './Bid'

const AuctionBid = (props: any) => {
  const classes = auctionBidStyle()
  const [showBidModal, setShowBidModal] = useState(false)

  const valuetext = (value: number) => {
    return `${value}%`
  }
  return (
    <Box>
      <Title>
        1901 Thorn ridge Cir. <span>Listing ID QUEST24567</span>
      </Title>
      <CurrentBidInfo>
        <img src={coin} alt="" />
        <div>
          <LightText>Current Bid</LightText>
          <BoldText>$ 98.22</BoldText>
        </div>
      </CurrentBidInfo>
      <Paper className={classes.bidContStyle} elevation={0}>
        <Box className={classes.actionBidContStyle}>
          <Grid container justify="space-between" spacing={2}>
            <Grid item>
              <LightText>Equity %</LightText>
            </Grid>
            <Grid item className={classes.tokenStyle}>
              <TextInputField name="token" label="Token" value={26} />
            </Grid>
          </Grid>
          <SliderWrap>
            <StyledSlider
              defaultValue={50}
              getAriaValueText={valuetext}
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
              <TextInputField name="makeBid" label="Make a Bid" value={26} />
            </Grid>
            <Grid item>
              <LightText>Per property token</LightText>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.totalBidContStyle}>
          <Grid container spacing={2}>
            <Grid item className={classes.totalBid}>
              <TextInputField name="total" label="Total" value="2586.50 USDC" />
            </Grid>
            <Grid item>
              <PrimaryButton onClick={() => setShowBidModal(true)}>MAKE BID</PrimaryButton>
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
        <Bid setShowBidModal={setShowBidModal} />
      </CustomModal>
    </Box>
  )
}
export default AuctionBid
