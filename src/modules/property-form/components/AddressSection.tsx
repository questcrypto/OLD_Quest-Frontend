import { Divider, Grid } from '@material-ui/core'
import { ErrorMessage } from 'formik'
import CustomTextField from 'shared/components/custom-text-field'
import { FormTitle, FormTitleNumber, useStyle } from '../style'
import { err } from 'shared/styles/styled'
import IntegerNumberField from 'shared/components/Integer-number-field'
import FieldSelect from 'shared/components/field-select'
import { CountryConstant, usaCountry } from 'shared/helpers/dataConstant'

const AddressSection = () => {
  const classes = useStyle()

  return (
    <>
      <Grid item xs={2} className={classes.titleNumberStyle}>
        <FormTitleNumber>3</FormTitleNumber>
      </Grid>
      <Grid item xs={10} container direction="column">
        <Grid item className={classes.formGroup}>
          <FormTitle>Address</FormTitle>
          <CustomTextField label="Address 1" name="Address1" showTooltip = {true} />
          <ErrorMessage component={err} name="Address1" />
          <CustomTextField label="Address 2" name="Address2" showTooltip = {true} />
          <ErrorMessage component={err} name="Address2" />
          <CustomTextField label="City" name="City" showTooltip = {true}/>
          <ErrorMessage component={err} name="City" />
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <FieldSelect label="State" name="State" options={usaCountry} showTooltip = {true}/>
              <ErrorMessage component={err} name="State" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <IntegerNumberField label="Postal code" name="PostalCode" />
              <ErrorMessage component={err} name="PostalCode" />
            </Grid>
          </Grid>

          <FieldSelect label="Country" name="Country" options={CountryConstant} showTooltip = {true}/>
          <ErrorMessage component={err} name="Country" />
          <CustomTextField label="Subdivision" name="Subdivision" showTooltip = {true}/>
          <CustomTextField label="Tax ID" name="TaxID"  link ="https://propertytax.utah.gov/"/>
          <CustomTextField label="School District" name="SchoolDistrict" link ="https://propertytax.utah.gov/"/>
          <ErrorMessage component={err} name="Subdivision" />
        </Grid>
        <Divider className={classes.dividerStyle} />
      </Grid>
    </>
  )
}

export default AddressSection
