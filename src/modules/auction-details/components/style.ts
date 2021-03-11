import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles'
import { LinearProgress, Slider } from '@material-ui/core'

export const imagesStyle = makeStyles(() =>
  createStyles({
    imgStyle: {
      height: 250,
      // width: '100%',
      objectFit: 'contain',
      width: '225px'
    },
    smallImgCont: {
      margin: '20px 0 12px 0',
      padding: '15px 0',
      boxSizing: 'border-box',
      flexWrap: 'nowrap',
    },
    imgOnHoverStyle: {
      '&:hover': {
        transform: 'scale(1.3)',
        transition: 'transform .2s',
      },
    },
    smallImgStyle: {
      height: 57,
      width: 72,
      cursor: 'pointer',
      borderRadius: '5px',
      objectFit: 'contain',
    },
  })
)
export const auctionBidStyle = makeStyles(() =>
  createStyles({
    bidContStyle: {
      background: colors.paperBackground2,
      border: `1px solid ${colors.lightGray}`,
    },
    actionBidContStyle: {
      padding: '12px 30px 27px 20px',
    },
    tokenStyle: {
      width: 135,
      maxWidth: 135,
    },
    makeBidStyle: {
      width: 232,
      maxWidth: 232,
      '& input': {
        padding: '16px 16px 16px 22px !important',
      },
    },
    totalBidContStyle: {
      padding: '20px',
      background: colors.paperBackground4,
    },
    totalBid: {
      width: 273,
      maxWidth: 273,
      '& input': {
        color: 'black !important',
      },
    },
    linkContStyle: {
      marginTop: '16px',
    },
    upgradeBidInfoStyle: {
      padding: '8px 30px 30px 30px',
    },
    upgradeDividerStyle: {
      margin: '10px 0 !important',
    },
  })
)
export const MakeBidCont = styled.div`
  position: relative;
  p {
    position: absolute;
    top: 15px;
    left: 10px;
    margin: 0;
  }
`
export const auctionStatsStyle = makeStyles(() =>
  createStyles({
    priorityIconStyle: {
      color: colors.white,
      background: 'black',
      padding: '5px',
      fontSize: '20px',
    },
    checkIconStyle: {
      color: 'black',
      background: 'transparent',
      padding: '5px',
      fontSize: '20px',
    },
    helpIconStyle: {
      padding: '5px',
      fontSize: '16px',
    },
  })
)

export const bidStyle = makeStyles(() =>
  createStyles({
    root: {
      background: colors.paperBackground,
      width: '100%',
      maxWidth: 500,
      boxSizing: 'border-box',
    },
    bidInfoCont: {
      padding: '30px 40px 20px 40px',
    },
    titleCont: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',
    },
    closeIconStyle: {
      cursor: 'pointer',
    },
    bidInfo: {
      margin: '25px 0',
      width: '100%',
    },
    bidCommunicationCont: {
      padding: '35px 40px 20px 40px',
    },
    submitCont: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  })
)

export const BoldText = styled.h4`
  font-size: 16px;
  line-height: 20px;
  color: ${colors.textPrimary};
  margin: 0;
`
export const LightText = styled.p`
  font-size: 14px;
  line-height: 26px;
  color: ${colors.textPrimary};
  opacity: 0.87;
  margin: 0;
`
export const UpgradeInfoText = styled.p`
  font-size: 12px;
  line-height: 16px;
  color: ${colors.textPrimary};
  margin: 0 0 8px 0;
`
export const AboutPropertyTxt = styled(LightText)`
  opacity: 0.6;
`
export const Title = styled.p`
  font-size: 20px;
  line-height: 24px;
  margin: 0;
  color: ${colors.textPrimary};
  font-weight: bold;
  span {
    font-size: 15px;
    line-height: 18px;
    opacity: 0.87;
    font-weight: normal;
    margin-left: 15px;
  }
`
export const CurrentBidInfo = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 10px 0 12px 0;
  img {
    margin: 8px 10px 0 0;
  }
`
export const SliderWrap = styled.div`
  background: rgba(245, 245, 245, 0.15);
  border: 1px solid rgba(48, 46, 53, 0.15);
  padding: 5px 12px;
  box-sizing: border-box;
  border-radius: 5px;
  margin: 24px 0;
  box-sizing: border-box;
`
export const StyledSlider = withStyles({
  root: {
    color: colors.primary,
    height: 2,
    width: '98%',
  },
  thumb: {
    height: 20,
    width: 20,
    top: '35%',
    backgroundColor: '#1E3444',
    border: '2px solid currentColor',
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 1px)',
    background: 'transparent',
    '& *': {
      background: 'transparent',
      color: colors.primary,
      fontSize: '16px',
      lineHeight: '26px',
    },
    ':after': {
      content: '%',
    },
  },
  track: {
    height: 4,
    borderRadius: 2,
  },
  rail: {
    height: 4,
    borderRadius: 2,
  },
})(Slider)

export const ShareLinkCont = styled.div`
  display: flex;
  svg {
    margin-right: 8px;
    color: ${colors.primary};
    background: ${colors.paperBackground4};
    padding: 5px;
    font-size: 20px;
    cursor: pointer;
  }
`
export const StatsInfoCont = styled.div`
  background: #f7f7f7;
  padding: 18px;
`
export const StatsInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  img {
    margin-right: 16px;
    width: 32px;
    height: 32px;
  }
`
export const StatsTimeInfo = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 12px 0 30px 0;
  svg {
    margin-right: 8px;
    color: #c4c4c4;
  }
`
export const StatText = styled.p`
  font-size: 12px;
  line-height: 26px;
  color: ${colors.textPrimary};
  opacity: 0.87;
  margin: 0;
`
export const StatTitle = styled.h2`
  font-size: 18px;
  line-height: 22px;
  color: ${colors.textPrimary};
  margin: 0 0 30px 0;
`
export const StatTimeText = styled(StatText)`
  line-height: 18px;
`
export const TokenSoldInfo = styled.div`
  padding: 17px 0;
  background: #c4c4c4;
  text-align: center;
`
export const ConfirmationInfo = styled.div<any>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: ${(props: any) => (props.confirmStatus ? colors.greenColor : colors.lightYellow)};
  svg {
    cursor: pointer;
    border-radius: 50%;
  }
`
export const StyledLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#949DA4',
  },
  barColorPrimary: {
    backgroundColor: '#EB5757',
  },
})(LinearProgress)
