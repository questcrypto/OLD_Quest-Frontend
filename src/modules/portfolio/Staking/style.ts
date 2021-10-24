import { makeStyles, withStyles, Theme, Tooltip } from '@material-ui/core'
import styled from 'styled-components'

export const useStyles = makeStyles((theme) => ({
  hoverBtnDiv: {
    top: '0%',
    left: '0%',
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    // background: '#858585',
    // background: 'rgba(133, 133, 133, 0.85)',
    color: '#FFFFFF',
    '&:hover': {
      background: 'rgba(133, 133, 133, 0.85)',
      transition: 'background 1s linear'
    }
  },
  hoverBtnTxt: {
    // color: '#FFFFFF'
    position: 'relative',
    left: '1.5%',
  },
  relativeDiv: {
    position: 'relative',
    // paddingBottom: theme.spacing(4)
  },
  root: {
    padding: theme.spacing(2),
  },
  mainDiv: {
    padding: theme.spacing(2),
  },
  rowDiv: {
    border: '1px solid #E4E4E4',
    padding: theme.spacing(2),
    height: '150px',
  },
  outerDiv: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  accordionHeadRoot: {
    marginTop: '28px',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    boxShadow: 'none',
    '&:before': {
      backgroundColor: '#FFFFFF',
    },
  },
  flexStart: {
    alignItems: 'flex-start !important',
  }
}))

export const CustomTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#878787',
    fontFamily: 'NexaRegular',
    color: '#FFF'
  },
  arrow: {
    color: '#C4C4C4',
  },
}))(Tooltip)

export const FlexDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-basis: 100%;
`

export const Headers = styled.div`
  /* width: 100%; */
  display: flex;
  justify-content: space-between;
  padding-top: 24px;
  padding-left: 32px;
  padding-right: 32px;
`

export const FlexItem = styled.div`
  width: '100%';
  /* flex-grow: 1; */
  flex-basis: '100%';
`

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
`

export const Heading = styled.div`
  color: #6f7583;
`

export const Value = styled.div`
  color: #1c2d1e;
`

export const AccordHeading = styled.div`
  font-size: 14px;
  color: #000000;
`

export const AccordValue = styled.div`
  font-size: 12px;
  color: #858585;
`

export const AccordArrIcon = styled.img`
  max-height: 12px;
`
