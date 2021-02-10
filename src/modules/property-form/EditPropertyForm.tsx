import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { Formik, Form, ErrorMessage } from 'formik'
import { err } from 'shared/styles/styled'
import {
  useStyle,
  useStyle01,
  PropertyFormWrapper,
  FormHeader,
  HeaderPath,
  EditFormTitle,
  EditFormCont,
  FormTitle,
  FormTitleNumber,
  UpLoadedDocCont,
  UpLoadedDocImages,
  FieldMsgBox,
  FloorDetailsArr,
  FloorDetailsCont,
  FloorFieldMsgBox,
  AddAnotherFloorCont,
  SubmitContainer,
  CheckBoxCont,
  CheckBoxText,
  FormButtonGroup,
  CommentWrapper,
  CommentHeader,
  CommentTitleCont,
  CommentContainer,
  CommentInfo,
  SenderName,
  CommentText,
} from './style'
import { initialValues, propertyFormSchema } from './formConstant'
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
import FileIcon from 'assets/icons/fileIcon.svg'
import chatIcon from 'assets/images/chatIcon.svg'
import CrossIcon from 'assets/icons/crossIcon.svg'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import Spinner from 'shared/loader-components/spinner'
import { propertyType } from 'shared/helpers/dataConstant'
import moment from 'moment'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'
import history from 'modules/app/components/history'
import { Paths } from 'modules/app/components/routes/types'

