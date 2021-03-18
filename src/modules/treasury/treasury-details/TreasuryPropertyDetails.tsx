import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  useStyles,
  HeaderContainer,
  NoDetailsAvailable,
  HeaderPath,
  HeaderTitle,
  ExpandIconButton,
  FeatureHeading,
  InfoBoldTxt,
  InfoLightTxt,
  TreasuryOwnerCont,
} from './style'
import ComponentLoader from 'shared/loader-components/component-loader'
import { PrimaryButton, SecondaryButton } from 'shared/components/buttons'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import MailIcon from '@material-ui/icons/Mail'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Spinner from 'shared/loader-components/spinner'
import Features from 'modules/property-features/Features'
import RentalFacts from 'modules/property-features/RentalFacts'
import DocumentsTable from './components/DocumentsTable'
import AuctionConfiguration from './components/AuctionConfiguration'
import CustomModal from 'shared/custom-modal'
import TabComponent from 'shared/tab-component'
import { treasuryDetailsTabList } from 'shared/helpers/dataConstant'
// import {getWeb3Val} from 'modules/block-chain'
import { SLFContractAddress, selfAbi } from 'modules/block-chain/abi'
// import { SLCContractAddress, SLFContractAddress, selfAbi, slcAbi } from 'modules/chain/abi'
import { getWeb3Val, handlePropertyDetailsSubmit } from 'modules/block-chain/BlockChainMethods'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'

