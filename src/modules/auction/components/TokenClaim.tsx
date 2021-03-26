import React, { useState } from 'react'
import { claimModalStyle, ClaimTitle, ClaimLightText, ClaimBoldText, ClaimBtnGroup } from './style'
import Paper from '@material-ui/core/Paper'
import { PrimaryButton, SecondaryButton } from 'shared/components/buttons'
import Spinner from 'shared/loader-components/spinner'
import { slcAbi, SLCContractAddress, treasuryAddress } from 'modules/block-chain/abi'
import { getWeb3Val, handleAuctionWinTokenClaim } from 'modules/block-chain/BlockChainMethods'

const TokenClaim = (props: any) => {
  const [loading, setLoading] = useState(false)
  const classes = claimModalStyle()
  const { claimData, setClaimData, setShowTokenClaim, updatePassedProp, errorAlert } = props

  const handleTokenClaim = async () => {
    try {
      setLoading(true)
      const web3 = await getWeb3Val()
      if (web3) {
        const accounts = await web3.eth.getAccounts()
        const slcContract = new web3.eth.Contract(slcAbi, SLCContractAddress)
        await handleAuctionWinTokenClaim(slcContract, accounts[0], claimData.auctionId, treasuryAddress)
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
      setShowTokenClaim(false)
    }
  }

  return (
    <Paper elevation={2} className={classes.root}>
      <ClaimTitle>CLAIM TOKENS</ClaimTitle>
      <ClaimLightText style={{ margin: '20px 0' }}>Are you sure you want to claim your available tokens?</ClaimLightText>
      <ClaimLightText>Total Tokens</ClaimLightText>
      <ClaimBoldText>{claimData.claimValue}</ClaimBoldText>
      <ClaimBtnGroup>
        <SecondaryButton onClick={() => setShowTokenClaim(false)} disabled={loading}>
          NO
        </SecondaryButton>
        <PrimaryButton onClick={() => handleTokenClaim()} disabled={loading}>
          {loading ? <Spinner /> : 'YES'}
        </PrimaryButton>
      </ClaimBtnGroup>
    </Paper>
  )
}

export default TokenClaim
