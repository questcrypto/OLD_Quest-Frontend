import React from 'react'
import { useStyles, HeaderCont, TitleText, AuctionInfoBox, AuctionInfoText } from './style'
import { Formik, Form, ErrorMessage } from 'formik'
import { err } from 'shared/styles/styled'
import CustomTextField from 'shared/components/custom-text-field'
import { PrimaryButton, SecondaryButton } from 'shared/components/buttons'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import CloseIcon from '@material-ui/icons/Close'

const initialValues = {
  startDate: '',
  duration: '',
  minReserve: '',
  slReserve: '',
  suggestedLowestBid: '',
  memo: '',
}

const AuctionConfiguration = (props: any) => {
  const classes = useStyles()
  const { setShowAuctionModal } = props

  const handleSubmit = (values: any) => {
    console.log('values==>', values)
  }
  return (
    <Box>
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
                <CustomTextField label="Start Date" name="startDate" />
                <ErrorMessage component={err} name="startDate" />
                <CustomTextField label="Duration" name="duration" />
                <ErrorMessage component={err} name="duration" />
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField label="Min - Reserve" name="minReserve" />
                    <ErrorMessage component={err} name="minReserve" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField label="SL - Reserve" name="slReserve" />
                    <ErrorMessage component={err} name="slReserve" />
                  </Grid>
                </Grid>

                <CustomTextField label="Suggested lowest bid" name="suggestedLowestBid" />
                <ErrorMessage component={err} name="suggestedLowestBid" />
                <CustomTextField label="Memo" name="memo" />
                <ErrorMessage component={err} name="memo" />
              </Box>
              <Grid container justify="flex-end" className={classes.btnGroupStyle} spacing={2}>
                <Grid item>
                  <SecondaryButton variant="contained">save as draft</SecondaryButton>
                </Grid>
                <Grid item>
                  <PrimaryButton variant="contained">Send for approval</PrimaryButton>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
      <AuctionInfoBox>
        <AuctionInfoText>
          Auction can only be edited till the start date, any change in auction details will require approval from the owner.
        </AuctionInfoText>
      </AuctionInfoBox>
    </Box>
  )
}
export default AuctionConfiguration
