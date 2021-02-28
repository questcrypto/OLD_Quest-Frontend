import React from 'react'
import { Formik, Form } from 'formik'
import { useStyle, Title, BoldText, LightText, InformationText } from './style'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import CloseIcon from '@material-ui/icons/Close'
import { PrimaryButton, SecondaryButton } from 'shared/components/buttons'
import CustomTextField from 'shared/components/custom-text-field'

const ReviewAuctionModal = (props: any) => {
  const classes = useStyle()
  const { setShowModal } = props

  const handleSubmit = (values: any) => {
    console.log('values=>', values)
  }
  return (
    <Grid className={classes.root}>
      <Grid className={classes.infoCont}>
        <Box className={classes.titleCont}>
          <Title>Auction Details</Title>
          <CloseIcon className={classes.closeIconStyle} onClick={() => setShowModal(false)} />
        </Box>
        <Grid container spacing={2} className={classes.infoDataStyle}>
          <Grid item xs={8}>
            <LightText>Start date</LightText>
            <BoldText>29 Jan 2021</BoldText>
          </Grid>
          <Grid item xs={4}>
            <LightText>Duration</LightText>
            <BoldText>5 Days</BoldText>
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.infoDataStyle}>
          <Grid item xs={8}>
            <LightText>Lowest bid</LightText>
            <BoldText>$ 12.00</BoldText>
          </Grid>
          <Grid item xs={4}>
            <LightText>Reserve</LightText>
            <BoldText>$ 960000.50</BoldText>
          </Grid>
        </Grid>
        <Grid className={classes.infoDataStyle}>
          <LightText>Projected value</LightText>
          <BoldText>$ 1200000.50</BoldText>
        </Grid>
        <Formik
          initialValues={{ changeNote: '' }}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values)
            setSubmitting(false)
          }}
        >
          {() => (
            <Form>
              <CustomTextField label="Change note" name="changeNote" />
              <Grid container spacing={2} justify="flex-end" className={classes.bntGroupStyle}>
                <Grid item>
                  <SecondaryButton>Disagree</SecondaryButton>
                </Grid>
                <Grid item>
                  <PrimaryButton>Agree</PrimaryButton>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
      <Grid className={classes.infoTextStyle}>
        <InformationText>
          Auction can only be edited till the start date, any change in auction details will require approval from the owner.
        </InformationText>
      </Grid>
    </Grid>
  )
}

export default ReviewAuctionModal
