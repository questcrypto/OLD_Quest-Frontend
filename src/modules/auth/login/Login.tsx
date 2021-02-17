import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { loginStart } from 'logic/actions/user.actions'
import { useStyle, LoginImgCont, LoginText } from './style'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Web3 from 'web3'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Paper } from '@material-ui/core'
import CustomTextField from 'shared/components/custom-text-field'
import { err } from 'shared/styles/styled'
import Button from '@material-ui/core/Button'
import { apiBaseUrl } from 'services/global-constant'
import axios from 'axios'
import QuestLogo from 'assets/images/questLogo.svg'

let web3: Web3 // Will hold the web3 instance

const initialValues = {
  email: '',
}
const loginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
})

const Login = (props: any) => {
  const [dataLoading, setDataLoading] = useState(false)
  const classes = useStyle()
  const { loading, loginStart } = props

  const getSignature = async (data: any) => {
    try {
      const signature = await web3.eth.personal.sign(`I am signing my one-time nonce: ${data.nonce}`, data.publicaddress, '')
      return signature
    } catch (error) {
      console.log('error=>', error)
    }
  }
  const handleSubmit = async (values: any) => {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      window.alert('Please install MetaMask first.')
      return
    }

    if (!web3) {
      try {
        // Request account access if needed
        await window.ethereum.enable()

        // We don't know window.web3 version, so we use our own instance of Web3
        // with the injected provider given by MetaMask
        web3 = new Web3(window.ethereum)
      } catch (error) {
        window.alert('You need to allow MetaMask.')
        return
      }
    }

    const coinbase = await web3.eth.getCoinbase()
    if (!coinbase) {
      window.alert('Please activate MetaMask first.')
      return
    }
    const publicaddress = coinbase.toLowerCase()
    console.log('publicaddress=>', publicaddress)
    try {
      setDataLoading(true)
      let signatureData: any = ''
      const result = await axios.get(`${apiBaseUrl}/user/GetNonce/${publicaddress}`)
      console.log('result->', result.data)
      if (!!result && result.data && result.data.length === 0) {
        const data: any = { email: values.email, publicaddress }
        const signUpRes: any = await axios.post(`${apiBaseUrl}/user/signUp`, data)
        signatureData = { publicaddress: signUpRes.data[0].publicaddress, nonce: signUpRes.data[0].nonce }
      } else {
        signatureData = { publicaddress: result.data[0].publicaddress, nonce: result.data[0].nonce }
      }
      const signature = await getSignature(signatureData)
      const loginData = { publicaddress, signature }
      loginStart(loginData)
    } catch (error) {
      console.log('error-->', error)
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
              <Button
                type="submit"
                variant="contained"
                classes={{
                  root: classes.loginBtnStyle,
                }}
              >
                {loading || dataLoading ? 'Loading...' : 'Login with MetaMask'}
              </Button>
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

export default withRouter(connect(mapStateToProps, { loginStart })(Login))
