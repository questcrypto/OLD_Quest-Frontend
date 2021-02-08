import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form, ErrorMessage } from 'formik'
import { err, Error } from 'shared/styles/styled'
import {
  useStyle,
  useStyle01,
  PropertyFormWrapper,
  FromHeader,
  HeaderPath,
  HeaderTitle,
  PropertyFormCont,
  FormTitleCont,
  FormTitle,
  FormTitleNumber,
  FormSubTitle,
  SelectedFileCont,
  SelectedFileImgCont,
  FileContainer,
  DocText,
  FieldMsgBox,
  FloorDetailsArr,
  FloorDetailsCont,
  FloorFieldMsgBox,
  AddAnotherFloorCont,
  SubmitContainer,
  CheckBoxCont,
  CheckBoxText,
  FormButtonGroup,
} from './style'
import Button from '@material-ui/core/Button'
import { Grid, Checkbox } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import CustomTextField from 'shared/components/custom-text-field'
import FloatNumberField from 'shared/components/float-number-field'
import IntegerNumberField from 'shared/components/Integer-number-field'
import FieldSelect from 'shared/components/field-select'
import FormDatePicker from 'shared/components/form-date-picker'
import CustomModal from 'shared/custom-modal'
import UploadImage from './components/UploadImage'
import UploadDocument from './components/UploadDocument'
import Paper from '@material-ui/core/Paper'
import ImageIcon from 'assets/icons/imgIcon.svg'
import CrossIcon from 'assets/icons/crossIcon.svg'
import FileIcon from 'assets/icons/fileIcon.svg'
import chatIcon from 'assets/images/chatIcon.svg'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import { propertyType } from 'shared/helpers/dataConstant'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'
import history from 'modules/app/components/history'
import { Paths } from 'modules/app/components/routes/types'

