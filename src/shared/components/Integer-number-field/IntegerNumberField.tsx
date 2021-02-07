import React from 'react'
import { Field } from 'formik'
import { integerNumberRegex } from 'shared/helpers/regexConstants'
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
  maxLength?: number
}

const IntegerNumberField = (props: Props) => {
  const classes = textFieldStyle()
  const { name, label, maxLength } = props

  const handleNumberInput = (e: any, form: any, field: any) => {
    const { value } = e.target
    if (integerNumberRegex.test(value.toString())) {
      if (!!maxLength && maxLength > 0) {
        if (value.length <= maxLength) {
          form.setFieldValue(field.name, value)
        }
      } else {
        form.setFieldValue(field.name, value)
      }
    }
    if (!value) {
      form.setFieldValue(field.name, '')
    }
  }

  return (
    <Field name={name}>
      {({ field, form }: any) => {
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
            onChange={(e: any) => {
              handleNumberInput(e, form, field)
            }}
            type="text"
            className={classes.root}
          />
        )
      }}
    </Field>
  )
}
export default IntegerNumberField
