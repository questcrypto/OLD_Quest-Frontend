import { makeStyles } from '@material-ui/core'

import styled from 'styled-components'

export const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex !important',
    // // width: '100%',
    // justifyContent: 'space-between',
    // flexWrap: 'wrap',
    // // alignItems: 'center',
    // backgroundColor: '#E5E5E5',
    // paddingTop: theme.spacing(7),
    // paddingRight: theme.spacing(5),
  },
  header: {
    margin: '30px 0 10px 0',
    // backgroundColor: 'orange',
    // width: 'fit-content',
    display: 'flex !important',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  title: {
    color: '#302E35',
    fontWeight: 'bold',
  },
  btnDiv: {
    // width: '100%',
    // display: 'flex',
    // justifyContent: 'flex-end',
    // flexWrap: 'wrap',
    // alignItems: 'center',
    // padding: '10px',
  },
  wrapper: {
    // width: '100%',
    // display: 'flex !important',
    // justifyContent: 'space-between',
    // flexWrap: 'wrap',
    // alignItems: 'center',
    // backgroundColor: 'teal',
  },
  portfolioDiv: {
    padding: theme.spacing(2),
  },
  portfolioDiv2: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
  },
  pfBtnDiv: {
    width: '100%',
    paddingTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  pfBtnhelpText: {
    fontSize: '14px',
    opacity: '0.5',
  },
}))
