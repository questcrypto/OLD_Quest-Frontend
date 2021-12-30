import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@material-ui/core'
import React from 'react'
import { IconButton, makeStyles, Tooltip } from '@material-ui/core'
import Icon from '../chatIcon/infoIcon'
import { Field } from 'formik'

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

const MultipleSelectWithGrouping = (props: any) => {
  const styles = useStyles()
  const { options, name, label } = props
  const [fieldValue, setFeildValue] = React.useState<string[]>([])

  return (
    <>
      <Field name={name}>
        {({ field, form }: any) => {
          const handleChange = (event: any) => {
            const {
              target: { value },
            } = event
            setFeildValue(
              // On autofill we get a stringified value.
              typeof value === 'string' ? value.split(',') : value
            )
            form.setFieldValue(field.name, value)
          }
          return (
            <FormControl className="multiple-select">
              <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={fieldValue}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
              >
                {options?.map((option: any) => (
                  <MenuItem key={option.label} value={option.value} disabled={option.isParent}>
                    {option.label}
                  </MenuItem>
                ))}
                {/* {options?.map((option:any) => (
            <MenuItem key={option} value={option} >
             {option.label}
            </MenuItem>
          ))} */}
              </Select>
              {!props?.showTooltip && (
                <IconButton className="infoIcon">
                  <span className="tooltiptext">
                    For more details please visit<a href={props?.link} target='_blank'>Website</a>
                  </span>
                  <Icon />
                </IconButton>
              )}
            </FormControl>
          )
        }}
      </Field>
    </>
  )
}

export default MultipleSelectWithGrouping
