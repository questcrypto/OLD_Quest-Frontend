import React, { useEffect, useState } from 'react'
import { Error } from 'shared/styles/styled'
import { auctionBidStyle, LightText, BoldText, Title, CurrentBidInfo, StyledSlider, SliderWrap, ShareLinkCont, MakeBidCont } from './style'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import coin from 'assets/images/coin.svg'
import TextInputField from './TextInputField'
import { PrimaryButton } from 'shared/components/buttons'
import FileCopyIcon from '@material-ui/icons/FileCopy'

// import TelegramIcon from '@material-ui/icons/Telegram'
// import FacebookIcon from '@material-ui/icons/Facebook'
// import TwitterIcon from '@material-ui/icons/Twitter'
import NotificationsIcon from '@material-ui/icons/Notifications'

import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton } from 'react-share'
import CustomModal from 'shared/custom-modal'
import Spinner from 'shared/loader-components/spinner'
import Bid from './Bid'
import { integerNumberRegex, floatNumRegex } from 'shared/helpers/regexConstants'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'
import { currentBidValue, getDaiBalance, getWeb3Val, handleDAIapproval } from 'modules/block-chain/BlockChainMethods'
import { auctionContractAddress, daiAbi, DAIContractAddress } from 'modules/block-chain/abi'

const valuetext = (value: number) => {
  return `${value}%`
}

