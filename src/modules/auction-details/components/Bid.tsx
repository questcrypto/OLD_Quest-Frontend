import React, { useState } from 'react'
import { Formik, Form } from 'formik'
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

const Bid = (props: any) => {
  const classes = bidStyle()
  const [loading, setLoading] = useState(false)
  const { auctionID, biddersID, propertyID, token, bidValue, equityValue, setShowBidModal, upgrade, email } = props

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
      if (upgrade) {
        await axios.post(`${apiBaseUrl}/auction/upgradeBid`, dataVal)
      } else await axios.post(`${apiBaseUrl}/auction/makeBid`, dataVal)
      history.push(Paths.auction)
    } catch (error) {
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
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values)
            setSubmitting(false)
          }}
        >
          {() => (
            <Form>
              <CustomTextField label="Email Address" type="email" name="email" />
              <IntegerNumberField label="Phone number" name="phoneNumber" />
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
