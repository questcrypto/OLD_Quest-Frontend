import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  useStyles,
  HeaderContainer,
  NoDetailsAvailable,
  HeaderPath,
  HeaderTitle,
  FeatureHeading,
  HeaderBtnCont,
  InfoBoldTxt,
  InfoLightTxt,
  TreasuryOwnerCont,
} from './style'
import ComponentLoader from 'shared/loader-components/component-loader'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import MailIcon from '@material-ui/icons/Mail'
import { Button, Divider } from '@material-ui/core'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'
import { SLFContractAddress, selfAbi } from 'modules/chain/abi'
// import { SLCContractAddress, SLFContractAddress, selfAbi, slcAbi } from 'modules/chain/abi'
import { handlePropertyDetailsSubmit } from 'modules/chain/chain'
import Web3 from 'web3'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Features from './components/Features'
import RentalFacts from './components/RentalFacts'

const TreasuryPropertyDetails = (props: any) => {
  const classes = useStyles()
  const [dataLoading, setDataLoading] = useState(false)
  const [propertyInfo, setPropertyInfo] = useState<any>({})
  const [imageList, setImageList] = useState<any>([])
  const [account, setAccount] = useState('')
  const [contractSLF, setContractSLF] = useState<any>('')

  useEffect(() => {
    let web3: Web3

    const getChainDetails = async () => {
      if (!window.ethereum) {
        window.alert('Please install MetaMask first.')
        return
      }

      if (!web3) {
        try {
          await window.ethereum.enable()
          web3 = new Web3(window.ethereum)
        } catch (error) {
          window.alert('You need to allow MetaMask.')
          return
        }
      }
      try {
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])
        const SLFInstance = new web3.eth.Contract(selfAbi, SLFContractAddress)
        // const SLCInstance = new web3.eth.Contract(slcAbi, SLCContractAddress)
        window.ethereum.on('accountsChanged', (accounts: any) => {
          setAccount(accounts[0])
        })
        setContractSLF(SLFInstance)
        // setContractSLC(SLCInstance)
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

  const handleApproveByAdmin = () => {
    const propertyId = props.match.params.propertyId
    handlePropertyDetailsSubmit(contractSLF, account, 1000, 1613575905, propertyId)
  }

  return (
    <Box>
      <HeaderContainer>
        <HeaderPath>
          <span>Treasury / Properties tokenized /</span> {props.match.params.propertyId}
        </HeaderPath>
        <HeaderBtnCont>
          <HeaderTitle>Property Details</HeaderTitle>
          <Button
            type="button"
            variant="contained"
            classes={{
              root: classes.btn2Style,
            }}
            onClick={() => handleApproveByAdmin()}
          >
            MINT
          </Button>
        </HeaderBtnCont>
      </HeaderContainer>
      {dataLoading ? (
        <ComponentLoader />
      ) : (
        <div>
          {!!propertyInfo && Object.values(propertyInfo).length > 0 ? (
            <div>
              <Paper className={classes.treasuryPaper} elevation={1}>
                <Accordion className={classes.infoAccordionStyle}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={classes.expandIconStyle} />}
                    aria-controls="panel2a-content"
                    id="info-header"
                  >
                    <Grid container className={classes.infoContStyle}>
                      <Grid item>
                        <img src={`${apiBaseUrl}/${imageList[0].filename}`} alt="" />
                      </Grid>
                      <Grid item>
                        <InfoBoldTxt>1901 Thornridge Cir.</InfoBoldTxt>
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
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
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
                  </AccordionDetails>
                </Accordion>

                <Grid container spacing={1} className={classes.treasuryOwnersContStyle}>
                  <Grid item xs={12} md={4} sm={6}>
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
                  <Grid item xs={12} md={4} sm={6}>
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
                  <Grid item xs={12} md={4} sm={6}>
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
            </div>
          ) : (
            <NoDetailsAvailable>
              <p>No details available</p>
            </NoDetailsAvailable>
          )}
        </div>
      )}
    </Box>
  )
}
const mapStateToProps = (state: any) => ({
  userInfo: state.user.userInfo,
})
export default withRouter(connect(mapStateToProps)(TreasuryPropertyDetails))
