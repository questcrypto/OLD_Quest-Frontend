import React, { useState } from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import { bidStyle, Title, BoldText, LightText } from './style'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import CloseIcon from '@material-ui/icons/Close'
import Divider from '@material-ui/core/Divider'
import { PrimaryButton } from 'shared/components/buttons'
import CustomTextField from 'shared/components/custom-text-field'
import IntegerNumberField from 'shared/components/Integer-number-field'
import Spinner from 'shared/loader-components/spinner'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'
import { auctionContractAddress, auctionAbi, DAIContractAddress, daiAbi, slcAbi, SLCContractAddress } from '../../block-chain/abi'
import { getWeb3Val } from 'modules/block-chain/BlockChainMethods'
import { err } from 'shared/styles/styled'
import * as Yup from 'yup'
import { Button } from '@material-ui/core'

export const bidFormSchema = Yup.object().shape({
  phoneNumber: Yup.string().required('This field is required'),
  email: Yup.string().required('This field is required'),
})

const Bid = (props: any) => {
  const classes = bidStyle()
  const [loading, setLoading] = useState(false)
  const { auctionID, biddersID, propertyID, token, bidValue, equityValue, setShowBidModal, email } = props

  const handleSubmit = async (values: any) => {
    const totalAmount = token * parseFloat(bidValue)
    const dataVal = {
      auctionID,
      biddersID,
      bidPrice: parseFloat(bidValue),
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      propertyID,
      initialAllotedTokens: token,
    }
    try {
      setLoading(true)

      const web3 = await getWeb3Val()

      let upgrade = null

      if (web3) {
        const accounts = await web3.eth.getAccounts()
        const auctionContract = new web3.eth.Contract(auctionAbi, auctionContractAddress)
        const daiContract = new web3.eth.Contract(daiAbi, DAIContractAddress)

        let auctionBidRes = await auctionContract.methods.getAuctionBidders(auctionID).call()

        upgrade = auctionBidRes.includes(accounts[0])

        // const totalTokens = web3.utils.toWei((dataVal.bidPrice * dataVal.totalAmount).toString(), 'ether')
        console.log(parseFloat(bidValue), token)
        console.log('totalTokens', dataVal.totalAmount)
        let approvalRes = await daiContract.methods.approve(auctionContractAddress, dataVal.totalAmount).send({ from: accounts[0] })
        console.log(approvalRes)
        let res = await auctionContract.methods.saveBid(auctionID, dataVal.totalAmount).send({ from: accounts[0] })
        console.log(res)
      }

      if (upgrade) {
        let upgradeRes = await axios.post(`${apiBaseUrl}/auction/upgradeBid`, dataVal)
        console.log('upgrade', upgradeRes)
      } else {
        let makeBidRes = await axios.post(`${apiBaseUrl}/auction/makeBid`, dataVal)
        console.log('makeBid', makeBidRes)
      }
      history.push(Paths.auction)
    } catch (error) {
      console.log('Error ==>', error)
    } finally {
      setLoading(false)
    }
  }
  const getTotalCost = () => {
    const totalCost = token * parseFloat(bidValue)
    return totalCost.toFixed(2)
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.bidInfoCont}>
        <Box className={classes.titleCont}>
          <Title>Make Bid</Title>
          <CloseIcon className={classes.closeIconStyle} onClick={() => setShowBidModal(false)} />
        </Box>
        <LightText>Please confirm your bid and fill us with some basic details</LightText>
        <Grid container spacing={2} justify="space-between" className={classes.bidInfo}>
          <Grid item>
            <LightText>Total Tokens</LightText>
            <BoldText>{`${token} (${equityValue}%)`}</BoldText>
          </Grid>
          <Grid item>
            <LightText>Total Cost</LightText>
            <BoldText>{getTotalCost()} USD</BoldText>
          </Grid>
        </Grid>
        <LightText>~1 Token = .92 USD</LightText>
      </Box>
      <Divider />
      <Box className={classes.bidCommunicationCont}>
        <LightText style={{ opacity: 1, marginBottom: '30px' }}>
          We would like to keep you updated on this auction please update you communication preference.
        </LightText>
        <Formik
          initialValues={{ email, phoneNumber: '' }}
          validationSchema={bidFormSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values)
            setSubmitting(false)
          }}
        >
          {() => (
            <Form>
              <CustomTextField label="Email Address" type="email" name="email" />
              <ErrorMessage component={err} name="email" />
              <IntegerNumberField label="Phone number" name="phoneNumber" />
              <ErrorMessage component={err} name="phoneNumber" />
              <Box className={classes.submitCont}>
                <PrimaryButton type="submit">{loading ? <Spinner /> : 'CONFIRM'}</PrimaryButton>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default Bid
