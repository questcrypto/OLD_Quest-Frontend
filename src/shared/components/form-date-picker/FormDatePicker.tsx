import React, { useState } from 'react'
import { Field } from 'formik'
import TextField from '@material-ui/core/TextField'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { colors } from 'shared/styles/theme'
import DateFnsUtils from '@date-io/date-fns'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

const textFieldStyle = makeStyles(() =>
  createStyles({
    root: {
      marginBottom: '20px',
      lineHeight: '26px',
      color: '#1E3444',
      width: '100%',
      backgroundColor: colors.white,
    },
  })
)

interface Props {
  name: string
  label?: string
  type?: string
}

const FormDatePicker = (props: Props) => {
  const { name, label, type } = props
  const classes = textFieldStyle()

  // const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date('2014-08-18T21:11:54'))

  // const handleChange = (date: Date | null) => {
  //   setSelectedDate(date)
  // }
  return (
    <Field name={name}>
      {({ field, form }: any) => {
        // const handleChange = (event: any) => {
        //   const fieldVal: any = event.target.value
        //   form.setFieldValue(field.name, fieldVal)
        // }
        const handleChange = (date: Date | null) => {
          const fieldVal: any = date
          form.setFieldValue(field.name, fieldVal)
        }

        return (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              inputVariant="outlined"
              className={classes.root}
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-dialog"
              label="Year Built"
              value={field.value ? field.value : null}
              onChange={() => handleChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              placeholder="dd/mm/yyyy"
            />
          </MuiPickersUtilsProvider>
        )
      }}
    </Field>
  )
}
export default FormDatePicker
