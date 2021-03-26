import React, { useState } from 'react'
import { claimModalStyle, ClaimTitle, ClaimLightText, ClaimBoldText, ClaimBtnGroup } from './style'
import Paper from '@material-ui/core/Paper'
import { PrimaryButton, SecondaryButton } from 'shared/components/buttons'
import Spinner from 'shared/loader-components/spinner'
import { treasuryAddress, auctionContractAddress, auctionAbi } from 'modules/block-chain/abi'
import { getWeb3Val, handleDAITokenClaim } from 'modules/block-chain/BlockChainMethods'

const USDCClaim = (props: any) => {
  const [loading, setLoading] = useState(false)
  const classes = claimModalStyle()
  const { claimData, setClaimData, setShowUsdClaim, setActiveTab, updatePassedProp, errorAlert } = props

  const handleUSDClaim = async () => {
    try {
      setLoading(true)
      const web3 = await getWeb3Val()
      if (web3) {
        const accounts = await web3.eth.getAccounts()
        const auctionContract = new web3.eth.Contract(auctionAbi, auctionContractAddress)
        await handleDAITokenClaim(auctionContract, accounts[0], claimData.auctionId, treasuryAddress)
      }
    } catch (error) {
      if (!!error && error.response && error.response.data.message) {
        errorAlert(error.response.data.message)
      } else {
        errorAlert('Something went wrong , please try again')
      }
    } finally {
      setLoading(false)
      updatePassedProp()
      setClaimData({})
      setShowUsdClaim(false)
    }
  }

  return (
    <Paper elevation={2} className={classes.root}>
      <ClaimTitle>CLAIM USDC</ClaimTitle>
      <ClaimLightText style={{ margin: '20px 0' }}>
        Are you sure you want to claim your available USDC? You can also BId on other listed properties.
      </ClaimLightText>
      <ClaimLightText>Available USDC</ClaimLightText>
      <ClaimBoldText>{claimData.claimValue}</ClaimBoldText>
      <ClaimBtnGroup>
        <SecondaryButton onClick={() => handleUSDClaim()} disabled={loading}>
          {loading ? <Spinner /> : 'CLAIM'}
        </SecondaryButton>
        <PrimaryButton onClick={() => setActiveTab('ongoing')} disabled={loading}>
          VIEW ON GOING AUCTION
        </PrimaryButton>
      </ClaimBtnGroup>
    </Paper>
  )
}

export default USDCClaim
