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
  InfoBoldTxt,
  InfoLightTxt,
  ExpandIconButton,
  TreasuryOwnerCont,
} from './style'
import ComponentLoader from 'shared/loader-components/component-loader'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import { Box } from '@material-ui/core'
import Features from 'modules/property-features/Features'
import RentalFacts from 'modules/property-features/RentalFacts'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'
import { PrimaryButton } from 'shared/components/buttons'
import { formatExtendedDateString, getFullName, currencyString } from 'shared/helpers/globalFunction'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MailIcon from '@material-ui/icons/Mail'
import TabComponent from 'shared/tab-component'
import DocumentsTable from 'modules/treasury/treasury-details/components/DocumentsTable'
import { treasuryDetailsTabList } from 'shared/helpers/dataConstant'

const OwnerPropertyDetails = (props: any) => {
  const classes = useStyles()
  const [dataLoading, setDataLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState('documents')
  const [propertyInfo, setPropertyInfo] = useState<any>({})
  const [imageList, setImageList] = useState<any>([])
  const [docList, setDocList] = useState<any>([])
  const [selectImg, setSelectImg] = useState('')
  const { userInfo } = props

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
          setSelectImg(images[0].filename)
          setDocList([...docs])
        }
      } catch (error) {
      } finally {
        setDataLoading(false)
      }
    }
    getPropertyDetails()
  }, [props.match.params.propertyId])

  const handleEditProperty = () => {
    if (!!userInfo && userInfo.role === 1) {
      history.push(`${Paths.editPropertyForm}/${props.match.params.propertyId}`)
    } else {
      history.push(`${Paths.viewPropertyForm}/${props.match.params.propertyId}`)
    }
  }

  return (
    <>
      <Box>
        <HeaderContainer>
          <HeaderPath>
            <span>Properties / Details</span> / {props.match.params.propertyId}
          </HeaderPath>
          <Grid container justify="space-between" spacing={2}>
            <Grid item>
              <HeaderTitle>{propertyInfo?.propertyDetails ? propertyInfo.propertyDetails.PropertyName : ''}</HeaderTitle>
            </Grid>
            <Grid item>
              <PrimaryButton variant="contained" onClick={() => handleEditProperty()}>
                REVIEW PROPERTY
              </PrimaryButton>
            </Grid>
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
                      <img src={`${apiBaseUrl}/${selectImg}`} alt="" />
                    </Grid>
                    <Grid item>
                      <InfoBoldTxt>{propertyInfo.propertyDetails.Address1!}</InfoBoldTxt>
                      <InfoLightTxt>
                        {`${propertyInfo.propertyDetails.Address2!},
                          ${propertyInfo.propertyDetails.State!},
                          ${propertyInfo.propertyDetails.City!},
                          ${propertyInfo.propertyDetails.Country!} 
                          ${propertyInfo.propertyDetails.PostalCode!}
                        `}
                      </InfoLightTxt>
                    </Grid>
                    <Divider orientation="vertical" className={classes.verticalDividerStyle} />
                    <Grid item>
                      <InfoLightTxt>Onboarding date</InfoLightTxt>
                      <InfoBoldTxt>{formatExtendedDateString(propertyInfo.propertyDetails.CreatedAt)}</InfoBoldTxt>
                    </Grid>
                    <Divider orientation="vertical" className={classes.verticalDividerStyle} />
                    <Grid item>
                      <InfoLightTxt>Status</InfoLightTxt>
                      <InfoBoldTxt>Published</InfoBoldTxt>
                    </Grid>
                    <Divider orientation="vertical" className={classes.verticalDividerStyle} />
                    <Grid item>
                      <InfoLightTxt>Estimated value</InfoLightTxt>
                      <InfoBoldTxt>{currencyString(propertyInfo.propertyDetails.CurrentValue)}</InfoBoldTxt>
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
                            <InfoBoldTxt>{getFullName(propertyInfo.propertyDetails.Fname, propertyInfo.propertyDetails.Lname)}</InfoBoldTxt>
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
                            <InfoBoldTxt>{'HOA Admin'}</InfoBoldTxt>
                          </div>
                          <MailIcon />
                        </TreasuryOwnerCont>
                      </Paper>
                    </Grid>
                  </Grid>
                </Paper>
                <TabComponent tabOptions={treasuryDetailsTabList} activeTab={activeTab} setActiveTab={setActiveTab} />
                <DocumentsTable data={docList} />
              </div>
            ) : (
              <NoDetailsAvailable>
                <p>No details available</p>
              </NoDetailsAvailable>
            )}
          </div>
        )}
      </Box>
    </>
  )
}
const mapStateToProps = (state: any) => ({
  userInfo: state.user.userInfo,
})
export default withRouter(connect(mapStateToProps)(OwnerPropertyDetails))
