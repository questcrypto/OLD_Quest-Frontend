import React, { useState } from 'react'
import { connect } from 'react-redux'
import { errorAlert } from 'logic/actions/alerts.actions'
import { Button, CardActions, CardContent } from '@material-ui/core'
import { ImageWrap, useStyles, StyledCard } from './style'
import { NoDataContainer } from 'modules/Tables/style'
import EmptyPage from 'shared/empty-page'
import CustomModal from 'shared/custom-modal'
import ComponentLoader from 'shared/loader-components/component-loader'
import AuctionReview from 'modules/owner/owner-property-details/components/AuctionReview'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'
import { apiBaseUrl } from 'services/global-constant'
import { openLoginModal } from 'logic/actions/user.actions'
import Grid from '@material-ui/core/Grid'
import { PrimaryButton, SecondaryButton } from 'shared/components/buttons'
import axios from 'axios'

const PropertyCards = (props: any) => {
  const classes = useStyles()
  const { list, dataLoading, errorAlert, refresh, loggedIn, openLoginModal, userInfo } = props

  const [showAuctionModal, setShowAuctionModal] = useState(false)
  const [modalAuctionDetails, setModalAuctionDetails] = useState({ auctionDetails: {}, currentValue: 0 })
  const [id, setId] = useState('')

  const handleDetails = async (id: any) => {
    if (loggedIn) {
      history.push(`${Paths.ownerPropertyDetails}/${id}`)
    } else {
      history.push(`${Paths.generalUserPropertyDetails}/${id}`)
    }
  }

  const getImg = (imgData: any) => {
    const imgArr: any = []
    if (imgData) {
      for (const item of imgData) {
        if (item.type === 0) {
          imgArr.push(item)
        }
      }
    }
    const imgUrl = `${apiBaseUrl}/${imgArr[0]?.filename}`
    return imgUrl
  }

  const handleOpenModal = (auctionDetails: any, currentValue: any, id: any) => {
    setModalAuctionDetails({ auctionDetails, currentValue })
    setShowAuctionModal(true)
    setId(id);
  }

  return (
    <div>
      {dataLoading ? (
        <ComponentLoader />
      ) : (
        <div className={!!list && list.length ? classes.wrapper : ''}>
          {!!list && list.length > 0 ? (
            list.map((p: any, i: number) => {
              let docs = p.getDoc!
              let name = p.PropertyName
              let id = p.id
              const auctionDetails = p.auctionDetails
              const currentValue = p.CurrentValue

              const isLast = i === list.length - 1 ? true : false
              if (p.PropertyDetails) {
                const details = p.PropertyDetails
                docs = details.getDoc
                name = details.PropertyName
                id = details.id
              }
              return (
                <StyledCard isLast={isLast} key={i}>
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
                    {/* {!auctionDetails ? (
                      <Button onClick={() => handleDetails(id)} className={classes.addPropertyBtnStyle}>
                        Property Details
                      </Button>
                    ) : 
                    // (
                    //   loggedIn ?
                      <Button onClick={() => handleOpenModal(auctionDetails, currentValue)} className={classes.addPropertyBtnStyle}>
                        Review Auction
                      </Button> 
                    //   : ''
                    // )
                    } */}

                    <PrimaryButton onClick={() => handleOpenModal(auctionDetails, currentValue, id)} className={classes.addPropertyBtnStyle}>
                      Review Auction
                    </PrimaryButton>
                    <SecondaryButton onClick={() => handleDetails(id)} className={classes.addPropertyBtnStyle}>
                      Property Details
                    </SecondaryButton>

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
              refresh={refresh}
              projectedValue={modalAuctionDetails.currentValue}
              auctionDetails={modalAuctionDetails.auctionDetails}
              setShowAuctionModal={setShowAuctionModal}
              errorAlert={errorAlert}
              userInfo={userInfo}
              id={id}
            />
          </CustomModal>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  loggedIn: state.user.loggedIn,
})

export default connect(mapStateToProps, errorAlert)(PropertyCards)
