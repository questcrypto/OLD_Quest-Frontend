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
  const { propId, publicAddress, setShowAuctionModal, history } = props

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
      let res = await axios.post(`${apiBaseUrl}/auction/ConfigureAuction`, data)
      // const auctionId = res.data.identifiers[0].id

      // const web3 = await getWeb3Val()
      // console.log(web3)
      // if (web3) {
      //   const accounts = await web3.eth.getAccounts()
      //   const SLCInstance = new web3.eth.Contract(slcAbi, SLCContractAddress)

      //   const newStartDate = new Date(data.startDate).getTime() / 1000
      //   const newEndDate = new Date(data.endDate).getTime() / 1000

      //   let res = await SLCInstance.methods
      //     .EnlistAuction(auctionId, newStartDate, newEndDate, data.minReserve, data.slReserve, data.suggestedLowestBid, propId)
      //     .send({ from: accounts[0] })

      //   console.log(res)
      // }

      history.push('/dashboard')
    } catch (error) {
      console.log(error)
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
                    <MoneyInputField label="Min - Reserve" name="minReserve" dollarPrefix={true} />
                    <ErrorMessage component={err} name="minReserve" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MoneyInputField label="SL - Reserve" name="slReserve" dollarPrefix={true} />
                    <ErrorMessage component={err} name="slReserve" />
                  </Grid>
                </Grid>

                <MoneyInputField label="Suggested lowest bid" name="suggestedLowestBid" dollarPrefix={true} acceptDecimals />
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
export default AuctionConfiguration
