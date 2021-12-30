import React from 'react'
import { Field } from 'formik'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { colors } from 'shared/styles/theme'
import { TextWrappper } from '../styles'
import Icon from '../chatIcon/infoIcon'

const textFieldStyle = makeStyles(() =>
  createStyles({
    root: {
      marginBottom: '20px',
      lineHeight: '26px',
      color: '#1E3444',
      backgroundColor: colors.white,
      '& label': {
        transform: 'translate(20px, 20px) scale(1)',
      },
      '& input': {
        padding: '18.5px 20px',
      },
    },
  })
)

const useStyles = makeStyles((theme) => ({
  customTooltip: {
    backgroundColor: '#ffffff',
    border: '1px solid #F1EDED',
    position: 'absolute',
    bottom: '30px',
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

interface Props {
  name: string
  label?: string
  type?: string
  isDisabled?: boolean
  handleBlur?: any
  showTooltip?: boolean
  toolTipText?: string
  link?: string
}

const CustomTextField = (props: Props) => {
  const { name, label, type, isDisabled, handleBlur, link } = props
  const classes = textFieldStyle()
  const styles = useStyles()
  return (
    <Field name={name}>
      {({ field, form }: any) => {
        const handleChange = (event: any) => {
          const fieldVal: any = event.target.value
          form.setFieldValue(field.name, fieldVal)
        }
        return (
          <TextWrappper>
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
            {!props?.showTooltip && (
              <IconButton className="infoIcon">
                <span className="tooltiptext">
                  For more details please visit<a href={link}>Website</a>
                </span>
                <Icon />
              </IconButton>
            )}
          </TextWrappper>
        )
      }}
    </Field>
  )
}
export default CustomTextField
