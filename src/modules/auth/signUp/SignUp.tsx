import React, { useRef, useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
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
  CustomLabel,
  CustomTooltip
} from './style';
import questLogo from 'assets/images/questLoginLogo.png';
import questHoverLogo from 'assets/images/questHoverLogo.png';
import signUpLogo from 'assets/images/signUp.png';
import signUpActiveLogo from 'assets/images/signUpActive.png';
import signInLogo from 'assets/images/signIn.png';
import signInActiveLogo from 'assets/images/signInActive.png';
import rightArrow from 'assets/images/rightArrow.svg';
import wallet from 'assets/images/wallet.svg';
import infoIcon from 'assets/images/info.svg';
import Tab from '@material-ui/core/Tab';
import CustomModal from '../../../shared/custom-modal';
import mailIcon from 'assets/images/otpMail.png';
import mailIcon2 from 'assets/images/otpMail2.png';
import closeIcon from 'assets/icons/closeIcon.svg';
import Wallet from './components';
import metaMaskIcon from 'assets/images/metamask.jpg';
import lynxIcon from 'assets/icons/lynxIcon.svg';
import loadingIcon from 'assets/icons/loading.svg';
import OtpInput from 'react-otp-input';
import { Formik, Form, ErrorMessage } from 'formik';
import { initialValues, signUpFormSchema } from './formConstant';
import cryptoImage from 'assets/images/signUpLogoCrypto.png';
import cryptoHoverImage from 'assets/images/signUpHoverLogoCrypto.png';
import { default as Login } from '../login';
import * as Yup from 'yup';
import { getWeb3Val } from 'modules/block-chain/BlockChainMethods';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { errorAlert, warningAlert } from 'logic/actions/alerts.actions'
import { loginStart } from 'logic/actions/user.actions'
import { apiBaseUrl, apiBaseUrl2 } from 'services/global-constant'
import axios from 'axios'

