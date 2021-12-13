import { Divider, Grid } from '@material-ui/core'
import { ErrorMessage } from 'formik'
import CustomTextField from 'shared/components/custom-text-field'
import { FormTitle, FormTitleNumber, useStyle } from '../style'
import { err } from 'shared/styles/styled'
import FieldSelect from 'shared/components/field-select'
import MoneyInputField from 'shared/components/money-input-field'
import FormDatePicker from 'shared/components/form-date-picker'
import moment from 'moment'
import { Landscaping, propertyType } from 'shared/helpers/dataConstant'

const PropertyInfoSection = () => {
  const classes = useStyle()

  return (
    <>
      <Grid item xs={2} className={classes.titleNumberStyle}>
        <FormTitleNumber>2</FormTitleNumber>
      </Grid>
      <Grid item xs={10} container direction="column">
        <Grid item className={classes.formGroup}>
          <FormTitle>Property info</FormTitle>
          <FieldSelect label="Type of property" name="PropertyType" options={propertyType} />
          <ErrorMessage component={err} name="PropertyType" />
          <CustomTextField label="Property name" name="PropertyName" />
          <ErrorMessage component={err} name="PropertyName" />
          <MoneyInputField label="Property current value" name="CurrentValue" acceptDecimals dollarPrefix />
          <ErrorMessage component={err} name="CurrentValue" />
          <CustomTextField label="Comments" name="Comments" />
          <ErrorMessage component={err} name="Comments" />
          <FormDatePicker label="Year built" name="YearBuilt" maxDate={moment(new Date()).format('YYYY-MM-DD')} />
          <ErrorMessage component={err} name="YearBuilt" />
          <CustomTextField label="Zoning" name="Zoning" />
          <ErrorMessage component={err} name="Zoning" />
          <FieldSelect label="Landscaping" name="Landscaping" options={Landscaping} />
          <ErrorMessage component={err} name="Landscaping" />
          <MoneyInputField label="Lot Facts" name="Lotfacts" acceptDecimals />
          <ErrorMessage component={err} name="Lotfacts" />
        </Grid>
        <Divider className={classes.dividerStyle} />
      </Grid>
    </>
  )
}

export default PropertyInfoSection
