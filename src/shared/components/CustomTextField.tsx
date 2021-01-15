import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const textFieldStyle = makeStyles({
  root: {
    marginBottom: '20px',
    lineHeight: '26px',
    color: '#828282',
  },
})

interface Props {
  name: string
  label: string
  required?: boolean
  type?: string
  handleChange: () => void
}

const CustomTextField = (props: Props) => {
  const { name, label, required, type, handleChange } = props
  const classes = textFieldStyle()
  return (
    <TextField
      variant="outlined"
      required={required && required}
      fullWidth
      id={name}
      label={label}
      name={name}
      autoComplete={name}
      autoFocus
      onChange={handleChange}
      type={!!type ? type : 'text'}
      className={classes.root}
    />
  )
}
export default CustomTextField
