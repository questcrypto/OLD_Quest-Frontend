import React from 'react'
import TextField from '@material-ui/core/TextField'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { colors } from 'shared/styles/theme'

export const textFieldStyle = makeStyles(() =>
  createStyles({
    root: {
      color: colors.textPrimary,
      background: colors.paperBackground2,
      '& input': {
        padding: '12px 14px',
      },
    },
  })
)

interface Props {
  name: string
  label?: string
  value: any
  isDisabled?: boolean
  handleChange?: any
}

const TextInputField = (props: Props) => {
  const { name, label, value, isDisabled, handleChange } = props
  const classes = textFieldStyle()

  return (
    <TextField
      variant="outlined"
      fullWidth
      id={name}
      label={label}
      name={name}
      value={value}
      autoComplete={name}
      autoFocus
      onChange={handleChange}
      type="text"
      className={classes.root}
      disabled={isDisabled}
    />
  )
}
export default TextInputField
