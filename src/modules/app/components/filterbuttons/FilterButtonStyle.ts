import { createStyles, makeStyles } from '@material-ui/core/styles'


export const useStyles = makeStyles(() =>
  createStyles({
    buttonRow: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    CheckboxButton: {
      background: '#DCDADA',
      padding: '9px 11px',
      margin: '5px 0px',
      fontSize: '16px',
      borderRadius: '5px',
      textAlign: 'center',
      color: 'rgb(48 46 53 / 60%)',
      cursor: 'pointer',
      display: 'flex',
      alignItems:"center",
      alignContent: 'center',
      border: '1px solid #BDBDBD',
      marginRight: '10px',
    },
    CloseIcon: {
      marginLeft: '15px',
    }
  })
)
