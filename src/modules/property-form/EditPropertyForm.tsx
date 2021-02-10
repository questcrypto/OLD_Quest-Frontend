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
import Badge from '@material-ui/core/Badge'
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
                          <Badge badgeContent={2} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Fname" />
                        <FieldMsgBox>
                          <CustomTextField label="Last name" name="Lname" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Lname" />
                        <FieldMsgBox>
                          <CustomTextField label="Email Address" type="email" name="Email" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Email" />
                        <FieldMsgBox>
                          <CustomTextField label="Wallet public key" name="PublicAddress" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
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
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="PropertyType" />
                        <FieldMsgBox>
                          <CustomTextField label="Property name" name="PropertyName" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="PropertyName" />
                        <FieldMsgBox>
                          <FloatNumberField label="Property current value" name="CurrentValue" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="CurrentValue" />
                        <FieldMsgBox>
                          <CustomTextField label="Comments" name="Comments" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Comments" />
                        <FieldMsgBox>
                          <FormDatePicker label="Year built" name="YearBuilt" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="YearBuilt" />
                        <FieldMsgBox>
                          <CustomTextField label="Zoning" name="Zoning" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Zoning" />
                        <FieldMsgBox>
                          <CustomTextField label="Landscaping" name="Landscaping" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Landscaping" />
                        <FieldMsgBox>
                          <IntegerNumberField label="Lot Facts" name="Lotfacts" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
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
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Address1" />
                        <FieldMsgBox>
                          <CustomTextField label="Address 2" name="Address2" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Address2" />
                        <FieldMsgBox>
                          <CustomTextField label="City" name="City" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="City" />
                        <FieldMsgBox>
                          <CustomTextField label="State" name="State" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="State" />

                        <FieldMsgBox>
                          <IntegerNumberField label="Postal code" name="PostalCode" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="PostalCode" />

                        <FieldMsgBox>
                          <CustomTextField label="Country" name="Country" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Country" />
                        <FieldMsgBox>
                          <CustomTextField label="Subdivision" name="Subdivision" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
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
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="SchoolDistrict" />
                        <FieldMsgBox>
                          <CustomTextField label="Elementary" name="Elementary" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Elementary" />
                        <FieldMsgBox>
                          <CustomTextField label="Jr high" name="JrHigh" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="JrHigh" />
                        <FieldMsgBox>
                          <CustomTextField label="High school" name="HighSchool" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
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
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Insurance" />
                        <FieldMsgBox>
                          <IntegerNumberField label="Maintenance" name="Maintenance" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Maintenance" />
                        <FieldMsgBox>
                          <IntegerNumberField label="HOA fees" name="HOAFees" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
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
                                        <Badge badgeContent={0} color="secondary">
                                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                                        </Badge>
                                      </FloorFieldMsgBox>
                                      <ErrorMessage component={err} name={`FloorDetails[${index}].SquareFoot`} />
                                      <FloorFieldMsgBox>
                                        <IntegerNumberField label="Bedroom" name={`FloorDetails[${index}].Bedroom`} />
                                        <Badge badgeContent={0} color="secondary">
                                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                                        </Badge>
                                      </FloorFieldMsgBox>
                                      <ErrorMessage component={err} name={`FloorDetails[${index}].Bedroom`} />
                                      <FloorFieldMsgBox>
                                        <IntegerNumberField label="Family" name={`FloorDetails[${index}].family`} />
                                        <Badge badgeContent={0} color="secondary">
                                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                                        </Badge>
                                      </FloorFieldMsgBox>
                                      <ErrorMessage component={err} name={`FloorDetails[${index}].family`} />
                                      <FloorFieldMsgBox>
                                        <IntegerNumberField label="Kitchen" name={`FloorDetails[${index}].kitchen`} />
                                        <Badge badgeContent={0} color="secondary">
                                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                                        </Badge>
                                      </FloorFieldMsgBox>
                                      <ErrorMessage component={err} name={`FloorDetails[${index}].kitchen`} />
                                      <FloorFieldMsgBox>
                                        <IntegerNumberField label="Laundary" name={`FloorDetails[${index}].Laundary`} />
                                        <Badge badgeContent={0} color="secondary">
                                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                                        </Badge>
                                      </FloorFieldMsgBox>
                                      <ErrorMessage component={err} name={`FloorDetails[${index}].Laundary`} />
                                      <FloorFieldMsgBox>
                                        <IntegerNumberField label="Bath" name={`FloorDetails[${index}].Bath`} />
                                        <Badge badgeContent={0} color="secondary">
                                          <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                                        </Badge>
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
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Heating" />
                        <FieldMsgBox>
                          <CustomTextField label="AC" name="AC" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="AC" />
                        <FieldMsgBox>
                          <CustomTextField label="Roof" name="Roof" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Roof" />
                        <FieldMsgBox>
                          <CustomTextField label="Floor" name="Floor" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Floor" />
                        <FieldMsgBox>
                          <CustomTextField label="Window Covering" name="WindowCovering" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="WindowCovering" />
                        <FieldMsgBox>
                          <CustomTextField label="Pool" name="Pool" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Pool" />
                        <FieldMsgBox>
                          <CustomTextField label="Pool Feature" name="PoolFeature" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
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
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Style" />
                        <FieldMsgBox>
                          <CustomTextField label="Deck" name="Deck" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Deck" />
                        <FieldMsgBox>
                          <CustomTextField label="Patio" name="Patio" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Patio" />
                        <FieldMsgBox>
                          <CustomTextField label="Garage" name="Garage" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Garage" />
                        <FieldMsgBox>
                          <CustomTextField label="Carport" name="Carpot" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Carpot" />
                        <FieldMsgBox>
                          <IntegerNumberField label="Parking Space" name="ParkingSpace" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="ParkingSpace" />
                        <FieldMsgBox>
                          <IntegerNumberField label="Fin Bsmt" name="FinBasmt" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="FinBasmt" />
                        <FieldMsgBox>
                          <CustomTextField label="Basement" name="Basement" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Basement" />
                        <FieldMsgBox>
                          <CustomTextField label="Driveway" name="Driveway" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Driveway" />
                        <FieldMsgBox>
                          <CustomTextField label="Water" name="Water" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="Water" />
                        <FieldMsgBox>
                          <CustomTextField label="Water Shares" name="WaterShare" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
                        </FieldMsgBox>
                        <ErrorMessage component={err} name="WaterShare" />
                        <FieldMsgBox>
                          <CustomTextField label="Spa" name="Spa" />
                          <Badge badgeContent={0} color="secondary">
                            <img src={chatIcon} alt="" onClick={() => setShowComments(true)} />
                          </Badge>
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
