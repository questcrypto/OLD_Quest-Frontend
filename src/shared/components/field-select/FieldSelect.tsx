import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Field } from 'formik'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import { colors } from 'shared/styles/theme'

interface Props {
  name: string
  label?: string
  options?: any
  isDisabled?: boolean
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginBottom: '20px',
      lineHeight: '26px',
      color: '#828282',
      backgroundColor: colors.white,
    },
  })
)

const FieldSelect = (props: Props) => {
  const classes = useStyles()
  const { name, label, options, isDisabled } = props

  return (
    <Field name={name}>
      {({ field, form }: any) => {
        const handleChange = (event: any) => {
          const fieldVal: any = event.target.value
          form.setFieldValue(field.name, fieldVal)
          console.log(form.values)
          console.log(fieldVal)
        }
        return (
          <TextField
            select
            variant="outlined"
            value={field.value}
            onChange={handleChange}
            inputProps={{ name, id: name }}
            fullWidth
            label={label}
            className={classes.root}
            disabled={isDisabled}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {options.map((item: any, k: any) => {
              return (
                <MenuItem key={k} value={item.value}>
                  {item.label}
                </MenuItem>
              )
            })}
          </TextField>
        )
      }}
    </Field>
  )
}
export default FieldSelect
