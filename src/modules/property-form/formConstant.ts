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
  Fname: Yup.string().required('First name is required'),
  Lname: Yup.string().required('Last name is required'),
  Email: Yup.string().required('Email is required'),
  PublicAddress: Yup.string().required('Wallet public key is required'),

  PropertyType: Yup.string().required('This field is required'),
  PropertyName: Yup.string().required('This field is required'),
  CurrentValue: Yup.string().required('This field is required'),
  Comments: Yup.string().required('This field is required'),
  YearBuilt: Yup.string().required('This field is required'),
  Zoning: Yup.string().required('This field is required'),
  Landscaping: Yup.string().required('This field is required'),
  Lotfacts: Yup.string().required('This field is required'),

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

  Insurance: Yup.string().required('This field is required'),
  Maintenance: Yup.string().required('This field is required'),
  HOAFees: Yup.string().required('This field is required'),

  FloorDetails: Yup.array().of(
    Yup.object().shape({
      SquareFoot: Yup.string().required('This field is required'),
      Bedroom: Yup.string().required('This field is required'),
      family: Yup.string().required('This field is required'),
      kitchen: Yup.string().required('This field is required'),
      Laundary: Yup.string().required('This field is required'),
      Bath: Yup.string().required('This field is required'),
    })
  ),
  Heating: Yup.string().required('This field is required'),
  AC: Yup.string().required('This field is required'),
  Roof: Yup.string().required('This field is required'),
  Floor: Yup.string().required('This field is required'),
  WindowCovering: Yup.string().required('This field is required'),
  Pool: Yup.string().required('This field is required'),
  PoolFeature: Yup.string().required('This field is required'),

  Style: Yup.string().required('This field is required'),
  Deck: Yup.string().required('This field is required'),
  Patio: Yup.string().required('This field is required'),
  Garage: Yup.string().required('This field is required'),
  Carpot: Yup.string().required('This field is required'),
  ParkingSpace: Yup.string().required('This field is required'),
  FinBasmt: Yup.string().required('This field is required'),
  Basement: Yup.string().required('This field is required'),
  Driveway: Yup.string().required('This field is required'),
  Water: Yup.string().required('This field is required'),
  WaterShare: Yup.string().required('This field is required'),
  Spa: Yup.string().required('This field is required'),
})
