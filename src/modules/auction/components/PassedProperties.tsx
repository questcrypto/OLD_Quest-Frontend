import React from 'react'
import { WinLossButton } from 'shared/styles/styled'
import { PassedPropertyCont, cardStyle, StyledLinearProgress, Title, CardBoldText, CardLightText, NoDataContainer } from './style'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import { PrimaryButton, SecondaryButton } from 'shared/components/buttons'
import ComponentLoader from 'shared/loader-components/component-loader'
import { getDaysValue } from 'shared/helpers/globalFunction'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'
import { apiBaseUrl } from 'services/global-constant'
import EmptyPage from 'shared/empty-page'

const PassedProperties = (props: any) => {
  const { dataLoading, data } = props
  const classes = cardStyle()

  const handleAuctionDetails = (id: string) => {
    history.push(`${Paths.auctionDetails}/${id}`)
  }

  const handlePropertyDetails = (id: string) => {
    history.push(`${Paths.ownerPropertyDetails}/${id}`)
  }

  const getRemainingDays = (endDate: Date) => {
    const daysRemaining = getDaysValue(new Date(), endDate)
    if (daysRemaining >= 1) {
      return (
        <CardLightText style={{ textAlign: 'right' }}>
          <span>{daysRemaining}</span> {daysRemaining === 1 ? 'Day remaining' : 'Days remaining'}
        </CardLightText>
      )
    }

    return (
      <CardLightText style={{ textAlign: 'right' }}>
        <span>Bidding Over</span>
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

  const renderOnGoingCard = (item: any) => {
    const { AuctionDetail, PropertyDetails } = item

    return (
      <PassedPropertyCont>
        <WinLossButton>Lost</WinLossButton>
        <Card className={classes.root}>
          <img className={classes.media} src={getImg(PropertyDetails.getDocs)} alt="" />
          <CardContent>
            <Grid container className={classes.btnContStyle}>
              <Grid item>
                <Title>{PropertyDetails.propertyDetails.PropertyName}</Title>
                <CardLightText>{AuctionDetail.propidId}</CardLightText>
              </Grid>
            </Grid>
            <Grid container justify="space-between" alignItems="center" spacing={2}>
              <Grid item>
                <CardLightText>Current Bid</CardLightText>
                <CardBoldText>{`$ ${parseFloat(PropertyDetails.propertyDetails.CurrentValue).toFixed(2)}`}</CardBoldText>
              </Grid>
              <Grid item>
                {getRemainingDays(AuctionDetail.endDate)}
                <StyledLinearProgress variant="determinate" value={getProgressValue(AuctionDetail.startDate, AuctionDetail.endDate)} />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions disableSpacing>
            <Grid container spacing={2} className={classes.btnContStyle}>
              <Grid item xs={12} sm={6}>
                <PrimaryButton
                  fullWidth
                  className={classes.btnStyle}
                  onClick={() => handleAuctionDetails(AuctionDetail.id)}
                  disabled={getDaysValue(new Date(), AuctionDetail.endDate) < 1}
                >
                  LIVE AUCTION
                </PrimaryButton>
              </Grid>
              <Grid item xs={12} sm={6}>
                <SecondaryButton
                  fullWidth
                  className={classes.btnStyle}
                  onClick={() => handlePropertyDetails(PropertyDetails.propertyDetails.id)}
                >
                  PROPERTY DETAILS
                </SecondaryButton>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </PassedPropertyCont>
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
                  {renderOnGoingCard(item)}
                </Grid>
              ))}
            </Grid>
          ) : (
            <NoDataContainer>
              <EmptyPage name="for ongoing auction" />
            </NoDataContainer>
          )}
        </div>
      )}
    </div>
  )
}
export default PassedProperties
