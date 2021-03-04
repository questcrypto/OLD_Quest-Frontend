import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { useStyles, HeaderContainer, HeaderPath, HeaderTitle } from './style'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import PropertyImages from './components/PropertyImages'
import UpgradeBid from './components/UpgradeBid'
import AuctionStats from './components/AuctionStats'
import ComponentLoader from 'shared/loader-components/component-loader'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'

const UpgradeBidDetails = (props: any) => {
  const classes = useStyles()
  const [dataLoading, setDataLoading] = useState(false)
  const [auctionData, setAuctionData] = useState<any>({})
  const [selectedImg, setSelectedImg] = useState<any>({})
  const [imageList, setImageList] = useState<any>([])
  const [totalToken, setTotalToken] = useState(0)
  const [reservePriceMet, setReservePriceMet] = useState(false)
  const [currentBid, setCurrentBid] = useState(0)
  const { userInfo, match } = props

  useEffect(() => {
    const auctionId = match.params.auctionId
    const data = { id: auctionId, publicaddress: userInfo.publicaddress }
    const getAuctionData = async () => {
      try {
        setDataLoading(true)
        const res = await axios.post(`${apiBaseUrl}/auction/getListOfParticipatedAuctions`, data)
        if (!!res && res.data) {
          const imgList = []
          for (const item of res.data.propertyDetail.getDocs) {
            if (item.type === 0) {
              imgList.push(item)
            }
          }
          const totalTokenVal = parseInt(res.data.propertyDetail.propertyDetails.CurrentValue)
          const reserveVal = res.data.auctionDetails[0].minReserve + res.data.auctionDetails[0].slReserve
          if (res.data.bidStats.amountRaised > reserveVal) {
            setReservePriceMet(true)
          }
          const currentBidVal = res.data.auctionDetails[0].suggestedLowestBid
          setCurrentBid(currentBidVal)
          setTotalToken(totalTokenVal)
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
  }, [userInfo, match])

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
                <UpgradeBid
                  currentBid={currentBid}
                  totalToken={totalToken}
                  auctionID={match.params.auctionId}
                  biddersID={!!userInfo && userInfo.publicaddress}
                  propertyID={auctionData.auctionDetails[0].propidId}
                  propertyName={auctionData.propertyDetail.propertyDetails.PropertyName}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3} container>
                <AuctionStats
                  bidStats={auctionData.bidStats}
                  auctionDetails={auctionData.auctionDetails[0]}
                  reservePriceMet={reservePriceMet}
                  totalToken={totalToken}
                />
              </Grid>
            </Grid>
          )}
        </div>
      )}
    </Box>
  )
}

const mapStateToProps = (state: any) => ({
  userInfo: state.user.userInfo,
})
export default withRouter(connect(mapStateToProps)(UpgradeBidDetails))
