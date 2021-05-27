import * as Yup from 'yup'

export const initialValues = {
  userName: '',
  email: '',
  otp: '',
  walletAddress: ''
}

export const signUpFormSchema = Yup.object().shape({

  userName: Yup.string().required('UserName is required'),
  email: Yup.string()
    .nullable()
    .min(3, 'Email Not Long Enough')
    .max(100)
    .email('Invalid Email')
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Must be a Valid Email'
    ).required('Email is required'),
  otp: Yup.number().min(99999, 'OTP is not long enough').max(999999, 'OTP is of 6 digits').required('OTP is required'),
  walletAddress: Yup.string().required('Wallet Address is required'),

})

export const loginFormSchema = Yup.object().shape({

  email: Yup.string()
    .nullable()
    .min(3, 'Email Not Long Enough')
    .max(100)
    .email('Invalid Email')
    .required('Email is required'),
  walletAddress: Yup.string().required('Wallet Address is required'),
  // .matches(
  //   // eslint-disable-next-line no-useless-escape
  //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  //   'Must be a Valid Email'
  // )

})
