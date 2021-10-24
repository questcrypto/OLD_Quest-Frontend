import React from 'react'
import { Field } from 'formik'
import TextField from '@material-ui/core/TextField'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { colors } from 'shared/styles/theme'

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
  type?: string
  isDisabled?: boolean
  handleBlur?: any
}

const CustomTextField = (props: Props) => {
  const { name, label, type, isDisabled, handleBlur } = props
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
            onBlur={handleBlur}
            type={!!type ? type : 'text'}
            className={classes.root}
            disabled={isDisabled}
          />
        )
      }}
    </Field>
  )
}
export default CustomTextField
