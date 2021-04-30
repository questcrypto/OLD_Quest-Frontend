import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
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
  InpBtnWrapper
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


const SignUp = (props: any) => {

  const classes = useStyle()
  const [value, setValue] = useState(0);
  const [showImgModal, setShowImgModal] = useState(true);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

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
                <CustomInput type="text" fullWidth disabled /><IcoButton><InpBtn src={rightArrow} /></IcoButton>
              </InpBtnWrapper>
            </div>
            <div className={classes.fieldStyle}>
              <InputLabel>Wallet Address <InfoIcon src={infoIcon} alt='Info' /></InputLabel>
              <InpBtnWrapper>
                <CustomInput type="text" fullWidth disabled /><IcoButton><InpBtn src={wallet} /></IcoButton>
              </InpBtnWrapper>
            </div>
            <div className={classes.signUpBtndiv}>
              <CustomButton>GET STARTED</CustomButton>
            </div>
          </Box>
        }
        {value == 1 && <div>Sign In Tab</div>}

      </Box>

      <CustomModal show={showImgModal} toggleModal={setShowImgModal}>
        <div>Hello World</div>
      </CustomModal>
    </>
  );
}

export default SignUp;