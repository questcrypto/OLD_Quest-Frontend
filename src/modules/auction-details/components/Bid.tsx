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
import { treasuryAddress } from 'modules/block-chain/abi'
import { currentBidValue, saveBlockchainBid } from 'modules/block-chain/BlockChainMethods'
import { err } from 'shared/styles/styled'
import * as Yup from 'yup'
import { connect } from 'react-redux'

export const bidFormSchema = Yup.object().shape({
  phoneNumber: Yup.string().required('This field is required'),
  email: Yup.string().required('This field is required'),
})

const Bid = (props: any) => {
  console.table(props)
  const classes = bidStyle()
  const [loading, setLoading] = useState(false)
  const { auctionID, biddersID, propertyID, token, bidValue, equityValue, setShowBidModal, email, errorAlert } = props

  const handleSubmit = async (values: any) => {
    console.log(values)
    const totalAmount = token * parseFloat(bidValue)
    const dataVal = {
      auctionID,
      biddersID,
      bidPrice: parseFloat(bidValue),
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      propertyID,
      initialAllotedTokens: token,
      contactNumber: 9874987401,
    }
    try {
      setLoading(true)
      const currentValue = await currentBidValue(dataVal.auctionID)
      console.log(dataVal.totalAmount - currentValue)
      await saveBlockchainBid(dataVal.auctionID, dataVal.totalAmount - currentValue, treasuryAddress)
      if (currentValue > 0 && false) {
        await axios.post(`${apiBaseUrl}/auction/upgradeBid`, dataVal)
      } else {
        await axios.post(`${apiBaseUrl}/auction/makeBid`, dataVal)
      }
      history.push(Paths.auction)
    } catch (error) {
      if (!!error && error.response && error.response.data.message) {
        errorAlert(error.response.data.message)
      } else {
        errorAlert('Something went wrong , please try again')
      }
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

const mapStateToProps: any = (state: any) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(Bid)
