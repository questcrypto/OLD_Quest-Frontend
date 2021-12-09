import React, { useState } from 'react'
import { auctionConfigStyle, HeaderCont, TitleText } from './style'
import { Formik, Form, ErrorMessage } from 'formik'
import { err } from 'shared/styles/styled'
import { formatDateString } from 'shared/helpers/globalFunction'
import * as Yup from 'yup'
import CustomTextField from 'shared/components/custom-text-field'
import { PrimaryButton } from 'shared/components/buttons'
import Spinner from 'shared/loader-components/spinner'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import CloseIcon from '@material-ui/icons/Close'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'

const auctionReviewSchema = Yup.object().shape({
  changeNote: Yup.string().required('This field is required'),
})

const AuctionReviewGeneralUser = (props: any) => {
  const classes = auctionConfigStyle()
  const [agreeLoading, setAgreeLoading] = useState(false)
  const [disagreeLoading, setDisagreeLoading] = useState(false)
  const { setShowAuctionModal, auctionDetails, projectedValue, errorAlert, refresh } = props

  const handleAuctionRejection = async (e: any, { changeNote }: any) => {
    e.preventDefault()

    try {
      setDisagreeLoading(true)
      const data = {
        id: auctionDetails?.id,
        Comment: changeNote,
        isApprovedByOwner: false,
      }
      await axios.post(`${apiBaseUrl}/auction/OwnersAction`, data)
      setShowAuctionModal(false)
    } catch (error :any) {
      if (!!error && error.response && error.response.data.message) {
        errorAlert(error.response.data.message)
      } else {
        errorAlert('Something went wrong , please try again')
      }
    } finally {
      setDisagreeLoading(false)
    }
  }

  const handleAuctionApproval = async (e: any, { changeNote }: any) => {
    e.preventDefault()
    try {
      setAgreeLoading(true)
      const data = {
        id: auctionDetails?.id,
        Comment: changeNote,
        isApprovedByOwner: true,
      }
      await axios.post(`${apiBaseUrl}/auction/OwnersAction`, data)
      setShowAuctionModal(false)
      refresh()
    } catch (error :any) {
      if (!!error && error.response && error.response.data.message) {
        errorAlert(error.response.data.message)
      } else {
        errorAlert('Something went wrong , please try again')
      }
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
          <p> YOUR PROPERTY WILL BE AUCTIONED ON {formatDateString(auctionDetails?.startDate)} </p>
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
export default AuctionReviewGeneralUser
