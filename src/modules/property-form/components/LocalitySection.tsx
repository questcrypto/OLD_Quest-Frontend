import { Divider, Grid } from '@material-ui/core'
import { ErrorMessage } from 'formik'
import CustomTextField from 'shared/components/custom-text-field'
import { FormTitle, FormTitleNumber, useStyle } from '../style'
import { err } from 'shared/styles/styled'

const LocalitySection = () => {
  const classes = useStyle()

  return (
    <>
      <Grid item xs={2} className={classes.titleNumberStyle}>
        <FormTitleNumber>4</FormTitleNumber>
      </Grid>
      <Grid item xs={10} container direction="column">
        <Grid item className={classes.formGroup}>
          <FormTitle>Locality / Neighbourhood insight</FormTitle>
          <CustomTextField label="School district" name="SchoolDistrict" />
          <ErrorMessage component={err} name="SchoolDistrict" />
          <CustomTextField label="Elementary" name="Elementary" />
          <ErrorMessage component={err} name="Elementary" />
          <CustomTextField label="Jr high" name="JrHigh" />
          <ErrorMessage component={err} name="JrHigh" />
          <CustomTextField label="High school" name="HighSchool" />
          <ErrorMessage component={err} name="HighSchool" />
        </Grid>
        <Divider className={classes.dividerStyle} />
      </Grid>
    </>
  )
}

export default LocalitySection
