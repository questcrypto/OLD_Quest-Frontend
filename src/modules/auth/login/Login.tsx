import React, { useRef, useState } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { errorAlert } from 'logic/actions/alerts.actions'
import { loginStart } from 'logic/actions/user.actions'
import { useStyle } from './style'
import Box from '@material-ui/core/Box'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { apiBaseUrl } from 'services/global-constant'
import axios from 'axios'
import { getWeb3Val } from 'modules/block-chain/BlockChainMethods'
import {
  CustomInput,
  CustomButton,
  InfoIcon,
  IcoButton,
  InpBtn,
  InpBtnWrapper,
  CustomLabel
} from './style';
import infoIcon from 'assets/images/info.svg';
import wallet from 'assets/images/wallet.svg';
import { loginFormSchema } from '../signUp/formConstant';
import CustomModal from '../../../shared/custom-modal';
import closeIcon from 'assets/icons/closeIcon.svg';
import Wallet from '../signUp/components';
import metaMaskIcon from 'assets/images/metamask.jpg';
import loadingIcon from 'assets/icons/loading.svg';


const Login = (props: any) => {

  const initialValues = {
    email: null,
    walletAddress: ''
  }

  const [dataLoading, setDataLoading] = useState(false)
  const classes = useStyle()
  const { loading, loginStart, errorAlert } = props

  const ref = useRef<any>();

  // Open Wallet Modal
  const [showWalletModal, setShowWalletModal] = useState(false);
  // Initializing Wallet Modal
  const [loadingWallet, setLoadingWallet] = useState(false);
  // Error Connecting Modal
  const [errorConnecting, setErrorConnecting] = useState(false);
  // Wallet Data
  const [walletSelected, setWalletSelected] = useState<any>({ icon: null, label: null });
  // Form Data
  const [initialData, setInitialData] = useState(initialValues);

  const handleSubmit = async (values: any) => {
    try {
      setDataLoading(true);
      const web3 = await getWeb3Val()
      if (web3) {
        const coinbase = await web3.eth.getCoinbase()
        if (!coinbase) {
          window.alert('Please activate Wallet first.')
          return
        }
        const publicaddress = coinbase.toLowerCase()
        console.log(publicaddress);
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

  const handleWalletClick = () => {
    try {
      setShowWalletModal(true);
    } catch (error) { }
  }

  const handleWalletClose = () => {
    try {
      setShowWalletModal(false);
      setLoadingWallet(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleWalletSelect = async (item: any) => {
    try {
      setWalletSelected({ icon: item.icon, label: item.label });
      console.log('Selected Wallet', walletSelected);

      const web3 = await getWeb3Val()
      if (web3) {
        const coinbase = await web3.eth.getCoinbase()
        if (!coinbase) {
          window.alert('Please activate Wallet first.')
          return
        }
        const publicaddress = coinbase.toLowerCase()
        console.log('Public Address', publicaddress);
        if (publicaddress) {
          setShowWalletModal(false);
          console.log('Ref Values', ref.current.values);
          const formData = JSON.parse(JSON.stringify(ref.current.values));
          formData.walletAddress = publicaddress;
          setInitialData(formData);
        } else {
          setErrorConnecting(true);
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Formik
        innerRef={ref}
        enableReinitialize
        initialValues={initialData}
        validationSchema={loginFormSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values)
          setSubmitting(false)
        }}
        // onSubmit={() => { console.log("submit!"); }}
        // validator={() => ({})}
      >
        {({ values, handleChange, handleBlur, isValid, isSubmitting, isValidating, errors, touched }: any) => (
          <Form style={{ width: '100%' }}>
            <Box className={classes.boxStyle}>
              <div className={classes.fieldStyle}>
                <CustomLabel>Email Address <InfoIcon src={infoIcon} alt='Info' /></CustomLabel>
                <CustomInput type="text" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} fullWidth />
                <ErrorMessage component="div" className={classes.err} name="email" />
              </div>
              <div className={classes.fieldStyle}>
                <CustomLabel>Wallet Address <InfoIcon src={infoIcon} alt='Info' /></CustomLabel>
                <InpBtnWrapper>
                  <CustomInput type="text" name="walletAddress" disabled value={values.walletAddress} onChange={handleChange} onBlur={handleBlur} fullWidth />
                  <IcoButton disabled={Yup.string().email().isValidSync(values.email) ? false : true} onClick={handleWalletClick}>
                    <InpBtn src={wallet} />
                  </IcoButton>
                </InpBtnWrapper>
                <ErrorMessage component="div" className={classes.err} name="walletAddress" />
              </div>
              <div className={classes.signUpBtndiv}>
                <CustomButton type="submit">
                  {dataLoading ? 'Loading...' : 'ENTER HERE'}
                </CustomButton>
              </div>
            </Box>
          </Form>
        )}
      </Formik>

      {/* Wallet Modal */}
      <CustomModal show={showWalletModal} toggleModal={handleWalletClose}>
        <div className={classes.walletModalDiv} style={{ height: loadingWallet ? '125px' : '350px' }}>
          <div className={classes.walletModalHeader}>
            {loadingWallet ? (
              <span className={classes.walletBack} onClick={() => setLoadingWallet(false)}>
                Back
              </span>
            ) : (
              <span className={classes.walletHeadText}>Select a wallet</span>
            )
            }
            <img src={closeIcon} alt='close' onClick={handleWalletClose} />
          </div>
          {loadingWallet ? (
            <div className={classes.walletCont}>
              { !errorConnecting ? (
                <>
                  <img src={loadingIcon} alt='Loading...' style={{ width: '18px' }} />
                  <span>{walletSelected.label ? walletSelected.label : 'Initializing'}</span>
                  <img src={walletSelected.icon ? walletSelected.icon : metaMaskIcon} alt='Meta Mask' />
                </>
              ) : (
                <>
                  <span style={{ whiteSpace: 'nowrap' }}>Error Connecting</span>
                  {/* <img src={metaMaskIcon} alt='Meta Mask' /> */}
                  <img src={walletSelected.icon ? walletSelected.icon : metaMaskIcon} alt='Meta Mask' />
                  <div className={classes.tryAgainDiv}>
                    <button>Try Again</button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Wallet walletClick={handleWalletSelect} />
          )
          }

        </div>
      </CustomModal>
    </>
  )
}

const mapStateToProps = (state: any) => ({
  loading: state.user.loading,
})

export default withRouter(connect(mapStateToProps, { loginStart, errorAlert })(Login))
