import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { withStyles } from '@material-ui/core/styles'
import { LinearProgress, Slider } from '@material-ui/core'

export const SliderWrap = styled.div`
  background: rgba(245, 245, 245, 0.15);
  border: 1px solid rgba(48, 46, 53, 0.15);
  padding: 5px 12px;
  box-sizing: border-box;
  border-radius: 5px;
  box-sizing: border-box;
  margin-left: 30px;
  margin-right: 30px;
`
export const StyledSlider = withStyles({
  root: {
    color: colors.gold,
    height: 2,
    width: '100%',
    marginTop: '12px',
  },
  thumb: {
    height: 20,
    width: 20,
    top: '35%',
    backgroundColor: '#E1B56',
    border: '2px solid #E1B56',
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
