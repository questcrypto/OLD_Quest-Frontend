import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles'
import { LinearProgress, Slider } from '@material-ui/core'

export const SliderWrap = styled.div`
  background: rgba(245, 245, 245, 0.15);
  border: 1px solid rgba(48, 46, 53, 0.15);
  padding: 5px 12px;
  box-sizing: border-box;
  border-radius: 5px;
  margin: 24px 0;
  box-sizing: border-box;
  width: 80%;
`
export const StyledSlider = withStyles({
  root: {
    color: colors.lightYellow,
    height: 0.5,
    width: '80%',

    display: 'flex',
    padding: '30px',
  },
  thumb: {
    height: 20,
    width: 20,
    top: '35%',
    backgroundColor: '#1E3444',
    border: '2px solid currentColor',
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 1px)',
    background: 'transparent',
    '& *': {
      background: 'transparent',
      color: colors.primary,
      fontFamily: 'RobotoRegular',
      fontSize: '16px',
      lineHeight: '26px',
    },
    ':after': {
      content: '%',
    },
  },
  track: {
    height: 4,
    borderRadius: 2,
  },
  rail: {
    height: 4,
    borderRadius: 2,
  },
})(Slider)

export const StyledLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#949DA4',
  },
  barColorPrimary: {
    backgroundColor: '#EB5757',
  },
})(LinearProgress)
