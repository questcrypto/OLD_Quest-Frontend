import React, { useState } from 'react'
import { WinLossText } from 'shared/styles/styled'
import { PassedPropertyCont, cardStyle, Title, CardBoldText, CardLightText, NoDataContainer } from './style'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import { PrimaryButton, SecondaryButton } from 'shared/components/buttons'
import CustomModal from 'shared/custom-modal'
import ComponentLoader from 'shared/loader-components/component-loader'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'
import { apiBaseUrl } from 'services/global-constant'
import EmptyPage from 'shared/empty-page'
import TokeClaim from './TokenClaim'
import USDCClaim from './USDCClaim'

const PassedProperties = (props: any) => {
  const [showTokenClaim, setShowTokenClaim] = useState(false)
  const [showUsdClaim, setShowUsdClaim] = useState(false)
  const [claimData, setClaimData] = useState<any>({})
  const { dataLoading, data, setActiveTab, updatePassedProp } = props
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

  const getTokenPercentage = (currentVal: number, totalVal: number) => {
    const percentageVal: any = currentVal / totalVal
    return `${parseFloat(percentageVal).toFixed(2)} %`
  }

  const handleClaim = (dataVal: any) => {
    const { PropertyDetails, bidDetails } = dataVal
    if (bidDetails[0].currentAllotment > 0) {
      const claimDataVal = {
        auctionId: dataVal.auctionDetail[0].id,
        claimValue: `${bidDetails[0].currentAllotment} (${getTokenPercentage(
          bidDetails[0].currentAllotment,
          PropertyDetails.propertyDetails.CurrentValue
        )})`,
      }
      setClaimData(claimDataVal)
      setShowUsdClaim(false)
      setShowTokenClaim(true)
    } else {
      const claimDataVal = {
        auctionId: dataVal.auctionDetail[0].id,
        claimValue: parseFloat(bidDetails[0].deposit).toFixed(2),
      }
      setClaimData(claimDataVal)
      setShowTokenClaim(false)
      setShowUsdClaim(true)
    }
  }

  const renderPassPropCard = (item: any) => {
    const { auctionDetail, PropertyDetails, bidDetails } = item

    return (
      <PassedPropertyCont>
        <WinLossText winStatus={bidDetails[0].currentAllotment > 0}>{bidDetails[0].currentAllotment > 0 ? 'WIN' : 'LOST'}</WinLossText>
        <Card className={classes.root}>
          <img className={classes.media} src={getImg(PropertyDetails.getDocs)} alt="" />
          <CardContent>
            <Grid container className={classes.btnContStyle}>
              <Grid item>
                <Title>{PropertyDetails.propertyDetails.PropertyName}</Title>
                <CardLightText>{auctionDetail[0].propidId}</CardLightText>
              </Grid>
            </Grid>
            {bidDetails[0].currentAllotment > 0 ? (
              <>
                <CardLightText>Token to claim</CardLightText>
                <CardBoldText>{`${bidDetails[0].currentAllotment} (${getTokenPercentage(
                  bidDetails[0].currentAllotment,
                  PropertyDetails.propertyDetails.CurrentValue
                )})`}</CardBoldText>
              </>
            ) : (
              <>
                <CardLightText>Available USDC</CardLightText>
                <CardBoldText>{parseFloat(bidDetails[0].deposit).toFixed(2)}</CardBoldText>
              </>
            )}
          </CardContent>
          <CardActions disableSpacing>
            <Grid container spacing={2} className={classes.btnContStyle}>
              <Grid item xs={12} sm={6}>
                <PrimaryButton fullWidth className={classes.btnStyle} onClick={() => handleClaim(item)}>
                  CLAIM TOKENS
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
                  {renderPassPropCard(item)}
                </Grid>
              ))}
            </Grid>
          ) : (
            <NoDataContainer>
              <EmptyPage name="for passed properties" />
            </NoDataContainer>
          )}
        </div>
      )}
      <CustomModal show={showTokenClaim} toggleModal={setShowTokenClaim}>
        {showTokenClaim && (
          <TokeClaim
            claimData={claimData}
            setClaimData={setClaimData}
            setShowTokenClaim={setShowTokenClaim}
            updatePassedProp={updatePassedProp}
          />
        )}
      </CustomModal>
      <CustomModal show={showUsdClaim} toggleModal={setShowUsdClaim}>
        {showUsdClaim && (
          <USDCClaim
            claimData={claimData}
            setClaimData={setClaimData}
            setShowUsdClaim={setShowUsdClaim}
            setActiveTab={setActiveTab}
            updatePassedProp={updatePassedProp}
          />
        )}
      </CustomModal>
    </div>
  )
}
export default PassedProperties