const EditPropertyForm = (props: any) => {
  const [initialData, setInitialData] = useState(initialValues)
  const [showImgModal, setShowImgModal] = useState(false)
  const [imageList, setImageList] = useState<any>([])
  const [imageData, setImageData] = useState<any>([])
  const [showDocModal, setShowDocModal] = useState(false)
  const [documentList, setDocumentList] = useState<any>([])
  const [documentData, setDocumentData] = useState<any>([])
  const [permission, setPermission] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showComments, setShowComments] = useState(true)
  const classes = useStyle()
  const classes01 = useStyle01()

  useEffect(() => {
    const propertyId = props.match.params.propertyId
    const getPropertyDetails = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/properties/GetSingleProperty/${propertyId}`)
        if (!!res && res.data) {
          const images = []
          const docs = []
          for (const item of res.data.getDocs) {
            if (item.type === 0) {
              images.push(item)
            }
            if (item.type === 1) {
              docs.push(item)
            }
          }

          setImageList([...images])
          setDocumentList([...docs])
          const data = {
            ...res.data.propertyDetails,
            FloorDetails: [...res.data.floordetail],
            YearBuilt: moment(res.data.propertyDetails.YearBuilt).format('YYYY'),
          }
          setInitialData({ ...data })
        }
      } catch (error) {}
    }
    getPropertyDetails()
  }, [props.match.params.propertyId])

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true)
      await axios.post(`${apiBaseUrl}/properties/UpdateProperty`, values)
      history.push(Paths.root)
    } catch (error) {
      console.log('error==>', error)
    } finally {
      setLoading(false)
    }
  }
  const handleAddFloorDetails = (arrayHelpers: any) => {
    arrayHelpers.push({ id: Math.random(), floor: '', SquareFoot: '', Bedroom: '', family: '', kitchen: '', Laundary: '', Bath: '' })
  }

  const renderUploadedImageDoc = (fileList: any) => {
    return fileList.map((item: any, k: number) => {
      return (
        <UpLoadedDocImages key={k}>
          <img src={item.type === 0 ? `${apiBaseUrl}/${item.filename}` : FileIcon} alt="" />
          <p>{item.Name}</p>
        </UpLoadedDocImages>
      )
    })
  }
  const renderComment = () => {
    return (
      <div>
        <CommentInfo>
          <SenderName>Barrera Ramsey</SenderName>
          <CommentText>11:26 AM - 23 Oct</CommentText>
        </CommentInfo>
        <CommentText>Please enter first name correctly, As this name already exist in our portal</CommentText>
        <Divider className={classes.commentDividerStyle} />
        <CommentInfo>
          <SenderName>Barrera Ramsey</SenderName>
          <CommentText>11:26 AM - 23 Oct</CommentText>
        </CommentInfo>
        <CommentText>Please enter first name correctly, As this name already exist in our portal</CommentText>
        <Divider className={classes.commentDividerStyle} />
      </div>
    )
  }

  return (
    <PropertyFormWrapper>
      <FormHeader>
        <HeaderPath>
          <span>Properties</span> / Edit property from
        </HeaderPath>
      </FormHeader>
      <Grid container spacing={4} alignItems="stretch">
        <Grid item xs={8}>
          <EditFormTitle>Edit property</EditFormTitle>
          <EditFormCont>
            <Formik
              enableReinitialize
              initialValues={initialData}
              validationSchema={propertyFormSchema}
              onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values)
                setSubmitting(false)
              }}
            >
              {({ values }: any) => (
                <Form>
                  <Grid container>
                    <Grid item xs={2} className={classes.titleNumberStyle}>
                      <FormTitleNumber>1</FormTitleNumber>
                    </Grid>

                    <Grid item xs={10} container direction="column">
                      <Grid item className={classes.editFormGroup}>
                        <FormTitle>Owner details</FormTitle>
                        <FieldMsgBox>
                          <CustomTextField label="First name" name="Fname" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Fname" />
                        <FieldMsgBox>
                          <CustomTextField label="Last name" name="Lname" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Lname" />
                        <FieldMsgBox>
                          <CustomTextField label="Email Address" type="email" name="Email" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Email" />
                        <FieldMsgBox>
                          <CustomTextField label="Wallet public key" name="PublicAddress" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="PublicAddress" />
                      </Grid>
                      <Divider className={classes.editDividerStyle} />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={2} className={classes.titleNumberStyle}>
                      <FormTitleNumber>2</FormTitleNumber>
                    </Grid>
                    <Grid item xs={10} container direction="column">
                      <Grid item className={classes.editFormGroup}>
                        <FormTitle>Property info</FormTitle>
                        <FieldMsgBox>
                          <FieldSelect label="Type of property" name="PropertyType" options={propertyType} />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="PropertyType" />
                        <FieldMsgBox>
                          <CustomTextField label="Property name" name="PropertyName" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="PropertyName" />
                        <FieldMsgBox>
                          <FloatNumberField label="Property current value" name="CurrentValue" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="CurrentValue" />
                        <FieldMsgBox>
                          <CustomTextField label="Comments" name="Comments" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Comments" />
                        <FieldMsgBox>
                          <FormDatePicker label="Year built" name="YearBuilt" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="YearBuilt" />
                        <FieldMsgBox>
                          <CustomTextField label="Zoning" name="Zoning" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Zoning" />
                        <FieldMsgBox>
                          <CustomTextField label="Landscaping" name="Landscaping" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Landscaping" />
                        <FieldMsgBox>
                          <IntegerNumberField label="Lot Facts" name="Lotfacts" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Lotfacts" />
                      </Grid>
                      <Divider className={classes.editDividerStyle} />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={2} className={classes.titleNumberStyle}>
                      <FormTitleNumber>3</FormTitleNumber>
                    </Grid>
                    <Grid item xs={10} container direction="column">
                      <Grid item className={classes.editFormGroup}>
                        <FormTitle>Address</FormTitle>
                        <FieldMsgBox>
                          <CustomTextField label="Address 1" name="Address1" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Address1" />
                        <FieldMsgBox>
                          <CustomTextField label="Address 2" name="Address2" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Address2" />
                        <FieldMsgBox>
                          <CustomTextField label="City" name="City" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
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
                              <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="PostalCode" />
                          </Grid>
                        </Grid>
                        <FieldMsgBox>
                          <CustomTextField label="Country" name="Country" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Country" />
                        <FieldMsgBox>
                          <CustomTextField label="Subdivision" name="Subdivision" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Subdivision" />
                      </Grid>
                      <Divider className={classes.editDividerStyle} />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={2} className={classes.titleNumberStyle}>
                      <FormTitleNumber>4</FormTitleNumber>
                    </Grid>
                    <Grid item xs={10} container direction="column">
                      <Grid item className={classes.editFormGroup}>
                        <FormTitle>Locality / Neighbourhood insight</FormTitle>
                        <FieldMsgBox>
                          <CustomTextField label="School district" name="SchoolDistrict" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="SchoolDistrict" />
                        <FieldMsgBox>
                          <CustomTextField label="Elementary" name="Elementary" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Elementary" />
                        <FieldMsgBox>
                          <CustomTextField label="Jr high" name="JrHigh" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="JrHigh" />
                        <FieldMsgBox>
                          <CustomTextField label="High school" name="HighSchool" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="HighSchool" />
                      </Grid>
                      <Divider className={classes.editDividerStyle} />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={2} className={classes.titleNumberStyle}>
                      <FormTitleNumber>5</FormTitleNumber>
                    </Grid>
                    <Grid item xs={10} container direction="column">
                      <Grid item className={classes.editFormGroup}>
                        <FormTitle>T.I.M.E contract</FormTitle>
                        <FieldMsgBox>
                          <IntegerNumberField label="Insurance" name="Insurance" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Insurance" />
                        <FieldMsgBox>
                          <IntegerNumberField label="Maintenance" name="Maintenance" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Maintenance" />
                        <FieldMsgBox>
                          <IntegerNumberField label="HOA fees" name="HOAFees" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="HOAFees" />
                      </Grid>
                      <Divider className={classes.editDividerStyle} />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={2} className={classes.titleNumberStyle}>
                      <FormTitleNumber>6</FormTitleNumber>
                    </Grid>
                    <Grid item xs={10} container direction="column">
                      <FormTitle>Uploaded property images</FormTitle>
                      <UpLoadedDocCont>{renderUploadedImageDoc(imageList)}</UpLoadedDocCont>
                      <Divider className={classes.editDividerStyle} />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={2} className={classes.titleNumberStyle}>
                      <FormTitleNumber>7</FormTitleNumber>
                    </Grid>
                    <Grid item xs={10} container direction="column">
                      <FormTitle>Uploaded property documents</FormTitle>
                      <UpLoadedDocCont>{renderUploadedImageDoc(documentList)}</UpLoadedDocCont>
                      <Divider className={classes.editDividerStyle} />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={2} className={classes.titleNumberStyle}>
                      <FormTitleNumber>8</FormTitleNumber>
                    </Grid>
                    <Grid item xs={10} container direction="column">
                      <Grid item className={classes.editFormGroup}>
                        <FormTitle>Floor Wise Configuration</FormTitle>
                        <FloorDetailsArr
                          name="FloorDetails"
                          render={(arrayHelpers) => (
                            <div>
                              {values.FloorDetails.map((ref: any, index: number) => (
                                <FloorDetailsCont key={ref.id}>
                                  <Accordion defaultExpanded className={classes.accordionStyle}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes01.headerStyle}>
                                      <Typography className={classes01.heading}>Floor {index + 1}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className={classes01.detailsCont}>
                                      <FloorFieldMsgBox>
                                        <IntegerNumberField label="Square Foot" name={`FloorDetails[${index}].SquareFoot`} />
                                        <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                                      </FloorFieldMsgBox>
                                      <ErrorMessage component={err} name={`FloorDetails[${index}].SquareFoot`} />
                                      <FloorFieldMsgBox>
                                        <IntegerNumberField label="Bedroom" name={`FloorDetails[${index}].Bedroom`} />
                                        <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                                      </FloorFieldMsgBox>
                                      <ErrorMessage component={err} name={`FloorDetails[${index}].Bedroom`} />
                                      <FloorFieldMsgBox>
                                        <IntegerNumberField label="Family" name={`FloorDetails[${index}].family`} />
                                        <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                                      </FloorFieldMsgBox>
                                      <ErrorMessage component={err} name={`FloorDetails[${index}].family`} />
                                      <FloorFieldMsgBox>
                                        <IntegerNumberField label="Kitchen" name={`FloorDetails[${index}].kitchen`} />
                                        <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                                      </FloorFieldMsgBox>
                                      <ErrorMessage component={err} name={`FloorDetails[${index}].kitchen`} />
                                      <FloorFieldMsgBox>
                                        <IntegerNumberField label="Laundary" name={`FloorDetails[${index}].Laundary`} />
                                        <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                                      </FloorFieldMsgBox>
                                      <ErrorMessage component={err} name={`FloorDetails[${index}].Laundary`} />
                                      <FloorFieldMsgBox>
                                        <IntegerNumberField label="Bath" name={`FloorDetails[${index}].Bath`} />
                                        <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
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

                      <Divider className={classes.editDividerStyle} />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={2} className={classes.titleNumberStyle}>
                      <FormTitleNumber>9</FormTitleNumber>
                    </Grid>
                    <Grid item xs={10} container direction="column">
                      <Grid item className={classes.editFormGroup}>
                        <FormTitle>Amenities</FormTitle>
                        <FieldMsgBox>
                          <CustomTextField label="Heating" name="Heating" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Heating" />
                        <FieldMsgBox>
                          <CustomTextField label="AC" name="AC" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="AC" />
                        <FieldMsgBox>
                          <CustomTextField label="Roof" name="Roof" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Roof" />
                        <FieldMsgBox>
                          <CustomTextField label="Floor" name="Floor" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Floor" />
                        <FieldMsgBox>
                          <CustomTextField label="Window Covering" name="WindowCovering" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="WindowCovering" />
                        <FieldMsgBox>
                          <CustomTextField label="Pool" name="Pool" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Pool" />
                        <FieldMsgBox>
                          <CustomTextField label="Pool Feature" name="PoolFeature" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="PoolFeature" />
                      </Grid>
                      <Divider className={classes.editDividerStyle} />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={2} className={classes.titleNumberStyle}>
                      <FormTitleNumber>10</FormTitleNumber>
                    </Grid>
                    <Grid item xs={10} container direction="column">
                      <Grid item className={classes.editFormGroup}>
                        <FormTitle>More Details</FormTitle>
                        <FieldMsgBox>
                          <CustomTextField label="Style" name="Style" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Style" />
                        <FieldMsgBox>
                          <CustomTextField label="Deck" name="Deck" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Deck" />
                        <FieldMsgBox>
                          <CustomTextField label="Patio" name="Patio" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Patio" />
                        <FieldMsgBox>
                          <CustomTextField label="Garage" name="Garage" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Garage" />
                        <FieldMsgBox>
                          <CustomTextField label="Carport" name="Carpot" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Carpot" />
                        <FieldMsgBox>
                          <IntegerNumberField label="Parking Space" name="ParkingSpace" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="ParkingSpace" />
                        <FieldMsgBox>
                          <IntegerNumberField label="Fin Bsmt" name="FinBasmt" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="FinBasmt" />
                        <FieldMsgBox>
                          <CustomTextField label="Basement" name="Basement" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Basement" />
                        <FieldMsgBox>
                          <CustomTextField label="Driveway" name="Driveway" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Driveway" />
                        <FieldMsgBox>
                          <CustomTextField label="Water" name="Water" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Water" />
                        <FieldMsgBox>
                          <CustomTextField label="Water Shares" name="WaterShare" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="WaterShare" />
                        <FieldMsgBox>
                          <CustomTextField label="Spa" name="Spa" />
                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Spa" />
                      </Grid>
                      <Divider className={classes.editDividerStyle} />
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
                        {loading ? <Spinner /> : 'Save & Send for review'}
                      </Button>
                    </FormButtonGroup>
                  </SubmitContainer>
                </Form>
              )}
            </Formik>
          </EditFormCont>
        </Grid>
        <Grid item xs={4}>
          <CommentWrapper showComments={showComments}>
            <CommentHeader>
              <CommentTitleCont>
                <EditFormTitle>Comments</EditFormTitle>
                <img src={CrossIcon} alt="" onClick={() => setShowComments(false)} />
              </CommentTitleCont>
            </CommentHeader>
            <CommentContainer>{renderComment()}</CommentContainer>
          </CommentWrapper>
        </Grid>
      </Grid>

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
export default withRouter(EditPropertyForm)
