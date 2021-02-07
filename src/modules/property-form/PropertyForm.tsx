import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form, ErrorMessage } from 'formik'
import { err } from 'shared/styles/styled'
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
  DocText,
  FieldMsgBox,
  FloorDetailsArr,
  FloorDetailsCont,
  FloorFieldMsgBox,
  AddAnotherCont,
} from './style'
import Button from '@material-ui/core/Button'
import { Grid, Checkbox } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import CustomTextField from 'shared/components/custom-text-field'
import FloatNumberField from 'shared/components/float-number-field'
import IntegerNumberField from 'shared/components/Integer-number-field'
import FieldSelect from 'shared/components/field-select'
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
  LotFacts: '',

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
      Floor: '',
      squareFoot: '',
      bedRoom: '',
      family: '',
      kitchen: '',
      laundry: '',
      bath: '',
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
  CurrentValue: Yup.number().integer().required('This field is required'),
  Comments: Yup.string().required('This field is required'),
  YearBuilt: Yup.string().required('This field is required'),
  Zoning: Yup.string().required('This field is required'),
  Landscaping: Yup.string().required('This field is required'),
  LotFacts: Yup.number().integer().required('This field is required'),

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

  Insurance: Yup.number().integer().required('This field is required'),
  Maintenance: Yup.number().integer().required('This field is required'),
  HOAFees: Yup.number().integer().required('This field is required'),

  FloorDetails: Yup.object().shape({
    squareFoot: Yup.string().required('This field is required'),
    bedRoom: Yup.string().required('This field is required'),
    family: Yup.string().required('This field is required'),
    kitchen: Yup.string().required('This field is required'),
    laundry: Yup.string().required('This field is required'),
    bath: Yup.string().required('This field is required'),
  }),

  Heating: Yup.number().integer().required('This field is required'),
  AC: Yup.number().integer().required('This field is required'),
  Roof: Yup.number().integer().required('This field is required'),
  Floor: Yup.number().integer().required('This field is required'),
  WindowCovering: Yup.number().integer().required('This field is required'),
  Pool: Yup.number().integer().required('This field is required'),
  PoolFeature: Yup.number().integer().required('This field is required'),

  Style: Yup.number().integer().required('This field is required'),
  Deck: Yup.number().integer().required('This field is required'),
  Patio: Yup.number().integer().required('This field is required'),
  Garage: Yup.number().integer().required('This field is required'),
  Carpot: Yup.number().integer().required('This field is required'),
  ParkingSpace: Yup.number().integer().required('This field is required'),
  FinBasmt: Yup.number().integer().required('This field is required'),
  Basement: Yup.number().integer().required('This field is required'),
  Driveway: Yup.number().integer().required('This field is required'),
  Water: Yup.number().integer().required('This field is required'),
  WaterShare: Yup.number().integer().required('This field is required'),
  Spa: Yup.number().integer().required('This field is required'),
})

