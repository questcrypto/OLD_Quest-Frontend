import { Card, makeStyles } from '@material-ui/core'
import { colors } from 'shared/styles/theme'
import styled from 'styled-components'

export const useStyles = makeStyles({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto',
    gridRowGap: '30px',
    '@media (min-width: 1280px)': {
      gridTemplateColumns: '1fr 1fr 1fr !important',
      gridColumnGap: '30px',
    },
    '@media (min-width: 800px)': {
      gridTemplateColumns: '1fr 1fr',
      gridColumnGap: '30px',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
  },
  infoWrap: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 0 4px 13px',
    alignItems: 'start',
  },
  actions: {
    // padding: '16px 37.5px',
    display: 'flex',
    // justifyContent: 'flex-end',
    padding: '16px 12px',
    justifyContent: 'space-between'
  },
  photo: {
    width: '100%',
    height: '215px',
  },
  title: {
    fontSize: '16px',
    lineHeight: '19px',
    color: colors.textPrimary,
    fontFamily: 'RobotoBold',
  },
  info: {
    fontSize: '10px',
    lineHeight: '16px',
    textTransform: 'uppercase',
    color: colors.textPrimary,
    opacity: 0.87,
    fontFamily: 'RobotoRegular',
  },
  addPropertyBtnStyle: {
    height: '36px',
    // color: `${colors.white} !important`,
    // backgroundColor: `${colors.primary} !important`,
    fontSize: '12px',
    padding: '6px 16px',
    whiteSpace: 'nowrap',
    letterSpacing: '0.4px',
    textTransform: 'uppercase',
    fontFamily: 'RobotoBold',
    borderRadius: '2px',
    '&:hover': {
      // backgroundColor: `${colors.primary} !important`,
    },
  },
  photoWrap: {},
  btnContStyle: {
    marginBottom: '10px',
  },
  btnStyle: {
    fontSize: '12px !important',
    height: '31px',
  },
})

export const StyledCard = styled<any>(Card)`
  max-width: 342px;
  width: 100%;
  // margin-right: ${(props) => (!props.isLast ? '30px' : '')};
`

export const ImageWrap = styled.div<any>`
  max-width: 342px;
  height: 250px;
  img {
    width: 100%;
    height: 100%;
  }
`
