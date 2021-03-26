import Button from '@material-ui/core/Button'
import { colors } from 'shared/styles/theme'
import { withStyles } from '@material-ui/core/styles'

export const PrimaryButton = withStyles({
  root: {
    backgroundColor: colors.primary,
    color: colors.white,
    fontFamily: 'RobotoBold',
    fontSize: '12px',
    variant: 'contained',
    '&:hover': {
      backgroundColor: colors.primary,
    },
    outline: 'none',
    border: 0,
    borderRadius: '4px',
    '&:disabled': {
      color: colors.white,
    },
  },
})(Button)

export const SecondaryButton = withStyles({
  root: {
    backgroundColor: colors.lightGray,
    color: colors.textPrimary,
    fontFamily: 'RobotoBold',
    fontSize: '12px',
    '&:hover': {
      backgroundColor: colors.lightGray,
    },
    outline: 'none',
    border: 0,
    borderRadius: '4px',
  },
})(Button)
