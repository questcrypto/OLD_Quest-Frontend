import React from 'react'
import { Field } from 'formik'
import { integerNumberRegex } from 'shared/helpers/regexConstants'
import TextField from '@material-ui/core/TextField'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { colors } from 'shared/styles/theme'
import { InputAdornment } from '@material-ui/core'
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
}

const IntegerNumberField = (props: Props) => {
  const classes = textFieldStyle()
  const { name, label, maxLength, handleBlur } = props

  const handleNumberInput = (e: any, form: any, field: any) => {
    const { value } = e.target

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

    console.log(form.values)
  }

  function NumberFormatCustom(props: any) {
    const { inputRef, onChange, ...other } = props

    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values: any) => {
          onChange({
            target: {
              //   name: props.name,
              value: values.value,
            },
          })
        }}
        thousandSeparator
        // isNumericString
        decimalScale={2}
        prefix="$ "
      />
    )
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
            // autoFocus
            onChange={(e: any) => {
              handleNumberInput(e, form, field)
            }}
            onBlur={handleBlur}
            type="text"
            className={classes.root}
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
          />
        )
      }}
    </Field>
  )
}
export default IntegerNumberField
