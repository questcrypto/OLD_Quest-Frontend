import React, { useEffect, useState } from 'react'
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
import { apiBaseUrl, imageBaseUrl } from 'services/global-constant'
import { openLoginModal } from 'logic/actions/user.actions'
import Grid from '@material-ui/core/Grid'
import { PrimaryButton, SecondaryButton } from 'shared/components/buttons'
import questLogo from 'assets/images/questDashboardLogo.svg'
import axios from 'axios'
import { cardStyle } from './propertyCardStyle'

const PropertyCards = (props: any) => {
  const classes = useStyles()
  const cardstyle = cardStyle()
  
  const { list, dataLoading, errorAlert, refresh, loggedIn, openLoginModal, userInfo ,setNewPropertyLoading } = props
  
  const [showAuctionModal, setShowAuctionModal] = useState(false)
  const [modalAuctionDetails, setModalAuctionDetails] = useState({ auctionDetails: {}, currentValue: 0 })
  const [id, setId] = useState('')

  const handleDetails = async (id: any) => {
    if (loggedIn) {
      history.push(`${Paths.ownerPropertyDetails}/${id}`)
    } else {
      history.push(`${Paths.generalUserPropertyDetails}/${id.split('/')[4]}`)
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
    const imgUrl = `${imageBaseUrl}/${imgArr[0]?.filename}`
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
            list?.map((p: any, i: number) => {
              console.log(p,"calling");
              let docs = p.getDoc!
              let name = p.PropertyName
              let id = p.id
              const auctionDetails = p.auctionDetails
              const currentValue = p.CurrentValue
              // console.log(p, "Prince");
              const isLast = i === list.length - 1 ? true : false
              if (p.PropertyDetails) {
                const details = p.PropertyDetails
                docs = details.getDoc
                name = details.PropertyName
                id = details.id
              }
              return (
                <StyledCard isLast={isLast} key={i} className={classes.cardWrapper}>
                  <CardContent className={classes.content }>
                    <ImageWrap>
                      <img src={p?.item?.propertyFiles?.propertyImages?.images[0]?.hash} alt="Property Image"/>
                    </ImageWrap>
                    <div className={cardstyle.infoRow}>
                      <div className={cardstyle.infoWrap}>
                        <span className={cardstyle.title}>{p.item.PropertyName}</span>
                        {/* <span className={cardstyle.info}>{id}</span> */}
                      </div>
                      <div className={cardstyle.infoPrice}>
                        <span className={cardstyle.priceTitle}>Price</span>
                        <span className={cardstyle.priceinfo}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={cardstyle.svg}>
                          <path d="M10 20C15.5229 20 20 15.5229 20 10C20 4.47715 15.5229 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5229 4.47715 20 10 20Z" fill="#2775CA"/>
                          <path d="M12.3395 10.9097C12.3395 9.62709 11.5746 9.18736 10.0448 9.00416C8.95214 8.85756 8.73354 8.56442 8.73354 8.05129C8.73354 7.53816 9.09781 7.20842 9.82627 7.20842C10.4819 7.20842 10.8461 7.42836 11.0283 7.97802C11.0647 8.08796 11.174 8.16122 11.2833 8.16122H11.8659C12.0117 8.16122 12.1209 8.05129 12.1209 7.90476V7.86809C11.9753 7.06182 11.3196 6.43889 10.4819 6.36562V5.4861C10.4819 5.33948 10.3726 5.22954 10.1905 5.19287H9.64421C9.49847 5.19287 9.38921 5.30281 9.35274 5.4861V6.32894C8.26001 6.47556 7.56807 7.20842 7.56807 8.12462C7.56807 9.33396 8.29647 9.81029 9.82627 9.99362C10.8461 10.1768 11.174 10.3967 11.174 10.983C11.174 11.5694 10.664 11.9725 9.97201 11.9725C9.02494 11.9725 8.69714 11.5694 8.58787 11.0196C8.55147 10.8731 8.44221 10.7998 8.33294 10.7998H7.71367C7.56807 10.7998 7.45874 10.9097 7.45874 11.0563V11.093C7.60441 12.0091 8.18721 12.6688 9.38921 12.852V13.7316C9.38921 13.8781 9.49847 13.988 9.68054 14.0247H10.2269C10.3726 14.0247 10.4819 13.9148 10.5183 13.7316V12.852C11.6111 12.6688 12.3395 11.8992 12.3395 10.9097Z" fill="white"/>
                          <path d="M8.06459 14.7921C5.21457 13.7671 3.75299 10.5821 4.81267 7.76316C5.36075 6.22555 6.56653 5.05409 8.06459 4.50496C8.21078 4.43177 8.28379 4.32194 8.28379 4.13884V3.62634C8.28379 3.47988 8.21078 3.37005 8.06459 3.3335C8.02799 3.3335 7.95499 3.3335 7.91839 3.37005C4.44725 4.46832 2.54721 8.1659 3.64337 11.6437C4.30107 13.6938 5.87226 15.268 7.91839 15.927C8.06458 16.0002 8.21079 15.927 8.24725 15.7805C8.28379 15.744 8.28379 15.7073 8.28379 15.6342V15.1216C8.28379 15.0117 8.17419 14.8654 8.06459 14.7921ZM11.9377 3.37005C11.7915 3.29686 11.6453 3.37005 11.6089 3.51651C11.5723 3.55315 11.5723 3.5897 11.5723 3.66298V4.17548C11.5723 4.32194 11.6819 4.46832 11.7915 4.5416C14.6415 5.56659 16.1031 8.75156 15.0435 11.5705C14.4954 13.1081 13.2896 14.2796 11.7915 14.8287C11.6453 14.9019 11.5723 15.0117 11.5723 15.1948V15.7073C11.5723 15.8538 11.6453 15.9636 11.7915 16.0002C11.8281 16.0002 11.9011 16.0002 11.9377 15.9636C15.4089 14.8654 17.3089 11.1678 16.2127 7.68996C15.5551 5.60323 13.9473 4.02901 11.9377 3.37005Z" fill="white"/>
                          </svg> {p.item.CurrentValue}</span>
                      </div>
                    </div>
                  </CardContent>
                  {/* <CardActions className={classes.actions}> */}
                  <CardActions className={cardstyle.actions}>
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

                    <PrimaryButton onClick={() => handleOpenModal(auctionDetails, currentValue, id)} className={cardstyle.btnBuyToken}>
                      BUY TOKENS
                    </PrimaryButton>
                    <SecondaryButton onClick={() => handleDetails(p.hash)} className={cardstyle.btnviweDetalis}>
                      VIEW DETAILS
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
