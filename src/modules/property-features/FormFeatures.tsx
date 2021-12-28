import { Button, Slider } from '@material-ui/core'
import { Form, Formik } from 'formik'
import React from 'react'
import CustomTextField from 'shared/components/custom-text-field'
import { useStyles } from './style'

let intialValues: {
  token: ''
  perToken: ''
  buyNow: ''
}
const FormFeatures = () => {
  const classes = useStyles()
  const handleSubmit = (values: any) => {}
  return (
    <Formik
      initialValues={intialValues}
      // validationSchema={propertyFormSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values)
        setSubmitting(false)
      }}
    >
      {({ values, handleBlur, isValid }: any) => (
        <Form >
             <p className={classes.formHd}>Equity %</p>
            <div className={classes.sliderBox}>
                <Slider
        
        defaultValue={70}
        aria-label="Small"
        valueLabelDisplay="auto"
        />
        </div>
        <div className={classes.inputRow}>
        <div className={classes.inputCol}>
          <CustomTextField  label="Token" name="token" />
          </div>
          <div className={classes.inputCol}>
          <CustomTextField  label="Per Token" name="perToken" />
          </div>
        </div>
        <div className={classes.inputfooter}>
            <div className={classes.inputRow}>
                <div className={classes.inputCol}>
                    <CustomTextField label="Buy Now" name="buyNow" />
                </div>
                <div className={classes.inputCol}>
                    <div className={classes.buttonRow}>
                        <Button className={classes.Approve}>Approve</Button>
                        <Button className={classes.Purchase}>Purchase</Button>
                    </div>
                </div>
            </div>
        </div>
        </Form>
      )}
    </Formik>
  )
}

export default FormFeatures
