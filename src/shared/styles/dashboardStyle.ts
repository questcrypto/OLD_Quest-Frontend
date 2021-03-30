import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { fade, makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import { createStyles, withStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) =>
  createStyles({
    headerStyle: {
      marginBottom: '50px',
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
    progressStyle: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      marginTop: '8px',
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
  font-family: RobotoBold;
`
export const ProgressText = styled.p`
  margin: 0;
  color: #302e35;
  font-family: RobotoRegular;
`
