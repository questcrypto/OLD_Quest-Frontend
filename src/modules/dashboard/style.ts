import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { fade, makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import { withStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
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
  addPropertyBtnStyle: {
    width: '100% !important',
    height: '36px',
    color: `${colors.white} !important`,
    backgroundColor: `${colors.primary} !important`,
    fontSize: '12px',
    padding: '10px 5px',
    '&:hover': {
      backgroundColor: `${colors.primary} !important`,
    },
  },
}))

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
export const ProgressText = styled.p`
  margin: 0;
  color: #302e35;
`
export const TabTitle = styled.p<any>`
  margin: 0;
  font-size: 16px;
  opacity: ${(props: any) => (props.active ? 1 : 0.87)};
  color: ${(props: any) => (props.active ? colors.primary : colors.textPrimary)};
  cursor: pointer;
  text-align: center;
  border-bottom: ${(props: any) => (props.active ? `1px solid ${colors.primary}` : 'none')};
  padding-bottom: 20px;
  &:hover {
    color: ${colors.primary};
  }
`
