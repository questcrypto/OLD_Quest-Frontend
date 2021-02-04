import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form, ErrorMessage } from 'formik'
import { err } from 'shared/styles/styled'
import {
  useStyle,
  PropertyFormWrapper,
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

import './PropertyForm.css'

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
  squareFoot: '',
  bedRoom: '',
  family: '',
  kitchen: '',
  laundry: '',
  bath: '',
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
}
const propertyFormSchema = Yup.object().shape({
  Fname: Yup.string().required('First name is required'),
  Lname: Yup.string().required('Last name is required'),
  Email: Yup.string().required('email is required'),
  PublicAddress: Yup.string().required('Wallet public key is required'),
  PropertyType: Yup.string().required('Property Type is required'),
  PropertyName: Yup.string().required('This field is required'),
  CurrentValue: Yup.string().required('This field is required'),
  Comments: Yup.string().required('This field is required'),
  YearBuilt: Yup.date().required('This field is required'),
  Zoning: Yup.string().required('This field is required'),
  Landscaping: Yup.string().required('This field is required'),
  LotFacts: Yup.string().required('This field is required'),
  Address1: Yup.string().required('This field is required'),
  Address2: Yup.string().required('This field is required'),
  City: Yup.string().required('This field is required'),
  State: Yup.string().required('This field is required'),
  PostalCode: Yup.string().required('This field is required'),
  Subdivision: Yup.string().required('This field is required'),
  TaxId: Yup.string().required('This field is required'),
  Zoning1: Yup.string().required('This field is required'),
  SchoolDistrict: Yup.string().required('This field is required'),
  SchoolDistrict1: Yup.string().required('This field is required'),
  Elementary: Yup.string().required('This field is required'),
  JrHigh: Yup.string().required('This field is required'),
  HighSchool: Yup.string().required('This field is required'),
  Insurance: Yup.string().required('This field is required'),
  Maintenance: Yup.string().required('This field is required'),
  HOAFees: Yup.string().required('This field is required'),
  squareFoot: Yup.string().required('This field is required'),
  bedRoom: Yup.string().required('This field is required'),
  family: Yup.string().required('This field is required'),
  kitchen: Yup.string().required('This field is required'),
  laundry: Yup.string().required('This field is required'),
  bath: Yup.string().required('This field is required'),
  Amenties: Yup.string().required('This field is required'),
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
  const [showDocModal, setShowDocModal] = useState(false)
  const [documentList, setDocumentList] = useState<any>([])
  const classes = useStyle()

  const handleSubmit = (values: any) => {
    console.log('Values-->', values)
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
            <img src={CrossIcon} alt="" />
          </Grid>
        </Grid>
      )
    })
  }
  const renderSelectedFileImage = (fileList: any) => {
    return fileList.map((item: any, k: number) => {
      return (
        <div key={k} style={{ width: '70px', height: '70px', boxSizing: 'border-box' }}>
          <img src={item.path} alt="" />
        </div>
      )
    })
  }
  return (
    <>
      <div className="AddNewProperty_changelog displayFlex_pa">
        <div className="flex_ch_01 add_new_property">
          Properties / Add new property
          <br />
          <div className="flex_ch_02 add_new_property"> Add new property</div>
        </div>
        {/* <div className="flex_ch_02 change_log">Change Log</div> */}
      </div>
      <PropertyFormWrapper>
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
                        <FormTitle>Owner details</FormTitle>
                        <FormSubTitle>Lorem ipsum dolor sit </FormSubTitle>
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
                        <FormTitle>Property info</FormTitle>
                        <FormSubTitle>Lorem ipsum dolor sit </FormSubTitle>
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
                        <FormTitle>Address</FormTitle>
                        <FormSubTitle>Lorem ipsum dolor sit </FormSubTitle>
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
                        <FormTitle>Locality / Neighbourhood insight</FormTitle>
                        <FormSubTitle>Lorem ipsum dolor sit </FormSubTitle>
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
                        <FormTitle>T.I.M.E contract</FormTitle>
                        <FormSubTitle>Lorem ipsum dolor sit </FormSubTitle>
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
                      <FormTitle>Upload property images</FormTitle>
                      <FormSubTitle>Lorem ipsum dolor sit </FormSubTitle>
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
                      <FormTitle>Upload property documents</FormTitle>
                      <FormSubTitle>Lorem ipsum dolor sit </FormSubTitle>
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
                        <FormTitle>Floor Wise Configuration</FormTitle>
                        <FormSubTitle>Lorem ipsum dolor sit </FormSubTitle>
                      </FormTitleCont>
                      <FieldMsgBox>
                        <CustomTextField label="Square Foot" name="squareFoot" />
                        <img src={chatIcon} alt="" />
                      </FieldMsgBox>
                      <ErrorMessage component={err} name="squareFoot" />
                      <FieldMsgBox>
                        <CustomTextField label="Bedroom" name="bedRoom" />
                        <img src={chatIcon} alt="" />
                      </FieldMsgBox>
                      <ErrorMessage component={err} name="bedRoom" />
                      <FieldMsgBox>
                        <CustomTextField label="Family" name="family" />
                        <img src={chatIcon} alt="" />
                      </FieldMsgBox>
                      <ErrorMessage component={err} name="family" />
                      <FieldMsgBox>
                        <CustomTextField label="Kitchen" name="kitchen" />
                        <img src={chatIcon} alt="" />
                      </FieldMsgBox>
                      <ErrorMessage component={err} name="kitchen" />
                      <FieldMsgBox>
                        <CustomTextField label="Laundry" name="laundry" />
                        <img src={chatIcon} alt="" />
                      </FieldMsgBox>
                      <ErrorMessage component={err} name="laundry" />
                      <FieldMsgBox>
                        <CustomTextField label="Bath" name="bath" />
                        <img src={chatIcon} alt="" />
                      </FieldMsgBox>
                      <ErrorMessage component={err} name="bath" />
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
                        <FormTitle>Amenities</FormTitle>
                        <FormSubTitle>Lorem ipsum dolor sit </FormSubTitle>
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
                        <FormTitle>More Details</FormTitle>
                        <FormSubTitle>Lorem ipsum dolor sit </FormSubTitle>
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

                <div style={{ marginTop: '50px' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    classes={{
                      root: classes.saveBtn,
                    }}
                    style={{ marginLeft: '30px', textTransform: 'none', backgroundColor: '#E0E0E0', color: 'black' }}
                  >
                    SAVE AS DRAFT
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    classes={{
                      root: classes.saveBtn,
                    }}
                    style={{ marginLeft: '20px', textTransform: 'none' }}
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
    </>
  )
}
export default PropertyForm
