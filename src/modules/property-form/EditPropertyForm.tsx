import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { errorAlert } from 'logic/actions/alerts.actions'
import { Formik, Form, ErrorMessage } from 'formik'
import { err } from 'shared/styles/styled'
import {
  useStyle,
  useStyle01,
  fieldSetStyle,
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
  TitleMsgBox,
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
import ComponentLoader from 'shared/loader-components/component-loader'
import { PrimaryButton } from 'shared/components/buttons'
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
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import MoneyInputField from 'shared/components/money-input-field'
import history from 'modules/app/components/history'
import { Paths } from 'modules/app/components/routes/types'
import { apiBaseUrl } from 'services/global-constant'
import axios from 'axios'

const EditPropertyForm = (props: any) => {
  const classes = useStyle()
  const classes01 = useStyle01()
  const [initialData, setInitialData] = useState(initialValues)
  const [name, setName] = useState('')
  const [showImgModal, setShowImgModal] = useState(false)
  const [imageList, setImageList] = useState<any>([])
  const [imageData, setImageData] = useState<any>([])
  const [showDocModal, setShowDocModal] = useState(false)
  const [documentList, setDocumentList] = useState<any>([])
  const [documentData, setDocumentData] = useState<any>([])
  const [permission, setPermission] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [commentMsg, setCommentMsg] = useState<string>('')
  const [commentList, setCommentMsgList] = useState<any>([])
  const [selectedCommentId, setSelectedCommentId] = useState(0)
  const [commentLoading, setCommentLoading] = useState(true)
  const [unReadComments, setUnReadComments] = useState<any>({})
  const [approved, setApproved] = useState(false)
  const { userInfo, errorAlert } = props

  useEffect(() => {
    if (approved) {
      setPermission(true)
    } else {
      setPermission(false)
    }
  }, [approved])

  useEffect(() => {
    const propertyId = props.match.params.propertyId
    const getPropertyDetails = async () => {
      try {
        setDataLoading(true)
        const res = await axios.get(`${apiBaseUrl}/properties/GetSingleProperty/${propertyId}`)

        if (!!res && res.data) {
          setApproved(res.data.propertyDetails.ApprovedByOwner)
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
          setName(res.data.propertyDetails.Fname + ' ' + res.data.propertyDetails.Lname)
        }
      } catch (error) {
      } finally {
        setDataLoading(false)
        window.scrollTo(0, 0)
      }
    }
    const getUnreadComments = async () => {
      const data = {
        id: props.match.params.propertyId,
        publicAddress: !!userInfo && userInfo.publicaddress,
      }
      try {
        const result: any = await axios.post(`${apiBaseUrl}/properties/getUnreadComment`, data)
        if (result.data) {
          setUnReadComments(result.data)
        } else {
          setUnReadComments({})
        }
      } catch (err) {
        setUnReadComments({})
      }
    }
    getPropertyDetails()
    getUnreadComments()
  }, [props.match.params.propertyId, userInfo])

  useEffect(() => {
    const propertyId = props.match.params.propertyId
    const getUnreadComments = async () => {
      const data = {
        id: props.match.params.propertyId,
        publicAddress: !!userInfo && userInfo.publicaddress,
      }
      try {
        const result: any = await axios.post(`${apiBaseUrl}/properties/getUnreadComment`, data)
        if (result.data) {
          setUnReadComments(result.data)
        } else {
          setUnReadComments({})
        }
      } catch (err) {
        setUnReadComments({})
      }
    }
    const getCommentsList = async () => {
      const data = { id: propertyId, Field: selectedCommentId, publicAddress: userInfo.publicaddress }
      try {
        setCommentLoading(true)
        const res = await axios.post(`${apiBaseUrl}/properties/getCommentById`, data)
        if (res.data) {
          setCommentMsgList(res.data)
          getUnreadComments()
        }
      } catch (err) {
      } finally {
        setCommentLoading(false)
      }
    }
    if (selectedCommentId > 0) {
      getCommentsList()
      window.scrollTo(0, 0)
    }
  }, [props.match.params.propertyId, selectedCommentId, userInfo])

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true)
      await axios.post(`${apiBaseUrl}/properties/UpdateProperty`, values)
      history.push(Paths.root)
    } catch (error) {
      if (!!error && error.response && error.response.data.message) {
        errorAlert(error.response.data.message)
      } else {
        errorAlert('Something went wrong , please try again')
      }
    } finally {
      setLoading(false)
    }
  }
  const handlePropertyApprove = async () => {
    const data = { id: props.match.params.propertyId }
    try {
      setLoading(true)
      await axios.post(`${apiBaseUrl}/properties/ApproveByPropertyOwner`, data)
      history.push(Paths.root)
    } catch (error) {
      if (!!error && error.response && error.response.data.message) {
        errorAlert(error.response.data.message)
      } else {
        errorAlert('Something went wrong , please try again')
      }
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
    if (commentList.length > 0) {
      return commentList.map((item: any, k: number) => {
        return (
          <div key={k}>
            <CommentInfo>
              <SenderName>{item.CommentedBy}</SenderName>
              <CommentText> {moment(item.CreatedAt).format('LT, MMM Do YY')}</CommentText>
            </CommentInfo>
            <CommentText>{item.Remark}</CommentText>
            <Divider className={classes.commentDividerStyle} />
          </div>
        )
      })
    }
  }
  const getComments = (commentId: number) => {
    setSelectedCommentId(commentId)
    setShowComments(true)
    setCommentMsg('')
  }
  const handleCommentOnChange = (e: any) => {
    const { value } = e.target
    if (value) {
      setCommentMsg(value)
    } else {
      setCommentMsg('')
    }
  }
  const handleCommentSubmit = async () => {
    const propertyId = props.match.params.propertyId
    if (commentMsg) {
      const data = {
        CreatedAt: new Date(),
        Remark: commentMsg,
        CommentedBy: userInfo?.role === 1 ? userInfo.name : name,
      }
      const newCommentList = [...commentList]
      newCommentList.push(data)
      setCommentMsgList([...newCommentList])
      setCommentMsg('')
      try {
        const commentData = {
          propid: propertyId,
          Field: selectedCommentId,
          Remark: commentMsg,
          CommentedBy: userInfo?.role === 1 ? userInfo.name : name,
        }

        await axios.post(`${apiBaseUrl}/properties/AddComment`, commentData)
      } catch (error) {
        if (!!error && error.response && error.response.data.message) {
          errorAlert(error.response.data.message)
        } else {
          errorAlert('Something went wrong , please try again')
        }
      }
    }
  }

  return (
    <PropertyFormWrapper>
      <FormHeader>
        <HeaderPath>
          <span>Properties</span> {!!userInfo && userInfo.role === 1 ? '/ Edit property from' : '/ View property from'}
        </HeaderPath>
      </FormHeader>
      <Grid container spacing={4} alignItems="stretch">
        <Grid item xs={8}>
          <EditFormTitle>{!!userInfo && userInfo.role === 1 ? 'Edit property' : 'View property'}</EditFormTitle>
          <EditFormCont>
            {dataLoading ? (
              <ComponentLoader />
            ) : (
              <Formik
                enableReinitialize
                initialValues={initialData}
                validationSchema={propertyFormSchema}
                onSubmit={(values, { setSubmitting }) => {
                  handleSubmit(values)
                  setSubmitting(false)
                }}
              >
                {({ values, handleBlur }: any) => (
                  <Form>
                    <fieldset disabled={!!userInfo && userInfo.role !== 1} style={fieldSetStyle}>
                      <Grid container>
                        <Grid item xs={2} className={classes.titleNumberStyle}>
                          <FormTitleNumber>1</FormTitleNumber>
                        </Grid>
                        <Grid item xs={10} container direction="column">
                          <Grid item className={classes.editFormGroup}>
                            <FormTitle>Owner details</FormTitle>
                            <FieldMsgBox>
                              <CustomTextField label="First name" name="Fname" handleBlur={handleBlur} />
                              <Badge badgeContent={!!unReadComments && unReadComments[1]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(1)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Fname" />
                            <FieldMsgBox>
                              <CustomTextField label="Last name" name="Lname" handleBlur={handleBlur} />
                              <Badge badgeContent={!!unReadComments && unReadComments[2]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(2)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Lname" />
                            <FieldMsgBox>
                              <CustomTextField label="Email Address" type="email" name="Email" handleBlur={handleBlur} />
                              <Badge badgeContent={!!unReadComments && unReadComments[3]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(3)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Email" />
                            <FieldMsgBox>
                              <CustomTextField label="Wallet public key" name="PublicAddress" />
                              <Badge badgeContent={!!unReadComments && unReadComments[4]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(4)} />
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
                              <FieldSelect
                                label="Type of property"
                                name="PropertyType"
                                options={propertyType}
                                isDisabled={!!userInfo && userInfo.role !== 1}
                              />
                              <Badge badgeContent={!!unReadComments && unReadComments[5]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(5)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="PropertyType" />
                            <FieldMsgBox>
                              <CustomTextField label="Property name" name="PropertyName" handleBlur={handleBlur} />
                              <Badge badgeContent={!!unReadComments && unReadComments[6]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(6)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="PropertyName" />
                            <FieldMsgBox>
                              <FloatNumberField label="Property current value" name="CurrentValue" />
                              <Badge badgeContent={!!unReadComments && unReadComments[7]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(7)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="CurrentValue" />
                            <FieldMsgBox>
                              <CustomTextField label="Comments" name="Comments" />
                              <Badge badgeContent={0} color="secondary">
                                <img src={chatIcon} alt="" />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Comments" />
                            <FieldMsgBox>
                              <FormDatePicker label="Year built" name="YearBuilt" maxDate={moment(new Date()).format('YYYY-MM-DD')} />
                              <Badge badgeContent={!!unReadComments && unReadComments[8]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(8)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="YearBuilt" />
                            <FieldMsgBox>
                              <CustomTextField label="Zoning" name="Zoning" />
                              <Badge badgeContent={!!unReadComments && unReadComments[9]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(9)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Zoning" />
                            <FieldMsgBox>
                              <CustomTextField label="Landscaping" name="Landscaping" />
                              <Badge badgeContent={!!unReadComments && unReadComments[10]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(10)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Landscaping" />
                            <FieldMsgBox>
                              <MoneyInputField label="Lot Facts" name="Lotfacts" acceptDecimals />
                              <Badge badgeContent={!!unReadComments && unReadComments[11]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(11)} />
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
                              <Badge badgeContent={!!unReadComments && unReadComments[12]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(12)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Address1" />
                            <FieldMsgBox>
                              <CustomTextField label="Address 2" name="Address2" />
                              <Badge badgeContent={!!unReadComments && unReadComments[13]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(13)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Address2" />
                            <FieldMsgBox>
                              <CustomTextField label="City" name="City" />
                              <Badge badgeContent={!!unReadComments && unReadComments[14]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(14)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="City" />
                            <FieldMsgBox>
                              <CustomTextField label="State" name="State" />
                              <Badge badgeContent={!!unReadComments && unReadComments[7]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(17)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="State" />

                            <FieldMsgBox>
                              <IntegerNumberField label="Postal code" name="PostalCode" />
                              <Badge badgeContent={!!unReadComments && unReadComments[18]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(18)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="PostalCode" />

                            <FieldMsgBox>
                              <CustomTextField label="Country" name="Country" />
                              <Badge badgeContent={!!unReadComments && unReadComments[16]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(16)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Country" />
                            <FieldMsgBox>
                              <CustomTextField label="Subdivision" name="Subdivision" />
                              <Badge badgeContent={!!unReadComments && unReadComments[15]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(15)} />
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
                              <Badge badgeContent={!!unReadComments && unReadComments[19]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(19)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="SchoolDistrict" />
                            <FieldMsgBox>
                              <CustomTextField label="Elementary" name="Elementary" />
                              <Badge badgeContent={!!unReadComments && unReadComments[20]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(20)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Elementary" />
                            <FieldMsgBox>
                              <CustomTextField label="Jr high" name="JrHigh" />
                              <Badge badgeContent={!!unReadComments && unReadComments[21]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(21)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="JrHigh" />
                            <FieldMsgBox>
                              <CustomTextField label="High school" name="HighSchool" />
                              <Badge badgeContent={!!unReadComments && unReadComments[22]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(22)} />
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
                              <MoneyInputField label="Insurance" name="Insurance" dollarPrefix acceptDecimals />
                              <Badge badgeContent={!!unReadComments && unReadComments[23]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(23)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Insurance" />
                            <FieldMsgBox>
                              <MoneyInputField label="Maintenance" name="Maintenance" dollarPrefix acceptDecimals />
                              <Badge badgeContent={!!unReadComments && unReadComments[24]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(24)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Maintenance" />
                            <FieldMsgBox>
                              <MoneyInputField label="HOA fees" name="HOAFees" dollarPrefix acceptDecimals />
                              <Badge badgeContent={!!unReadComments && unReadComments[25]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(25)} />
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
                          <Grid item className={classes.editFormGroup}>
                            <TitleMsgBox>
                              <FormTitle>Uploaded property images</FormTitle>
                              <Badge badgeContent={!!unReadComments && unReadComments[46]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(46)} />
                              </Badge>
                            </TitleMsgBox>
                            <UpLoadedDocCont>{renderUploadedImageDoc(imageList)}</UpLoadedDocCont>
                          </Grid>
                          <Divider className={classes.editDividerStyle} />
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs={2} className={classes.titleNumberStyle}>
                          <FormTitleNumber>7</FormTitleNumber>
                        </Grid>
                        <Grid item xs={10} container direction="column">
                          <Grid item className={classes.editFormGroup}>
                            <TitleMsgBox>
                              <FormTitle>Uploaded property documents</FormTitle>
                              <Badge badgeContent={!!unReadComments && unReadComments[47]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(47)} />
                              </Badge>
                            </TitleMsgBox>
                            <UpLoadedDocCont>{renderUploadedImageDoc(documentList)}</UpLoadedDocCont>
                          </Grid>
                          <Divider className={classes.editDividerStyle} />
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs={2} className={classes.titleNumberStyle}>
                          <FormTitleNumber>8</FormTitleNumber>
                        </Grid>
                        <Grid item xs={10} container direction="column">
                          <Grid item className={classes.editFormGroup}>
                            <TitleMsgBox>
                              <FormTitle>Floor Wise Configuration</FormTitle>
                              <Badge badgeContent={!!unReadComments && unReadComments[35]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(35)} />
                              </Badge>
                            </TitleMsgBox>
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
                                      {!!userInfo && userInfo.role === 1 && values.FloorDetails.length > 1 && (
                                        <DeleteIcon className={classes01.deleteBtnStyle} onClick={() => arrayHelpers.remove(index)} />
                                      )}
                                    </FloorDetailsCont>
                                  ))}
                                  {!!userInfo && userInfo.role === 1 && (
                                    <AddAnotherFloorCont onClick={() => handleAddFloorDetails(arrayHelpers)}>
                                      <AddIcon />
                                      <span>Add Another Floor</span>
                                    </AddAnotherFloorCont>
                                  )}
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
                              <CustomTextField label="Heating" name="Heating" handleBlur={handleBlur} />
                              <Badge badgeContent={!!unReadComments && unReadComments[27]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(27)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Heating" />
                            <FieldMsgBox>
                              <CustomTextField label="AC" name="AC" handleBlur={handleBlur} />
                              <Badge badgeContent={!!unReadComments && unReadComments[26]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(26)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="AC" />
                            <FieldMsgBox>
                              <CustomTextField label="Roof" name="Roof" handleBlur={handleBlur} />
                              <Badge badgeContent={!!unReadComments && unReadComments[28]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(28)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Roof" />
                            <FieldMsgBox>
                              <CustomTextField label="Floor" name="Floor" handleBlur={handleBlur} />
                              <Badge badgeContent={!!unReadComments && unReadComments[29]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(29)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Floor" />
                            <FieldMsgBox>
                              <CustomTextField label="Window Covering" name="WindowCovering" handleBlur={handleBlur} />
                              <Badge badgeContent={!!unReadComments && unReadComments[30]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(30)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="WindowCovering" />
                            <FieldMsgBox>
                              <CustomTextField label="Pool" name="Pool" />
                              <Badge badgeContent={!!unReadComments && unReadComments[31]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(31)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Pool" />
                            <FieldMsgBox>
                              <CustomTextField label="Pool Feature" name="PoolFeature" />
                              <Badge badgeContent={!!unReadComments && unReadComments[32]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(32)} />
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
                              <Badge badgeContent={!!unReadComments && unReadComments[33]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(33)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Style" />
                            <FieldMsgBox>
                              <CustomTextField label="Deck" name="Deck" />
                              <Badge badgeContent={!!unReadComments && unReadComments[34]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(34)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Deck" />
                            <FieldMsgBox>
                              <CustomTextField label="Patio" name="Patio" />
                              <Badge badgeContent={!!unReadComments && unReadComments[36]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(36)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Patio" />
                            <FieldMsgBox>
                              <CustomTextField label="Garage" name="Garage" />
                              <Badge badgeContent={!!unReadComments && unReadComments[37]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(37)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Garage" />
                            <FieldMsgBox>
                              <CustomTextField label="Carport" name="Carpot" />
                              <Badge badgeContent={!!unReadComments && unReadComments[38]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(38)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Carpot" />
                            <FieldMsgBox>
                              <IntegerNumberField label="Parking Space" name="ParkingSpace" />
                              <Badge badgeContent={!!unReadComments && unReadComments[39]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(39)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="ParkingSpace" />
                            <FieldMsgBox>
                              <IntegerNumberField label="Fin Bsmt" name="FinBasmt" />
                              <Badge badgeContent={!!unReadComments && unReadComments[40]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(40)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="FinBasmt" />
                            <FieldMsgBox>
                              <CustomTextField label="Basement" name="Basement" />
                              <Badge badgeContent={!!unReadComments && unReadComments[41]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(41)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Basement" />
                            <FieldMsgBox>
                              <CustomTextField label="Driveway" name="Driveway" />
                              <Badge badgeContent={!!unReadComments && unReadComments[42]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(42)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Driveway" />
                            <FieldMsgBox>
                              <CustomTextField label="Water" name="Water" />
                              <Badge badgeContent={!!unReadComments && unReadComments[43]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(43)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Water" />
                            <FieldMsgBox>
                              <CustomTextField label="Water Shares" name="WaterShare" />
                              <Badge badgeContent={!!unReadComments && unReadComments[44]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(44)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="WaterShare" />
                            <FieldMsgBox>
                              <CustomTextField label="Spa" name="Spa" />
                              <Badge badgeContent={!!unReadComments && unReadComments[45]} color="secondary">
                                <img src={chatIcon} alt="" onClick={() => getComments(45)} />
                              </Badge>
                            </FieldMsgBox>
                            <ErrorMessage component={err} name="Spa" />
                          </Grid>
                          <Divider className={classes.editDividerStyle} />
                        </Grid>
                      </Grid>
                    </fieldset>
                    <SubmitContainer>
                      {!approved && (
                        <>
                          <CheckBoxCont>
                            <Checkbox
                              color="default"
                              inputProps={{ 'aria-label': 'checkbox with default color' }}
                              style={{ color: '#1E3444' }}
                              onChange={(e: any) => setPermission(e.target.checked)}
                            />
                            <CheckBoxText>I take full responsibility of the above information</CheckBoxText>
                          </CheckBoxCont>

                          {!!userInfo && userInfo.role === 1 ? (
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
                          ) : (
                            <FormButtonGroup>
                              <PrimaryButton
                                type="button"
                                variant="contained"
                                classes={{
                                  root: classes.saveAndReviewStyle,
                                }}
                                disabled={!permission}
                                onClick={() => handlePropertyApprove()}
                              >
                                {loading ? <Spinner /> : 'Approve'}
                              </PrimaryButton>
                            </FormButtonGroup>
                          )}
                        </>
                      )}
                    </SubmitContainer>
                  </Form>
                )}
              </Formik>
            )}
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

            <CommentContainer>
              <TextareaAutosize
                className={classes.commentAreaStyle}
                aria-label="empty textarea"
                placeholder="write comments.."
                onChange={handleCommentOnChange}
                value={commentMsg}
              />
              <PrimaryButton
                fullWidth
                variant="contained"
                classes={{ root: classes.commentBtnStyle }}
                onClick={() => {
                  handleCommentSubmit()
                }}
                disabled={commentMsg.length === 0 || approved}
              >
                Comment
              </PrimaryButton>
              <Divider className={classes.commentDividerStyle} />
              <div>{commentLoading ? <ComponentLoader /> : renderComment()}</div>
            </CommentContainer>
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

const mapStateToProps = (state: any) => ({
  userInfo: state.user.userInfo,
})
export default withRouter(connect(mapStateToProps, { errorAlert })(EditPropertyForm))