const PropertyForm = () => {
  const [showImgModal, setShowImgModal] = useState(false)
  const [imageList, setImageList] = useState<any>([])
  const [showDocModal, setShowDocModal] = useState(false)
  const [documentList, setDocumentList] = useState<any>([])
  const classes = useStyle()
  const classes01 = useStyle01()

  const handleSubmit = (values: any) => {
    console.log('Values-->', values)
  }
  const handleAddFloorDetails = (arrayHelpers: any) => {
    arrayHelpers.push({ id: Math.random(), Floor: '', squareFoot: '', bedRoom: '', family: '', kitchen: '', laundry: '', bath: '' })
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
      setImageList([...newDocList])
    }
  }

  const renderSelectedFileName = (fileList: any, type: string) => {
    return fileList.map((item: any, k: number) => {
      return (
        <Grid xs={12} key={k} container spacing={1}>
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
      return (
        <div
          key={k}
          style={{
            width: '70px',
            height: '70px',
            boxSizing: 'border-box',
          }}
        >
          <img src={item.path} alt="" />
        </div>
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
                      <FormTitle className="form_title">Owner details</FormTitle>
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
                      <FormTitle className="form_title">Property info</FormTitle>
                    </FormTitleCont>
                    <FieldMsgBox>
                      <FieldSelect label="Type of property" name="PropertyType" />
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
                      <CustomTextField label="Year built" name="YearBuilt" />
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
                      <IntegerNumberField label="Lot facts" name="LotFacts" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="LotFacts" />
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
                      <FormTitle className="form_title">Address</FormTitle>
                    </FormTitleCont>
                    <FieldMsgBox>
                      <FieldSelect label="Address 1" name="Address1" />
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
                      <FormTitle className="form_title">Locality / Neighbourhood insight</FormTitle>
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
                      <FormTitle className="form_title">T.I.M.E contract</FormTitle>
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
                    <FormTitle className="form_title">Upload property images</FormTitle>
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormSubTitle>Uploading</FormSubTitle>
                      {!!imageList && imageList.length > 0 && (
                        <SelectedFileCont>
                          <div>{renderSelectedFileName(imageList, 'img')}</div>
                          <SelectedFileImgCont>{renderSelectedFileImage(imageList)}</SelectedFileImgCont>
                        </SelectedFileCont>
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
                    <FormTitle className="form_title">Upload property documents</FormTitle>
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormSubTitle>Uploading</FormSubTitle>
                      {!!documentList && documentList.length > 0 && (
                        <SelectedFileCont>
                          <div>{renderSelectedFileName(documentList, 'doc')}</div>
                          <SelectedFileImgCont>{renderSelectedFileImage(documentList)}</SelectedFileImgCont>
                        </SelectedFileCont>
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
                      <FormTitle className="form_title">Floor Wise Configuration</FormTitle>
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
                                    <CustomTextField label="Floor" name={`FloorDetails[${index}].Floor`} />
                                    <img src={chatIcon} alt="" />
                                  </FloorFieldMsgBox>
                                  <ErrorMessage component={err} name={`FloorDetails[${index}].Floor`} />
                                  <FloorFieldMsgBox>
                                    <IntegerNumberField label="Square Foot" name={`FloorDetails[${index}].SquareFoot`} />
                                    <img src={chatIcon} alt="" />
                                  </FloorFieldMsgBox>
                                  <ErrorMessage component={err} name={`FloorDetails[${index}].SquareFoot`} />
                                  <FloorFieldMsgBox>
                                    <IntegerNumberField label="Bedroom" name={`FloorDetails[${index}].BedRoom`} />
                                    <img src={chatIcon} alt="" />
                                  </FloorFieldMsgBox>
                                  <ErrorMessage component={err} name={`FloorDetails[${index}].BedRoom`} />
                                  <FloorFieldMsgBox>
                                    <IntegerNumberField label="Family" name={`FloorDetails[${index}].Family`} />
                                    <img src={chatIcon} alt="" />
                                  </FloorFieldMsgBox>
                                  <ErrorMessage component={err} name={`FloorDetails[${index}].Family`} />
                                  <FloorFieldMsgBox>
                                    <IntegerNumberField label="Kitchen" name={`FloorDetails[${index}].Kitchen`} />
                                    <img src={chatIcon} alt="" />
                                  </FloorFieldMsgBox>
                                  <ErrorMessage component={err} name={`FloorDetails[${index}].Kitchen`} />
                                  <FloorFieldMsgBox>
                                    <IntegerNumberField label="Laundry" name={`FloorDetails[${index}].Laundry`} />
                                    <img src={chatIcon} alt="" />
                                  </FloorFieldMsgBox>
                                  <ErrorMessage component={err} name={`FloorDetails[${index}].Laundry`} />
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
                          <AddAnotherCont onClick={() => handleAddFloorDetails(arrayHelpers)}>
                            <AddIcon />
                            <span>Add Another Floor</span>
                          </AddAnotherCont>
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
                      <FormTitle className="form_title">Amenities</FormTitle>
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
                      <FormTitle className="form_title">More Details</FormTitle>
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

              <div>
                <Checkbox
                  defaultChecked
                  color="default"
                  inputProps={{ 'aria-label': 'checkbox with default color' }}
                  style={{ color: '#1E3444' }}
                />
                I take full responsibility of the above information
              </div>

              <div style={{ margin: '50px 0px 200px 0px' }}>
                <Button
                  type="submit"
                  variant="contained"
                  classes={{
                    root: classes.saveBtn,
                  }}
                  style={{
                    marginLeft: '30px',
                    marginBottom: '20px',
                    textTransform: 'none',
                    backgroundColor: '#E0E0E0',
                    color: 'black',
                  }}
                >
                  SAVE AS DRAFT
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  classes={{
                    root: classes.saveBtn,
                  }}
                  style={{ marginLeft: '20px', marginBottom: '20px', textTransform: 'none' }}
                >
                  Save & Send for review
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </PropertyFormCont>
      <CustomModal show={showImgModal} toggleModal={setShowImgModal}>
        <UploadImage imageList={imageList} setImageList={setImageList} setShowImgModal={setShowImgModal} />
      </CustomModal>
      <CustomModal show={showDocModal} toggleModal={setShowDocModal}>
        <UploadDocument documentList={documentList} setDocumentList={setDocumentList} setShowDocModal={setShowDocModal} />
      </CustomModal>
    </PropertyFormWrapper>
  )
}
export default PropertyForm