const TreasuryPropertyDetails = (props: any) => {
  const classes = useStyles()
  const [dataLoading, setDataLoading] = useState(false)
  const [propertyInfo, setPropertyInfo] = useState<any>({})
  const [imageList, setImageList] = useState<any>([])
  const [account, setAccount] = useState('')
  const [contractSLF, setContractSLF] = useState<any>('')
  const [activeTab, setActiveTab] = useState('documents')
  const [docData /* setDocData */] = useState<any>([])
  const [showAuctionModal, setShowAuctionModal] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [mintLoading, setMintLoading] = useState(false)
  const [mintStatus, setMintStatus] = useState(false)
  const { userInfo } = props

  useEffect(() => {
    const getChainDetails = async () => {
      try {
        const web3 = await getWeb3Val()
        if (web3) {
          const accounts = await web3.eth.getAccounts()
          setAccount(accounts[0])
          const SLFInstance = new web3.eth.Contract(selfAbi, SLFContractAddress)
          // const SLCInstance = new web3.eth.Contract(slcAbi, SLCContractAddress)
          window.ethereum.on('accountsChanged', (accounts: any) => {
            setAccount(accounts[0])
          })
          setContractSLF(SLFInstance)
          // setContractSLC(SLCInstance)
        }
      } catch (err) {
        alert(`Failed to load web3, accounts, or contract. Check console for details.`)
        console.log('err->', err)
      }
    }
    getChainDetails()
  }, [])

  useEffect(() => {
    const propertyId = props.match.params.propertyId
    const getPropertyDetails = async () => {
      try {
        setDataLoading(true)
        const res = await axios.get(`${apiBaseUrl}/properties/GetSingleProperty/${propertyId}`)
        if (!!res && res.data) {
          const images = []
          const docs = []
          setPropertyInfo(res.data)
          if (res.data.propertyDetails) {
            setMintStatus(res.data.propertyDetails.Isactive)
          }
          for (const item of res.data.getDocs) {
            if (item.type === 0) {
              images.push(item)
            }
            if (item.type === 1) {
              docs.push(item)
            }
          }
          setImageList([...images])
        }
      } catch (error) {
      } finally {
        setDataLoading(false)
      }
    }
    getPropertyDetails()
  }, [props.match.params.propertyId])

  const handleApproveByAdmin = async () => {
    setMintLoading(true)
    const propertyId = props.match.params.propertyId
    handlePropertyDetailsSubmit(contractSLF, account, 1000, 1613575905, propertyId)
      .on('confirmation', async function (confirmationNumber: any, receipt: any) {
        console.log(confirmationNumber, receipt)

        if (confirmationNumber === 1) {
          try {
            const data = { id: propertyId }
            await axios.post(`${apiBaseUrl}/properties/updatePropertyStatus`, data)
            setMintStatus(true)
          } catch (error) {
          } finally {
            setMintLoading(false)
          }

          return
        }
      })
      .on('error', function (error: any) {
        setMintLoading(false)
        return
      })
  }

  return (
    <Box>
      <HeaderContainer>
        <HeaderPath>
          <span>Treasury / Properties tokenized /</span> {props.match.params.propertyId}
        </HeaderPath>
        <Grid container justify="space-between" spacing={2}>
          <Grid item>
            <HeaderTitle>Property Details</HeaderTitle>
          </Grid>
          {!dataLoading && (
            <Grid item>
              {mintStatus ? (
                <SecondaryButton variant="contained" onClick={() => setShowAuctionModal(true)}>
                  CONFIGURE AUCTION
                </SecondaryButton>
              ) : (
                <PrimaryButton variant="contained" onClick={() => handleApproveByAdmin()} disabled={mintLoading}>
                  {mintLoading ? <Spinner /> : 'MINT NFT'}
                </PrimaryButton>
              )}
            </Grid>
          )}
        </Grid>
      </HeaderContainer>
      {dataLoading ? (
        <ComponentLoader />
      ) : (
        <div>
          {!!propertyInfo && Object.values(propertyInfo).length > 0 ? (
            <div>
              <Paper className={classes.treasuryPaper} elevation={1}>
                <Grid container className={classes.infoContStyle} spacing={2}>
                  <Grid item>
                    <img src={`${apiBaseUrl}/${imageList[0].filename}`} alt="" />
                  </Grid>
                  <Grid item>
                    <InfoBoldTxt>1901 Thorn ridge Cir.</InfoBoldTxt>
                    <InfoLightTxt>1228,Los Angeles D4.1, NY, USA</InfoLightTxt>
                  </Grid>
                  <Divider orientation="vertical" className={classes.verticalDividerStyle} />
                  <Grid item>
                    <InfoLightTxt>Onboarding date</InfoLightTxt>
                    <InfoBoldTxt>29 Jan 2021</InfoBoldTxt>
                  </Grid>
                  <Divider orientation="vertical" className={classes.verticalDividerStyle} />
                  <Grid item>
                    <InfoLightTxt>Status</InfoLightTxt>
                    <InfoBoldTxt>Published</InfoBoldTxt>
                  </Grid>
                  <Divider orientation="vertical" className={classes.verticalDividerStyle} />
                  <Grid item>
                    <InfoLightTxt>Estimated value</InfoLightTxt>
                    <InfoBoldTxt>$ 1,254,328.00</InfoBoldTxt>
                  </Grid>
                  <Grid item>
                    <ExpandIconButton
                      expandStatus={expanded}
                      onClick={() => {
                        setExpanded(!expanded)
                      }}
                    >
                      <IconButton>
                        <ExpandMoreIcon />
                      </IconButton>
                    </ExpandIconButton>
                  </Grid>
                </Grid>
                <Collapse in={expanded} timeout="auto">
                  <Grid container direction="column">
                    <Accordion className={classes.accordionStyle}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon className={classes.expandIconStyle} />}
                        aria-controls="panel2a-content"
                        id="feature-header"
                      >
                        <FeatureHeading>Features</FeatureHeading>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Features data={propertyInfo.propertyDetails} />
                      </AccordionDetails>
                    </Accordion>

                    <Accordion className={classes.accordionStyle}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon className={classes.expandIconStyle} />}
                        aria-controls="panel1a-content"
                        id="rental-fact-header"
                      >
                        <FeatureHeading style={{ marginTop: '18px' }}>Rental facts and features</FeatureHeading>
                      </AccordionSummary>
                      <AccordionDetails>
                        <RentalFacts data={propertyInfo.propertyDetails} />
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Collapse>

                <Grid container spacing={2} className={classes.treasuryOwnersContStyle}>
                  <Grid item>
                    <Paper className={classes.treasuryOwnersPaper} elevation={0}>
                      <TreasuryOwnerCont>
                        <div>
                          <InfoLightTxt>Owner</InfoLightTxt>
                          <InfoBoldTxt>Meredith Hendrick</InfoBoldTxt>
                        </div>
                        <MailIcon />
                      </TreasuryOwnerCont>
                    </Paper>
                  </Grid>
                  <Grid item>
                    <Paper className={classes.treasuryOwnersPaper} elevation={0}>
                      <TreasuryOwnerCont>
                        <div>
                          <InfoLightTxt>HOA Admin</InfoLightTxt>
                          <InfoBoldTxt>Holman Valencia</InfoBoldTxt>
                        </div>
                        <MailIcon />
                      </TreasuryOwnerCont>
                    </Paper>
                  </Grid>
                  <Grid item>
                    <Paper className={classes.treasuryOwnersPaper} elevation={0}>
                      <TreasuryOwnerCont>
                        <div>
                          <InfoLightTxt>Lawyer</InfoLightTxt>
                          <InfoBoldTxt>Dejesus Norris</InfoBoldTxt>
                        </div>
                        <MailIcon />
                      </TreasuryOwnerCont>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
              <TabComponent tabOptions={treasuryDetailsTabList} activeTab={activeTab} setActiveTab={setActiveTab} />
              <DocumentsTable data={docData} />
            </div>
          ) : (
            <NoDetailsAvailable>
              <p>No details available</p>
            </NoDetailsAvailable>
          )}
        </div>
      )}
      <CustomModal show={showAuctionModal} toggleModal={setShowAuctionModal}>
        <AuctionConfiguration
          propId={props.match.params.propertyId}
          publicAddress={userInfo.publicaddress}
          setShowAuctionModal={setShowAuctionModal}
        />
      </CustomModal>
    </Box>
  )
}
const mapStateToProps = (state: any) => ({
  userInfo: state.user.userInfo,
})
export default withRouter(connect(mapStateToProps)(TreasuryPropertyDetails))