const SignUp = (props: any) => {

  const classes = useStyle()

  const ref = useRef<any>();

  const { loading, loginStart, errorAlert, warningAlert } = props

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
  // OTP Received
  const [otpServiceData, setOtpServiceData] = useState<boolean>(false);
  // Actual OTP Received
  const [actualOtp, setActualOtp] = useState<any>('');

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleOTPClick = async () => {
    try {
      const formData = JSON.parse(JSON.stringify(ref.current.values));
      setEmailData(formData.email);
      const inputJson = {
        name: formData.userName,
        email: formData.email
      }
      const result = await axios.post(`${apiBaseUrl2}/user/checkEmail`, inputJson)
      // console.log('result', result.data);
      setShowOTPModal(true);
      const Otp = await axios.get(`${apiBaseUrl2}/user/getPassCode/${formData.email}`);
      // const actualOtp = 123456;
      setActualOtp(Otp.data);
      // console.log(Otp.data);
    } catch (error) {
      // console.log(error);
      if (!!error && error.response && error.response.data.message) {
        errorAlert(error.response.data.message)
      } else if (!!error.message) {
        errorAlert(error.message)
      } else {
        errorAlert('Something went wrong , please try again')
      }
    }
  }

  const handleOTPClose = () => {
    try {
      setShowOTPModal(false);
      // setOtp('');
      setOtpServiceData(true);
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
      }
      setLoadingWallet(false);
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

  const handleChange = (event: any) => {
    console.log(event);
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
        const data: any = { email: values.email, publicaddress, name: values.userName }
        const signUpRes: any = await axios.post(`${apiBaseUrl}/user/signUp`, data)
        signatureData = { publicaddress: signUpRes.data.publicaddress, nonce: signUpRes.data.nonce }
        // if (!!result && result.data && result.data.length === 0) {
        //   const data: any = { email: values.email, publicaddress, name: values.userName }
        //   const signUpRes: any = await axios.post(`${apiBaseUrl}/user/signUp`, data)
        //   signatureData = { publicaddress: signUpRes.data.publicaddress, nonce: signUpRes.data.nonce }
        // } else {
        //   signatureData = { publicaddress: result.data[0].publicaddress, nonce: result.data[0].nonce }
        // }
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
        <Grid item md={4} sm={12} xs={12}></Grid>

        <Grid item md={4} sm={12} xs={12}>
          <Box className={classes.root} >

            {/* <LogoImage src={questLogo} alt='Quest Logo' /> */}
            <LogoImage
              src={questLogo}
              alt='Quest Logo'
            // onMouseOver={e => (e.currentTarget.src = questHoverLogo)} 
            // onMouseOut={e => (e.currentTarget.src = questLogo)} 
            />

            <div className={classes.tabDivStyle}>
              <StyledTabs
                centered
                variant='standard'
                value={value}
                onChange={handleChangeTab}
              >
                <StyledTab
                  disableRipple
                  className={classes.tabStyle}
                  icon={<LoginLogo src={value == 0 ? signUpActiveLogo : signUpLogo} />}
                  label={
                    <>
                      <span style={{ color: value == 0 ? '#BA8E4D' : '#2B2D31' }}>Sign Up</span>
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
                  disableRipple
                  className={classes.tabStyle}
                  icon={<LoginLogo src={value == 1 ? signInActiveLogo : signInLogo} />}
                  label={
                    <>
                      <span style={{ color: value == 1 ? '#BA8E4D' : '#2B2D31' }}>Sign In</span>
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
                validationSchema={Yup.object().shape({

                  userName: Yup.string().required('UserName is required'),
                  email: Yup.string()
                    .nullable()
                    .min(3, 'Email Not Long Enough')
                    .max(100)
                    .email('Invalid Email')
                    .matches(
                      // eslint-disable-next-line no-useless-escape
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      'Must be a Valid Email'
                    ).required('Email is required'),
                  otp: Yup.number()
                    .min(99999, 'OTP is not long enough')
                    .max(999999, 'OTP is of 6 digits')
                    .required('OTP is required')
                    .equals([actualOtp], 'Pls enter correct OTP'),
                  walletAddress: Yup.string().required('Wallet Address is required'),

                })}
                onSubmit={(values, { setSubmitting }) => {
                  handleSubmit(values)
                  setSubmitting(false)
                }}
              >
                {({ values, handleChange, handleBlur, isValid, dirty, isSubmitting, isValidating, errors, touched }: any) => (
                  <Form style={{ width: '100%' }}>
                    <Box className={classes.boxStyle}>
                      <div className={classes.fieldStyle}>
                        <CustomLabel>
                          Username &nbsp;
                          <CustomTooltip title="Enter username" arrow>
                            <InfoIcon src={infoIcon} alt='Info' />
                          </CustomTooltip>
                        </CustomLabel>
                        <CustomInput type="text" name="userName" value={values.userName} onChange={handleChange} onBlur={handleBlur} fullWidth />
                        {/* {  touched.userName ? (<span>hello</span>): null } */}
                        <ErrorMessage component="div" className={classes.err} name="userName" />
                      </div>
                      <div className={classes.fieldStyle}>
                        <CustomLabel>
                          Email Address &nbsp;
                          <CustomTooltip title="Enter Email" arrow>
                            <InfoIcon src={infoIcon} alt='Info' />
                          </CustomTooltip>
                        </CustomLabel>
                        <InpBtnWrapper>
                          <CustomInput type="text" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} fullWidth />
                          <IcoButton
                            style={{ display: otpServiceData ? 'none' : '' }}
                            disabled={(Yup.string().email().isValidSync(values.email) ? false : true) ||
                              (Yup.string().required().isValidSync(values.userName) ? false : true)}
                            onClick={handleOTPClick}><InpBtn src={rightArrow} />
                          </IcoButton>
                        </InpBtnWrapper>
                        <ErrorMessage component="div" className={classes.err} name="email" />
                      </div>
                      <div className={classes.fieldStyle}>
                        <CustomLabel>
                          OTP &nbsp;
                          <CustomTooltip title="Enter OTP" arrow>
                            <InfoIcon src={infoIcon} alt='Info' />
                          </CustomTooltip>
                        </CustomLabel>
                        <InpBtnWrapper>
                          <CustomInput
                            type="number"
                            name="otp"
                            disabled={!otpServiceData}
                            value={values.otp} onChange={handleChange} onBlur={handleBlur} fullWidth />
                        </InpBtnWrapper>
                        <ErrorMessage component="div" className={classes.err} name="otp" />
                      </div>
                      <div className={classes.fieldStyle}>
                        <CustomLabel>
                          Wallet Address &nbsp;
                          <CustomTooltip title="Enter Wallet Address" arrow>
                            <InfoIcon src={infoIcon} alt='Info' />
                          </CustomTooltip>
                        </CustomLabel>
                        <InpBtnWrapper>
                          <CustomInput
                            type="text"
                            name="walletAddress"
                            disabled={!values.walletAddress}
                            value={values.walletAddress} onChange={handleChange} onBlur={handleBlur} fullWidth />
                          <IcoButton
                            style={{ display: values.walletAddress ? 'none' : '' }}
                            disabled={(Yup.string().email().isValidSync(values.email) ? false : true) ||
                              (Yup.string().required().isValidSync(values.userName) ? false : true)}
                            onClick={handleWalletClick}><InpBtn src={wallet} /></IcoButton>
                        </InpBtnWrapper>
                        <ErrorMessage component="div" className={classes.err} name="walletAddress" />
                      </div>
                      <div className={classes.signUpBtndiv}>
                        <CustomButton type="submit" disabled={!(isValid)}>
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

        <Grid item md={4} sm={12} xs={12}>
          <div className={classes.cryptoTransImageDiv}>
            <img
              src={cryptoImage}
              className={classes.cryptoTransImage}
              onMouseOver={e => (e.currentTarget.src = cryptoHoverImage)}
              onMouseOut={e => (e.currentTarget.src = cryptoImage)}
            />
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
            {/* <img src={mailIcon} alt='Mail Icon' /> */}
            <img src={mailIcon2} alt='Mail Icon' />
          </div>
          {/* <OTPInputField type='text' /> */}
          {/* <OtpInput
            value={otp}
            onChange={handleChangeOTP}
            numInputs={4}
            separator={<span>&nbsp;&nbsp;</span>}
            inputStyle={classes.otpStyle}
          /> */}
          <div className={classes.OTPModalText}>
            Please check <span style={{ background: 'rgba(25, 163, 179, 0.1)' }}>{emailData}</span> for OTP CODE
            </div>
        </div>
      </CustomModal>

      {/* Wallet Modal */}
      <CustomModal show={showWalletModal} toggleModal={handleWalletClose}>
        <div className={classes.walletModalDiv} style={{ height: loadingWallet ? '135px' : '420px' }}>
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

export default withRouter(connect(mapStateToProps, { loginStart, errorAlert, warningAlert })(SignUp))
