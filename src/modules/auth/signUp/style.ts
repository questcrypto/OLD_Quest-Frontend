import styled from 'styled-components'
import { makeStyles, withStyles, Theme, createStyles, fade } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { colors, GlobalStyle } from 'shared/styles/theme'
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';

export const useStyle = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 auto',
      flexDirection: 'column',
    },
    tabDivStyle: {
      flexGrow: 1,
      padding: '2rem 0 1.5rem 0',
      fontFamily: 'NexaRegular'
    },
    tabStyle: {
      color: '#BA8E4D !important',
      fontSize: '16px',
      fontFamily: 'NexaRegular !important'
    },
    boxStyle: {
      width: '100%',
      // width: '400px',
      // maxWidth: '400px',
      // width: '587px',
      // maxWidth: '585px',
      padding: '20px',
      boxSizing: 'border-box',
      border: '1px solid #BDBDBD',
      borderRadius: '5px',
      fontFamily: 'NexaRegular'
    },
    fieldStyle: {
      paddingTop: '12px',
      paddingBottom: '4px',
      fontFamily: 'NexaRegular'
    },
    signUpBtndiv: {
      paddingTop: '32px',
      paddingBottom: '12px',
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
      flexDirection: 'column',
      fontFamily: 'NexaRegular'
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
      padding: '0px 16px',
      '& > img': {
        width: '110px'
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
      padding: '16px 32px',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'column',
      fontFamily: 'NexaRegular'
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
      // border: '1px solid #BDBDBD',
      borderRadius: '5px',
      padding: '8px',
      border: '1px solid #F5841F',
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
      justifyContent: 'flex-end',
      width: '100%',
      fontFamily: 'NexaRegular'
    },
    otpStyle: {
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderBottom: '1px solid #2B2D31',
      '&:focus-visible': {
        outline: 'none'
      }
    },
    err: {
      color: 'red',
      textAlign: 'left',
      fontFamily: 'NexaRegular'
    },
    cryptoTransImageDiv: {
      height: '100%',
      display: 'flex',
      alignItems: 'flex-end',
      position: 'relative',
      // right: '5%'
      paddingLeft: '48px'
    },
    cryptoTransImage: {
      width: '200px',
      height: '200px',
      // background: '#FFFFFF',
      // background: 'linear-gradient(45deg, #BA8E4D 30.82%, #D4A863 49.43%, #E6BA73 65.91%)',
      // opacity: '0.1'
    },
    tabText: {
      color: '#2B2D31',
      fontSize: '14px',
      opacity: 0.7,
      // padding: '0px 18px',
      lineHeight: '20px',
      paddingTop: '4px',
      paddingBottom: '12px'
    }
  })
)

interface StyledTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

export const StyledTabs = withStyles({
  root: {
    maxWidth: '485px',
    overflow: 'auto'
  },
  indicator: {
    // backgroundColor: '#BA8E4D',

    backgroundColor: 'transparent',
    // '& > span': {
    //   maxWidth: 40,
    //   width: '100%',
    //   backgroundColor: 'orange',
    // },
  },

})(Tabs);
// })((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />)

export const StyledTab = withStyles({
  root: {
    maxWidth: '245px',
    textTransform: 'initial'
  }
})(Tab);

export const CustomInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(1),
      },
    },
    input: {
      // borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '100%',
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      borderRadius: '5px',
      fontFamily: 'NexaRegular',
      '&:focus': {
        boxShadow: `${fade('#BA8E4D', 0.25)} 0 0 0 0.2rem`,
        borderColor: '#BA8E4D',
      },
      '&:hover': {
        border: '1px solid #19A3B3',
        boxShadow: '0px 4px 10px rgba(82, 167, 176, 0.1)',
      },
      '&:disabled': {
        backgroundColor: '#F5F5F5',
        border: '1px solid #ced4da',
      }
    },
  }),
)(InputBase);

export const CustomTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#1E3445',
    fontFamily: 'NexaRegular'
},
  arrow: {
  color: '#1E3445'
}
})) (Tooltip);

export const CustomButton = styled(Button)`
  background-color: #0D4459;
  color: #FFFFFF;
  box-shadow: 0px 3px 1px -2px rgba(224, 224, 224, 0.2), 0px 2px 2px rgba(224, 224, 224, 0.14), 0px 1px 5px rgba(224, 224, 224, 0.12);
  border-radius: 5px;
  padding: 6px 16px;
  font-family: NexaRegular;
  &:hover {
    background-color: #0D4459;
  }
`;

export const IcoButton = styled(Button)`
  background-color: #BA8E4D;
  border-radius: 5px;
  padding: 6px 0px;
  margin-left: 12px;
  min-width: 36px !important;
  font-family: NexaRegular;
  &:hover {
    background-color: #BA8E4D;
  };
  &:disabled {
    /* background-color: #F5F5F5; */
    opacity: 0.4;
  }
`;

export const LogoImage = styled.img`
  /* width: 150px !important; */
  /* height: 39px !important; */
  /* width: 300px !important;
  height: 78px !important; */
  width: 225px;
  height: 58px;
  &:hover {
    filter: drop-shadow(0.6rem 0.6rem 0.5rem rgba(186, 142, 77, 0.4));
  }
`;

export const LoginLogo = styled.img`
  /* width: 55px !important; */
  /* height: 55px !important; */
  /* width: 109px !important;
  height: 109px !important; */
  height: 78px;
  padding-bottom: 4px;
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
  font-family: NexaRegular;
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
  font-family: NexaRegular;
  &:focus-visible {
    outline: none;
  }
`;

export const Indicator = styled.span`
  border-top: 3px solid #BA8E4D;
  display: block;
  width: 50%;
  left: 25%;
  position: relative;
  top: 12px;
`;

export const CustomLabel = styled(InputLabel)`
  font-family: NexaRegular;
`;