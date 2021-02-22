import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { colors } from 'shared/styles/theme'

const textFieldStyle = makeStyles({
  root: {
    color: colors.textPrimary,
    background: colors.paperBackground2,
    '& input': {
      padding: '10px 14px',
    },
  },
})

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
