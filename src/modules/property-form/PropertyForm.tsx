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
} from './style'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
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

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  walletPubKey: '',
  propertyType: '',
  propertyName: '',
  propertyCurrentValue: '',
  comments: '',
  yearBuilt: '',
  zoning: '',
  landscaping: '',
  lotFacts: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  postalCode: '',
  subdivision: '',
  taxId: '',
  zoning2: '',
  schoolDistrict: '',
  schoolDistrict2: '',
  elementary: '',
  jrHigh: '',
  highSchool: '',
  insurance: '',
  maintenance: '',
  hoaFees: '',
  squareFoot: '',
  bedRoom: '',
  family: '',
  kitchen: '',
  laundry: '',
  bath: '',
  heating: '',
  ac: '',
  roof: '',
  floor: '',
  windowCovering: '',
  pool: '',
  poolFeature: '',
  style: '',
  deck: '',
  patio: '',
  garage: '',
  carport: '',
  parkingSpace: '',
  finBsmt: '',
  basement: '',
  driveway: '',
  water: '',
  waterShares: '',
  spa: '',
}
const propertyFormSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().required('email is required'),
  walletPubKey: Yup.string().required('Wallet public key is required'),
  propertyType: Yup.string().required('Property Type is required'),
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
    <PropertyFormWrapper>
      <PropertyFormCont>
        <Formik
          initialValues={initialValues}
          validationSchema={propertyFormSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleSubmit(values)
            setSubmitting(false)
            resetForm()
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
                    <CustomTextField label="First name" name="firstName" />
                    <ErrorMessage component={err} name="firstName" />
                    <CustomTextField label="Last name" name="lastName" />
                    <ErrorMessage component={err} name="lastName" />
                    <CustomTextField label="Email Address" type="email" name="email" />
                    <ErrorMessage component={err} name="email" />
                    <CustomTextField label="Wallet public key" name="walletPubKey" />
                    <ErrorMessage component={err} name="walletPubKey" />
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
                    <FieldSelect label="Type of property" name="propertyType" />
                    <ErrorMessage component={err} name="propertyType" />
                    <CustomTextField label="Property name" name="propertyName" />
                    <ErrorMessage component={err} name="propertyName" />
                    <CustomTextField label="Property current value" name="propertyCurrentValue" />
                    <ErrorMessage component={err} name="propertyCurrentValue" />
                    <CustomTextField label="Comments" name="comments" />
                    <ErrorMessage component={err} name="comments" />
                    <CustomTextField label="Year built" name="yearBuilt" />
                    <ErrorMessage component={err} name="yearBuilt" />
                    <CustomTextField label="Zoning" name="zoning" />
                    <ErrorMessage component={err} name="zoning" />
                    <CustomTextField label="Landscaping" name="landscaping" />
                    <ErrorMessage component={err} name="landscaping" />
                    <CustomTextField label="Lot facts" name="lotFacts" />
                    <ErrorMessage component={err} name="lotFacts" />
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
                    <FieldSelect label="Address 1" name="address1" />
                    <ErrorMessage component={err} name="address1" />
                    <CustomTextField label="Address 2" name="address2" />
                    <ErrorMessage component={err} name="address2" />
                    <CustomTextField label="City" name="city" />
                    <ErrorMessage component={err} name="city" />
                    <Grid container spacing={1} xs={12}>
                      <Grid item xs={12} sm={6}>
                        <CustomTextField label="State" name="state" />
                        <ErrorMessage component={err} name="state" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CustomTextField label="Postal code" name="postalCode" />
                        <ErrorMessage component={err} name="postalCode" />
                      </Grid>
                    </Grid>
                    <CustomTextField label="Subdivision" name="subdivision" />
                    <ErrorMessage component={err} name="subdivision" />
                    <CustomTextField label="Tax Id" name="taxId" />
                    <ErrorMessage component={err} name="taxId" />
                    <CustomTextField label="Zoning" name="zoning2" />
                    <ErrorMessage component={err} name="zoning2" />
                    <CustomTextField label="School district" name="schoolDistrict" />
                    <ErrorMessage component={err} name="schoolDistrict" />
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
                    <CustomTextField label="School district" name="schoolDistrict2" />
                    <ErrorMessage component={err} name="schoolDistrict2" />
                    <CustomTextField label="Elementary" name="elementary" />
                    <ErrorMessage component={err} name="elementary" />
                    <CustomTextField label="Jr high" name="jrHigh" />
                    <ErrorMessage component={err} name="jrHigh" />
                    <CustomTextField label="High school" name="highSchool" />
                    <ErrorMessage component={err} name="highSchool" />
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
                    <CustomTextField label="Insurance" name="insurance" />
                    <ErrorMessage component={err} name="insurance" />
                    <CustomTextField label="Maintenance" name="maintenance" />
                    <ErrorMessage component={err} name="maintenance" />
                    <CustomTextField label="HOA fees" name="hoaFees" />
                    <ErrorMessage component={err} name="hoaFees" />
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
                    <CustomTextField label="Square Foot" name="squareFoot" />
                    <ErrorMessage component={err} name="squareFoot" />
                    <CustomTextField label="Bedroom" name="bedRoom" />
                    <ErrorMessage component={err} name="bedRoom" />
                    <CustomTextField label="Family" name="family" />
                    <ErrorMessage component={err} name="family" />
                    <CustomTextField label="Kitchen" name="kitchen" />
                    <ErrorMessage component={err} name="kitchen" />
                    <CustomTextField label="Laundry" name="laundry" />
                    <ErrorMessage component={err} name="laundry" />
                    <CustomTextField label="Bath" name="bath" />
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
                    <CustomTextField label="Heating" name="heating" />
                    <ErrorMessage component={err} name="heating" />
                    <CustomTextField label="AC" name="ac" />
                    <ErrorMessage component={err} name="ac" />
                    <CustomTextField label="Roof" name="roof" />
                    <ErrorMessage component={err} name="roof" />
                    <CustomTextField label="Floor" name="floor" />
                    <ErrorMessage component={err} name="floor" />
                    <CustomTextField label="Window Covering" name="windowCovering" />
                    <ErrorMessage component={err} name="windowCovering" />
                    <CustomTextField label="Pool" name="pool" />
                    <ErrorMessage component={err} name="pool" />
                    <CustomTextField label="Pool Feature" name="poolFeature" />
                    <ErrorMessage component={err} name="poolFeature" />
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
                    <CustomTextField label="Style" name="style" />
                    <ErrorMessage component={err} name="style" />
                    <CustomTextField label="Deck" name="deck" />
                    <ErrorMessage component={err} name="deck" />
                    <CustomTextField label="Patio" name="patio" />
                    <ErrorMessage component={err} name="patio" />
                    <CustomTextField label="Garage" name="garage" />
                    <ErrorMessage component={err} name="garage" />
                    <CustomTextField label="Carport" name="carport" />
                    <ErrorMessage component={err} name="carport" />
                    <CustomTextField label="Parking Space" name="parkingSpace" />
                    <ErrorMessage component={err} name="parkingSpace" />
                    <CustomTextField label="Fin Bsmt" name="finBsmt" />
                    <ErrorMessage component={err} name="finBsmt" />
                    <CustomTextField label="Basement" name="basement" />
                    <ErrorMessage component={err} name="basement" />
                    <CustomTextField label="Driveway" name="driveway" />
                    <ErrorMessage component={err} name="driveway" />
                    <CustomTextField label="Water" name="water" />
                    <ErrorMessage component={err} name="water" />
                    <CustomTextField label="Water Shares" name="waterShares" />
                    <ErrorMessage component={err} name="waterShares" />
                    <CustomTextField label="Spa" name="spa" />
                    <ErrorMessage component={err} name="spa" />
                  </Grid>
                  <Divider classes={{ root: classes.dividerStyle }} />
                </Grid>
              </Grid>

              <div style={{ marginTop: '50px' }}>
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
