import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { fade, makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Grid, withStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: ' grey',
  },
  inputRoot: {
    color: 'inherit',
    border: '1px solid #E0E0E0',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px) !important`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '17ch',
      '&:focus': {
        width: '17ch',
      },
    },
  },
  progressStyle: {
    display: 'flex',
    alignItems: 'right',
    width: '300px',
    marginTop: '40px',
    marginRight:'20px',
  },
  confirmationsBtnStyle: {
    color: `${colors.white} !important`,
    backgroundColor: `${colors.primary} !important`,
    fontSize: '14px',
    textTransform: 'uppercase',
    padding: '6.1px !important',
    '&:hover': {
      backgroundColor: `${colors.primary} !important`,
    },
  },
  btnGroup: { display: 'flex', alignItems: 'center', marginTop: '5px' },
  btn1Style: {
    color: colors.textPrimary,
    fontSize: '14px',
    backgroundColor: '#E0E0E0',
    width: '120px',
    maxWidth: '120px',
    marginLeft: '20px',
  },
  btn2Style: {
    color: colors.white,
    backgroundColor: colors.primary,
    fontSize: '13px',
    '&:hover': {
      backgroundColor: colors.primary,
    },
    width: '150px',
    maxWidth: '150px',
    marginLeft: '20px',
  },
  tabStyle: {
    marginBottom: '20px',
  },
}))

export const StyledLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#E5E5E5',
  },
  barColorPrimary: {
    backgroundColor: '#1E3444',
  },
})(LinearProgress)

export const AuctionsContainer = styled.div``

export const StyledGrid = styled<any>(Grid)`
    flex-direction: column;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;
    @media (min-width: 600px) {
      flex-direction: row;
      grid-template-rows: 1fr;
      grid-template-columns: 1fr 1fr;
    },
`
export const PropertyHeader = styled.div`
  margin-bottom: 50px;
`
export const HeaderTitle = styled.h3`
  margin: 0;
`
export const ProgressText = styled.p`
  margin: 0;
  color: #302e35;
`
export const PropertyTabCont = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(5, 1fr);
  margin-bottom: 20px;
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
export const PropertySearchBox = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
`

export const BidContainer = styled.div`
  display: flex;
  marginleft: '20px';
`
export const BidInfo = styled.div`
  display: flex;
  align-items: center;
  marginLeft: '50px';
  alignItems: 'right',
    marginTop: '40px',
    marginRight:'20px',
`