import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { useStyles, HeaderContainer, HeaderPath, HeaderTitle } from './style'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import PropertyImages from './components/PropertyImages'
import AuctionBid from './components/AuctionBid'
import AuctionStats from './components/AuctionStats'
import ComponentLoader from 'shared/loader-components/component-loader'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'

const AuctionDetails = (props: any) => {
  const classes = useStyles()
  const [dataLoading, setDataLoading] = useState(false)
  const [auctionData, setAuctionData] = useState<any>({})
  const [selectedImg, setSelectedImg] = useState<any>({})
  const [imageList, setImageList] = useState<any>([])
  const { match } = props

  useEffect(() => {
    const auctionId = match.params.auctionId
    const getAuctionData = async () => {
      try {
        setDataLoading(true)
        const res = await axios.get(`${apiBaseUrl}/auction/getAuctionDetail/${auctionId}`)
        console.log('res->', res.data)
        if (!!res && res.data) {
          const imgList = []
          for (const item of res.data.propertyDetail.getDocs) {
            if (item.type === 0) {
              imgList.push(item)
            }
          }
          setSelectedImg(imgList[0])
          setImageList(imgList)
          setAuctionData(res.data)
        }
      } catch (error) {
      } finally {
        setDataLoading(false)
      }
    }
    getAuctionData()
  }, [match])

  return (
    <Box className={classes.root}>
      <HeaderContainer>
        <HeaderPath>
          <span>Properties / New / ID522011</span> / Auction
        </HeaderPath>
        <HeaderTitle>Property </HeaderTitle>
      </HeaderContainer>
      {dataLoading ? (
        <ComponentLoader />
      ) : (
        <div>
          {!!auctionData && Object.values(auctionData).length > 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} container>
                <PropertyImages imageList={imageList} selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
              </Grid>
              <Grid item xs={12} sm={6} md={5} container>
                <AuctionBid auctionData={auctionData} />
              </Grid>
              <Grid item xs={12} sm={6} md={3} container>
                <AuctionStats bidStats={auctionData.bidStats} auctionDetails={auctionData.auctionDetails} />
              </Grid>
            </Grid>
          )}
        </div>
      )}
    </Box>
  )
}
export default withRouter(AuctionDetails)
