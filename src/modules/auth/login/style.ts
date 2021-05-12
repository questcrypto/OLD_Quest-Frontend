import styled from 'styled-components'
import { makeStyles, withStyles, Theme, createStyles, fade } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';

export const useStyle = makeStyles(() =>
  createStyles({
    boxStyle: {
      width: '400px',
      maxWidth: '400px',
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
      fontFamily: 'NexaRegular'
    },
    signUpBtndiv: {
      paddingTop: '16px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
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
      justifyContent: 'flex-end',
      width: '100%'
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
  })
)

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
      fontFamily: 'NexaRegular',
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
  font-family: NexaBold;
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

export const CustomLabel = styled(InputLabel)`
  font-family: NexaRegular;
`;

