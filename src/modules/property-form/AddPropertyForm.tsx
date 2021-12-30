import React, { useState, useEffect, useRef } from 'react'
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
import { QUESTFACTORYABI } from './QuestFactoryABI'
import { QUESTPROPERTYABI } from './QuestPropertiesABI'
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
const ERC1155FactoryAddress = '0x7c1B75068b7C20c4ff29933d82D8feaAaE7917B0'
const HOA_ADMIN = '0x7286603DBbF612bA88337693E531176A4Db63321'
const UPGRADER = "0x7286603DBbF612bA88337693E531176A4Db63321"
const TREASURY_ADMIN = '0x7286603DBbF612bA88337693E531176A4Db63321'
const PROPERTY_OWNER = '0xa9F5A89196534656d83EF2324f2C8705748290B3'
const QUEST_FACTORY_ADDRESS = '0xacCc6efa277D21Fd2427915eC1F1c17043Aee305'
const contractName = "QuestCrypto"
const description = "Testing Quest Crypto"
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

  const [baseURIState, setBaseURIState] = useState([])

  // Use this method call. Pass Ref in this method
  const executeScroll = (scrollRef: any) => {
    scrollToRef(elRefs.current[scrollRef])
  }
  // Use this method call. Pass Ref in this method
  const pushPropertToBlockchain = async(_baseURI: any, UpgraderAddress: any, DefaultAdmin: any, treasuryAddress: any, __contractName: any, __description: any) => {
    const web3 = new Web3(window.ethereum)
    const factoryContractInstance = new web3.eth.Contract(QUESTFACTORYABI, QUEST_FACTORY_ADDRESS)
    await factoryContractInstance.methods.deployPropertyContract(treasuryAddress, UpgraderAddress, DefaultAdmin, _baseURI, __contractName, __description).send({ from: HOA_ADMIN}) 
  }
  const triggerFunc = async() => {
    const __baseURI = "https://ipfs.io/ipfs/QmdoAWg91kryPL8HS1zYHzzySUSvCeGRDr4P2vgeSe49PS";
    const receipt = await pushPropertToBlockchain(__baseURI, UPGRADER, HOA_ADMIN, TREASURY_ADMIN, contractName, description)
    console.log(receipt)
  }
  const triggerFunc2 = async() => {
    fetchPropertiesFromBlockchain() 
  }
  //Fetch The Properties
  const fetchPropertiesFromBlockchain = async() => {
    let baseURIS = []
    const web3 = new Web3(window.ethereum)
    const factoryContractInstance = new web3.eth.Contract(QUESTFACTORYABI, QUEST_FACTORY_ADDRESS)
    const lengthOfProxyArray = await factoryContractInstance.methods.getProxyLength().call()
    console.log(lengthOfProxyArray, "<---lengthOfProxyArray--->")
    for(let i = 0; i< lengthOfProxyArray; i++){
      const propertyAddress = await factoryContractInstance.methods.proxies(i).call()
      console.log(propertyAddress)
      const propertyContractInstance = new web3.eth.Contract(QUESTPROPERTYABI, propertyAddress)
      const baseURI = await propertyContractInstance.methods.uri(1).call()
      baseURIS.push(baseURI)
    }
    console.log(baseURIS)
  }

  const pushToBlockchain = async (_baseURI: any, TREASURY_ADMIN: any, _parentHash: any, PROPERTY_OWNER: any) => {
    const web3 = new Web3(window.ethereum)
    const tempBytes = web3.utils.asciiToHex('1')
    console.log(tempBytes)
    console.log(_baseURI, TREASURY_ADMIN, tempBytes, PROPERTY_OWNER, 'put in remix')
    const contractInstance = new web3.eth.Contract(ERC1155FACTORYABI, ERC1155FactoryAddress)
    const treasuryAdmimAddress = TREASURY_ADMIN
    const propertyOwnerAddress = PROPERTY_OWNER
    const receipt = await contractInstance.methods
      .deployPropertyToken(_baseURI, treasuryAdmimAddress, tempBytes, propertyOwnerAddress)
      .send({
        from: HOA_ADMIN,
      })
    console.log(receipt, 'receipt96')
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

    const uploadToIPFS = (item: any, type: string) => {
      return new Promise((resolve) => {
        const file = new FileReader()
        file.readAsArrayBuffer(item.file)
        file.onloadend = async function () {
          const nftCid = (await ipfs.files.add(Buffer.from(file.result)))[0].hash
          const url = 'https://ipfs.io/ipfs/' + nftCid
          item.hash = url
          resolve(item)
        }
      }).then((result: any) => {
        return { [type]: result }
      })
    }
    const rightofequity = propertyDocumentList?.rightofequity.map(async (item: any) => {
      return uploadToIPFS(item, 'rightofequity')
    })
    const rightofmaintenance = propertyDocumentList?.rightofmaintenance.map((item: any) => {
      return uploadToIPFS(item, 'rightofmaintenance')
    })
    const rightofgovernace = propertyDocumentList?.rightofgovernace.map((item: any) => {
      return uploadToIPFS(item, 'rightofgovernace')
    })
    const rightofsale = propertyDocumentList?.rightofsale.map((item: any) => {
      return uploadToIPFS(item, 'rightofsale')
    })
    const rightofpossesions = propertyDocumentList?.rightofpossesion.map((item: any) => {
      return uploadToIPFS(item, 'rightofpossesion')
    })
    const uploadpropertydocument = propertyDocumentList?.uploadpropertydocument.map((item: any) => {
      return uploadToIPFS(item, 'uploadpropertydocument')
    })

    const rightOfEquity = {
      name: 'Right of Equity (NFT)',
      description: 'Tokenized Representation of...',
      documents: [],
    }

    const rightOfMaintenance = {
      name: 'Right of Maintenance (NFT)',
      description: 'Reserved for HOA to control, govern, delegate, and covenant ALL property rights, aspects, and responsiblities.',
      documents: [],
    }

    const rightOfPossesion = {
      name: 'Right of Occupancy (NFT)',
      description:
        'Representing possession and enjoyment of property. This right assumes all existing and future covenants with the HOA and/or managing entity.',
      documents: [],
    }

    const rightOfSale = {
      name: 'Right of Sale / Transfer (Disposition) (NFT)',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing eits',
      documents: [],
    }

    const rightOfGovernance = {
      name: 'Right of Governance (NFT)',
      description:
        'Respresentation of Governance / control factors affecting nominal value of fractionalized NFTs. Superseded by Right of Management.',
      documents: [],
    }

    const _rightsInformation: any = {
      rightOfEquity,
      rightOfMaintenance,
      rightOfPossesion,
      rightOfSale,
      rightOfGovernance,
    }

    let nftCid
    await Promise.all([...rightofsale, ...rightofpossesions, ...rightofequity, ...rightofmaintenance, ...rightofgovernace]).then(
      async function (results) {
        console.log(results, 'prince')
        results?.forEach((obj: any) => {
          if (obj.rightofequity !== undefined) {
            _rightsInformation.rightOfEquity.documents.indexOf(obj.rightofequity) == -1 &&
              _rightsInformation.rightOfEquity.documents.push(obj?.rightofequity)
          }
          if (obj.uploadpropertydocument !== undefined) {
            _rightsInformation.uploadpropertydocument.documents.indexOf(obj.uploadpropertydocument) == -1 &&
              _rightsInformation.uploadpropertydocument.documents.push(obj?.uploadpropertydocument)
          }
          if (obj.rightofmaintenance !== undefined) {
            _rightsInformation.rightOfMaintenance.documents.indexOf(obj.rightofmaintenance) == -1 &&
              _rightsInformation.rightOfMaintenance.documents.push(obj?.rightofmaintenance)
          }
          if (obj.rightofpossesion !== undefined) {
            _rightsInformation.rightOfPossesion.documents.indexOf(obj.rightofpossesion) == -1 &&
              _rightsInformation.rightOfPossesion.documents.push(obj?.rightofpossesion)
          }
          if (obj.rightofsale !== undefined) {
            _rightsInformation.rightOfSale.documents.indexOf(obj.rightofsale) == -1 &&
              _rightsInformation.rightOfSale.documents.push(obj?.rightofsale)
          }
          if (obj.rightofgovernace !== undefined) {
            _rightsInformation.rightOfGovernance.documents.indexOf(obj.rightofgovernace) == -1 &&
              _rightsInformation.rightOfGovernance.documents.push(obj?.rightofgovernace)
          }
        })

        values.rightofInformation = _rightsInformation
        nftCid = (await ipfs.add(Buffer.from(JSON.stringify(values))))[0].hash
        console.log(nftCid, 'nftCid')
        // Aarhan You can put your code here
        const nftCidEquity = (await ipfs.add(Buffer.from(JSON.stringify(rightOfEquity))))[0].hash
        const nftCidMaintenance = (await ipfs.add(Buffer.from(JSON.stringify(rightOfMaintenance))))[0].hash
        const nftCidPossesion = (await ipfs.add(Buffer.from(JSON.stringify(rightOfPossesion))))[0].hash
        const nftCidSale = (await ipfs.add(Buffer.from(JSON.stringify(rightOfSale))))[0].hash
        const nftCidGovernance = (await ipfs.add(Buffer.from(JSON.stringify(rightOfGovernance))))[0].hash

        console.log(nftCid, nftCidEquity, nftCidMaintenance, nftCidPossesion, nftCidSale, nftCidGovernance, '<--line293-->')

        console.log(nftCid, '<--nftCid-- calling>')
        const _baseURI = 'https://ipfs.io/ipfs/' + nftCid
        console.log(_baseURI, '<--_baseURI-- prince>')
        const _managingCompany = '0x7286603DBbF612bA88337693E531176A4Db63321'
        const _rightToMaintenanceURI = nftCidMaintenance
        const _rightToEquityURI = nftCidEquity
        const _rightToPossesionURI = nftCidPossesion
        const _rightToSaleURI = nftCidSale
        const _baseURIGovernance = nftCidGovernance
        const _rightToControlURI = 'https://ipfs.io/ipfs/'
        const _rightToResidencyURI = 'https://ipfs.io/ipfs/'
        const _rightToSubsurfaceURI = 'https://ipfs.io/ipfs/'

        // const receipt = await pushToBlockchain(_baseURI, TREASURY_ADMIN, 0x10, PROPERTY_OWNER)
        // console.log(receipt)
        if (imageList.length > 0 && documentList.length > 0) {
          const formData = new FormData()
          const dataFiles = getFileData()
          for (const item of dataFiles) {
            formData.append('file', item)
          }
          const data = { ...values }
          delete data.FloorDetails
          Object.keys(data).forEach((key: any) => formData.append(key, data[key]))
          formData.append('NftCid', nftCid);
          formData.append('PropertyImages', JSON.stringify(imageData))
          formData.append('PropertyDocs', JSON.stringify(documentData))
          formData.append('FloorDetails', JSON.stringify(values.FloorDetails))
          // formData.append('IPFSHash', nftCid);
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
    )
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
            // validationSchema={propertyFormSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values)
              setSubmitting(false)
            }}
          >
            {({ values, handleBlur, isValid }: any) => (
              <Form className="formwrapper">
                <Grid container ref={(el: any) => (elRefs.current[1] = el)}>
                  <OwnerDetailsSection />
                </Grid>
                <Grid container ref={(el: any) => (elRefs.current[2] = el)}>
                  <PropertyInfoSection />
                </Grid>
                <Grid container ref={(el: any) => (elRefs.current[3] = el)}>
                  <AddressSection />
                </Grid>
                <Grid container ref={(el: any) => (elRefs.current[4] = el)}>
                  <LocalitySection />
                </Grid>
                <Grid container ref={(el: any) => (elRefs.current[5] = el)}>
                  <TimeContractSection />
                </Grid>
                <Grid container ref={(el: any) => (elRefs.current[6] = el)}>
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
                <Grid container ref={(el: any) => (elRefs.current[7] = el)}>
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
                <Grid container ref={(el: any) => (elRefs.current[8] = el)}>
                  <FloorConfigSection values={values} />
                </Grid>
                <Grid container ref={(el: any) => (elRefs.current[9] = el)}>
                  <AmentiesSection />
                </Grid>
                <Grid container ref={(el: any) => (elRefs.current[10] = el)}>
                  <MoreDetailsSection />
                </Grid>
                <Grid container ref={(el: any) => (elRefs.current[11] = el)}>
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
                <Grid container ref={(el: any) => (elRefs.current[12] = el)}>
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
                <Grid container ref={(el: any) => (elRefs.current[13] = el)}>
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
                <Grid container ref={(el: any) => (elRefs.current[14] = el)}>
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
                <Grid container ref={(el: any) => (elRefs.current[15] = el)}>
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
                  {/* <CheckBoxCont>
                    <Checkbox
                      color="default"
                      inputProps={{ 'aria-label': 'checkbox with default color' }}
                      style={{ color: '#1E3444' }}
                      onChange={(e: any) => setPermission(e.target.checked)}
                    />
                    <CheckBoxText>I take full responsibility of the above information</CheckBoxText>
                  </CheckBoxCont> */}
                  <FormButtonGroup>
                    <PrimaryButton
                      type="submit"
                      variant="contained"
                      classes={{
                        root: classes.saveAndReviewStyle,
                      }}
                      // disabled={!permission}
                    >
                      {loading ? <Spinner /> : 'Save As Draft'}
                    </PrimaryButton>
                    <PrimaryButton
                      type="submit"
                      variant="contained"
                      classes={{
                        root: classes.saveAndReviewStyle,
                      }}
                      // disabled={!permission}
                    >
                      {loading ? <Spinner /> : 'Save & Publish'}
                    </PrimaryButton>
                    <PrimaryButton
                      variant="contained"
                      classes={{
                        root: classes.saveAndReviewStyle,
                      }}
                      onClick={() => {triggerFunc()}}
                      // disabled={!permission}
                    >
                      {loading ? <Spinner /> : 'Save Proprty Test'}
                    </PrimaryButton>
                    <PrimaryButton
                      variant="contained"
                      classes={{
                        root: classes.saveAndReviewStyle,
                      }}
                      onClick={() => {triggerFunc2()}}
                      // disabled={!permission}
                    >
                      {loading ? <Spinner /> : 'Check proxy URIS'}
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
