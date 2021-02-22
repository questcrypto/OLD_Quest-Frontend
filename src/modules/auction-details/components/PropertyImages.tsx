import React from 'react'
import { imagesStyle, AboutPropertyTxt } from './style'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import PhotoImg from 'assets/images/photo.png'

const imageList = [{ image: PhotoImg }, { image: PhotoImg }, { image: PhotoImg }, { image: PhotoImg }]

const PropertyImages = (props: any) => {
  const classes = imagesStyle()

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
    <Box>
      <img className={classes.imgStyle} src={PhotoImg} alt="" />
      <Grid container spacing={1} className={classes.smallImgCont}>
        {renderSmallImages()}
      </Grid>
      <AboutPropertyTxt>
        Central Valley Home In Taylor with a large backyard pool. Completely remodeled in 2016 everything up to date. 6 Bedrooms and 2 Full
        bathrooms. Living Room and Downstairs family room laundry room etc… and a true 2 car garage.
      </AboutPropertyTxt>
    </Box>
  )
}
export default PropertyImages
