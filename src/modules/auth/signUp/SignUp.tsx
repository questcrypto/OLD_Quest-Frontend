import React, { useState } from 'react';
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
  OTPInputField
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
import mailIcon from 'assets/images/OTPMail.svg';
import closeIcon from 'assets/icons/closeIcon.svg';
import Wallet from './components';
import lynxIcon from 'assets/icons/lynxIcon.svg';
import loadingIcon from 'assets/icons/loading.svg';
import OtpInput from 'react-otp-input';

const SignUp = (props: any) => {

  const classes = useStyle()
  const [value, setValue] = useState(0);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [loadingWallet, setLoadingWallet] = useState(false);
  const [errorConnecting, setErrorConnecting] = useState(false);
  const [otp, setOtp] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleOTPClick = () => {
    try {
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
    } catch (error) { }
  }

  interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  }

  return (
    <>
      <Box className={classes.root}>

        <LogoImage src={questLogo} alt='Quest Logo' />

        <div className={classes.tabDivStyle}>
          <StyledTabs
            value={value}
            onChange={handleChange}
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
                </span>
                </>
              }
            />
          </StyledTabs>
        </div>

        {value == 0 &&
          <Box className={classes.boxStyle}>
            <div className={classes.fieldStyle}>
              <InputLabel>Username <InfoIcon src={infoIcon} alt='Info' /></InputLabel>
              <CustomInput type="text" fullWidth />
            </div>
            <div className={classes.fieldStyle}>
              <InputLabel>Email Address <InfoIcon src={infoIcon} alt='Info' /></InputLabel>
              <CustomInput type="text" fullWidth />
            </div>
            <div className={classes.fieldStyle}>
              <InputLabel>OTP <InfoIcon src={infoIcon} alt='Info' /></InputLabel>
              <InpBtnWrapper>
                <CustomInput type="text" fullWidth disabled /><IcoButton onClick={handleOTPClick}><InpBtn src={rightArrow} /></IcoButton>
              </InpBtnWrapper>
            </div>
            <div className={classes.fieldStyle}>
              <InputLabel>Wallet Address <InfoIcon src={infoIcon} alt='Info' /></InputLabel>
              <InpBtnWrapper>
                <CustomInput type="text" fullWidth disabled /><IcoButton onClick={handleWalletClick}><InpBtn src={wallet} /></IcoButton>
              </InpBtnWrapper>
            </div>
            <div className={classes.signUpBtndiv}>
              <CustomButton>GET STARTED</CustomButton>
            </div>
          </Box>
        }
        {value == 1 && <div>Sign In Tab</div>}

      </Box>

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
            Please check abc@abc.com for OTP CODE
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
                  <img src={lynxIcon} alt='Lynx' />
                </>
              ) : (
                <>
                  <span style={{ whiteSpace: 'nowrap' }}>Error Connecting</span>
                  <img src={lynxIcon} alt='Lynx' />
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