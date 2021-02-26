import React from 'react'
import { Formik, Form } from 'formik'
import { bidStyle, Title, BoldText, LightText } from './style'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import CloseIcon from '@material-ui/icons/Close'
import Divider from '@material-ui/core/Divider'
import { PrimaryButton } from 'shared/components/buttons'
import CustomTextField from 'shared/components/custom-text-field'
import IntegerNumberField from 'shared/components/Integer-number-field'

const Bid = (props: any) => {
  const classes = bidStyle()
  const { setShowBidModal } = props

  const handleSubmit = (values: any) => {
    console.log('values')
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
            <BoldText>26 (42%)</BoldText>
          </Grid>
          <Grid item>
            <LightText>Total Cost</LightText>
            <BoldText>2577.88 USD</BoldText>
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
          initialValues={{ email: '', phoneNumber: '' }}
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
                <PrimaryButton>CONFIRM</PrimaryButton>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default Bid
