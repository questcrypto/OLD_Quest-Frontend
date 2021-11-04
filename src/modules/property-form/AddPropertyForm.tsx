import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { errorAlert } from 'logic/actions/alerts.actions'
import { Formik, Form, ErrorMessage } from 'formik'
import { err, Error } from 'shared/styles/styled'
import {
  useStyle,
  useStyle01,
  PropertyFormWrapper,
  FormHeader,
  HeaderPath,
  HeaderTitle,
  PropertyFormCont,
  FormTitle,
  FormTitleNumber,
  FormSubTitle,
  SelectedFileCont,
  SelectedFileImgCont,
  FileContainer,
  DocText,
  FloorDetailsArr,
  FloorDetailsCont,
  FloorFieldMsgBox,
  AddAnotherFloorCont,
  SubmitContainer,
  CheckBoxCont,
  CheckBoxText,
  FormButtonGroup,
} from './style'
import { initialValues, propertyFormSchema } from './formConstant'
import { Grid, Checkbox } from '@material-ui/core'
import { PrimaryButton } from 'shared/components/buttons'
import Divider from '@material-ui/core/Divider'
import CustomTextField from 'shared/components/custom-text-field'
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
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import Spinner from 'shared/loader-components/spinner'
import { propertyType, Landscaping } from 'shared/helpers/dataConstant'
import MoneyInputField from 'shared/components/money-input-field'
import history from 'modules/app/components/history'
import { Paths } from 'modules/app/components/routes/types'
import { apiBaseUrl } from 'services/global-constant'
import moment from 'moment'
import axios from 'axios'
import Web3 from 'web3'
import { ERC1155FACTORYABI } from './FACTORY_ABI'
const IPFS = require('ipfs-api')
const Buffer = require('buffer').Buffer
const ERC1155FactoryAddress = '0xb9d17d6550526fdd9fa933344f425925660c71bf'
const HOA_ADMIN = '0x7286603DBbF612bA88337693E531176A4Db63321'
const TREASURY_ADMIN = '0x9ec6df50fcF77637996AFFa60b43121F8B4F27c6'
const AddPropertyForm = (props: any) => {
  const classes = useStyle()
  const classes01 = useStyle01()
  const [showImgModal, setShowImgModal] = useState(false)
  const [imageList, setImageList] = useState<any>([])
  const [imageData, setImageData] = useState<any>([])
  const [showDocModal, setShowDocModal] = useState(false)
  const [documentList, setDocumentList] = useState<any>([])
  const [documentData, setDocumentData] = useState<any>([])
  const [showImgError, setShowImgError] = useState(false)
  const [showDocError, setShowDocError] = useState(false)
  const [permission, setPermission] = useState(false)
  const [loading, setLoading] = useState(false)
  const { errorAlert, loggedIn } = props

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const pushToBlockchain = async (
    _baseURI: any,
    _managingCompany: any,
    _rightToManagementURI: any,
    _rightToEquityURI: any,
    _rightToControlURI: any,
    _rightToResidencyURI: any,
    _rightToSubsurfaceURI: any
  ) => {
    const web3 = new Web3(window.ethereum)
    const contractInstance = new web3.eth.Contract(ERC1155FACTORYABI, ERC1155FactoryAddress)
    const receipt = await contractInstance.methods.deployQuestCryptoAsset(
      _baseURI,
      TREASURY_ADMIN,
      _managingCompany,
      _rightToManagementURI,
      _rightToEquityURI,
      _rightToControlURI,
      _rightToResidencyURI,
      _rightToSubsurfaceURI
    ).send({
      from:HOA_ADMIN
    })
    return receipt
  }

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
    console.log(values, '<--values-->')
    const ipfs = new IPFS({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
    })
    const nftCid = (await ipfs.files.add(Buffer.from(JSON.stringify(values))))[0].hash
    console.log(nftCid, '<--nftCid-->')
    const _baseURI = 'ipfs://' + nftCid
    const _managingCompany = '0x7286603DBbF612bA88337693E531176A4Db63321'
    const _rightToManagementURI = 'ipfs://'
    const _rightToEquityURI = 'ipfs://'
    const _rightToControlURI = 'ipfs://'
    const _rightToResidencyURI = 'ipfs://'
    const _rightToSubsurfaceURI = 'ipfs://'
    const receipt = await pushToBlockchain(
      _baseURI,
      _managingCompany,
      _rightToManagementURI,
      _rightToEquityURI,
      _rightToControlURI,
      _rightToResidencyURI,
      _rightToSubsurfaceURI
    )
    console.log(receipt)
    if (imageList.length > 0 && documentList.length > 0) {
      const formData = new FormData()
      const dataFiles = getFileData()
      for (const item of dataFiles) {
        formData.append('file', item)
      }
      const data = { ...values }
      delete data.FloorDetails
      Object.keys(data).forEach((key: any) => formData.append(key, data[key]))
      formData.append('PropertyImages', JSON.stringify(imageData))
      formData.append('PropertyDocs', JSON.stringify(documentData))
      formData.append('FloorDetails', JSON.stringify(values.FloorDetails))
      console.log(formData, '<--formData-->')
      try {
        setLoading(true)
        await axios.post(`${apiBaseUrl}/properties/Addproperties`, formData)
        // history.push(Paths.root)
        // history.push(Paths.dashboard)
        if (loggedIn) {
          history.push(Paths.root)
        } else {
          history.push(Paths.dashboard)
        }
      } catch (error) {
        if (!!error && error.response && error.response.data.message) {
          errorAlert(error.response.data.message)
        } else {
          errorAlert('Something went wrong , please try again')
        }
      } finally {
        setLoading(false)
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
      <FormHeader>
        <HeaderPath>
          <span>Properties</span> / Add new property
        </HeaderPath>
        <HeaderTitle>Add new property</HeaderTitle>
      </FormHeader>
      <PropertyFormCont>
        <Formik
          initialValues={initialValues}
          validationSchema={propertyFormSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values)
            setSubmitting(false)
          }}
        >
          {({ values, handleBlur, isValid }: any) => (
            <Form>
              <Grid container>
                <Grid item xs={2} className={classes.titleNumberStyle}>
                  <FormTitleNumber>1</FormTitleNumber>
                </Grid>
                <Grid item xs={10} container direction="column">
                  <Grid item className={classes.formGroup}>
                    <FormTitle>Owner details</FormTitle>
                    <CustomTextField label="First name" name="Fname" />
                    <ErrorMessage component={err} name="Fname" />
                    <CustomTextField label="Last name" name="Lname" />
                    <ErrorMessage component={err} name="Lname" />
                    <CustomTextField label="Email Address" type="email" name="Email" />
                    <ErrorMessage component={err} name="Email" />
                    <CustomTextField label="Wallet public key" name="PublicAddress" />
                    <ErrorMessage component={err} name="PublicAddress" />
                  </Grid>
                  <Divider className={classes.dividerStyle} />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={2} className={classes.titleNumberStyle}>
                  <FormTitleNumber>2</FormTitleNumber>
                </Grid>
                <Grid item xs={10} container direction="column">
                  <Grid item className={classes.formGroup}>
                    <FormTitle>Property info</FormTitle>
                    <FieldSelect label="Type of property" name="PropertyType" options={propertyType} />
                    <ErrorMessage component={err} name="PropertyType" />
                    <CustomTextField label="Property name" name="PropertyName" />
                    <ErrorMessage component={err} name="PropertyName" />
                    <MoneyInputField label="Property current value" name="CurrentValue" acceptDecimals dollarPrefix />
                    <ErrorMessage component={err} name="CurrentValue" />
                    <CustomTextField label="Comments" name="Comments" />
                    <ErrorMessage component={err} name="Comments" />
                    <FormDatePicker label="Year built" name="YearBuilt" maxDate={moment(new Date()).format('YYYY-MM-DD')} />
                    <ErrorMessage component={err} name="YearBuilt" />
                    <CustomTextField label="Zoning" name="Zoning" />
                    <ErrorMessage component={err} name="Zoning" />
                    <FieldSelect label="Landscaping" name="Landscaping" options={Landscaping} />
                    <ErrorMessage component={err} name="Landscaping" />
                    <MoneyInputField label="Lot Facts" name="Lotfacts" acceptDecimals />
                    <ErrorMessage component={err} name="Lotfacts" />
                  </Grid>
                  <Divider className={classes.dividerStyle} />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={2} className={classes.titleNumberStyle}>
                  <FormTitleNumber>3</FormTitleNumber>
                </Grid>
                <Grid item xs={10} container direction="column">
                  <Grid item className={classes.formGroup}>
                    <FormTitle>Address</FormTitle>
                    <CustomTextField label="Address 1" name="Address1" />
                    <ErrorMessage component={err} name="Address1" />
                    <CustomTextField label="Address 2" name="Address2" />
                    <ErrorMessage component={err} name="Address2" />
                    <CustomTextField label="City" name="City" />
                    <ErrorMessage component={err} name="City" />
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <CustomTextField label="State" name="State" />
                        <ErrorMessage component={err} name="State" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <IntegerNumberField label="Postal code" name="PostalCode" />
                        <ErrorMessage component={err} name="PostalCode" />
                      </Grid>
                    </Grid>

                    <CustomTextField label="Country" name="Country" />
                    <ErrorMessage component={err} name="Country" />
                    <CustomTextField label="Subdivision" name="Subdivision" />
                    <ErrorMessage component={err} name="Subdivision" />
                  </Grid>
                  <Divider className={classes.dividerStyle} />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={2} className={classes.titleNumberStyle}>
                  <FormTitleNumber>4</FormTitleNumber>
                </Grid>
                <Grid item xs={10} container direction="column">
                  <Grid item className={classes.formGroup}>
                    <FormTitle>Locality / Neighbourhood insight</FormTitle>
                    <CustomTextField label="School district" name="SchoolDistrict" />
                    <ErrorMessage component={err} name="SchoolDistrict" />
                    <CustomTextField label="Elementary" name="Elementary" />
                    <ErrorMessage component={err} name="Elementary" />
                    <CustomTextField label="Jr high" name="JrHigh" />
                    <ErrorMessage component={err} name="JrHigh" />
                    <CustomTextField label="High school" name="HighSchool" />
                    <ErrorMessage component={err} name="HighSchool" />
                  </Grid>
                  <Divider className={classes.dividerStyle} />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={2} className={classes.titleNumberStyle}>
                  <FormTitleNumber>5</FormTitleNumber>
                </Grid>
                <Grid item xs={10} container direction="column">
                  <Grid item className={classes.formGroup}>
                    <FormTitle>T.I.M.E contract</FormTitle>

                    <MoneyInputField label="Taxes" name="Taxes" dollarPrefix acceptDecimals />
                    <ErrorMessage component={err} name="Taxes" />

                    <MoneyInputField label="Insurance" name="Insurance" dollarPrefix acceptDecimals />
                    <ErrorMessage component={err} name="Insurance" />
                    <MoneyInputField label="Maintenance" name="Maintenance" dollarPrefix acceptDecimals />
                    <ErrorMessage component={err} name="Maintenance" />
                    {/* <MoneyInputField label="HOA fees" name="HOAFees" dollarPrefix acceptDecimals />
                    <ErrorMessage component={err} name="HOAFees" /> */}

                    <MoneyInputField label="Expenses" name="Expenses" dollarPrefix acceptDecimals />
                    <ErrorMessage component={err} name="Expenses" />
                  </Grid>
                  <Divider className={classes.dividerStyle} />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={2} className={classes.titleNumberStyle}>
                  <FormTitleNumber>6</FormTitleNumber>
                </Grid>
                <Grid item xs={10} container direction="column">
                  <FormTitle>Upload property images</FormTitle>
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
                  <Divider className={classes.dividerStyle} />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={2} className={classes.titleNumberStyle}>
                  <FormTitleNumber>7</FormTitleNumber>
                </Grid>
                <Grid item xs={10} container direction="column">
                  <FormTitle>Upload property documents</FormTitle>
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
                  <Divider className={classes.dividerStyle} />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={2} className={classes.titleNumberStyle}>
                  <FormTitleNumber>8</FormTitleNumber>
                </Grid>
                <Grid item xs={10} container direction="column">
                  <Grid item className={classes.formGroup}>
                    <FormTitle>Floor Wise Configuration</FormTitle>
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
                                    <IntegerNumberField label="Square Foot" name={`FloorDetails[${index}].SquareFoot`} />
                                  </FloorFieldMsgBox>
                                  <ErrorMessage component={err} name={`FloorDetails[${index}].SquareFoot`} />
                                  <FloorFieldMsgBox>
                                    <IntegerNumberField label="Bedroom" name={`FloorDetails[${index}].Bedroom`} />
                                  </FloorFieldMsgBox>
                                  <ErrorMessage component={err} name={`FloorDetails[${index}].Bedroom`} />
                                  <FloorFieldMsgBox>
                                    <IntegerNumberField label="Family" name={`FloorDetails[${index}].family`} />
                                  </FloorFieldMsgBox>
                                  <ErrorMessage component={err} name={`FloorDetails[${index}].family`} />
                                  <FloorFieldMsgBox>
                                    <IntegerNumberField label="Kitchen" name={`FloorDetails[${index}].kitchen`} />
                                  </FloorFieldMsgBox>
                                  <ErrorMessage component={err} name={`FloorDetails[${index}].kitchen`} />
                                  <FloorFieldMsgBox>
                                    <IntegerNumberField label="Laundary" name={`FloorDetails[${index}].Laundary`} />
                                  </FloorFieldMsgBox>
                                  <ErrorMessage component={err} name={`FloorDetails[${index}].Laundary`} />
                                  <FloorFieldMsgBox>
                                    <IntegerNumberField label="Bath" name={`FloorDetails[${index}].Bath`} />
                                  </FloorFieldMsgBox>
                                  <ErrorMessage component={err} name={`FloorDetails[${index}].Bath`} />
                                </AccordionDetails>
                              </Accordion>
                              {values.FloorDetails.length > 1 && (
                                <DeleteIcon className={classes01.deleteBtn2Style} onClick={() => arrayHelpers.remove(index)} />
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
                  <Divider className={classes.dividerStyle} />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={2} className={classes.titleNumberStyle}>
                  <FormTitleNumber>9</FormTitleNumber>
                </Grid>
                <Grid item xs={10} container direction="column">
                  <Grid item className={classes.formGroup}>
                    <FormTitle>Amenities</FormTitle>
                    <CustomTextField label="Heating" name="Heating" />
                    <ErrorMessage component={err} name="Heating" />
                    <CustomTextField label="AC" name="AC" />
                    <ErrorMessage component={err} name="AC" />
                    <CustomTextField label="Roof" name="Roof" />
                    <ErrorMessage component={err} name="Roof" />
                    <CustomTextField label="Floor" name="Floor" />
                    <ErrorMessage component={err} name="Floor" />
                    <CustomTextField label="Window Covering" name="WindowCovering" />
                    <ErrorMessage component={err} name="WindowCovering" />
                    <FieldSelect label="Pool" name="Pool" options={Landscaping} />
                    <ErrorMessage component={err} name="Pool" />
                    <CustomTextField label="Pool Feature" name="PoolFeature" />
                    <ErrorMessage component={err} name="PoolFeature" />
                  </Grid>
                  <Divider className={classes.dividerStyle} />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={2} className={classes.titleNumberStyle}>
                  <FormTitleNumber>10</FormTitleNumber>
                </Grid>
                <Grid item xs={10} container direction="column">
                  <Grid item className={classes.formGroup}>
                    <FormTitle>More Details</FormTitle>
                    <CustomTextField label="Style" name="Style" />
                    <ErrorMessage component={err} name="Style" />
                    <FieldSelect label="Deck" name="Deck" options={Landscaping} />
                    <ErrorMessage component={err} name="Deck" />
                    <FieldSelect label="Patio" name="Patio" options={Landscaping} />
                    <ErrorMessage component={err} name="Patio" />
                    <CustomTextField label="Garage" name="Garage" />
                    <ErrorMessage component={err} name="Garage" />
                    <FieldSelect label="Carpot" name="Carpot" options={Landscaping} />
                    <ErrorMessage component={err} name="Carpot" />
                    <IntegerNumberField label="Parking Space" name="ParkingSpace" />
                    <ErrorMessage component={err} name="ParkingSpace" />
                    <IntegerNumberField label="Fin Bsmt" name="FinBasmt" />
                    <ErrorMessage component={err} name="FinBasmt" />
                    <CustomTextField label="Basement" name="Basement" />
                    <ErrorMessage component={err} name="Basement" />
                    <FieldSelect label="Driveway" name="Driveway" options={Landscaping} />
                    <ErrorMessage component={err} name="Driveway" />
                    <CustomTextField label="Water" name="Water" />
                    <ErrorMessage component={err} name="Water" />
                    <CustomTextField label="Water Shares" name="WaterShare" />
                    <ErrorMessage component={err} name="WaterShare" />
                    <CustomTextField label="Spa" name="Spa" />
                    <ErrorMessage component={err} name="Spa" />
                  </Grid>
                  <Divider className={classes.dividerStyle} />
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
                  <PrimaryButton
                    type="submit"
                    variant="contained"
                    classes={{
                      root: classes.saveAndReviewStyle,
                    }}
                    disabled={!permission}
                  >
                    {loading ? <Spinner /> : 'Save & Send for review'}
                  </PrimaryButton>
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

const mapStateToProps = (state: any) => ({
  userInfo: state.user.userInfo,
  loggedIn: state.user.loggedIn,
})
export default connect(mapStateToProps, { errorAlert })(AddPropertyForm)
