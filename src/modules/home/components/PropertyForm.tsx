import React from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { useStyle } from './style'
import CustomTextField from 'shared/components/CustomTextField'
import Button from '@material-ui/core/Button'

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  walletPubKey: '',
}

const PropertyForm = () => {
  const classes = useStyle()
  const handleSubmit = (values: any) => {
    console.log('Values-->', values)
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values)
          setSubmitting(false)
          resetForm()
        }}
      >
        {({ values, handleChange }: any) => (
          <Form>
            {console.log('values==>', values)}
            <CustomTextField required label="First name" name="firstName" handleChange={handleChange} />
            <CustomTextField required label="Last name" name="lastName" handleChange={handleChange} />
            <CustomTextField required label="Email Address" name="email" handleChange={handleChange} />
            <CustomTextField required label="Wallet public key" name="walletPubKey" handleChange={handleChange} />
            <div>
              <Button
                type="submit"
                variant="contained"
                classes={{
                  root: classes.saveBtn,
                }}
              >
                Save & publish
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
export default PropertyForm
