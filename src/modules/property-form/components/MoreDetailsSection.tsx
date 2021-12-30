import React from 'react'
import { FormTitle, FormTitleNumber, useStyle } from '../style'
import { Divider, Grid } from '@material-ui/core'
import IntegerNumberField from 'shared/components/Integer-number-field'
import { ErrorMessage } from 'formik'
import { err } from 'shared/styles/styled'
import CustomTextField from 'shared/components/custom-text-field'
import FieldSelect from 'shared/components/field-select'
import { DeckFeature, Landscaping, PatioValue, StyleFeature } from 'shared/helpers/dataConstant'
import MultipleSelect from 'shared/components/multipleselect/MultipleSelect'

const MoreDetailsSection = () => {
  const classes = useStyle()

  return (
    <>
      <Grid item xs={2} className={classes.titleNumberStyle}>
        <FormTitleNumber>10</FormTitleNumber>
      </Grid>
      <Grid item xs={10} container direction="column">
        <Grid item className={classes.formGroup}>
          <FormTitle>More Details</FormTitle>
          <MultipleSelect label="Style" name="Style" options={StyleFeature} showTooltip = {true}/>
          <ErrorMessage component={err} name="Style" />
          <MultipleSelect label="Deck" name="Deck" options={DeckFeature} showTooltip = {true}/>
          <ErrorMessage component={err} name="Deck" />
          <MultipleSelect label="Patio" name="Patio" options={PatioValue} showTooltip = {true}/>
          <ErrorMessage component={err} name="Patio" />
          <CustomTextField label="Garage" name="Garage" showTooltip = {true}/>
          <ErrorMessage component={err} name="Garage" />
          <FieldSelect label="Carpot" name="Carpot" options={Landscaping} showTooltip = {true}/>
          <ErrorMessage component={err} name="Carpot" />
          <IntegerNumberField label="Parking Space" name="ParkingSpace" />
          <ErrorMessage component={err} name="ParkingSpace" />
          <IntegerNumberField label="Fin Bsmt" name="FinBasmt" />
          <ErrorMessage component={err} name="FinBasmt" />
          <CustomTextField label="Basement" name="Basement" showTooltip = {true}/>
          <ErrorMessage component={err} name="Basement" />
          <FieldSelect label="Driveway" name="Driveway" options={Landscaping} showTooltip = {true}/>
          <ErrorMessage component={err} name="Driveway" />
          <CustomTextField label="Water" name="Water" showTooltip = {true}/>
          <ErrorMessage component={err} name="Water" />
          <CustomTextField label="Water Shares" name="WaterShare" showTooltip = {true}/>
          <ErrorMessage component={err} name="WaterShare" />
          <CustomTextField label="Spa" name="Spa" showTooltip = {true} />
          <ErrorMessage component={err} name="Spa" />
        </Grid>
        <Divider className={classes.dividerStyle} />
      </Grid>
    </>
  )
}

export default MoreDetailsSection
