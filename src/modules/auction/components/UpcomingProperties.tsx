import React from 'react'
import { cardStyle, Title, CardLightText, NoDataContainer } from './style'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import { SecondaryButton } from 'shared/components/buttons'
import ComponentLoader from 'shared/loader-components/component-loader'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'
import { apiBaseUrl } from 'services/global-constant'
import EmptyPage from 'shared/empty-page'

const UpcomingProperties = (props: any) => {
  const { dataLoading, data } = props
  const classes = cardStyle()

  const handlePropertyDetails = (id: string) => {
    history.push(`${Paths.ownerPropertyDetails}/${id}`)
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
      <Card className={classes.root}>
        <img className={classes.media} src={getImg(PropertyDetails.getDoc)} alt="" />
        <CardContent>
          <Grid container className={classes.btnContStyle}>
            <Grid item>
              <Title>{PropertyDetails.PropertyName}</Title>
              <CardLightText>{AuctionDetail[0].propidId}</CardLightText>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <SecondaryButton fullWidth className={classes.upcomingBtnStyle} onClick={() => handlePropertyDetails(AuctionDetail[0].propidId)}>
            PROPERTY DETAILS
          </SecondaryButton>
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
export default UpcomingProperties
