import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { errorAlert } from 'logic/actions/alerts.actions'
import { loginStart } from 'logic/actions/user.actions'
import { useStyle, LoginImgCont, LoginText } from './style-bkp'
import Box from '@material-ui/core/Box'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Paper } from '@material-ui/core'
import CustomTextField from 'shared/components/custom-text-field'
import { err } from 'shared/styles/styled'
import { apiBaseUrl } from 'services/global-constant'
import axios from 'axios'
import QuestLogo from 'assets/images/questLogo.svg'
import { PrimaryButton } from 'shared/components/buttons'
import { getWeb3Val } from 'modules/block-chain/BlockChainMethods'

const initialValues = {
  email: '',
}
const loginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
})

const Login = (props: any) => {
  const [dataLoading, setDataLoading] = useState(false)
  const classes = useStyle()
  const { loading, loginStart, errorAlert } = props

  const handleSubmit = async (values: any) => {
    try {
      setDataLoading(true)
      const web3 = await getWeb3Val()
      if (web3) {
        const coinbase = await web3.eth.getCoinbase()
        if (!coinbase) {
          window.alert('Please activate MetaMask first.')
          return
        }
        const publicaddress = coinbase.toLowerCase()
        let signatureData: any = ''
        const result = await axios.get(`${apiBaseUrl}/user/GetNonce/${publicaddress}`)
        if (!!result && result.data && result.data.length === 0) {
          const data: any = { email: values.email, publicaddress }
          const signUpRes: any = await axios.post(`${apiBaseUrl}/user/signUp`, data)
          signatureData = { publicaddress: signUpRes.data.publicaddress, nonce: signUpRes.data.nonce }
        } else {
          signatureData = { publicaddress: result.data[0].publicaddress, nonce: result.data[0].nonce }
        }
        const signature = await web3.eth.personal.sign(
          `I am signing my one-time nonce: ${signatureData.nonce}`,
          signatureData.publicaddress,
          ''
        )
        const loginData = { publicaddress, signature }
        loginStart(loginData)
      }
    } catch (error) {
      if (!!error && error.response && error.response.data.message) {
        errorAlert(error.response.data.message)
      } else if (!!error.message) {
        errorAlert(error.message)
      } else {
        errorAlert('Something went wrong , please try again')
      }
    } finally {
      setDataLoading(false)
    }
  }

  return (
    <Box className={classes.root}>
      <Paper className={classes.loginBoxStyle}>
        <LoginImgCont>
          <img src={QuestLogo} alt="" />
        </LoginImgCont>
        <LoginText>Login into quest</LoginText>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values)
            setSubmitting(false)
          }}
        >
          {() => (
            <Form>
              <CustomTextField name="email" label="email" />
              <ErrorMessage component={err} name="email" />
              <PrimaryButton fullWidth type="submit" className={classes.loginBtnStyle}>
                {loading || dataLoading ? 'Loading...' : 'Login with MetaMask'}
              </PrimaryButton>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  )
}

const mapStateToProps = (state: any) => ({
  loading: state.user.loading,
})

export default withRouter(connect(mapStateToProps, { loginStart, errorAlert })(Login))