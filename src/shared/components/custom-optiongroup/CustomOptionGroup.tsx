import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
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

const CustomOptionGroup = (props: any, children: any) => {
  const styles = useStyles()
  const { options, name, label } = props

  return (
    <>
      <Field name={name}>
        {({ field, form }: any) => {
          const handleChange = (event: any) => {
            const fieldVal: any = event.target.value
            form.setFieldValue(field.name, fieldVal)
          }
          return (
            <FormControl className="options-select">
              <InputLabel htmlFor="grouped-native-select " className="groupselect">
                {label}
              </InputLabel>
              <Select native defaultValue="" id="grouped-native-select" className="groupselect-options" onChange={handleChange}>
                <option aria-label="None" value="" />
                {options?.map((option: any) => (
                  <optgroup label={option.label}>
                    {option?.suboptions?.map((suboption: any, index: number) => (
                      <option value={suboption}>{suboption}</option>
                    ))}
                  </optgroup>
                ))}
              </Select>
              {!props?.showTooltip && (
               
                  <IconButton className="infoIcon">
                    <span className="tooltiptext">For more details please visit<a href="https://metamask.zendesk.com/hc/en-us/articles/360015488791-How-to-View-Account-Details">Website</a></span>
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

export default CustomOptionGroup
