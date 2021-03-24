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
import * as Yup from 'yup'
import { Button } from '@material-ui/core'
import { withRouter } from 'react-router'

const auctionReviewSchema = Yup.object().shape({
  changeNote: Yup.string().required('This field is required'),
})

const AuctionReview = (props: any) => {
  const classes = auctionConfigStyle()
  const [agreeLoading, setAgreeLoading] = useState(false)
  const [disagreeLoading, setDisagreeLoading] = useState(false)
  const { setShowAuctionModal, history, auctionDetails, projectedValue, setModalAuctionDetails } = props

  console.log(auctionDetails)

  const handleAuctionRejection = async (e: any, { changeNote }: any) => {
    e.preventDefault()
    console.log(changeNote)

    try {
      setDisagreeLoading(true)
      const data = {
        id: auctionDetails?.id,
        Comment: changeNote,
        isApprovedByOwner: false,
      }
      let res = await axios.post(`${apiBaseUrl}/auction/OwnersAction`, data)
      console.log(res)
      setShowAuctionModal(false)
    } catch (err) {
      console.log('error ==>', err)
    } finally {
      setDisagreeLoading(false)
    }
  }

  const handleAuctionApproval = async (e: any, { changeNote }: any) => {
    e.preventDefault()
    console.log(changeNote)
    try {
      setAgreeLoading(true)
      const data = {
        id: auctionDetails?.id,
        Comment: changeNote,
        isApprovedByOwner: true,
      }
      let res = await axios.post(`${apiBaseUrl}/auction/OwnersAction`, data)

      console.log(res)
      history.push('/')
      //   setModalAuctionDetails({ currentValue: projectedValue, auctionDetails: { ...auctionDetails, isApprovedByOwner: true } })
      //   setShowAuctionModal(false)
    } catch (err) {
      console.log('error ==>', err)
    } finally {
      setAgreeLoading(false)
    }
  }

  return (
    <Box className={classes.root}>
      {auctionDetails?.isApprovedByOwner ? (
        <Box className={classes.rootAuctionStyle}>
          <TitleText>SUCCESS- AUCTION CONFIGURED</TitleText>
          <br />
          {/* <br /> */}
          <p> YOUR PROPERTY WILL BE AUCTIONED ON {formatDateString(auctionDetails?.startDate)} </p>
          {/* <br /> */}
          <b>Contact for support:</b>
          <Box marginTop="5px">
            <span>admin@questcrypto.com</span>
          </Box>
          <Box width="100%" display="flex" justifyContent="flex-end" marginTop="20px">
            <PrimaryButton variant="contained" onClick={() => setShowAuctionModal(false)}>
              OK
            </PrimaryButton>
          </Box>
        </Box>
      ) : (
        <>
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
                  <p>
                    {Math.abs((new Date(auctionDetails?.endDate).valueOf() - new Date(auctionDetails?.startDate).valueOf()) / 86400000)}
                  </p>
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
                    initialValues={{ changeNote: '' }}
                    validationSchema={auctionReviewSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      // handleSubmit(values)
                      console.log(values)
                      setSubmitting(false)
                    }}
                  >
                    {(fields) => (
                      <Form>
                        <Box>
                          <CustomTextField label="Change Note" name="changeNote" />
                          <ErrorMessage component={err} name="changeNote" />
                        </Box>
                        <Box className={classes.btnGroupStyle}>
                          <PrimaryButton
                            className={classes.btnStyle}
                            variant="contained"
                            disabled={agreeLoading || disagreeLoading}
                            onClick={(e: any) => handleAuctionRejection(e, fields.values)}
                          >
                            {disagreeLoading ? <Spinner /> : 'I DO NOT AGREE'}
                          </PrimaryButton>
                          <PrimaryButton
                            disabled={agreeLoading || disagreeLoading}
                            onClick={(e: any) => handleAuctionApproval(e, fields.values)}
                            variant="contained"
                          >
                            {agreeLoading ? <Spinner /> : 'I AGREE'}
                          </PrimaryButton>
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
        </>
      )}
    </Box>
  )
}
export default withRouter(AuctionReview)
