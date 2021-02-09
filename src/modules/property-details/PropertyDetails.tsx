import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  useStyles,
  PropertyDetailsCont,
  HeaderContainer,
  NoDetailsAvailable,
  HeaderPath,
  HeaderTitle,
  AddressContainer,
  AddressInfo,
  EditSection,
  PriceContainer,
  PriceInfo,
  AboutProperty,
  DocWrapper,
  DocContainer,
  DocName,
  FeatureHeading,
  FeatureInfo,
  FeatureName,
  FeatureValue,
} from './style'
import ComponentLoader from 'shared/loader-components/component-loader'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import { Box, Button } from '@material-ui/core'
import plot from 'assets/images/plot.png'
import coin from 'assets/images/coin.png'
import roof from 'assets/images/roof.svg'
import pool from 'assets/images/pool.png'
import heating from 'assets/images/heating.png'
import air from 'assets/images/air.png'
import exterior from 'assets/images/exterior.png'
import floor from 'assets/images/floor.png'
import land from 'assets/images/land.png'
import FileIcon from 'assets/icons/fileIcon.svg'
import window from 'assets/images/window.png'
import { getPropertyType } from 'shared/helpers/globalFunction'
import moment from 'moment'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'

const PropertyDetails = (props: any) => {
  const classes = useStyles()
  const [dataLoading, setDataLoading] = useState(false)
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

  const renderDocs = () => {
    return docList.map((item: any, index: number) => {
      return (
        <Box key={index}>
          <Paper className={classes.docPaperStyle}>
            <img src={FileIcon} alt="" />
          </Paper>
          <DocName>{item.Name}</DocName>
        </Box>
      )
    })
  }

  const renderImages = () => {
    return imageList.map((item: any, index: number) => {
      return (
        <Box key={index}>
          <Paper className={classes.docPaperStyle}>
            <img className="doc-img" src={`${apiBaseUrl}/${item.filename}`} alt="" onClick={() => setSelectImg(item.filename)} />
          </Paper>
          <DocName>{item.Name}</DocName>
        </Box>
      )
    })
  }
  const handleEditProperty = () => {
    history.push(`${Paths.editPropertyForm}/${props.match.params.propertyId}`)
  }

  return (
    <PropertyDetailsCont>
      <HeaderContainer>
        <HeaderPath>
          <span>Properties / New</span> / {props.match.params.propertyId}
        </HeaderPath>
        <HeaderTitle>Property Details</HeaderTitle>
      </HeaderContainer>
      {dataLoading ? (
        <ComponentLoader />
      ) : (
        <div>
          {!!propertyInfo && Object.values(propertyInfo).length > 0 ? (
            <div>
              <Paper className={classes.propertyPaper}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <img className={classes.img} alt="complex" src={`${apiBaseUrl}/${selectImg}`} />
                    <DocWrapper>
                      <p>More Images</p>
                      <DocContainer>{renderImages()}</DocContainer>
                    </DocWrapper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <AddressContainer>
                      <AddressInfo>
                        <h4>{propertyInfo.propertyDetails.Address1}</h4>
                        <p>{`${propertyInfo.propertyDetails.Address2}, ${propertyInfo.propertyDetails.State},${propertyInfo.propertyDetails.Country}`}</p>
                      </AddressInfo>
                      {!!userInfo && userInfo.role === 1 && (
                        <EditSection onClick={() => handleEditProperty()}>
                          <span>EDIT</span>
                          <CreateOutlinedIcon />
                        </EditSection>
                      )}
                    </AddressContainer>
                    <PriceContainer>
                      <PriceInfo>
                        <img src={plot} alt="plot" style={{ margin: '0 10px' }} />
                        <p> {`${propertyInfo.propertyDetails.Lotfacts} m2`}</p>
                      </PriceInfo>
                      <PriceInfo>
                        <img src={coin} alt="coin" style={{ margin: '0 10px' }} />
                        {`$${parseFloat(propertyInfo.propertyDetails.CurrentValue).toFixed(2)}`}
                      </PriceInfo>
                    </PriceContainer>
                    <AboutProperty>{propertyInfo.propertyDetails.Comments}</AboutProperty>
                    <DocWrapper>
                      <p>Documents uploads</p>
                      <DocContainer className={classes.docBox}>{renderDocs()}</DocContainer>
                    </DocWrapper>
                    <Box className={classes.btnGroup}>
                      <Button className={classes.btn1Style}>Live auction</Button>
                      <Button className={classes.btn1Style}>Button text</Button>
                      <Button className={classes.btn2Style}>Button text</Button>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>

              <Paper className={classes.rentalPaper}>
                <FeatureHeading>Rental facts and features</FeatureHeading>
                <Grid container spacing={6}>
                  <Grid item xs={6}>
                    <FeatureInfo>
                      <FeatureName>
                        <img src={roof} alt="" />
                        <span>Roof</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Roof}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <img src={heating} alt="" />
                        <span>Heating</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Heating}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <img src={air} alt="" />
                        <span>Air Conditioning</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.AC}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <img src={floor} alt="" />
                        <span>Floor</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Floor}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <img src={window} alt="" />
                        <span>Window Covering</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.WindowCovering}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <img src={exterior} alt="" />
                        <span>Exterior Features</span>
                      </FeatureName>
                      <FeatureValue>Brick</FeatureValue>
                    </FeatureInfo>
                  </Grid>
                  <Grid item xs={6}>
                    <FeatureInfo>
                      <FeatureName>
                        <img src={pool} alt="" />
                        <span>Pool</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Pool}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <img src={pool} alt="" />
                        <span>Pool Features</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.PoolFeature}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <img src={exterior} alt="" />
                        <span>Exterior</span>
                      </FeatureName>
                      <FeatureValue>Brick 70%</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <img src={land} alt="" />
                        <span>Landscaping</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Landscaping}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <img src={plot} alt="" />
                        <span>Lot Facts</span>
                      </FeatureName>
                      <FeatureValue>{`${propertyInfo.propertyDetails.Lotfacts} m2`}</FeatureValue>
                    </FeatureInfo>
                  </Grid>
                </Grid>
                <Divider className={classes.dividerStyle} />
                <FeatureHeading>Features</FeatureHeading>
                <Grid container spacing={6}>
                  <Grid item xs={6}>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Type</span>
                      </FeatureName>
                      <FeatureValue>{getPropertyType(propertyInfo.propertyDetails.PropertyType)}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Style</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Style}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Year Built</span>
                      </FeatureName>
                      <FeatureValue>{moment(propertyInfo.propertyDetails.YearBuilt).format('YYYY')}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Acres</span>
                      </FeatureName>
                      <FeatureValue>{`${propertyInfo.propertyDetails.Lotfacts} m2`}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Deck</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Deck}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Patio</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Patio}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Garage</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Garage}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Carport</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Carpot}</FeatureValue>
                    </FeatureInfo>
                  </Grid>
                  <Grid item xs={6}>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Parking Space</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.ParkingSpace}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Fin Bsmt</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.FinBasmt}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Basement</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Basement}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Driveway</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Driveway}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Water</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Water}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Water Shares</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.WaterShare}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Spa</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Spa}</FeatureValue>
                    </FeatureInfo>
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
    </PropertyDetailsCont>
  )
}
const mapStateToProps = (state: any) => ({
  userInfo: state.user.userInfo,
})
export default withRouter(connect(mapStateToProps)(PropertyDetails))
