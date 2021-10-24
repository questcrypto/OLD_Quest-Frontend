import React, { useState } from 'react'
import { Error } from 'shared/styles/styled'
import { useStyle, textFieldStyle, Title, BoldText, LightText, InformationText } from './style'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import CloseIcon from '@material-ui/icons/Close'
import { PrimaryButton, SecondaryButton } from 'shared/components/buttons'
import { getDaysValue } from 'shared/helpers/globalFunction'
import TextField from '@material-ui/core/TextField'
import Spinner from 'shared/loader-components/spinner'
import moment from 'moment'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'

const ReviewAuctionModal = (props: any) => {
  const classes = useStyle()
  const textClasses = textFieldStyle()
  const [changeNote, setChangeNote] = useState('')
  const [agreeLoading, setAgreeLoading] = useState(false)
  const [disAgreeLoading, setDisAgreeLoading] = useState(false)
  const [changeNoteError, setChangeNoteError] = useState(false)
  const { data, setShowModal, updatePreAuction } = props

  const calculateTotalReserve = (minReserve: any, slReserve: any) => {
    const total = parseFloat(minReserve) + parseFloat(slReserve)
    return `$ ${total.toFixed(2)}`
  }
  const handleChangeNote = (event: any) => {
    const { value } = event.target
    if (value) {
      setChangeNote(value)
      setChangeNoteError(false)
    } else {
      setChangeNote('')
      setChangeNoteError(true)
    }
  }

  const handleOwnerAction = async (approved: boolean) => {
    if (changeNote) {
      const dataVal = { id: data.id, Comment: changeNote, isApprovedByOwner: approved }
      try {
        approved ? setAgreeLoading(true) : setDisAgreeLoading(true)
        await axios.post(`${apiBaseUrl}/auction/OwnersAction`, dataVal)
        setChangeNote('')
        updatePreAuction()
        setShowModal(false)
      } catch (error) {
      } finally {
        setAgreeLoading(false)
        setDisAgreeLoading(false)
      }
    } else {
      setChangeNoteError(true)
    }
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
            <BoldText>{moment(data.startDate).format('MMM Do YYYY')}</BoldText>
          </Grid>
          <Grid item xs={4}>
            <LightText>Duration</LightText>
            <BoldText>{`${getDaysValue(data.startDate, data.endDate)} Days`}</BoldText>
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.infoDataStyle}>
          <Grid item xs={8}>
            <LightText>Lowest bid</LightText>
            <BoldText>{`$ ${parseFloat(data.suggestedLowestBid).toFixed(2)}`}</BoldText>
          </Grid>
          <Grid item xs={4}>
            <LightText>Reserve</LightText>
            <BoldText>{calculateTotalReserve(data.minReserve, data.slReserve)}</BoldText>
          </Grid>
        </Grid>
        <Grid className={classes.infoDataStyle}>
          <LightText>Projected value</LightText>
          <BoldText>{`$ ${parseFloat(data.propertyValue).toFixed(2)}`}</BoldText>
        </Grid>
        <TextField
          variant="outlined"
          fullWidth
          id="changesNote"
          label="Change note"
          value={changeNote}
          autoFocus
          onChange={handleChangeNote}
          className={textClasses.root}
        />
        {changeNoteError && <Error>This field is required</Error>}
        <Grid container spacing={2} justify="flex-end" className={classes.bntGroupStyle}>
          <Grid item>
            <SecondaryButton variant="contained" onClick={() => handleOwnerAction(false)} disabled={agreeLoading}>
              {disAgreeLoading ? <Spinner /> : 'Disagree'}
            </SecondaryButton>
          </Grid>
          <Grid item>
            <PrimaryButton variant="contained" onClick={() => handleOwnerAction(true)} disabled={disAgreeLoading}>
              {agreeLoading ? <Spinner /> : 'Agree'}
            </PrimaryButton>
          </Grid>
        </Grid>
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
