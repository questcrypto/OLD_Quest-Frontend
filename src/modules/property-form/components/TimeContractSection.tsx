import { Divider, Grid } from '@material-ui/core'
import { ErrorMessage } from 'formik'
import { FormTitle, FormTitleNumber, useStyle } from '../style'
import { err } from 'shared/styles/styled'
import MoneyInputField from 'shared/components/money-input-field'

const TimeContractSection = () => {
  const classes = useStyle()

  return (
    <>
      <Grid item xs={2} className={classes.titleNumberStyle}>
        <FormTitleNumber>5</FormTitleNumber>
      </Grid>
      <Grid item xs={10} container direction="column">
        <Grid item className={classes.formGroup}>
          <FormTitle> T.I.M.E contract</FormTitle>
          <MoneyInputField label="Taxes" name="Taxes" dollarPrefix acceptDecimals  link="https://www.realtor.com/advice/finance/how-to-calculate-property-taxes/"/>
          <ErrorMessage component={err} name="Taxes" />

          <MoneyInputField label="Insurance" name="Insurance" dollarPrefix acceptDecimals link="https://www.amfam.com/insurance/home/homeowners-insurance-calculator"/>
          <ErrorMessage component={err} name="Insurance" />
          <MoneyInputField label="Maintenance" name="Maintenance" dollarPrefix acceptDecimals link="https://www.amfam.com/resources/articles/at-home/average-home-maintenance-costs"/>
          <ErrorMessage component={err} name="Maintenance" />
          {/* <MoneyInputField label="HOA fees" name="HOAFees" dollarPrefix acceptDecimals />
                      <ErrorMessage component={err} name="HOAFees" /> */}

          <MoneyInputField label="Expenses" name="Expenses" dollarPrefix acceptDecimals link="https://www.takechargeamerica.org/financial-education/finance-calculator/how-much-am-i-spending-living-household-calculator/"/>
          <ErrorMessage component={err} name="Expenses" />
        </Grid>
        <Divider className={classes.dividerStyle} />
      </Grid>
    </>
  )
}

export default TimeContractSection
