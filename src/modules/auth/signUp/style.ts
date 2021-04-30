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
      // width: '400px',
      // maxWidth: '400px',
      width: '587px',
      maxWidth: '585px',
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
  /* width: 150px !important;
  height: 39px !important; */
  width: 300px !important;
  height: 78px !important;
`;

export const LoginLogo = styled.img`
  /* width: 55px !important;
  height: 55px !important; */
  width: 109px !important;
  height: 109px !important;
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