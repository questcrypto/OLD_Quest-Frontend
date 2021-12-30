import React from 'react'
import { FormTitle, FormTitleNumber, useStyle } from '../style'
import { Divider, Grid } from '@material-ui/core'
import { ErrorMessage } from 'formik'
import { err } from 'shared/styles/styled'
import CustomTextField from 'shared/components/custom-text-field'
import FieldSelect from 'shared/components/field-select'
import { BoolValue, FloorValues, Landscaping, PoolValues, RoofValues, Size, WaterFeature, WindowValues } from 'shared/helpers/dataConstant'
import MultipleSelect from 'shared/components/multipleselect/MultipleSelect'
import CustomOptionGroup from 'shared/components/custom-optiongroup/CustomOptionGroup'
import MultipleSelectWithGrouping from 'shared/components/multipleselect/MultipleSelectWithGrouping'

const AmentiesSection = () => {
  const classes = useStyle()

  return (
    <>
      <Grid item xs={2} className={classes.titleNumberStyle}>
        <FormTitleNumber>9</FormTitleNumber>
      </Grid>
      <Grid item xs={10} container direction="column">
        <Grid item className={classes.formGroup}>
          <FormTitle>Amenities</FormTitle>
          <FieldSelect label="Heating" name="Heating" options={BoolValue} showTooltip = {true}/>
          <ErrorMessage component={err} name="Heating" />
          <FieldSelect label="AC" name="AC" options={BoolValue} showTooltip = {true}/>
          <ErrorMessage component={err} name="AC" />
          <FieldSelect label="Roof" name="Roof" options={RoofValues} showTooltip = {true}/>
          <ErrorMessage component={err} name="Roof" />
          <CustomOptionGroup label="Floor" name="Floor" options={FloorValues} showTooltip = {true}/>
          <ErrorMessage component={err} name="Floor" />
          <MultipleSelectWithGrouping label="Window Covering" name="WindowCovering" options={WindowValues} showTooltip = {true}/>
          <ErrorMessage component={err} name="WindowCovering" />
          <CustomOptionGroup label="Pool" name="Pool" options={PoolValues} showTooltip = {true}/>
          <ErrorMessage component={err} name="Pool" />
          <MultipleSelectWithGrouping label="Size" name="Size" options={Size} showTooltip = {true}/>
          <MultipleSelect label="Pool Feature" name="PoolFeature" options={WaterFeature} showTooltip = {true}/>
          <ErrorMessage component={err} name="PoolFeature" />
        </Grid>
        <Divider className={classes.dividerStyle} />
      </Grid>
    </>
  )
}

export default AmentiesSection
