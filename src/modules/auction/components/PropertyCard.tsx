import React from 'react'
import { cardStyle, StyledLinearProgress, Title, CardBoldText, CardLightText, UpgradeBidTxt } from './style'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import PhotoImg from 'assets/images/photo.png'
import { PrimaryButton, SecondaryButton } from 'shared/components/buttons'
import { Grid } from '@material-ui/core'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'

const PropertyCard = (props: any) => {
  const { data } = props
  const classes = cardStyle()

  const handlePropertyDetails = () => {
    history.push(Paths.auctionDetails)
  }

  return (
    <Card className={classes.root}>
      <img className={classes.media} src={PhotoImg} alt="" />
      <CardContent>
        <Grid container className={classes.btnContStyle}>
          <Grid item>
            <Title>Eiffel Tower</Title>
            <CardLightText>QUEST24567</CardLightText>
          </Grid>
        </Grid>
        <Grid container justify="space-between" alignItems="center" spacing={2}>
          <Grid item>
            <CardLightText>Average Bid</CardLightText>
            <CardBoldText>{data.averageBid}</CardBoldText>
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
            <CardBoldText>{data.selfBid}</CardBoldText>
          </Grid>
          <Grid item>
            <UpgradeBidTxt>Upgrade your bid</UpgradeBidTxt>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <Grid container spacing={2} className={classes.btnContStyle}>
          <Grid item xs={12} sm={6}>
            <PrimaryButton fullWidth className={classes.btnStyle}>
              LIVE AUCTION
            </PrimaryButton>
          </Grid>
          <Grid item xs={12} sm={6}>
            <SecondaryButton fullWidth className={classes.btnStyle} onClick={() => handlePropertyDetails()}>
              PROPERTY DETAILS
            </SecondaryButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}
export default PropertyCard
