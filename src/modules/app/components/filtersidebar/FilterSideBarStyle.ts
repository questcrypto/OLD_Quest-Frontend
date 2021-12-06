import { createStyles, makeStyles } from '@material-ui/core/styles'
import { FlexRow } from 'modules/portfolio/Staking/style'
import { callbackify } from 'util'

export const useStyles = makeStyles(() =>
  createStyles({
    sideBarWrapper: {
      width: '292px',
      position: 'fixed',
      right: '0',
      bottom: '0',
      height: 'calc(100vh - 61px)',
      background: '#fff',
      boxSizing: 'border-box',
      boxShadow: '-1px 4px 4px rgb(0 0 0 / 25%)',
      zIndex: 1,
      overflowY: 'auto',
      paddingBottom: '50px',
    },
    sideBarCloseIcon: {
      padding: '20px 25px',
      
    },
    sideBarItem: {
      color: 'red',
    },
    sideBarcontact: {
      padding: '20px',
    },
    sideBarHeader: {
      padding: '11px 20px',
      borderTop: '1px solid #DCDADA',
      borderBottom: '1px solid #DCDADA',
      fontSize: '14px',
      color: '#000000',
      fontWeight: 600,
      display: 'flex',
      justifyContent: 'space-between',
    },

    CheckboxRow: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    CheckboxButton: {
      background: '#E0E0E0',
      padding: '9px 11px',
      margin: '5px 0px',
      fontSize: '16px',
      borderRadius: '5px',
      width: 'calc(50% - 32px)',
      textAlign: 'center',
      color: 'rgb(48 46 53 / 60%)',
      cursor: 'pointer',
    },
    applyButtonRow: {
      padding: '0 19px',
      textAlign: 'right',
    },
    applyButton: {
      width: '27%',
      display: 'inline-block',
      background: '#E0E0E0',
      padding: '9px 20px',
      fontSize: '16px',
      borderRadius: '5px',
      textAlign: 'center',
      color: 'rgb(48 46 53 / 60%)',
      cursor:'pointer'
    },
    CheckboxactiveButton: {
      background: '#EFA937',
      padding: '9px 11px',
      margin: '5px 0px',
      fontSize: '16px',
      borderRadius: '5px',
      width: 'calc(50% - 32px)',
      textAlign: 'center',
      color: 'rgb(48 46 53 / 60%)',
      cursor: 'pointer',
    },
    inputRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    inputItem: {
      width: '100%',
      padding: '8px 11px',
      boxSizing: 'border-box',
      borderRadius: '5px',
      border: '1px solid #BDBDBD',
      color: '#828282',
    },
    inputBox: {
      flex: '1',
    },
    toSpan: {
      flexBasis: '64px',
      textAlign: 'center',
      color: '#302E35',
    },
    svg: {
      cursor: 'pointer',
    },
  })
)
