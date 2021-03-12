import React from 'react'
import { imagesStyle, AboutPropertyTxt } from './style'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { apiBaseUrl } from 'services/global-constant'
import { GridList, GridListTile } from '@material-ui/core'

const PropertyImages = (props: any) => {
  const classes = imagesStyle()
  const { imageList, selectedImg, setSelectedImg, propertyText } = props

  const handleImage = (imgData: any) => {
    setSelectedImg(imgData)
  }

  const renderSmallImages = () => {
    return imageList.map((item: any, k: any) => {
      return (
        <>
          <GridListTile key={k} className={classes.imgOnHoverStyle}>
            <img
              className={classes.smallImgStyle}
              src={`${apiBaseUrl}/${item.filename}`}
              alt=""
              onClick={() => {
                handleImage(item)
              }}
            />
          </GridListTile>
        </>
      )
    })
  }
  return (
    <Box overflow="hidden">
      <img className={classes.imgStyle} src={`${apiBaseUrl}/${selectedImg.filename}`} alt="" />
      <GridList className={classes.smallImgCont}>{renderSmallImages()}</GridList>
      <AboutPropertyTxt>
        {propertyText
          ? propertyText
          : `Central Valley Home In Taylor with a large backyard pool. Completely remodeled in 2016 everything up to date. 6 Bedrooms and 2 Full
        bathrooms. Living Room and Downstairs family room laundry room etc… and a true 2 car garage.`}
      </AboutPropertyTxt>
    </Box>
  )
}
export default PropertyImages
