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
    },
  })
)

const useStyles = makeStyles(theme => ({
  customTooltip: {
    backgroundColor: '#fff',
    border:'1px solid #222',
    color:'#222',
    position:'absolute',
    bottom:'50px',
    left:'-30px',
    minWidth:'100px'
  },
  customArrow: {
    fontSize: 20,
    color: "#222",
    position:'absolute',
    bottom:'-15px !important',
    left:'55px !important',
    top:'unset !important',
    transform: 'rotate(180deg) !important',
  },
}));

interface Props {
  name: string
  label?: string
  type?: string
  isDisabled?: boolean
  handleBlur?: any
  showTooltip?: boolean
  toolTipText?: string
}

const CustomTextField = (props: Props) => {
  const { name, label, type, isDisabled, handleBlur } = props
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
            {props?.showTooltip && (
              <Tooltip arrow title="For more details please visit website"  classes={{
                tooltip: styles.customTooltip,
                arrow: styles.customArrow
              }}>
                  <IconButton className='infoIcon'>
                    <Icon />
                  </IconButton>
              </Tooltip>
            )}
          </TextWrappper>
        )
      }}
    </Field>
  )
}
export default CustomTextField
