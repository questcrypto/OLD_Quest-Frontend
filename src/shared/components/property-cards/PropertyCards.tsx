import React from 'react'
import { Button, Card, CardActions, CardContent, Grid } from '@material-ui/core'
import { ImageWrap, useStyles, StyledCard } from './style'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'
import { getFullName } from 'shared/helpers/globalFunction'
import { apiBaseUrl } from 'services/global-constant'
import { NoDataContainer } from 'modules/Tables/style'
import EmptyPage from 'shared/empty-page'

interface Props {
  list: any[]
}

const PropertyCards = (props: Props) => {
  const classes = useStyles()
  const { list } = props

  const handleDetails = (id: any) => {
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

  return (
    <div className={!!list && list.length ? classes.wrapper : ''}>
      {!!list && list.length > 0 ? (
        list.map((p, i: number) => {
          let docs = p.getDoc!
          let name = p.PropertyName
          let id = p.id
          const isLast = i === list.length - 1 ? true : false
          if (p.PropertyDetails) {
            const details = p.PropertyDetails
            docs = details.getDoc
            name = details.PropertyName
            id = details.id
          }
          return (
            <StyledCard isLast={isLast}>
              <CardContent className={classes.content}>
                <ImageWrap>
                  <img src={getImg(docs)} alt="photo" />
                </ImageWrap>
                <div className={classes.infoWrap}>
                  <span className={classes.title}>{name}</span>
                  <span className={classes.info}>{id}</span>
                </div>
              </CardContent>
              <CardActions className={classes.actions}>
                <Button onClick={() => handleDetails(id)} className={classes.addPropertyBtnStyle}>
                  Property Details
                </Button>
              </CardActions>
            </StyledCard>
          )
        })
      ) : (
        <NoDataContainer>
          <EmptyPage name="" />
        </NoDataContainer>
      )}
    </div>
  )
}

export default PropertyCards