const AuctionBid = (props: any) => {
  const classes = auctionBidStyle()
  const [bidError, setBidError] = useState(false)
  const [tokenError, setTokenError] = useState(false)
  const [minBidError, setMinBidError] = useState(false)
  const [suggMinBidError, setSuggMinBidError] = useState(false)

  const [showBidModal, setShowBidModal] = useState(false)
  const [approvalLoading, setApprovalLoading] = useState(false)
  const [makeBidLoading, setMakeBidLoading] = useState(false)
  const {
    propertyName,
    currentBid,
    biddersID,
    propertyID,
    auctionID,
    totalToken,
    myBidDetails,
    email,
    suggestedLowestBid,
    errorAlert,
    approvedTokens,
    refreshApprovedTokensValue,
  } = props

  let sliderDefaultValue = (myBidDetails[0]?.currentAllotment / totalToken!) * 100
  sliderDefaultValue = parseFloat(sliderDefaultValue.toFixed(2))

  const [token, setToken] = useState(myBidDetails[0]?.currentAllotment! || 0)
  const [equityValue, setEquityValue] = useState(sliderDefaultValue! || 0)
  const [bidValue, setBidValue] = useState(myBidDetails[0]?.bidPrice! || '0.00')
  const [minBid, setMinBid] = useState(myBidDetails[0]?.bidPrice! || 0)
  const [isTokensApproved, setIsTokensApproved] = useState(false)
  const [currentBidTokens, setCurrentBidTokens] = useState(0)
  const [balance, setBalance] = useState(0)

  const updateCurrentBidTokens = async () => {
    const currentValue = parseInt(await currentBidValue(auctionID))
    console.log(currentValue)
    setCurrentBidTokens(currentValue)
  }

  const getBalance = async () => {
    const balance = await getDaiBalance()
    setBalance(balance)
  }

  console.log(currentBidTokens, approvedTokens, isTokensApproved)

  useEffect(() => {
    updateCurrentBidTokens()

    getBalance()

    const totalAmount = token * parseFloat(bidValue) - currentBidTokens
    setIsTokensApproved(approvedTokens >= totalAmount)
  })

  const handleTokenChange = (event: any) => {
    const { value } = event.target
    if (integerNumberRegex.test(value.toString())) {
      const tokenVal = parseInt(value)
      if (tokenVal <= totalToken) {
        setToken(parseInt(value))
        const equityVal: any = (tokenVal / totalToken) * 100
        setEquityValue(equityVal.toFixed(2))
      }
      const totalAmount = tokenVal * parseFloat(bidValue) - currentBidTokens
      setIsTokensApproved(approvedTokens >= totalAmount)

      if (tokenVal < myBidDetails[0]?.currentAllotment) {
        setTokenError(true)
      } else setTokenError(false)
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

    const totalAmount = parseInt(tokenValData) * parseFloat(bidValue) - currentBidTokens
    setIsTokensApproved(approvedTokens >= totalAmount)
  }

  const handleBidValueChange = (event: any) => {
    setMinBidError(false)
    const { value } = event.target

    if (value) {
      if (floatNumRegex.test(value.toString())) {
        setBidValue(value)
        setBidError(false)

        const totalAmount = token * parseFloat(value) - currentBidTokens
        setIsTokensApproved(approvedTokens >= totalAmount)
      }
      if (value < myBidDetails[0]?.bidPrice!) setMinBidError(true)
      else setMinBidError(false)
      if (parseFloat(value) < suggestedLowestBid) {
        setSuggMinBidError(true)
      } else {
        setSuggMinBidError(false)
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

  const handleApproveTokens = async () => {
    try {
      setApprovalLoading(true)
      const web3 = await getWeb3Val()

      const totalAmount = token * parseFloat(bidValue)

      console.log(totalAmount - currentBidTokens)
      if (web3) {
        const accounts = await web3.eth.getAccounts()
        const daiContract = new web3.eth.Contract(daiAbi, DAIContractAddress)

        const res = await handleDAIapproval(daiContract, accounts[0], auctionContractAddress, totalAmount - currentBidTokens)
        console.log(res)
        refreshApprovedTokensValue(totalAmount - currentBidTokens)
        console.log(totalAmount - currentBidTokens)
      }
    } catch (err) {
      console.log('Error===>', err)
    } finally {
      setApprovalLoading(false)
    }
  }

  const handleMakeBid = async () => {
    if (parseFloat(bidValue) > 0 && token > 0) {
      try {
        setMakeBidLoading(true)
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
        setMakeBidLoading(false)
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
              {tokenError && <Error>Token value cannot be less than {myBidDetails[0]?.currentAllotment!}</Error>}
            </Grid>
          </Grid>
          <SliderWrap>
            <StyledSlider
              value={equityValue}
              onChange={(e: any, val: any) => handleEquityValue(e, val)}
              valueLabelFormat={valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="on"
              step={0.01}
              min={sliderDefaultValue! || 0}
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
          {suggMinBidError && <Error>{`Minimum suggested bid ${suggestedLowestBid}`}</Error>}
        </Box>
        <Box className={classes.totalBidContStyle}>
          <Grid container spacing={2}>
            <Grid item className={classes.totalBid}>
              <TextInputField name="total" label="Total" value={getTotalValue()} isDisabled />
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  <PrimaryButton disabled={tokenError || suggMinBidError || isTokensApproved} onClick={() => handleApproveTokens()}>
                    {approvalLoading ? <Spinner /> : 'Approval'}
                  </PrimaryButton>
                </Grid>

                <Grid item>
                  <PrimaryButton
                    style={{ marginLeft: '15px' }}
                    disabled={tokenError || suggMinBidError || !isTokensApproved || currentBidTokens === token * bidValue}
                    onClick={() => handleMakeBid()}
                  >
                    {makeBidLoading ? <Spinner /> : 'MAKE BID'}
                  </PrimaryButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <LightText style={{ marginTop: '10px' }}>Current Allowance = {approvedTokens}</LightText>
          <LightText style={{ marginTop: '10px' }}>Current Bid = {currentBidTokens}</LightText>
          <LightText style={{ marginTop: '10px' }}>Total wallet balance = {balance}</LightText>
        </Box>
      </Paper>
      <Grid container spacing={3} justify="space-between" className={classes.linkContStyle}>
        <Grid item>
          <LightText>Share Links</LightText>
          <ShareLinkCont>
            <FileCopyIcon
              style={{ width: 35, height: 32 }}
              onClick={() => {
                alert(`Your clipboard contains: ${'https://peing.net/ja/'}`)
              }}
            />

            <FacebookShareButton title={'test'} url={'https://peing.net/ja/'}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton title={'test'} url={'https://peing.net/ja/'} hashtags={['hashtag1', 'hashtag2']}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <TelegramShareButton title={'test'} url={'https://peing.net/ja/'}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
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
          myBidDetails={myBidDetails}
          setShowBidModal={setShowBidModal}
          equityValue={equityValue}
          token={token}
          bidValue={bidValue}
          auctionID={auctionID}
          biddersID={biddersID}
          propertyID={propertyID}
          email={email}
          errorAlert={errorAlert}
        />
      </CustomModal>
    </Box>
  )
}
export default AuctionBid
