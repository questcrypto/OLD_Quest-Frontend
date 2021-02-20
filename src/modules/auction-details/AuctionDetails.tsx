import React from 'react'
import { withRouter } from 'react-router'
import { useStyles, HeaderContainer, HeaderPath, HeaderTitle, LightText, BoldText } from './style'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import PhotoImg from 'assets/images/photo.png'

const imageList = [{ image: PhotoImg }, { image: PhotoImg }, { image: PhotoImg }, { image: PhotoImg }]

const AuctionDetails = (props: any) => {
  const classes = useStyles()

  const renderSmallImages = () => {
    return imageList.map((item: any, k: any) => {
      return (
        <Grid item key={k} className={classes.imgOnHoverStyle}>
          <img className={classes.smallImgStyle} src={item.image} alt="" />
        </Grid>
      )
    })
  }
  return (
    <Box className={classes.root}>
      <HeaderContainer>
        <HeaderPath>
          <span>Properties / New / ID522011</span> / Auction
        </HeaderPath>
        <HeaderTitle>Property </HeaderTitle>
      </HeaderContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={5} container direction="column">
          <img className={classes.imgStyle} src={PhotoImg} alt="" />
          <Grid container spacing={1} className={classes.smallImgCont}>
            {renderSmallImages()}
          </Grid>
          <LightText>
            Central Valley Home In Taylor with a large backyard pool. Completely remodeled in 2016 everything up to date. 6 Bedrooms and 2
            Full bathrooms. Living Room and Downstairs family room laundry room etc… and a true 2 car garage.
          </LightText>
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          second
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          third
        </Grid>
      </Grid>
    </Box>
  )
}
export default withRouter(AuctionDetails)
