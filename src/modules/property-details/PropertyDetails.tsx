import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  useStyles,
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
} from './style'
import ComponentLoader from 'shared/loader-components/component-loader'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import { Box } from '@material-ui/core'
import plot from 'assets/images/plot.png'
import coin from 'assets/images/coin.svg'
import FileIcon from 'assets/icons/fileIcon.svg'
import Features from 'modules/property-features/Features'
import RentalFacts from 'modules/property-features/RentalFacts'
import axios from 'axios'
import { apiBaseUrl, imageBaseUrl } from 'services/global-constant'
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
            <img className="doc-img" src={`${imageBaseUrl}/${item.filename}`} alt="" onClick={() => setSelectImg(item.filename)} />
          </Paper>
          <DocName>{item.Name}</DocName>
        </Box>
      )
    })
  }
  const handleEditProperty = () => {
    if (!!userInfo && userInfo.role === 1) {
      history.push(`${Paths.editPropertyForm}/${props.match.params.propertyId}`)
    } else {
      history.push(`${Paths.viewPropertyForm}/${props.match.params.propertyId}`)
    }
  }

  return (
    <Box>
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
                      <EditSection onClick={() => handleEditProperty()}>
                        <span>{!!userInfo && userInfo.role === 1 ? 'EDIT' : 'VIEW'}</span>
                        <CreateOutlinedIcon />
                      </EditSection>
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
                  </Grid>
                </Grid>
              </Paper>

              <Paper className={classes.rentalPaper}>
                <FeatureHeading>Rental facts and features</FeatureHeading>
                <RentalFacts data={propertyInfo.propertyDetails} />
                <Divider className={classes.dividerStyle} />
                <FeatureHeading>Features</FeatureHeading>
                <Features data={propertyInfo.propertyDetails} />
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
export default withRouter(connect(mapStateToProps)(PropertyDetails))
