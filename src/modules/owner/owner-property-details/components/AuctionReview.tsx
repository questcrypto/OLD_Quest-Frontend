import React, { useState } from 'react'
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
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'

import { slcAbi, SLCContractAddress } from '../../../block-chain/abi'
import { getWeb3Val } from 'modules/block-chain/BlockChainMethods'
import MoneyInputField from 'shared/components/money-input-field'
import { formatDateString } from 'shared/helpers/globalFunction'

const initialValues = {
  changeNote: '',
}

const AuctionReview = (props: any) => {
  const classes = auctionConfigStyle()
  const [loading, setLoading] = useState(false)
  const { setShowAuctionModal, history, auctionDetails, projectedValue } = props

  console.log(auctionDetails)

  return (
    <Box className={classes.root}>
      <Box className={classes.rootAuctionStyle}>
        <HeaderCont>
          <TitleText>Auction Details</TitleText>
          <CloseIcon onClick={() => setShowAuctionModal(false)} />
        </HeaderCont>
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <b>Start Date</b>
              <p>{formatDateString(auctionDetails?.CreatedAt)}</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <b>Duration (in days) </b>
              <p>{Math.abs((new Date(auctionDetails?.endDate).valueOf() - new Date(auctionDetails?.startDate).valueOf()) / 86400000)}</p>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <b>Lowest Bid</b>
              <p>$ {auctionDetails?.suggestedLowestBid}</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <b>Reserve</b>
              <p>$ {auctionDetails?.minReserve + auctionDetails?.slReserve}</p>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <b>Projected Value</b>
              <p> $ {projectedValue}</p>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Formik
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting }) => {
                  // handleSubmit(values)
                  console.log(values)
                  setSubmitting(false)
                }}
              >
                {() => (
                  <Form>
                    <Box>
                      <CustomTextField label="Change Note" name="changeNote" />
                      <ErrorMessage component={err} name="changeNote" />
                    </Box>
                    <Box className={classes.btnGroupStyle}>
                      <PrimaryButton className={classes.btnStyle} variant="contained">
                        {loading ? <Spinner /> : 'I DO NOT AGREE'}
                      </PrimaryButton>
                      <PrimaryButton variant="contained">{loading ? <Spinner /> : 'I AGREE'}</PrimaryButton>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box className={classes.auctionInfoBox}>
        <p className={classes.auctionInfoText}>
          Auction can only be edited till the start date, any change in auction details will require approval from the owner.{' '}
        </p>
      </Box>
    </Box>
  )
}
export default AuctionReview
