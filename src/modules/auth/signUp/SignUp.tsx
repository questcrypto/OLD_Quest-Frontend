import React, { useRef, useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import {
  useStyle,
  LogoImage,
  LoginLogo,
  StyledTabs,
  StyledTab,
  CustomInput,
  CustomButton,
  InfoIcon,
  IcoButton,
  InpBtn,
  InpBtnWrapper,
  Indicator,
  CustomLabel
} from './style';
import questLogo from 'assets/images/questLoginLogo.png';
import signUpLogo from 'assets/images/signUp.png';
import signInLogo from 'assets/images/signIn.png';
import rightArrow from 'assets/images/rightArrow.svg';
import wallet from 'assets/images/wallet.svg';
import infoIcon from 'assets/images/info.svg';
import Tab from '@material-ui/core/Tab';
import CustomModal from '../../../shared/custom-modal';
import mailIcon from 'assets/images/otpMail.png';
import closeIcon from 'assets/icons/closeIcon.svg';
import Wallet from './components';
import metaMaskIcon from 'assets/images/metamask.jpg';
import lynxIcon from 'assets/icons/lynxIcon.svg';
import loadingIcon from 'assets/icons/loading.svg';
import OtpInput from 'react-otp-input';
import { Formik, Form, ErrorMessage } from 'formik';
import { initialValues, signUpFormSchema } from './formConstant';
import cryptoImage from 'assets/images/signUpLogoCrypto.png';
import { default as Login } from '../login';
import * as Yup from 'yup';
import { getWeb3Val } from 'modules/block-chain/BlockChainMethods';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { errorAlert } from 'logic/actions/alerts.actions'
import { loginStart } from 'logic/actions/user.actions'
import { apiBaseUrl } from 'services/global-constant'
import axios from 'axios'

const SignUp = (props: any) => {

  const classes = useStyle()

  const ref = useRef<any>();

  const { loading, loginStart, errorAlert } = props

  const [dataLoading, setDataLoading] = useState(false)
  // Sign Up and Sign In Navigation
  const [value, setValue] = useState(0);
  // Open OTP Modal
  const [showOTPModal, setShowOTPModal] = useState(false);
  // Open Wallet Modal
  const [showWalletModal, setShowWalletModal] = useState(false);
  // Initializing Wallet Modal
  const [loadingWallet, setLoadingWallet] = useState(false);
  // Error Connecting Modal
  const [errorConnecting, setErrorConnecting] = useState(false);
  // OTP in Modal
  const [otp, setOtp] = useState<string>('');
  // Form Data
  const [initialData, setInitialData] = useState(initialValues);
  // Email 
  const [emailData, setEmailData] = useState<string>('');
  // Wallet Data
  const [walletSelected, setWalletSelected] = useState<any>({ icon: null, label: null });

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleOTPClick = () => {
    try {
      const formData = JSON.parse(JSON.stringify(ref.current.values));
      setEmailData(formData.email);
      setShowOTPModal(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleOTPClose = () => {
    try {
      setShowOTPModal(false);
      setOtp('');
    } catch (error) {
      console.log(error);
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
      setLoadingWallet(true);

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
        setLoadingWallet(false);
      }

    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeOTP = (otp: string) => {
    try {
      setOtp(otp);
      console.log(ref.current.values);
      if (otp.length === 4) {
        setShowOTPModal(false);
        const formData = JSON.parse(JSON.stringify(ref.current.values));
        formData.otp = otp;
        setInitialData(formData);
        setOtp('');
      }
    } catch (error) { }
  }

  const handleSubmit = async (values: any) => {
    try {
      console.log(values);
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

  return (
    <>

      <Grid container >
        <Grid item sm={4}></Grid>

        <Grid item sm={4} xs={12}>
          <Box className={classes.root} >

            <LogoImage src={questLogo} alt='Quest Logo' />

            <div className={classes.tabDivStyle}>
              <StyledTabs
                value={value}
                onChange={handleChangeTab}
              >
                <StyledTab
                  className={classes.tabStyle}
                  icon={<LoginLogo src={signUpLogo} />}
                  label={
                    <>
                      Sign Up <br />
                      <span
                        className={classes.tabText}
                      >
                        Lorem ipsum dolor sit, amet consectetur adipisicing.
                      {value === 0 ? <Indicator /> : ''}
                      </span>
                    </>
                  }
                />
                <StyledTab
                  className={classes.tabStyle}
                  icon={<LoginLogo src={signInLogo} />}
                  label={
                    <>
                      Sign In <br />
                      <span
                        className={classes.tabText}
                      >
                        Lorem ipsum dolor sit, amet consectetur adipisicing.
                      {value === 1 ? <Indicator /> : ''}
                      </span>
                    </>
                  }
                />
              </StyledTabs>
            </div>

            {value == 0 &&

              <Formik
                innerRef={ref}
                enableReinitialize
                initialValues={initialData}
                validationSchema={signUpFormSchema}
                onSubmit={(values, { setSubmitting }) => {
                  handleSubmit(values)
                  setSubmitting(false)
                }}
              >
                {({ values, handleChange, handleBlur, isValid, isSubmitting, isValidating, errors, touched }: any) => (
                  <Form style={{ width: '100%' }}>
                    <Box className={classes.boxStyle}>
                      <div className={classes.fieldStyle}>
                        <CustomLabel>Username <InfoIcon src={infoIcon} alt='Info' /></CustomLabel>
                        <CustomInput type="text" name="userName" value={values.userName} onChange={handleChange} onBlur={handleBlur} fullWidth />
                        {/* {  touched.userName ? (<span>hello</span>): null } */}
                        <ErrorMessage component="div" className={classes.err} name="userName" />
                      </div>
                      <div className={classes.fieldStyle}>
                        <CustomLabel>Email Address <InfoIcon src={infoIcon} alt='Info' /></CustomLabel>
                        <CustomInput type="text" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} fullWidth />
                        <ErrorMessage component="div" className={classes.err} name="email" />
                      </div>
                      <div className={classes.fieldStyle}>
                        <CustomLabel>OTP <InfoIcon src={infoIcon} alt='Info' /></CustomLabel>
                        <InpBtnWrapper>
                          <CustomInput type="text" name="otp" disabled value={values.otp} onChange={handleChange} onBlur={handleBlur} fullWidth />
                          <IcoButton disabled={Yup.string().email().isValidSync(values.email) ? false : true} onClick={handleOTPClick}><InpBtn src={rightArrow} /></IcoButton>
                        </InpBtnWrapper>
                        <ErrorMessage component="div" className={classes.err} name="otp" />
                      </div>
                      <div className={classes.fieldStyle}>
                        <CustomLabel>Wallet Address <InfoIcon src={infoIcon} alt='Info' /></CustomLabel>
                        <InpBtnWrapper>
                          <CustomInput type="text" name="walletAddress" disabled value={values.walletAddress} onChange={handleChange} onBlur={handleBlur} fullWidth />
                          <IcoButton disabled={Yup.string().email().isValidSync(values.email) ? false : true} onClick={handleWalletClick}><InpBtn src={wallet} /></IcoButton>
                        </InpBtnWrapper>
                        <ErrorMessage component="div" className={classes.err} name="walletAddress" />
                      </div>
                      <div className={classes.signUpBtndiv}>
                        <CustomButton type="submit">
                          {dataLoading ? 'Loading...' : 'GET STARTED'}
                        </CustomButton>
                      </div>
                    </Box>
                  </Form>
                )}
              </Formik>

            }
            {
              // SignIn Tab
              value == 1 && <Login />
            }

          </Box>
        </Grid>

        <Grid item sm={4}>
          <div className={classes.cryptoTransImageDiv}>
            <img src={cryptoImage} className={classes.cryptoTransImage} />
          </div>
        </Grid>
      </Grid>
      {/* Modals */}

      {/* OTP Modal */}
      <CustomModal show={showOTPModal} toggleModal={handleOTPClose}>
        <div className={classes.OTPModalDiv}>
          <div className={classes.OTPModalClose} onClick={handleOTPClose}>
            <img src={closeIcon} alt='close' />
          </div>
          <div className={classes.OTPModalMail}>
            <img src={mailIcon} alt='Mail Icon' />
          </div>
          {/* <OTPInputField type='text' /> */}
          <OtpInput
            value={otp}
            onChange={handleChangeOTP}
            numInputs={4}
            separator={<span>&nbsp;&nbsp;</span>}
            inputStyle={classes.otpStyle}
          />
          <div className={classes.OTPModalText}>
            Please check <span style={{ background: 'rgba(25, 163, 179, 0.1)' }}>{emailData}</span> for OTP CODE
            </div>
        </div>
      </CustomModal>

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
  );

}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}



// export default SignUp;

const mapStateToProps = (state: any) => ({
  loading: state.user.loading,
})

export default withRouter(connect(mapStateToProps, { loginStart, errorAlert })(SignUp))
