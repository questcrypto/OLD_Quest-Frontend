import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Field } from 'formik'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import { colors } from 'shared/styles/theme'
import { TextWrappper } from '../styles'
import Icon from '../chatIcon/Icon'
import { IconButton, Tooltip } from '@material-ui/core'
import Icons from '../chatIcon/infoIcon'

const useStyless = makeStyles(theme => ({
  customTooltip: {
    backgroundColor: '#ffffff',
    border:'1px solid #F1EDED',
    position:'absolute',
    bottom:'50px',
    left:'-100px',
    minWidth:'165px',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
    borderRadius: '5px',
    fontSize: '14px',
    lineHeight: '17px',
    color: '#8C8C8C',
    padding: '8px 15px',
  },
  customArrow: {
    fontSize: 20,
    color: "#ffffff",
    textShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
    position:'absolute',
    bottom:'-15px !important',
    left:'85px !important',
    top:'unset !important',
    transform: 'rotate(180deg) !important',
  },
}));

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

const FieldSelect = (props: any) => {
  const classes = useStyles()
  const styles= useStyless()
  const { name, label, options, isDisabled } = props

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
              {options?.map((item: any, k: any) => {
    
                return (
                  <MenuItem key={k} value={item.value}>
                    {item.label}
                  </MenuItem>
                )
              })}
            </TextField>
            {!props?.showTooltip && (
              <IconButton className="infoIcon">
              <span className="tooltiptext">
                For more details please visit<a href={props?.link} target='_blank'>Website</a>
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
export default FieldSelect
                 