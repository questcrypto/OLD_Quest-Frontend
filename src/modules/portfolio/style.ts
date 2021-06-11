import {
  makeStyles,
} from '@material-ui/core';

import styled from 'styled-components';

export const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    // backgroundColor: '#E5E5E5'
    paddingTop: theme.spacing(7),
    paddingRight: theme.spacing(5),
  },
  header: {
    display: 'flex'
  },
  title: {
    color: '#302E35',
    fontWeight: 'bold'
  },
  btnDiv: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  portfolioDiv: {
    padding: theme.spacing(2)
  },
  portfolioDiv2: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2)
  },
  pfBtnDiv: {
    height: '100%',
    paddingTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-around'
  },
  pfBtnhelpText: {
    fontSize: '14px',
    opacity: '0.5'
  }
}))

