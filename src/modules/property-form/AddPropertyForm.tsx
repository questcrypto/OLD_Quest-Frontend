import { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { errorAlert } from 'logic/actions/alerts.actions'
import { Formik, Form } from 'formik'
import {
  useStyle,
  PropertyFormWrapper,
  FormHeader,
  HeaderPath,
  HeaderTitle,
  PropertyFormCont,
  SubmitContainer,
  CheckBoxCont,
  CheckBoxText,
  FormButtonGroup,
  FormWrapperRow,
  SideSectionWrapper,
} from './style'
import { initialValues, propertyFormSchema } from './formConstant'
import { Grid, Checkbox } from '@material-ui/core'
import { PrimaryButton } from 'shared/components/buttons'
import CustomModal from 'shared/custom-modal'
import UploadImage from './components/UploadImage'
import UploadDocument from './components/UploadDocument'
import Spinner from 'shared/loader-components/spinner'
import history from 'modules/app/components/history'
import { Paths } from 'modules/app/components/routes/types'
import { apiBaseUrl } from 'services/global-constant'
import axios from 'axios'
import Web3 from 'web3'
import { ERC1155FACTORYABI } from './FACTORY_ABI'
import OwnerDetailsSection from './components/OwnerDetailsSection'
import PropertyInfoSection from './components/PropertyInfoSection'
import AddressSection from './components/AddressSection'
import LocalitySection from './components/LocalitySection'
import TimeContractSection from './components/TimeContractSection'
import UploadPropertyImageSection from './components/UploadPropertyImageSection'
import UploadPropertyDocumentSection from './components/UploadPropertyDocumentSection'
import FloorConfigSection from './components/FloorConfigSection'
import AmentiesSection from './components/AmentiesSection'
import MoreDetailsSection from './components/MoreDetailsSection'
import RightOfEquitySection from './components/RightOfEquitySection'
import RightOfMaintenanceSection from './components/RightOfMaintenanceSection'
import RightOfGovernance from './components/RightOfGovernance'
import RightOfPosessionSection from './components/RightOfPosessionSection'
import RightOfSaleSection from './components/RightOfSaleSection'
import RightSieBar from './components/RightSideBar'
const IPFS = require('ipfs-api')
const Buffer = require('buffer').Buffer
const ERC1155FactoryAddress = '0xb9d17d6550526fdd9fa933344f425925660c71bf'
const HOA_ADMIN = '0x7286603DBbF612bA88337693E531176A4Db63321'
const TREASURY_ADMIN = '0x9ec6df50fcF77637996AFFa60b43121F8B4F27c6'

const scrollToRef = (ref: any) => {
  window.scrollTo(0, ref.offsetTop)
}

const AddPropertyForm = (props: any) => {
  const classes = useStyle()
  const [showImgModal, setShowImgModal] = useState<any>(false)
  const [imageList, setImageList] = useState<any>([])
  const [imageData, setImageData] = useState<any>([])
  const [showDocModal, setShowDocModal] = useState<any>(false)
  const [documentList, setDocumentList] = useState<any>([])
  const [documentData, setDocumentData] = useState<any>([])
  const [formName, setFormName] = useState<any>('')
  const [showImgError, setShowImgError] = useState(false)
  const [showDocError, setShowDocError] = useState(false)
  const [permission, setPermission] = useState(false)
  const [loading, setLoading] = useState(false)
  const [propertyDocumentList, setPropertyDocumentList] = useState<any>()
  const { errorAlert, loggedIn } = props
  const topRef = useRef<any>(null)
  const elRefs = useRef(new Array(16))
  let propertyDocumentsObj: any = {
    rightofequity: [],
    uploadpropertydocument: [],
    rightofmaintenance: [],
    rightofpossesion: [],
    rightofsale: [],
    rightofgovernace: [],
  }

  // Use this method call. Pass Ref in this method
  const executeScroll = (scrollRef: any) => {
    scrollToRef(elRefs.current[scrollRef])
  }

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
    const receipt = await contractInstance.methods
      .deployQuestCryptoAsset(
        _baseURI,
        TREASURY_ADMIN,
        _managingCompany,
        _rightToManagementURI,
        _rightToEquityURI,
        _rightToControlURI,
        _rightToResidencyURI,
        _rightToSubsurfaceURI
      )
      .send({
        from: HOA_ADMIN,
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

  useEffect(() => {
    documentList?.forEach((obj: any) => {
      if (obj.rightofequity !== undefined) {
        propertyDocumentsObj.rightofequity.indexOf(obj.rightofequity) == -1 && propertyDocumentsObj.rightofequity.push(obj?.rightofequity)
      }
      if (obj.uploadpropertydocument !== undefined) {
        propertyDocumentsObj.uploadpropertydocument.indexOf(obj.uploadpropertydocument) == -1 &&
          propertyDocumentsObj.uploadpropertydocument.push(obj?.uploadpropertydocument)
      }
      if (obj.rightofmaintenance !== undefined) {
        propertyDocumentsObj.rightofmaintenance.indexOf(obj.rightofmaintenance) == -1 &&
          propertyDocumentsObj.rightofmaintenance.push(obj?.rightofmaintenance)
      }
      if (obj.rightofpossesion !== undefined) {
        propertyDocumentsObj.rightofpossesion.indexOf(obj.rightofpossesion) == -1 &&
          propertyDocumentsObj.rightofpossesion.push(obj?.rightofpossesion)
      }
      if (obj.rightofsale !== undefined) {
        propertyDocumentsObj.rightofsale.indexOf(obj.rightofsale) == -1 && propertyDocumentsObj.rightofsale.push(obj?.rightofsale)
      }
      if (obj.rightofgovernace !== undefined) {
        propertyDocumentsObj.rightofgovernace.indexOf(obj.rightofgovernace) == -1 &&
          propertyDocumentsObj.rightofgovernace.push(obj?.rightofgovernace)
      }
    })
    console.log(propertyDocumentsObj, 'calling propertyDocumentsObj')
    setPropertyDocumentList(propertyDocumentsObj)
  }, [documentList.length])

  const handleSubmit = async (values: any) => {
    // console.log(values, '<--values-->')
    const ipfs = new IPFS({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
    })

    imageList.map((item: any) => {
      const file = new FileReader()
      file.readAsArrayBuffer(item)
      file.onloadend = async function () {
        const nftCid = (await ipfs.files.add(Buffer.from(file.result)))[0].hash
        const url = 'https://ipfs.io/ipfs/' + nftCid
        item.file = url
      }
    })

    console.log(imageList, 'imagelist')

    propertyDocumentList?.rightofequity.map(async (item: any) => {
      const file = new FileReader()
      file.readAsArrayBuffer(item.file)
      file.onloadend = async function () {
        const nftCid = (await ipfs.files.add(Buffer.from(file.result)))[0].hash
        const url = 'https://ipfs.io/ipfs/' + nftCid
        item.file = url
      }
    })

    propertyDocumentList?.rightofmaintenance.map((item: any) => {
      const file = new FileReader()
      file.readAsArrayBuffer(item.file)
      file.onloadend = async function () {
        const nftCid = (await ipfs.files.add(Buffer.from(file.result)))[0].hash
        const url = 'https://ipfs.io/ipfs/' + nftCid
        item.file = url
      }
    })

    propertyDocumentList?.rightofgovernace.map((item: any) => {
      const file = new FileReader()
      file.readAsArrayBuffer(item.file)
      file.onloadend = async function () {
        const nftCid = (await ipfs.files.add(Buffer.from(file.result)))[0].hash
        const url = 'https://ipfs.io/ipfs/' + nftCid
        item.file = url
      }
    })

    propertyDocumentList?.rightofpossesion.map((item: any) => {
      const file = new FileReader()
      file.readAsArrayBuffer(item.file)
      file.onloadend = async function () {
        const nftCid = (await ipfs.files.add(Buffer.from(file.result)))[0].hash
        const url = 'https://ipfs.io/ipfs/' + nftCid
        item.file = url
      }
    })

    propertyDocumentList?.rightofsale.map((item: any) => {
      const file = new FileReader()
      file.readAsArrayBuffer(item.file)
      file.onloadend = async function () {
        const nftCid = (await ipfs.files.add(Buffer.from(file.result)))[0].hash
        const url = 'https://ipfs.io/ipfs/' + nftCid
        item.file = url
      }
    })

    propertyDocumentList?.uploadpropertydocument.map((item: any) => {
      const file = new FileReader()
      file.readAsArrayBuffer(item.file)
      file.onloadend = async function () {
        const nftCid = (await ipfs.files.add(Buffer.from(file.result)))[0].hash
        const url = 'https://ipfs.io/ipfs/' + nftCid
        item.file = url
      }
    })
    console.log('documentlist', propertyDocumentList)

    const nftCid = (await ipfs.files.add(Buffer.from(JSON.stringify(values))))[0].hash
    console.log(nftCid, '<--nftCid-- calling>')
    const _baseURI = 'https://ipfs.io/ipfs/' + nftCid
    console.log(_baseURI, '<--_baseURI-- prince>')
    const _managingCompany = '0x7286603DBbF612bA88337693E531176A4Db63321'
    const _rightToManagementURI = 'https://ipfs.io/ipfs/'
    const _rightToEquityURI = 'https://ipfs.io/ipfs/'
    const _rightToControlURI = 'https://ipfs.io/ipfs/'
    const _rightToResidencyURI = 'https://ipfs.io/ipfs/'
    const _rightToSubsurfaceURI = 'https://ipfs.io/ipfs/'
    const receipt = await pushToBlockchain(
      _baseURI,
      _managingCompany,
      Buffer.from(_rightToManagementURI),
      Buffer.from(_rightToEquityURI),
      Buffer.from(_rightToControlURI),
      Buffer.from(_rightToResidencyURI),
      Buffer.from(_rightToSubsurfaceURI)
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
      console.log(formData, '<--formData--> calling')
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
      } catch (error: any) {
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

  return (
    <PropertyFormWrapper ref={topRef}>
      <FormHeader>
        <HeaderPath>
          <span>Properties</span> / Add new property
        </HeaderPath>
        <HeaderTitle>Add new property</HeaderTitle>
      </FormHeader>
      <FormWrapperRow>
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
              <Form className="formwrapper">
                <Grid container ref={(el) => (elRefs.current[1] = el)}>
                  <OwnerDetailsSection />
                </Grid>
                <Grid container ref={(el) => (elRefs.current[2] = el)}>
                  <PropertyInfoSection />
                </Grid>
                <Grid container ref={(el) => (elRefs.current[3] = el)}>
                  <AddressSection />
                </Grid>
                <Grid container ref={(el) => (elRefs.current[4] = el)}>
                  <LocalitySection />
                </Grid>
                <Grid container ref={(el) => (elRefs.current[5] = el)}>
                  <TimeContractSection />
                </Grid>
                <Grid container ref={(el) => (elRefs.current[6] = el)}>
                  <UploadPropertyImageSection
                    imageList={imageList}
                    setImageList={setImageList}
                    imageData={imageData}
                    setImageData={setImageData}
                    showImgError={showImgError}
                    setShowImgError={setShowImgError}
                    showImgModal={showImgModal}
                    setShowImgModal={setShowImgModal}
                    formName={formName}
                  />
                </Grid>
                <Grid container ref={(el) => (elRefs.current[7] = el)}>
                  <UploadPropertyDocumentSection
                    showDocModal={showDocModal}
                    setShowDocModal={setShowDocModal}
                    documentList={documentList}
                    setDocumentList={setDocumentList}
                    showDocError={showDocError}
                    setShowDocError={setShowDocError}
                    setFormName={setFormName}
                    formName={formName}
                  />
                </Grid>
                <Grid container ref={(el) => (elRefs.current[8] = el)}>
                  <FloorConfigSection values={values} />
                </Grid>
                <Grid container ref={(el) => (elRefs.current[9] = el)}>
                  <AmentiesSection />
                </Grid>
                <Grid container ref={(el) => (elRefs.current[10] = el)}>
                  <MoreDetailsSection />
                </Grid>
                <Grid container ref={(el) => (elRefs.current[11] = el)}>
                  <RightOfEquitySection
                    showDocModal={showDocModal}
                    setShowDocModal={setShowDocModal}
                    documentList={documentList}
                    setDocumentList={setDocumentList}
                    showDocError={showDocError}
                    setShowDocError={setShowDocError}
                    setFormName={setFormName}
                    formName={formName}
                  />
                </Grid>
                <Grid container ref={(el) => (elRefs.current[12] = el)}>
                  <RightOfMaintenanceSection
                    showDocModal={showDocModal}
                    setShowDocModal={setShowDocModal}
                    documentList={documentList}
                    setDocumentList={setDocumentList}
                    showDocError={showDocError}
                    setShowDocError={setShowDocError}
                    setFormName={setFormName}
                    formName={formName}
                  />
                </Grid>
                <Grid container ref={(el) => (elRefs.current[13] = el)}>
                  <RightOfGovernance
                    showDocModal={showDocModal}
                    setShowDocModal={setShowDocModal}
                    documentList={documentList}
                    setDocumentList={setDocumentList}
                    showDocError={showDocError}
                    setShowDocError={setShowDocError}
                    setFormName={setFormName}
                    formName={formName}
                  />
                </Grid>
                <Grid container ref={(el) => (elRefs.current[14] = el)}>
                  <RightOfPosessionSection
                    showDocModal={showDocModal}
                    setShowDocModal={setShowDocModal}
                    documentList={documentList}
                    setDocumentList={setDocumentList}
                    showDocError={showDocError}
                    setShowDocError={setShowDocError}
                    setFormName={setFormName}
                    formName={formName}
                  />
                </Grid>
                <Grid container ref={(el) => (elRefs.current[15] = el)}>
                  <RightOfSaleSection
                    showDocModal={showDocModal}
                    setShowDocModal={setShowDocModal}
                    documentList={documentList}
                    setDocumentList={setDocumentList}
                    showDocError={showDocError}
                    setShowDocError={setShowDocError}
                    setFormName={setFormName}
                    formName={formName}
                  />
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
        <SideSectionWrapper className="rightSection">
          <RightSieBar classes={classes} executeScroll={executeScroll} />
        </SideSectionWrapper>
      </FormWrapperRow>
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
          formName={formName}
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
