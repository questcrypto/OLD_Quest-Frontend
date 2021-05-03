import styled from 'styled-components'
import { makeStyles, withStyles, Theme, createStyles, fade } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { colors } from 'shared/styles/theme'
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

export const useStyle = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 auto',
      flexDirection: 'column'
    },
    tabDivStyle: {
      flexGrow: 1,
      padding: '2.5rem'
    },
    tabStyle: {
      color: '#BA8E4D !important',
    },
    boxStyle: {
      width: '400px',
      maxWidth: '400px',
      // width: '587px',
      // maxWidth: '585px',
      padding: '20px',
      boxSizing: 'border-box',
      border: '1px solid #BDBDBD',
      borderRadius: '5px'
    },
    fieldStyle: {
      paddingTop: '12px'
    },
    signUpBtndiv: {
      paddingTop: '16px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    OTPModalDiv: {
      // width: '506px',
      // height: '353px',
      width: '350px',
      height: '225px',
      background: '#FFFFFF',
      textAlign: 'center',
      borderRadius: '5px',
      padding: '16px',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'column'
    },
    OTPModalClose: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
      padding: '16px',
      cursor: 'pointer',
      '& > img': {
        width: '12px'
      }
    },
    OTPModalMail: {
      padding: '0px 16px 16px',
      '& > img': {
        width: '63px'
      }
    },
    OTPModalText: {
      padding: '16px'
    },
    walletModalDiv: {
      // width: '507px',
      // height: '635px',
      width: '350px',
      height: '350px',
      background: '#FFFFFF',
      textAlign: 'center',
      borderRadius: '5px',
      padding: '16px',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'column'
    },
    walletModalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      padding: '16px',
      '& > span': {
      },
      '& > img': {
        width: '12px',
        cursor: 'pointer',
      }
    },
    walletHeadText: {
      color: '#2B2D31',
      fontWeight: 'bold'
    },
    walletBack: {
      color: '#E27625',
      fontWeight: 'bold',
      cursor: 'pointer'
    },
    walletCont: {
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'flex-start',
      width: '100%',
      alignItems: 'center',
      border: '1px solid #BDBDBD',
      borderRadius: '5px',
      padding: '4px 8px',
      marginBottom: '12px',
      '&:hover': {
        border: '1px solid #F5841F'
      },
      '& > img': {
        width: '36px',
        height: '36px'
      },
      '& > span': {
        padding: '0px 8px'
      },
    },
    tryAgainDiv: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  })
)

interface StyledTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

export const StyledTabs = withStyles({
  indicator: {
    backgroundColor: '#BA8E4D',
    // backgroundColor: 'transparent',
    // '& > span': {
    //   maxWidth: 40,
    //   width: '100%',
    //   backgroundColor: 'orange',
    // },
  },
})(Tabs);
// })((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />)

export const CustomInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(1),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '100%',
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        boxShadow: `${fade('#BA8E4D', 0.25)} 0 0 0 0.2rem`,
        borderColor: '#BA8E4D',
      },
      '&:disabled': {
        backgroundColor: '#F5F5F5'
      }
    },
  }),
)(InputBase);

export const CustomButton = styled(Button)`
  background-color: #0D4459;
  color: #FFFFFF;
  box-shadow: 0px 3px 1px -2px rgba(224, 224, 224, 0.2), 0px 2px 2px rgba(224, 224, 224, 0.14), 0px 1px 5px rgba(224, 224, 224, 0.12);
  border-radius: 5px;
  padding: 6px 16px;
  &:hover {
    background-color:none
  }
`;

export const IcoButton = styled(Button)`
  background-color: #BA8E4D;
  border-radius: 5px;
  padding: 6px 0px;
  margin-left: 12px;
  min-width: 36px !important;
`;

export const LogoImage = styled.img`
  width: 150px !important;
  height: 39px !important;
  /* width: 300px !important;
  height: 78px !important; */
`;

export const LoginLogo = styled.img`
  width: 55px !important;
  height: 55px !important;
  /* width: 109px !important;
  height: 109px !important; */
`;

export const InfoIcon = styled.img`
  width: 12px;
`;

export const InpBtn = styled.img`
  width: 18px;
  height: 26px;
`;

export const InpBtnWrapper = styled.div`
  display: flex;
  padding-top: 6px;
`;

export const OTPInputField = styled.input`
  padding-left: 15px;
  letter-spacing: 42px;
  border: 0;
  background-image: linear-gradient(to left, black 70%, rgba(255, 255, 255, 0) 0%);
  background-position: bottom;
  background-size: 50px 1px;
  background-repeat: repeat-x;
  background-position-x: 35px;
  width: 170px;
  &:focus-visible {
    outline: none;
  }
`;