import React from 'react'
import { cardStyle, StyledLinearProgress, Title, CardBoldText, CardLightText, UpgradeBidTxt, NoDataContainer } from './style'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import PhotoImg from 'assets/images/photo.png'
import { PrimaryButton, SecondaryButton } from 'shared/components/buttons'
import ComponentLoader from 'shared/loader-components/component-loader'
import { Grid } from '@material-ui/core'
import { getDaysValue } from 'shared/helpers/globalFunction'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'
import { apiBaseUrl } from 'services/global-constant'

const ParticipateProperties = (props: any) => {
  const { data, dataLoading } = props
  const classes = cardStyle()

  const handleAuctionDetails = (id: string) => {
    history.push(`${Paths.auctionDetails}/${id}`)
  }
  const handleUpgradeBidDetails = (id: string) => {
    history.push(`${Paths.upgradeBid}/${id}`)
  }
  const getRemainingDays = (endDate: Date) => {
    const daysRemaining = getDaysValue(new Date(), endDate)
    return (
      <CardLightText style={{ textAlign: 'right' }}>
        <span>{daysRemaining}</span> {daysRemaining === 1 ? 'Day remaining' : 'Days remaining'}
      </CardLightText>
    )
  }
  const getProgressValue = (startDate: Date, endDate: Date) => {
    const daysRemaining = getDaysValue(new Date(), endDate)
    const totalDays = getDaysValue(startDate, endDate)
    const daysDIff = totalDays - daysRemaining
    const progressVal = (daysDIff / totalDays) * 100
    return progressVal
  }
  const getImg = (imgData: any) => {
    const imgArr: any = []
    for (const item of imgData) {
      if (item.type === 0) {
        imgArr.push(item)
      }
    }
    const imgUrl = `${apiBaseUrl}/${imgArr[0].filename}`
    return imgUrl
  }

  const renderParticipatedCard = (item: any) => {
    const { bidDetails, PropertyDetails } = item
    return (
      <Card className={classes.root}>
        <img className={classes.media} src={getImg(PropertyDetails.getDocs)} alt="" />
        <CardContent>
          <Grid container className={classes.btnContStyle}>
            <Grid item>
              <Title>{PropertyDetails.propertyDetails.PropertyName}</Title>
              <CardLightText>{bidDetails[0].propertyID}</CardLightText>
            </Grid>
          </Grid>
          <Grid container justify="space-between" alignItems="center" spacing={2}>
            <Grid item>
              <CardLightText>Average Bid</CardLightText>
              <CardBoldText>{bidDetails[0].bidPrice}</CardBoldText>
            </Grid>
            <Grid item>
              <CardLightText style={{ textAlign: 'right' }}>
                <span>3</span> Days remaining
              </CardLightText>
              <StyledLinearProgress variant="determinate" value={70} />
            </Grid>
          </Grid>
          <Grid container justify="space-between" alignItems="center" spacing={2}>
            <Grid item>
              <CardLightText>Your Bid</CardLightText>
              <CardBoldText>$10.00</CardBoldText>
            </Grid>
            <Grid item>
              <UpgradeBidTxt onClick={() => handleUpgradeBidDetails(bidDetails[0].auctionID)}>Upgrade your bid</UpgradeBidTxt>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <Grid container spacing={2} className={classes.btnContStyle}>
            <Grid item xs={12} sm={6}>
              <PrimaryButton fullWidth className={classes.btnStyle} onClick={() => handleAuctionDetails(bidDetails[0].auctionID)}>
                LIVE AUCTION
              </PrimaryButton>
            </Grid>
            <Grid item xs={12} sm={6}>
              <SecondaryButton fullWidth className={classes.btnStyle}>
                PROPERTY DETAILS
              </SecondaryButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    )
  }

  return (
    <div>
      {dataLoading ? (
        <ComponentLoader />
      ) : (
        <div>
          {!!data && data.length > 0 ? (
            <Grid container spacing={3}>
              {data.map((item: any, k: number) => (
                <Grid item key={k}>
                  {renderParticipatedCard(item)}
                </Grid>
              ))}
            </Grid>
          ) : (
            <NoDataContainer>
              <p>No data available</p>
            </NoDataContainer>
          )}
        </div>
      )}
    </div>
  )
}
export default ParticipateProperties
