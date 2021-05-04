import React, { useRef, useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import { Paper, Card, Input } from '@material-ui/core';
import {
  useStyle,
  LogoImage,
  LoginLogo,
  StyledTabs,
  CustomInput,
  CustomButton,
  InfoIcon,
  IcoButton,
  InpBtn,
  InpBtnWrapper,
  OTPInputField,
  Indicator
} from './style';
import questLogo from 'assets/images/questLoginLogo.png';
import signUpLogo from 'assets/images/signUp.png';
import signInLogo from 'assets/images/signIn.png';
import rightArrow from 'assets/images/rightArrow.svg';
import wallet from 'assets/images/wallet.svg';
import infoIcon from 'assets/images/info.svg';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TabPanel } from '@material-ui/lab';
import InputLabel from '@material-ui/core/InputLabel';
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

const SignUp = (props: any) => {

  const classes = useStyle()

  const ref = useRef<any>();

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

  const handleWalletSelect = (data: any, index: number) => {
    try {
      setLoadingWallet(true);
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
      }
    } catch (error) { }
  }

  const handleSubmit = (values: any) => {
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  }

  interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  }

  return (
    <>

      <Grid container>
        <Grid item xs={3}></Grid>

        <Grid item xs={6}>
          <Box className={classes.root}>

        <LogoImage src={questLogo} alt='Quest Logo' />

        <div className={classes.tabDivStyle}>
          <StyledTabs
            value={value}
            onChange={handleChangeTab}
          >
            <Tab
              className={classes.tabStyle}
              icon={<LoginLogo src={signUpLogo} />}
              label={
                <>
                  Sign Up <br />
                  <span
                    style={{ color: '#2B2D31', fontSize: '12px', opacity: 0.7, padding: '0px 18px' }}
                  >
                    Lorem ipsum dolor sit, amet consectetur adipisicing.
                    {value === 0? <Indicator />: ''} 
                </span>
                </>
              }
            />
            <Tab
              className={classes.tabStyle}
              icon={<LoginLogo src={signInLogo} />}
              label={
                <>
                  Sign In <br />
                  <span
                    style={{ color: '#2B2D31', fontSize: '12px', opacity: 0.7, padding: '0px 18px' }}
                  >
                    Lorem ipsum dolor sit, amet consectetur adipisicing.
                    {value === 1? <Indicator />: ''} 
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
              <Form>
                <Box className={classes.boxStyle}>
                  <div className={classes.fieldStyle}>
                    <InputLabel>Username <InfoIcon src={infoIcon} alt='Info' /></InputLabel>
                    <CustomInput type="text" name="userName" value={values.userName} onChange={handleChange} onBlur={handleBlur} fullWidth />
                    {/* {  touched.userName ? (<span>hello</span>): null } */}
                    <ErrorMessage component="div" className={classes.err} name="userName" />
                  </div>
                  <div className={classes.fieldStyle}>
                    <InputLabel>Email Address <InfoIcon src={infoIcon} alt='Info' /></InputLabel>
                    <CustomInput type="text" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} fullWidth />
                    <ErrorMessage component="div" className={classes.err} name="email" />
                  </div>
                  <div className={classes.fieldStyle}>
                    <InputLabel>OTP <InfoIcon src={infoIcon} alt='Info' /></InputLabel>
                    <InpBtnWrapper>
                      <CustomInput type="text" name="otp" disabled value={values.otp} onChange={handleChange} onBlur={handleBlur} fullWidth /><IcoButton onClick={handleOTPClick}><InpBtn src={rightArrow} /></IcoButton>
                    </InpBtnWrapper>
                    <ErrorMessage component="div" className={classes.err} name="otp" />
                  </div>
                  <div className={classes.fieldStyle}>
                    <InputLabel>Wallet Address <InfoIcon src={infoIcon} alt='Info' /></InputLabel>
                    <InpBtnWrapper>
                      <CustomInput type="text" name="walletAddress" disabled value={values.walletAddress} onChange={handleChange} onBlur={handleBlur} fullWidth /><IcoButton onClick={handleWalletClick}><InpBtn src={wallet} /></IcoButton>
                    </InpBtnWrapper>
                    <ErrorMessage component="div" className={classes.err} name="walletAddress" />
                  </div>
                  <div className={classes.signUpBtndiv}>
                    <CustomButton type="submit">GET STARTED</CustomButton>
                  </div>
                </Box>
              </Form>
            )}
          </Formik>

        }
        {value == 1 && <div>Sign In Tab</div>}

      </Box>
        </Grid>

        <Grid item xs={3}>
          <div className={classes.cryptoTransImageDiv}>
            <img src={cryptoImage} className={classes.cryptoTransImage} />
          </div>
        </Grid>
      </Grid>
      {/* Modals */}

      {/* OTP Modal */}
      <CustomModal show={showOTPModal} toggleModal={setShowOTPModal}>
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
            Please check <span style={{ background: 'rgba(25, 163, 179, 0.1)'}}>{emailData}</span> for OTP CODE
          </div>
        </div>
      </CustomModal>

      {/* Wallet Modal */}
      <CustomModal show={showWalletModal} toggleModal={setShowWalletModal}>
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
                  <span>Initializing</span>
                  <img src={metaMaskIcon} alt='Meta Mask' />
                </>
              ) : (
                <>
                  <span style={{ whiteSpace: 'nowrap' }}>Error Connecting</span>
                  <img src={metaMaskIcon} alt='Meta Mask' />
                  <div>
                    <button>Try Again</button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Wallet walletClick={() => handleWalletSelect} />
          )
          }

        </div>
      </CustomModal>

    </>
  );
}

export default SignUp;