const initialValues = {
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
  TaxId: '',

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
      floor: '',
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
const propertyFormSchema = Yup.object().shape({
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
  TaxId: Yup.string().required('This field is required'),

  SchoolDistrict: Yup.string().required('This field is required'),
  Elementary: Yup.string().required('This field is required'),
  JrHigh: Yup.string().required('This field is required'),
  HighSchool: Yup.string().required('This field is required'),

  Insurance: Yup.string().required('This field is required'),
  Maintenance: Yup.string().required('This field is required'),
  HOAFees: Yup.string().required('This field is required'),

  FloorDetails: Yup.array().of(
    Yup.object().shape({
      floor: Yup.string().required('This field is required'),
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

const PropertyForm = () => {
  const [showImgModal, setShowImgModal] = useState(false)
  const [imageList, setImageList] = useState<any>([])
  const [imageData, setImageData] = useState<any>([])
  const [showDocModal, setShowDocModal] = useState(false)
  const [documentList, setDocumentList] = useState<any>([])
  const [documentData, setDocumentData] = useState<any>([])
  const [showImgError, setShowImgError] = useState(false)
  const [showDocError, setShowDocError] = useState(false)
  const [permission, setPermission] = useState(false)
  const classes = useStyle()
  const classes01 = useStyle01()

  const getFileData = () => {
    const filesArr: any = []
    for (const item of imageList) {
      filesArr.push(item)
    }
    for (const item of documentList) {
      filesArr.push(item)
    }
    return filesArr
  }

  const handleSubmit = async (values: any) => {
    if (imageList.length > 0 && documentList.length > 0) {
      const formData = new FormData()
      const dataFiles = getFileData()
      for (const item of dataFiles) {
        formData.append('file', item)
      }
      const data = { ...values }
      delete data.FloorDetails
      Object.keys(data).forEach((key: any) => formData.append(key, data[key]))
      formData.append('Amenties', '')
      formData.append('PropertyImages', JSON.stringify(imageData))
      formData.append('PropertyDocs', JSON.stringify(documentData))
      formData.append('FloorDetails', JSON.stringify(values.FloorDetails))
      try {
        await axios.post(`${apiBaseUrl}/properties/Addproperties`, formData)
        history.push(Paths.root)
      } catch (error) {
        console.log('error==>', error)
      }
    } else {
      if (imageList.length === 0) {
        setShowImgError(true)
      }
      if (documentList.length === 0) {
        setShowDocError(true)
      }
    }
  }
  const handleAddFloorDetails = (arrayHelpers: any) => {
    arrayHelpers.push({ id: Math.random(), floor: '', SquareFoot: '', Bedroom: '', family: '', kitchen: '', Laundary: '', Bath: '' })
  }

  const handleDeleteFile = (type: string, index: number) => {
    if (type === 'img') {
      const newImgList: any = [...imageList]
      newImgList.splice(index, 1)
      setImageList([...newImgList])
    }
    if (type === 'doc') {
      const newDocList: any = [...documentList]
      newDocList.splice(index, 1)
      setDocumentList([...newDocList])
    }
  }

  const renderSelectedFileName = (fileList: any, type: string) => {
    return fileList.map((item: any, k: number) => {
      return (
        <Grid key={k} container spacing={1} className={classes.fileNameStyle}>
          <Grid item xs={1}>
            <img src={type === 'img' ? ImageIcon : FileIcon} alt="" />
          </Grid>
          <Grid item xs={10}>
            <DocText>{item.name}</DocText>
          </Grid>
          <Grid item xs={1}>
            <img style={{ cursor: 'pointer' }} src={CrossIcon} alt="" onClick={() => handleDeleteFile(type, k)} />
          </Grid>
        </Grid>
      )
    })
  }
  const renderSelectedFileImage = (fileList: any) => {
    return fileList.map((item: any, k: number) => {
      const objectURL = URL.createObjectURL(item)
      return (
        <FileContainer key={k}>
          <img src={objectURL} alt="" />
        </FileContainer>
      )
    })
  }

  return (
    <PropertyFormWrapper>
      <FromHeader>
        <HeaderPath>
          <span>Properties</span> / Add new property
        </HeaderPath>
        <HeaderTitle>Add new property</HeaderTitle>
      </FromHeader>
      <PropertyFormCont>
        <Formik
          initialValues={initialValues}
          validationSchema={propertyFormSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values)
            setSubmitting(false)
          }}
        >
          {({ values }: any) => (
            <Form>
              <Grid container>
                <Grid item xs={1}>
                  <FormTitleNumber>1</FormTitleNumber>
                </Grid>

                <Grid item xs={11} container direction="column">
                  <Grid item className={classes.formGroup}>
                    <FormTitleCont>
                      <FormTitle>Owner details</FormTitle>
                    </FormTitleCont>
                    <FieldMsgBox>
                      <CustomTextField label="First name" name="Fname" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Fname" />

                    <FieldMsgBox>
                      <CustomTextField label="Last name" name="Lname" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Lname" />

                    <FieldMsgBox>
                      <CustomTextField label="Email Address" type="email" name="Email" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Email" />

                    <FieldMsgBox>
                      <CustomTextField label="Wallet public key" name="PublicAddress" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>

                    <ErrorMessage component={err} name="PublicAddress" />
                  </Grid>
                  <Divider classes={{ root: classes.dividerStyle }} />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={1}>
                  <FormTitleNumber>2</FormTitleNumber>
                </Grid>
                <Grid item xs={11} container direction="column">
                  <Grid item className={classes.formGroup}>
                    <FormTitleCont>
                      <FormTitle>Property info</FormTitle>
                    </FormTitleCont>
                    <FieldMsgBox>
                      <FieldSelect label="Type of property" name="PropertyType" options={propertyType} />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="PropertyType" />
                    <FieldMsgBox>
                      <CustomTextField label="Property name" name="PropertyName" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="PropertyName" />
                    <FieldMsgBox>
                      <FloatNumberField label="Property current value" name="CurrentValue" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="CurrentValue" />
                    <FieldMsgBox>
                      <CustomTextField label="Comments" name="Comments" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Comments" />
                    <FieldMsgBox>
                      <FormDatePicker label="Year built" name="YearBuilt" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="YearBuilt" />
                    <FieldMsgBox>
                      <CustomTextField label="Zoning" name="Zoning" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Zoning" />
                    <FieldMsgBox>
                      <CustomTextField label="Landscaping" name="Landscaping" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Landscaping" />
                    <FieldMsgBox>
                      <IntegerNumberField label="Lot Facts" name="Lotfacts" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Lotfacts" />
                  </Grid>
                  <Divider classes={{ root: classes.dividerStyle }} />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={1}>
                  <FormTitleNumber>3</FormTitleNumber>
                </Grid>
                <Grid item xs={11} container direction="column">
                  <Grid item className={classes.formGroup}>
                    <FormTitleCont>
                      <FormTitle>Address</FormTitle>
                    </FormTitleCont>
                    <FieldMsgBox>
                      <CustomTextField label="Address 1" name="Address1" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Address1" />
                    <FieldMsgBox>
                      <CustomTextField label="Address 2" name="Address2" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Address2" />
                    <FieldMsgBox>
                      <CustomTextField label="City" name="City" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="City" />
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <CustomTextField label="State" name="State" />
                        <ErrorMessage component={err} name="State" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FieldMsgBox>
                          <IntegerNumberField label="Postal code" name="PostalCode" />
                          <img src={chatIcon} alt="" />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="PostalCode" />
                      </Grid>
                    </Grid>
                    <FieldMsgBox>
                      <CustomTextField label="Country" name="Country" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Country" />
                    <FieldMsgBox>
                      <CustomTextField label="Subdivision" name="Subdivision" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Subdivision" />
                    <FieldMsgBox>
                      <CustomTextField label="Tax Id" name="TaxId" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="TaxId" />
                  </Grid>
                  <Divider classes={{ root: classes.dividerStyle }} />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={1}>
                  <FormTitleNumber>4</FormTitleNumber>
                </Grid>
                <Grid item xs={11} container direction="column">
                  <Grid item className={classes.formGroup}>
                    <FormTitleCont>
                      <FormTitle>Locality / Neighbourhood insight</FormTitle>
                    </FormTitleCont>
                    <FieldMsgBox>
                      <CustomTextField label="School district" name="SchoolDistrict" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="SchoolDistrict" />
                    <FieldMsgBox>
                      <CustomTextField label="Elementary" name="Elementary" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Elementary" />
                    <FieldMsgBox>
                      <CustomTextField label="Jr high" name="JrHigh" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="JrHigh" />
                    <FieldMsgBox>
                      <CustomTextField label="High school" name="HighSchool" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="HighSchool" />
                  </Grid>
                  <Divider classes={{ root: classes.dividerStyle }} />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={1}>
                  <FormTitleNumber>5</FormTitleNumber>
                </Grid>
                <Grid item xs={11} container direction="column">
                  <Grid item className={classes.formGroup}>
                    <FormTitleCont>
                      <FormTitle>T.I.M.E contract</FormTitle>
                    </FormTitleCont>
                    <FieldMsgBox>
                      <IntegerNumberField label="Insurance" name="Insurance" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Insurance" />
                    <FieldMsgBox>
                      <IntegerNumberField label="Maintenance" name="Maintenance" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Maintenance" />
                    <FieldMsgBox>
                      <IntegerNumberField label="HOA fees" name="HOAFees" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="HOAFees" />
                  </Grid>
                  <Divider classes={{ root: classes.dividerStyle }} />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={1}>
                  <FormTitleNumber>6</FormTitleNumber>
                </Grid>
                <Grid item xs={11} container direction="column">
                  <FormTitleCont>
                    <FormTitle>Upload property images</FormTitle>
                  </FormTitleCont>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Paper
                        elevation={1}
                        onClick={() => setShowImgModal(true)}
                        classes={{
                          root: classes.uploadDataStyle,
                        }}
                      >
                        Add property image
                      </Paper>
                      {showImgError && imageList.length === 0 && <Error>At least one Image is required</Error>}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {!!imageList && imageList.length > 0 && (
                        <div>
                          <FormSubTitle>Selected Images</FormSubTitle>
                          <SelectedFileCont>
                            <div>{renderSelectedFileName(imageList, 'img')}</div>
                            <SelectedFileImgCont>{renderSelectedFileImage(imageList)}</SelectedFileImgCont>
                          </SelectedFileCont>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                  <Divider classes={{ root: classes.dividerStyle }} />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={1}>
                  <FormTitleNumber>7</FormTitleNumber>
                </Grid>
                <Grid item xs={11} container direction="column">
                  <FormTitleCont>
                    <FormTitle>Upload property documents</FormTitle>
                  </FormTitleCont>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Paper
                        elevation={1}
                        onClick={() => setShowDocModal(true)}
                        classes={{
                          root: classes.uploadDataStyle,
                        }}
                      >
                        Add property document
                      </Paper>
                      {showDocError && documentList.length === 0 && <Error>At least one Document is required</Error>}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {!!documentList && documentList.length > 0 && (
                        <div>
                          <FormSubTitle>Selected Documents</FormSubTitle>
                          <div>{renderSelectedFileName(documentList, 'doc')}</div>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                  <Divider classes={{ root: classes.dividerStyle }} />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={1}>
                  <FormTitleNumber>8</FormTitleNumber>
                </Grid>
                <Grid item xs={11} container direction="column">
                  <Grid item className={classes.formGroup}>
                    <FormTitleCont>
                      <FormTitle>Floor Wise Configuration</FormTitle>
                    </FormTitleCont>

                    <FloorDetailsArr
                      name="FloorDetails"
                      render={(arrayHelpers) => (
                        <div>
                          {values.FloorDetails.map((ref: any, index: number) => (
                            <FloorDetailsCont key={ref.id}>
                              <Accordion defaultExpanded>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes01.headerStyle}>
                                  <Typography className={classes01.heading}>Floor {index + 1}</Typography>
                                </AccordionSummary>
                                <AccordionDetails className={classes01.detailsCont}>
                                  <FloorFieldMsgBox>
                                    <CustomTextField label="Floor" name={`FloorDetails[${index}].floor`} />
                                    <img src={chatIcon} alt="" />
                                  </FloorFieldMsgBox>
                                  <ErrorMessage component={err} name={`FloorDetails[${index}].floor`} />
                                  <FloorFieldMsgBox>
                                    <IntegerNumberField label="Square Foot" name={`FloorDetails[${index}].SquareFoot`} />
                                    <img src={chatIcon} alt="" />
                                  </FloorFieldMsgBox>
                                  <ErrorMessage component={err} name={`FloorDetails[${index}].SquareFoot`} />
                                  <FloorFieldMsgBox>
                                    <IntegerNumberField label="Bedroom" name={`FloorDetails[${index}].Bedroom`} />
                                    <img src={chatIcon} alt="" />
                                  </FloorFieldMsgBox>
                                  <ErrorMessage component={err} name={`FloorDetails[${index}].Bedroom`} />
                                  <FloorFieldMsgBox>
                                    <IntegerNumberField label="Family" name={`FloorDetails[${index}].family`} />
                                    <img src={chatIcon} alt="" />
                                  </FloorFieldMsgBox>
                                  <ErrorMessage component={err} name={`FloorDetails[${index}].family`} />
                                  <FloorFieldMsgBox>
                                    <IntegerNumberField label="Kitchen" name={`FloorDetails[${index}].kitchen`} />
                                    <img src={chatIcon} alt="" />
                                  </FloorFieldMsgBox>
                                  <ErrorMessage component={err} name={`FloorDetails[${index}].kitchen`} />
                                  <FloorFieldMsgBox>
                                    <IntegerNumberField label="Laundary" name={`FloorDetails[${index}].Laundary`} />
                                    <img src={chatIcon} alt="" />
                                  </FloorFieldMsgBox>
                                  <ErrorMessage component={err} name={`FloorDetails[${index}].Laundary`} />
                                  <FloorFieldMsgBox>
                                    <IntegerNumberField label="Bath" name={`FloorDetails[${index}].Bath`} />
                                    <img src={chatIcon} alt="" />
                                  </FloorFieldMsgBox>
                                  <ErrorMessage component={err} name={`FloorDetails[${index}].Bath`} />
                                </AccordionDetails>
                              </Accordion>
                              {values.FloorDetails.length > 1 && (
                                <DeleteIcon className={classes01.deleteBtnStyle} onClick={() => arrayHelpers.remove(index)} />
                              )}
                            </FloorDetailsCont>
                          ))}
                          <AddAnotherFloorCont onClick={() => handleAddFloorDetails(arrayHelpers)}>
                            <AddIcon />
                            <span>Add Another Floor</span>
                          </AddAnotherFloorCont>
                        </div>
                      )}
                    />
                  </Grid>

                  <Divider classes={{ root: classes.dividerStyle }} />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={1}>
                  <FormTitleNumber>9</FormTitleNumber>
                </Grid>
                <Grid item xs={11} container direction="column">
                  <Grid item className={classes.formGroup}>
                    <FormTitleCont>
                      <FormTitle>Amenities</FormTitle>
                    </FormTitleCont>
                    <FieldMsgBox>
                      <CustomTextField label="Heating" name="Heating" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Heating" />
                    <FieldMsgBox>
                      <CustomTextField label="AC" name="AC" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="AC" />
                    <FieldMsgBox>
                      <CustomTextField label="Roof" name="Roof" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Roof" />
                    <FieldMsgBox>
                      <CustomTextField label="Floor" name="Floor" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Floor" />
                    <FieldMsgBox>
                      <CustomTextField label="Window Covering" name="WindowCovering" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="WindowCovering" />
                    <FieldMsgBox>
                      <CustomTextField label="Pool" name="Pool" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Pool" />
                    <FieldMsgBox>
                      <CustomTextField label="Pool Feature" name="PoolFeature" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="PoolFeature" />
                  </Grid>
                  <Divider classes={{ root: classes.dividerStyle }} />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={1}>
                  <FormTitleNumber>10</FormTitleNumber>
                </Grid>
                <Grid item xs={11} container direction="column">
                  <Grid item className={classes.formGroup}>
                    <FormTitleCont>
                      <FormTitle>More Details</FormTitle>
                    </FormTitleCont>
                    <FieldMsgBox>
                      <CustomTextField label="Style" name="Style" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Style" />
                    <FieldMsgBox>
                      <CustomTextField label="Deck" name="Deck" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Deck" />
                    <FieldMsgBox>
                      <CustomTextField label="Patio" name="Patio" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Patio" />
                    <FieldMsgBox>
                      <CustomTextField label="Garage" name="Garage" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Garage" />
                    <FieldMsgBox>
                      <CustomTextField label="Carport" name="Carpot" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Carpot" />
                    <FieldMsgBox>
                      <IntegerNumberField label="Parking Space" name="ParkingSpace" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="ParkingSpace" />
                    <FieldMsgBox>
                      <IntegerNumberField label="Fin Bsmt" name="FinBasmt" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="FinBasmt" />
                    <FieldMsgBox>
                      <CustomTextField label="Basement" name="Basement" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Basement" />
                    <FieldMsgBox>
                      <CustomTextField label="Driveway" name="Driveway" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Driveway" />
                    <FieldMsgBox>
                      <CustomTextField label="Water" name="Water" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Water" />
                    <FieldMsgBox>
                      <CustomTextField label="Water Shares" name="WaterShare" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="WaterShare" />
                    <FieldMsgBox>
                      <CustomTextField label="Spa" name="Spa" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Spa" />
                  </Grid>
                  <Divider classes={{ root: classes.dividerStyle }} />
                </Grid>
              </Grid>
              <SubmitContainer>
                <CheckBoxCont>
                  <Checkbox
                    color="default"
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                    style={{ color: '#1E3444' }}
                    onChange={(e: any) => setPermission(e.target.checked)}
                  />
                  <CheckBoxText>I take full responsibility of the above information</CheckBoxText>
                </CheckBoxCont>
                <FormButtonGroup>
                  <Button
                    type="button"
                    variant="contained"
                    classes={{
                      root: classes.saveAsDraftStyle,
                    }}
                  >
                    SAVE AS DRAFT
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    classes={{
                      root: classes.saveAndReviewStyle,
                    }}
                    disabled={!permission}
                  >
                    Save & Send for review
                  </Button>
                </FormButtonGroup>
              </SubmitContainer>
            </Form>
          )}
        </Formik>
      </PropertyFormCont>
      <CustomModal show={showImgModal} toggleModal={setShowImgModal}>
        <UploadImage
          imageList={imageList}
          setImageList={setImageList}
          setShowImgModal={setShowImgModal}
          imageData={imageData}
          setImageData={setImageData}
        />
      </CustomModal>
      <CustomModal show={showDocModal} toggleModal={setShowDocModal}>
        <UploadDocument
          documentList={documentList}
          setDocumentList={setDocumentList}
          setShowDocModal={setShowDocModal}
          documentData={documentData}
          setDocumentData={setDocumentData}
        />
      </CustomModal>
    </PropertyFormWrapper>
  )
}
export default PropertyForm
