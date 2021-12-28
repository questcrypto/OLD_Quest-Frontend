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
import { Box, Tab } from '@material-ui/core'
import Features from 'modules/property-features/Features'
import RentalFacts from 'modules/property-features/RentalFacts'
import axios from 'axios'
import { apiBaseUrl, imageBaseUrl } from 'services/global-constant'
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
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import demoImage from '../../../assets/images/metamask.jpg'
import Slider from 'react-slick'
import FormFeatures from 'modules/property-features/FormFeatures'
import TokenHolderTable from 'modules/treasury/treasury-details/components/TokenHolderTable'
import TransactionTable from 'modules/treasury/treasury-details/components/TransactionTable'

const GeneralUserPropertyDetails = (props: any) => {
  const classes = useStyles()
  const [dataLoading, setDataLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState('documents')
  const [propertyInfo, setPropertyInfo] = useState<any>({})
  const [imageList, setImageList] = useState<any>([])
  const [docList, setDocList] = useState<any>([])
  const [selectImg, setSelectImg] = useState('')
  const [image, setImage] = useState()
  const { userInfo, loggedIn } = props

  const settings: any = {
    dots: false,
    infinite: false,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    loop: false,
    responsive: [
      {
        breakpoint: 1365,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  }
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

  const [value, setValue] = useState<any>('1')
  const [factAndFeatureTab, setFactAndFeatureTab] = useState<any>('1')
  const [buyTokenTab, setFeaturBuyTokenTab] = useState<any>('1')

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue)
  }

  const factAndFeatureTabChange = (event: any, newValue: any) => {
    setFactAndFeatureTab(newValue)
  }

  const buyTokenTabChange = (event: any, newValue: any) => {
    setFeaturBuyTokenTab(newValue)
  }

  const changeImage = (src: any) => {
    console.log(src)
    setImage(src)
  }

  return (
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
            {loggedIn ? (
              <PrimaryButton variant="contained" onClick={() => handleEditProperty()}>
                REVIEW PROPERTY
              </PrimaryButton>
            ) : (
              ''
            )}
          </Grid>
        </Grid>
      </HeaderContainer>
      {dataLoading ? (
        <ComponentLoader />
      ) : (
        <div>
          {!!propertyInfo && Object.values(propertyInfo).length > 0 ? (
            <div>
              <>
                <Grid className={classes.infoContStyle} spacing={2}>
                  <Grid item className={classes.infoContSlider}>
                    <div className={classes.infoItemImages}>
                      <img src={demoImage} alt="" />
                    </div>
                    <div>
                      <Slider {...settings}>
                        <div className={classes.activeItem}>
                          <img src={demoImage} alt="" />{' '}
                        </div>
                        <div onClick={(e: any) => changeImage(e.target.src)}>
                          <img src={demoImage} alt="" />{' '}
                        </div>
                        <div>
                          <img src={demoImage} alt="" />{' '}
                        </div>
                        <div>
                          <img src={demoImage} alt="" />{' '}
                        </div>
                      </Slider>
                    </div>
                  </Grid>

                  <Grid item className={classes.rightSection}>
                    <TabContext value={value}>
                      <Box>
                        <TabList className={classes.TabListRow} onChange={handleChange} aria-label="lab API tabs example">
                          <Tab label="Property Details" value="1" />
                          <Tab label="Facts and Features" value="2" />
                          <Tab label="Buy Tokens" value="3" />
                        </TabList>
                      </Box>
                      <TabPanel className={classes.tadWrapper} value="1">
                        <div className={classes.topHeading}>
                          <InfoBoldTxt>{propertyInfo.propertyDetails.Address1!}</InfoBoldTxt>
                          <InfoLightTxt>
                            {`${propertyInfo.propertyDetails.Address2!},
                                ${propertyInfo.propertyDetails.State!},
                                ${propertyInfo.propertyDetails.City!},
                                ${propertyInfo.propertyDetails.Country!} 
                                ${propertyInfo.propertyDetails.PostalCode!}
                              `}
                          </InfoLightTxt>
                        </div>
                        <div className={classes.tadListingRow}>
                          <Grid item>
                            <InfoLightTxt>Onboarding date</InfoLightTxt>
                            <InfoBoldTxt>{formatExtendedDateString(propertyInfo.propertyDetails.CreatedAt)}</InfoBoldTxt>
                          </Grid>
                          <Grid item>
                            <InfoLightTxt>Status</InfoLightTxt>
                            <InfoBoldTxt>Published</InfoBoldTxt>
                          </Grid>
                          <Grid item>
                            <InfoLightTxt>Estimated value</InfoLightTxt>
                            <InfoBoldTxt>{currencyString(propertyInfo.propertyDetails.CurrentValue)}</InfoBoldTxt>
                          </Grid>
                        </div>
                        <TreasuryOwnerCont className={classes.ownerCont}>
                          <InfoLightTxt>Owner</InfoLightTxt>
                          <InfoBoldTxt>{getFullName(propertyInfo.propertyDetails.Fname, propertyInfo.propertyDetails.Lname)}</InfoBoldTxt>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                              fill="black"
                              fill-opacity="0.54"
                            />
                          </svg>
                        </TreasuryOwnerCont>
                        {/* <TreasuryOwnerCont>
                          <div>
                            <InfoLightTxt>HOA Admin</InfoLightTxt>
                            <InfoBoldTxt>{'HOA Admin'}</InfoBoldTxt>
                          </div>
                        </TreasuryOwnerCont> */}
                      </TabPanel>
                      <TabPanel className={classes.tadWrapper} value="2">
                        <TabContext value={factAndFeatureTab}>
                          <TabList onChange={factAndFeatureTabChange} className={classes.innerTab} aria-label="lab API tabs example">
                            <Tab label="Features" value="1" />
                            <Tab label="Facts" value="2" />
                          </TabList>
                          <TabPanel value="1">
                            <Features data={propertyInfo.propertyDetails} />
                          </TabPanel>
                          <TabPanel value="2">
                            <RentalFacts data={propertyInfo.propertyDetails} />
                          </TabPanel>
                        </TabContext>
                      </TabPanel>
                      <TabPanel className={classes.tadWrapper} value="3">
                        <TabContext value={buyTokenTab}>
                          <TabList onChange={buyTokenTabChange} className={classes.innerTab} aria-label="lab API tabs example">
                            <Tab label="Equity" value="1" />
                            <Tab label="Governance" value="2" />
                            <Tab label="Income" value="3" />
                          </TabList>
                          <TabPanel className={classes.mainWrapper} value="1">
                            <FormFeatures />
                          </TabPanel>
                          <TabPanel value="2">
                            <FormFeatures />{' '}
                          </TabPanel>
                          <TabPanel value="3">
                            <FormFeatures />{' '}
                          </TabPanel>
                        </TabContext>
                      </TabPanel>
                    </TabContext>
                  </Grid>
                </Grid>
              </>
              <TabComponent tabOptions={treasuryDetailsTabList} activeTab={activeTab} setActiveTab={setActiveTab} />
              {console.log(activeTab)}
              {activeTab == 'documents' ? (
                <DocumentsTable data={docList} />
              ) : activeTab == 'tokenHolders' ? (
                <TokenHolderTable data={docList} />
              ) : (
                <TransactionTable data={docList} />
              )}
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
  loggedIn: state.user.loggedIn,
})
export default withRouter(connect(mapStateToProps)(GeneralUserPropertyDetails))
