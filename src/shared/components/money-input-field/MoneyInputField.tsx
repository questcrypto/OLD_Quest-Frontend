import React from 'react'
import { Field } from 'formik'
import TextField from '@material-ui/core/TextField'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { colors } from 'shared/styles/theme'
import NumberFormat from 'react-number-format'

const textFieldStyle = makeStyles(() =>
  createStyles({
    root: {
      marginBottom: '20px',
      lineHeight: '26px',
      color: '#1E3444',
      backgroundColor: colors.white,
    },
  })
)
interface Props {
  name: string
  label?: string
  maxLength?: number
  handleBlur?: any
  acceptDecimals?: boolean
  dollarPrefix?: boolean
}

const IntegerNumberField = (props: Props) => {
  const classes = textFieldStyle()
  const { name, label, maxLength, handleBlur, acceptDecimals, dollarPrefix } = props

  const handleNumberInput = (value: any, form: any, field: any) => {
    // const { value } = e.target

    if (!!maxLength && maxLength > 0) {
      if (value.length <= maxLength) {
        form.setFieldValue(field.name, value)
      }
    } else {
      form.setFieldValue(field.name, value)
    }

    if (!value) {
      form.setFieldValue(field.name, '')
    }
  }

  return (
    <Field name={name}>
      {({ field, form }: any) => {
        return (
          <NumberFormat
            thousandSeparator={true}
            customInput={TextField}
            prefix={dollarPrefix ? '$ ' : ''}
            decimalScale={acceptDecimals ? 2 : 0}
            inputmode="numeric"
            variant="outlined"
            fullWidth
            id={name}
            label={label}
            name={name}
            autoComplete={name}
            autoFocus
            onBlur={handleBlur}
            className={classes.root}
            value={field.value}
            onValueChange={(values: any) => {
              handleNumberInput(values.value, form, field)
            }}
          />
        )
      }}
    </Field>
  )
}
export default IntegerNumberField
