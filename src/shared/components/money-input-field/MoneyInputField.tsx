import React from 'react'
import { Field } from 'formik'
import TextField from '@material-ui/core/TextField'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { colors } from 'shared/styles/theme'
import NumberFormat from 'react-number-format'
import { TextWrappper } from '../styles'
import Icon from '../chatIcon/Icon'
import { IconButton, Tooltip } from '@material-ui/core'
import Icons from '../chatIcon/infoIcon'

const useStyles = makeStyles((theme) => ({
  customTooltip: {
    backgroundColor: '#ffffff',
    border: '1px solid #F1EDED',
    position: 'absolute',
    bottom: '50px',
    left: '-100px',
    minWidth: '165px',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
    borderRadius: '5px',
    fontSize: '14px',
    lineHeight: '17px',
    color: '#8C8C8C',
    padding: '8px 15px',
  },
  customArrow: {
    fontSize: 20,
    color: '#ffffff',
    textShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
    position: 'absolute',
    bottom: '-15px !important',
    left: '85px !important',
    top: 'unset !important',
    transform: 'rotate(180deg) !important',
  },
}))

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
  link?: string
}

const IntegerNumberField = (props: any) => {
  const classes = textFieldStyle()
  const styles = useStyles()
  const { name, label, maxLength, handleBlur, acceptDecimals, dollarPrefix, link } = props

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
          <TextWrappper>
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
            {!props?.showTooltip && (
              <IconButton className="infoIcon">
                <span className="tooltiptext">
                  For more details please visit<a href={link} target='_blank'>Website</a>
                </span>
                <Icons />
              </IconButton>
            )}
          </TextWrappper>
        )
      }}
    </Field>
  )
}
export default IntegerNumberField
