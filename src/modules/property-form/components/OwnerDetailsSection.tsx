import { Divider, Grid } from '@material-ui/core'
import { ErrorMessage } from 'formik'
import CustomTextField from 'shared/components/custom-text-field'
import { FormTitle, FormTitleNumber, useStyle } from '../style'
import { err } from 'shared/styles/styled'

const OwnerDetailsSection = () => {
  const classes = useStyle()
  return (
    <>
      <Grid item xs={2} className={classes.titleNumberStyle}>
        <FormTitleNumber>1</FormTitleNumber>
      </Grid>
      <Grid item xs={10} container direction="column">
        <Grid item className={classes.formGroup}>
          <FormTitle className="ownerdetails" >Owner details</FormTitle>
          <CustomTextField label="First name" name="Fname" showTooltip = {true}  />
          <ErrorMessage component={err} name="Fname" />
          <CustomTextField label="Last name" name="Lname" showTooltip = {true}/>
          <ErrorMessage component={err} name="Lname" />
          <CustomTextField label="Email Address" type="email" name="Email" showTooltip = {true}/>
          <ErrorMessage component={err} name="Email" />
          <CustomTextField label="Wallet public key" name="PublicAddress" link = "https://metamask.zendesk.com/hc/en-us/articles/360015488791-How-to-View-Account-Details"/>
          <ErrorMessage component={err} name="PublicAddress" />
        </Grid>
        <Divider className={classes.dividerStyle} />
      </Grid>
    </>
  )
}

export default OwnerDetailsSection
