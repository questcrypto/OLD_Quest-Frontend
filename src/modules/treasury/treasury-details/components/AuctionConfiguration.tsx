import React, { useState } from 'react'
import { connect } from 'react-redux'
import { errorAlert } from 'logic/actions/alerts.actions'
import { auctionConfigStyle, HeaderCont, TitleText } from './style'
import { Formik, Form, ErrorMessage } from 'formik'
import { err } from 'shared/styles/styled'
import IntegerNumberField from 'shared/components/Integer-number-field'
import CustomTextField from 'shared/components/custom-text-field'
import FormDatePicker from 'shared/components/form-date-picker'
import { PrimaryButton } from 'shared/components/buttons'
import Spinner from 'shared/loader-components/spinner'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import CloseIcon from '@material-ui/icons/Close'
import history from 'modules/app/components/history'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'

import MoneyInputField from 'shared/components/money-input-field'

const initialValues = {
  startDate: '',
  duration: '',
  minReserve: '',
  slReserve: '',
  suggestedLowestBid: '',
  memo: '',
}

const AuctionConfiguration = (props: any) => {
  const classes = auctionConfigStyle()
  const [loading, setLoading] = useState(false)
  const { propId, publicAddress, setShowAuctionModal, errorAlert } = props

  const handleSubmit = async (values: any) => {
    const endDate = new Date(values.startDate)
    endDate.setDate(endDate.getDate() + parseInt(values.duration))

    const data = {
      propid: propId,
      startDate: new Date(values.startDate),
      endDate: new Date(endDate),
      minReserve: parseInt(values.minReserve),
      slReserve: parseInt(values.slReserve),
      suggestedLowestBid: parseInt(values.suggestedLowestBid),
      memo: values.memo,
      isIssuedBy: publicAddress,
    }

    try {
      setLoading(true)
      await axios.post(`${apiBaseUrl}/auction/ConfigureAuction`, data)

      history.push('/dashboard')
    } catch (error) {
      if (!!error && error.response && error.response.data.message) {
        errorAlert(error.response.data.message)
      } else {
        errorAlert('Something went wrong , please try again')
      }
    } finally {
      setShowAuctionModal(false)
      setLoading(false)
    }
  }
  return (
    <Box className={classes.root}>
      <Box className={classes.rootAuctionStyle}>
        <HeaderCont>
          <TitleText>Configure Auction</TitleText>
          <CloseIcon onClick={() => setShowAuctionModal(false)} />
        </HeaderCont>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values)
            setSubmitting(false)
          }}
        >
          {() => (
            <Form>
              <Box>
                <FormDatePicker label="Start Date" name="startDate" />
                <ErrorMessage component={err} name="startDate" />
                <IntegerNumberField label="Duration (in days)" name="duration" />
                <ErrorMessage component={err} name="duration" />
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <MoneyInputField label="Min - Reserve" name="minReserve" dollarPrefix />
                    <ErrorMessage component={err} name="minReserve" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MoneyInputField label="SL - Reserve" name="slReserve" dollarPrefix />
                    <ErrorMessage component={err} name="slReserve" />
                  </Grid>
                </Grid>

                <MoneyInputField label="Suggested lowest bid" name="suggestedLowestBid" dollarPrefix acceptDecimals />
                <ErrorMessage component={err} name="suggestedLowestBid" />
                <CustomTextField label="Memo" name="memo" />
                <ErrorMessage component={err} name="memo" />
              </Box>
              <Box className={classes.btnGroupStyle}>
                <PrimaryButton type="submit" variant="contained">
                  {loading ? <Spinner /> : 'Send for approval'}
                </PrimaryButton>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
      <Box className={classes.auctionInfoBox}>
        <p className={classes.auctionInfoText}>
          Auction can only be edited till the start date, any change in auction details will require approval from the owner.
        </p>
      </Box>
    </Box>
  )
}

export default connect(null, { errorAlert })(AuctionConfiguration)
