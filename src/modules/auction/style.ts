import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { fade, createStyles, makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import { withStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: { marginTop: '10px' },
    headerStyle: {
      marginBottom: '40px',
    },
    tabStyle: {
      marginBottom: '20px',
    },
    search: {
      position: 'relative',
      borderRadius: '2px',
      backgroundColor: '#F5F5F5',
      '&:hover': {
        backgroundColor: fade(colors.white, 0.75),
      },
      margin: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 'auto',
      },
      border: '1px solid #E0E0E0',
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: colors.textPrimary,
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  })
)

export const StyledLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#949DA4',
  },
  barColorPrimary: {
    backgroundColor: '#1E3444',
  },
})(LinearProgress)

export const HeaderTitle = styled.h3`
  margin: 0;
`
