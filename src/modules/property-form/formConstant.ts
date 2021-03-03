import * as Yup from 'yup'

export const initialValues = {
  Fname: '',
  Lname: '',
  Email: '',
  PublicAddress: '',

  PropertyType: '',
  PropertyName: '',
  CurrentValue: '',
  Comments: '',
  YearBuilt: '',
  Zoning: '',
  Landscaping: '',
  Lotfacts: '',

  Address1: '',
  Address2: '',
  City: '',
  State: '',
  PostalCode: '',
  Country: '',
  Subdivision: '',

  SchoolDistrict: '',
  Elementary: '',
  JrHigh: '',
  HighSchool: '',

  Insurance: '',
  Maintenance: '',
  HOAFees: '',

  FloorDetails: [
    {
      id: Math.random(),
      SquareFoot: '',
      Bedroom: '',
      family: '',
      kitchen: '',
      Laundary: '',
      Bath: '',
    },
  ],

  Heating: '',
  AC: '',
  Roof: '',
  Floor: '',
  WindowCovering: '',
  Pool: '',
  PoolFeature: '',

  Style: '',
  Deck: '',
  Patio: '',
  Garage: '',
  Carpot: '',
  ParkingSpace: '',
  FinBasmt: '',
  Basement: '',
  Driveway: '',
  Water: '',
  WaterShare: '',
  Spa: '',
}

export const propertyFormSchema = Yup.object().shape({
  Fname: Yup.string().matches(/[a-zA-Z]$/, 'Must be an alphabet'),
  Lname: Yup.string().matches(/[a-zA-Z]$/, 'Must be an alphabet'),
  Email: Yup.string()
    .min(3, 'emailNotLongEnough')
    .max(100)
    .email('invalid Email')
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Must be a Valid Email'
    ),
  PublicAddress: Yup.string()
    .matches(/^0x[a-fA-F0-9]{1,40}$/, 'Must be a Valid Public Key')
    .required('Wallet public key is required'),

  PropertyType: Yup.string().required('This field is required'),
  PropertyName: Yup.string().matches(/[a-zA-Z ]$/, 'Must be an alphabet'),
  CurrentValue: Yup.number().integer().required('This field is required'),
  Comments: Yup.string().required('This field is required'),
  YearBuilt: Yup.date().required('Date is required'),
  Zoning: Yup.string().required('This field is required'),
  Lotfacts: Yup.number().integer().required('This field is required'),

  Address1: Yup.string().required('This field is required'),
  Address2: Yup.string().required('This field is required'),
  City: Yup.string().required('This field is required'),
  State: Yup.string().required('This field is required'),
  PostalCode: Yup.string()
    .matches(/^[0-9]{5}$/, 'Must be exactly 5 digits')
    .required('This field is required'),
  Country: Yup.string().required('This field is required'),
  Subdivision: Yup.string().required('This field is required'),

  SchoolDistrict: Yup.string().required('This field is required'),
  Elementary: Yup.string().required('This field is required'),
  JrHigh: Yup.string().required('This field is required'),
  HighSchool: Yup.string().required('This field is required'),

  Insurance: Yup.number().integer().required('This field is required'),
  Maintenance: Yup.number().integer().required('This field is required'),
  HOAFees: Yup.number().integer().required('This field is required'),

  FloorDetails: Yup.array().of(
    Yup.object().shape({
      SquareFoot: Yup.number().integer().required('This field is required'),
      Bedroom: Yup.number().integer().required('This field is required'),
      family: Yup.number().integer().required('This field is required'),
      kitchen: Yup.number().integer().required('This field is required'),
      Laundary: Yup.number().integer().required('This field is required'),
      Bath: Yup.number().integer().required('This field is required'),
    })
  ),
  Heating: Yup.string().matches(/[a-zA-Z ]$/, 'Must be an alphabet'),
  AC: Yup.string().matches(/[a-zA-Z ]$/, 'Must be an alphabet'),
  Roof: Yup.string().matches(/[a-zA-Z ]$/, 'Must be an alphabet'),
  Floor: Yup.string().matches(/[a-zA-Z ]$/, 'Must be an alphabet'),
  WindowCovering: Yup.string().matches(/[a-zA-Z ]$/, 'Must be an alphabet'),
  PoolFeature: Yup.string().matches(/[a-zA-Z ]$/, 'Must be an alphabet'),

  Style: Yup.string().required('This field is required'),
  Garage: Yup.string().required('This field is required'),
  ParkingSpace: Yup.number().integer().required('This field is required'),
  Basement: Yup.boolean().oneOf([true], 'Field must be checked').required('This field is required'),
  Water: Yup.string().required('This field is required'),
  WaterShare: Yup.string().matches(/[a-zA-Z ]$/, 'Must be an alphabet'),
  Spa: Yup.string().matches(/[a-zA-Z ]$/, 'Must be an alphabet'),
})
