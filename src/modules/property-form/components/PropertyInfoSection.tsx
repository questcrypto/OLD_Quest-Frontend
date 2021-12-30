import { Divider, Grid } from '@material-ui/core'
import { ErrorMessage } from 'formik'
import CustomTextField from 'shared/components/custom-text-field'
import { FormTitle, FormTitleNumber, useStyle } from '../style'
import { err } from 'shared/styles/styled'
import FieldSelect from 'shared/components/field-select'
import MoneyInputField from 'shared/components/money-input-field'
import FormDatePicker from 'shared/components/form-date-picker'
import moment from 'moment'
import {zoning , lotFacts, propertyType, Landscaping } from 'shared/helpers/dataConstant'
import CustomOptionGroup from 'shared/components/custom-optiongroup/CustomOptionGroup'
import MultipleSelect from 'shared/components/multipleselect/MultipleSelect'
import { useEffect, useState } from 'react'

const PropertyInfoSection = () => {
  const classes = useStyle()
  const [years, setYears] = useState<any>([])
  useEffect(()=>{
    const y = [];
    for(let i = 1900; i <= new Date().getFullYear(); i++) {
      y.push({label : i.toString() , value:i.toString()});
    }
    setYears(y);
  },[])

  return (
    <>
      <Grid item xs={2} className={classes.titleNumberStyle}>
        <FormTitleNumber>2</FormTitleNumber>
      </Grid>
      <Grid item xs={10} container direction="column">
        <Grid item className={classes.formGroup}>
          <FormTitle>Property info</FormTitle>
          <CustomOptionGroup options={propertyType} label="Type of property"></CustomOptionGroup>
          <ErrorMessage component={err} name="PropertyType"/>
          <CustomTextField label="Property name" name="PropertyName" />
          <ErrorMessage component={err} name="PropertyName" />
          <MoneyInputField label="Property current value" name="CurrentValue" acceptDecimals dollarPrefix />
          <ErrorMessage component={err} name="CurrentValue" />
          <CustomTextField label="Comments" name="Comments" />
          <ErrorMessage component={err} name="Comments" />
          <FieldSelect label="Year built" name="YearBuilt" options={years} />
          <ErrorMessage component={err} name="YearBuilt" />
          <FieldSelect label="Zoning" name="Zoning" options={zoning}/>
          <ErrorMessage component={err} name="Zoning" />
          <MultipleSelect label="Landscaping" name="Landscaping" options={Landscaping} />
          <ErrorMessage component={err} name="Landscaping" />
          <FieldSelect label="Lot Facts" name="Lotfacts" options={lotFacts} />
          <ErrorMessage component={err} name="Lotfacts" />
        </Grid>
        <Divider className={classes.dividerStyle} />
      </Grid>
    </>
  )
}

export default PropertyInfoSection
