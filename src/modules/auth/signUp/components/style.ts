import styled from 'styled-components'
import { makeStyles, withStyles, createStyles } from '@material-ui/core/styles';

export const useStyle = makeStyles(() =>
  createStyles({
    walletCont: {
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'flex-start',
      width: '100%',
      alignItems: 'center',
      border: '1px solid #BDBDBD',
      borderRadius: '5px',
      padding: '10px 8px',
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
    }
  })
);