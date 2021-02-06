import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Formik, Form, ErrorMessage } from 'formik'
import { err } from 'shared/styles/styled'
import {
  useStyle,
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
} from './style'
import Button from '@material-ui/core/Button'
import { Grid, Checkbox } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import CustomTextField from 'shared/components/custom-text-field'
import FieldSelect from 'shared/components/field-select'
import CustomModal from 'shared/custom-modal'
import UploadImage from './components/UploadImage'
import UploadDocument from './components/UploadDocument'
import Paper from '@material-ui/core/Paper'
import ImageIcon from 'assets/icons/imgIcon.svg'
import CrossIcon from 'assets/icons/crossIcon.svg'
import FileIcon from 'assets/icons/fileIcon.svg'
import chatIcon from 'assets/images/chatIcon.svg'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'

const useStyle01 = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
    height: '420px',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

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
  Subdivision: '',
  TaxId: '',
  Zoning1: '',
  SchoolDistrict: '',
  SchoolDistrict1: '',
  Elementary: '',
  JrHigh: '',
  HighSchool: '',
  Insurance: '',
  Maintenance: '',
  HOAFees: '',
  Amenties: '',
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
  FloorDetails: {
    squareFoot: '',
    bedRoom: '',
    family: '',
    kitchen: '',
    laundry: '',
    bath: '',
  },
}
const propertyFormSchema = Yup.object().shape({
  Fname: Yup.string().required('First name is required'),
  Lname: Yup.string().required('Last name is required'),
  Email: Yup.string().required('email is required'),
  PublicAddress: Yup.string().required('Wallet public key is required'),
  PropertyName: Yup.string().required('This field is required'),
  CurrentValue: Yup.number().integer().required('This field is required'),
  Comments: Yup.string().required('This field is required'),
  YearBuilt: Yup.date()
    .default(function () {
      return new Date()
    })
    .required('This field is required'),
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
  Subdivision: Yup.string().required('This field is required'),
  TaxId: Yup.string().required('This field is required'),
  Zoning1: Yup.string().required('This field is required'),
  SchoolDistrict: Yup.string().required('This field is required'),
  SchoolDistrict1: Yup.string().required('This field is required'),
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
  Amenties: Yup.number().integer().required('This field is required'),
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

let arr01: number[] = [1]

const PropertyForm = () => {
  const [showImgModal, setShowImgModal] = useState(false)
  const [trackArray, settrackArray] = useState({
    arr01,
  })
  const [imageList, setImageList] = useState<any>([])
  const [showDocModal, setShowDocModal] = useState(false)
  const [documentList, setDocumentList] = useState<any>([])
  const classes = useStyle()
  const classes01 = useStyle01()

  const handleSubmit = (values: any) => {
    console.log('Values-->', values)
  }
  const handleAddFloor = () => {
    // console.log("clicked")
    // console.log("arr01.length ", trackArray.arr01.length)
    // console.log("trackArray ", trackArray)
    arr01.push(arr01.length + 1)
    settrackArray({ arr01: arr01 })
  }

  const handleRemoveFloor = (idx: number) => {
    let someArray = trackArray.arr01
    someArray.splice(idx, 1)
    settrackArray({ arr01: someArray })
  }

  useEffect(() => {}, [trackArray])

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
            <img src={CrossIcon} alt="" />
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
          {() => (
            <Form>
              <Grid container xs={12}>
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
                    <ErrorMessage component={err} name="email" />

                    <FieldMsgBox>
                      <CustomTextField label="Wallet public key" name="PublicAddress" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>

                    <ErrorMessage component={err} name="PublicAddress" />
                  </Grid>
                  <Divider classes={{ root: classes.dividerStyle }} />
                </Grid>
              </Grid>
              <Grid container xs={12}>
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
                      <CustomTextField label="Property current value" name="CurrentValue" />
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
                    <ErrorMessage component={err} name="zoning" />
                    <FieldMsgBox>
                      <CustomTextField label="Landscaping" name="Landscaping" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Landscaping" />
                    <FieldMsgBox>
                      <CustomTextField label="Lot facts" name="LotFacts" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="LotFacts" />
                  </Grid>
                  <Divider classes={{ root: classes.dividerStyle }} />
                </Grid>
              </Grid>

              <Grid container xs={12}>
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
                    <Grid container spacing={1} xs={12}>
                      <Grid item xs={12} sm={6}>
                        <CustomTextField label="State" name="State" />
                        <ErrorMessage component={err} name="State" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FieldMsgBox>
                          <CustomTextField label="Postal code" name="PostalCode" />
                          <img src={chatIcon} alt="" />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="PostalCode" />
                      </Grid>
                    </Grid>
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
                    <FieldMsgBox>
                      <CustomTextField label="Zoning" name="Zoning1" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Zoning1" />
                    <FieldMsgBox>
                      <CustomTextField label="School district" name="SchoolDistrict" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="SchoolDistrict" />
                  </Grid>
                  <Divider classes={{ root: classes.dividerStyle }} />
                </Grid>
              </Grid>

              <Grid container xs={12}>
                <Grid item xs={1}>
                  <FormTitleNumber>4</FormTitleNumber>
                </Grid>
                <Grid item xs={11} container direction="column">
                  <Grid item className={classes.formGroup}>
                    <FormTitleCont>
                      <FormTitle className="form_title">Locality / Neighbourhood insight</FormTitle>
                    </FormTitleCont>
                    <FieldMsgBox>
                      <CustomTextField label="School district" name="SchoolDistrict1" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="SchoolDistrict1" />
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

              <Grid container xs={12}>
                <Grid item xs={1}>
                  <FormTitleNumber>5</FormTitleNumber>
                </Grid>
                <Grid item xs={11} container direction="column">
                  <Grid item className={classes.formGroup}>
                    <FormTitleCont>
                      <FormTitle className="form_title">T.I.M.E contract</FormTitle>
                    </FormTitleCont>
                    <FieldMsgBox>
                      <CustomTextField label="Insurance" name="Insurance" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Insurance" />
                    <FieldMsgBox>
                      <CustomTextField label="Maintenance" name="Maintenance" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Maintenance" />
                    <FieldMsgBox>
                      <CustomTextField label="HOA fees" name="HOAFees" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="HOAFees" />
                  </Grid>
                  <Divider classes={{ root: classes.dividerStyle }} />
                </Grid>
              </Grid>

              <Grid container xs={12}>
                <Grid item xs={1}>
                  <FormTitleNumber>6</FormTitleNumber>
                </Grid>
                <Grid item xs={11} container direction="column">
                  <FormTitleCont>
                    <FormTitle className="form_title">Upload property images</FormTitle>
                  </FormTitleCont>
                  <Grid container spacing={3} xs={12}>
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

              <Grid container xs={12}>
                <Grid item xs={1}>
                  <FormTitleNumber>7</FormTitleNumber>
                </Grid>
                <Grid item xs={11} container direction="column">
                  <FormTitleCont>
                    <FormTitle className="form_title">Upload property documents</FormTitle>
                  </FormTitleCont>
                  <Grid container spacing={3} xs={12}>
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

              <Grid container xs={12}>
                <Grid item xs={1}>
                  <FormTitleNumber>8</FormTitleNumber>
                </Grid>
                <Grid item xs={11} container direction="column">
                  <Grid item className={classes.formGroup}>
                    <FormTitleCont>
                      <FormTitle className="form_title">Floor Wise Configuration</FormTitle>
                    </FormTitleCont>

                    {trackArray.arr01.map((floor, idx) => (
                      <div key={idx} className="displayFlex">
                        <div className="Flex01_floor">
                          <Accordion defaultExpanded style={{ marginTop: '20px', width: '420px', position: 'relative' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
                              <div className={classes01.column}>
                                <Typography className={classes01.heading}>Floor {floor}</Typography>
                              </div>
                            </AccordionSummary>
                            <AccordionDetails className={classes01.details}>
                              <div style={{ width: '450px', position: 'absolute', top: '60px' }}>
                                <FieldMsgBox>
                                  <CustomTextField label="Square Foot" name="FloorDetails.squareFoot" />
                                  <img src={chatIcon} alt="" />
                                </FieldMsgBox>
                                <ErrorMessage component={err} name="FloorDetails.squareFoot" />
                                <FieldMsgBox>
                                  <CustomTextField label="Bedroom" name="FloorDetails.bedRoom" />
                                  <img src={chatIcon} alt="" />
                                </FieldMsgBox>
                                <ErrorMessage component={err} name="FloorDetails.bedRoom" />
                                <FieldMsgBox>
                                  <CustomTextField label="Family" name="FloorDetails.family" />
                                  <img src={chatIcon} alt="" />
                                </FieldMsgBox>
                                <ErrorMessage component={err} name="FloorDetails.family" />
                                <FieldMsgBox>
                                  <CustomTextField label="Kitchen" name="FloorDetails.kitchen" />
                                  <img src={chatIcon} alt="" />
                                </FieldMsgBox>
                                <ErrorMessage component={err} name="FloorDetails.kitchen" />
                                <FieldMsgBox>
                                  <CustomTextField label="Laundry" name="FloorDetails.laundry" />
                                  <img src={chatIcon} alt="" />
                                </FieldMsgBox>
                                <ErrorMessage component={err} name="FloorDetails.laundry" />
                                <FieldMsgBox>
                                  <CustomTextField label="Bath" name="FloorDetails.bath" />
                                  <img src={chatIcon} alt="" />
                                </FieldMsgBox>
                                <ErrorMessage component={err} name="FloorDetails.bath" />
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                        {idx !== 0 && (
                          <div className="Flex02_floor" onClick={() => handleRemoveFloor(idx)}>
                            <DeleteIcon style={{ margin: '30px 0px 0px 10px', color: 'red', cursor: 'pointer' }} />
                          </div>
                        )}
                      </div>
                    ))}
                    <div style={{ position: 'relative', cursor: 'pointer' }} onClick={handleAddFloor}>
                      {' '}
                      <AddIcon style={{ marginTop: '10px' }} />{' '}
                      <span style={{ marginTop: '13px', position: 'absolute' }}>Add Another Floor</span>{' '}
                    </div>
                  </Grid>

                  <Divider classes={{ root: classes.dividerStyle }} />
                </Grid>
              </Grid>

              <Grid container xs={12}>
                <Grid item xs={1}>
                  <FormTitleNumber>9</FormTitleNumber>
                </Grid>
                <Grid item xs={11} container direction="column">
                  <Grid item className={classes.formGroup}>
                    <FormTitleCont>
                      <FormTitle className="form_title">Amenities</FormTitle>
                    </FormTitleCont>
                    <FieldMsgBox>
                      <CustomTextField label="Heating" name="Amenties" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="Amenties" />
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

              <Grid container xs={12}>
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
                      <CustomTextField label="Parking Space" name="ParkingSpace" />
                      <img src={chatIcon} alt="" />
                    </FieldMsgBox>
                    <ErrorMessage component={err} name="ParkingSpace" />
                    <FieldMsgBox>
                      <CustomTextField label="Fin Bsmt" name="FinBasmt" />
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
