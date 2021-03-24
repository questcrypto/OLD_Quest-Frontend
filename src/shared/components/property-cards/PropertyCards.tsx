import React, { useState } from 'react'
import { Button, CardActions, CardContent } from '@material-ui/core'
import { ImageWrap, useStyles, StyledCard } from './style'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'
import { apiBaseUrl } from 'services/global-constant'
import { NoDataContainer } from 'modules/Tables/style'
import EmptyPage from 'shared/empty-page'
import CustomModal from 'shared/custom-modal'
import AuctionReview from 'modules/owner/owner-property-details/components/AuctionReview'

interface Props {
  list: any[]
  published?: boolean
  history?: boolean
}

const PropertyCards = (props: Props) => {
  const classes = useStyles()
  const { list, published } = props

  const [showAuctionModal, setShowAuctionModal] = useState(false)
  const [modalAuctionDetails, setModalAuctionDetails] = useState({ auctionDetails: {}, currentValue: 0 })

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

  const handleOpenModal = (auctionDetails: any, currentValue: any) => {
    setModalAuctionDetails({ auctionDetails, currentValue })
    setShowAuctionModal(true)
  }

  return (
    <div className={!!list && list.length ? classes.wrapper : ''}>
      {!!list && list.length > 0 ? (
        list.map((p, i: number) => {
          let docs = p.getDoc!
          let name = p.PropertyName
          let id = p.id
          let auctionDetails = p.auctionDetails
          let currentValue = p.CurrentValue

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
                  <img src={getImg(docs)} alt="property img" />
                </ImageWrap>
                <div className={classes.infoWrap}>
                  <span className={classes.title}>{name}</span>
                  <span className={classes.info}>{id}</span>
                </div>
              </CardContent>
              <CardActions className={classes.actions}>
                {!auctionDetails ? (
                  <Button onClick={() => handleDetails(id)} className={classes.addPropertyBtnStyle}>
                    Property Details
                  </Button>
                ) : (
                  <Button onClick={() => handleOpenModal(auctionDetails, currentValue)} className={classes.addPropertyBtnStyle}>
                    Review Auction
                  </Button>
                )}
              </CardActions>
            </StyledCard>
          )
        })
      ) : (
        <NoDataContainer>
          <EmptyPage name="" />
        </NoDataContainer>
      )}

      <CustomModal show={showAuctionModal} toggleModal={setShowAuctionModal}>
        <AuctionReview
          history={props.history}
          // setModalAuctionDetails={setModalAuctionDetails}
          projectedValue={modalAuctionDetails.currentValue}
          auctionDetails={modalAuctionDetails.auctionDetails}
          setShowAuctionModal={setShowAuctionModal}
        />
      </CustomModal>
    </div>
  )
}

export default PropertyCards
