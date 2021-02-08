import React from 'react'
import { Field } from 'formik'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { colors } from 'shared/styles/theme'

const textFieldStyle = makeStyles({
  root: {
    marginBottom: '20px',
    lineHeight: '26px',
    color: '#1E3444',
    backgroundColor: colors.white,
  },
})

interface Props {
  name: string
  label?: string
  type?: string
}

const FormDatePicker = (props: Props) => {
  const { name, label, type } = props
  const classes = textFieldStyle()
  return (
    <Field name={name}>
      {({ field, form }: any) => {
        const handleChange = (event: any) => {
          const fieldVal: any = event.target.value
          form.setFieldValue(field.name, fieldVal)
        }
        return (
          <TextField
            variant="outlined"
            fullWidth
            id={name}
            label={label}
            name={name}
            value={field.value}
            autoComplete={name}
            autoFocus
            onChange={handleChange}
            type={!!type ? type : 'text'}
            className={classes.root}
          />
        )
      }}
    </Field>
  )
}
export default FormDatePicker
