import React from 'react'
import { 
    FormTitle, 
    FormTitleNumber, 
    useStyle,
} from "../style"
import { Divider, Grid } from '@material-ui/core'
import { ErrorMessage } from "formik"
import { err } from "shared/styles/styled"
import CustomTextField from 'shared/components/custom-text-field'
import FieldSelect from 'shared/components/field-select'
import { Landscaping } from 'shared/helpers/dataConstant'

const AmentiesSection = () => {
    const classes = useStyle()

    return (
        <>
            <Grid item xs={2} className={classes.titleNumberStyle}>
                    <FormTitleNumber>9</FormTitleNumber>
                  </Grid>
                  <Grid item xs={10} container direction="column">
                    <Grid item className={classes.formGroup}>
                      <FormTitle >Amenities</FormTitle>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing eits</p>
                      <CustomTextField label="Heating" name="Heating" />
                      <ErrorMessage component={err} name="Heating" />
                      <CustomTextField label="AC" name="AC" />
                      <ErrorMessage component={err} name="AC" />
                      <CustomTextField label="Roof" name="Roof" />
                      <ErrorMessage component={err} name="Roof" />
                      <CustomTextField label="Floor" name="Floor" />
                      <ErrorMessage component={err} name="Floor" />
                      <CustomTextField label="Window Covering" name="WindowCovering" />
                      <ErrorMessage component={err} name="WindowCovering" />
                      <FieldSelect label="Pool" name="Pool" options={Landscaping} />
                      <ErrorMessage component={err} name="Pool" />
                      <CustomTextField label="Pool Feature" name="PoolFeature" />
                      <ErrorMessage component={err} name="PoolFeature" />
                    </Grid>
                    <Divider className={classes.dividerStyle} />
                  </Grid>

        </>
    )
}

export default AmentiesSection
