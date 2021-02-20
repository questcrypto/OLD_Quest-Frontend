import styled from 'styled-components'
import { colors, screenSizes } from 'shared/styles/theme'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Grid, LinearProgress, Slider, withStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    img: {
      width: '100%',
      maxWidth: '396px',
      height: '100%',
    },
    btn2Style: {
      color: colors.white,
      backgroundColor: colors.primary,
      fontSize: '14px',
      '&:hover': {
        backgroundColor: colors.primary,
      },
      width: '120px',
      maxWidth: '120px',
      margin: '10px 0 0 0',
      '@media(min-width: 1280px)': {
        marginLeft: '24px',
      }
    },

    exclamation: {
      width: '20px',
      height: '20px',
      marginRight: '10px',
    },
    question: {
      width: '12px',
      height: '12px',
      marginLeft: '11px',
    },
    progressStyle: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      marginTop: '8px',
    },
    alarm: {
      marginRight: '7.5px',
    },
    info: {
      fontSize: '14px',
      lineHeight: '26px',
      color: 'rgba(48,46,53, 0.6)',
      marginTop: '14px',
    },
    midGrid: {
      padding: '0 17px 0 22px',
    },
    balance: {
      fontSize: '14px',
      lineHeight: '26px',
      color: 'rgba(48, 46, 53, 0.87)',
      marginTop: '8px',
    }
  })
)
export const AuctionDetailsCont = styled.div`
  p {
    margin: 0;
  }
`
export const AuctionStatsGrid = styled<any>(Grid)`
    max-width: 100%;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid ${props => props.theme.lightGray};
    p {
        font-size: 18px;
        line-height: 22px;
        margin: 0;
    }

    @media (min-width: ${screenSizes.mediaXL}px) {
      max-width: 18%;
    }
`

export const DateProgress = styled.div<any>`
    width:  ${props => props.width}%;
    border: 4px solid #EB5757;
`

export const StyledLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: 'rgba(30,52,68, 0.3)',
    borderRadius: '2px',
  },
  barColorPrimary: {
    backgroundColor: '#EB5757',
  },
})(LinearProgress)

export const StyledSlider = withStyles({
  root: {
    color: '#1E3444',
    height: 2,
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
      content: '%'
    }
  },
  track: {
    height: 4,
    borderRadius: 2,
  },
  rail: {
    height: 4,
    borderRadius: 2,
  },
})(Slider);

export const TotalTokensSold = styled<any>(Grid)`
    background: rgba(30,52,68, 0.1);
    border: 1px solid ${props => props.theme.lightGray};
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
        font-size: 12px;
        line-height: 26px;
        color: ${props => props.theme.primary};
        opacity: 0.87;
    }
    span {
        font-weight: 900;
        font-size: 16px;
        line-height: 19px;
        color: ${props => props.theme.primary};
    }
`

export const ReservePriceGrid = styled<any>(Grid)`
    background: rgba(242,201,76, 0.6);
    border: 1px solid #B8A058;
    box-sizing: border-box;
    padding: 9px 13px;
    align-items: center;
    p {
        font-size: 14px;
        line-height: 26px;
        color: ${props => props.theme.primary};
    }
`

export const Info = styled<any>(Grid)`
    padding: 31px 21px 18px 19px;
`

export const TitleGrid = styled<any>(Grid)`
    margin-bottom: 17px;
    p {
        font-size: 20px;
        line-height: 24px;
        color: ${props => props.theme.textPrimary};
    }

    span {
      font-size: 15px;
      line-height: 18px;
      color: rgba(48,46,53, 0.07);
    }
`

export const CurrentBidGrid = styled<any>(Grid)`
    img {
      width: 21px;
      height: 12px;
    }
    p {
      font-size: 20px;
      line-height: 24px;
      color: ${props => props.theme.textPrimary};
    }

    span {
      font-size: 15px;
      line-height: 18px;
      color: rgba(48,46,53, 0.07);
    }
`

export const StyledBid = styled.div<any>`
    display: flex;
    flex-direction: column;
    align-items: start;
    p {
      font-size: 14px;
      line-height: 26px;
      color: rgba(48,46,53, 0.87);
    }

    span {
      font-weight: 900;
      font-size: 17px;
      line-height: 20px;
      color: ${props => props.theme.textPrimary};
    }
`

export const EquityGrid = styled<any>(Grid)`
  background: ${props => props.theme.paperBackground2};
  border: 1px solid ${props => props.theme.lightGray};
  margin-top: 12px;
  p {
    font-size: 16px;
    line-height: 26px;
    color: rgba(48,46,53, 0.87);
  }
`

export const Top = styled<any>(Grid)`
  padding: 20px 37px 27px 19px;
`

export const Bottom = styled<any>(Grid)`
  padding: 25px 86px 16px 19px;
  background: #ECECEC;
  border: 1px solid ${props => props.theme.lightGray};
`

export const StyledDiv = styled.div<any>`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  @media (min-width: ${screenSizes.mediaXL}px) {
      flex-direction: row;
  }
`

export const TokenDiv = styled.div<any>`
  width: ${props => props.width};
  padding: 7px 2px 2px 9px;
  position: relative;
  border: 1px solid ${props => props.theme.primary};
  box-sizing: border-box;
  border-radius: 5px;
  background: #F5F5F5;
  span {
    position: absolute;
    top: -8px;
    left: 8px;
    font-size: 12px;
    line-height: 14px;
    color: ${props => props.theme.primary};
    background: ${props => props.back ? props.back : props.theme.paperBackground2};
  }
  p {
    font-size: 14px;
    line-height: 26px;
    color: ${props => props.theme.textPrimary};
  }
`

export const SliderWrap = styled.div<any>`
  display: flex;
  background: rgba(245,245,245, 0.15);
  border: 1px solid rgba(48,46,53, 0.15);
  padding: 5px 12px;
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: 8px;
`

export const ShareLinksGrid = styled<any>(Grid)`
  margin-top: 15px;
  padding-left: 19px;
  p {
    font-size: 14px;
    line-height: 26px;
    color: rgba(48,46,53, 0.87);
  }
`

export const Header = styled.div<any>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`

export const Links = styled.div<any>`
  display: flex;
  img {
    margin-right: 8px;
  }
  img:last-child {
    margin: 0;
  }
`

export const ImageWrap = styled<any>(Grid)`
    max-width: 100%;
    max-height: 298px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
`
export const CarouselWrap = styled<any>(Grid)`
    div {
      margin-right: 9px;
    }
    div:last-child {
      margin: 0;
    }
`

export const SmallImageWrap = styled.div<any>`
    display: flex;
    img {
      width: 72px;
      height: 57px;
      border-radius: 5px;
    }
    :hover {
      padding: 4.5px;
      width: 95px;
      height: 73px;
      border-radius: 5px;
      background: ${props => props.theme.paperBackground3};
      border: 1px solid ${props => props.theme.primary};
      img { 
       width: 93px;
       height: 71px;
      }
    }

`

export const StyledTitle = styled<any>(Grid)`
    padding: 18px 21px 0 19px;
`

export const DateWrap = styled.div<any>`
    padding: 10px 0 30px 0;
    display: flex;
    align-items: start;
    p {
        font-size: 12px;
        line-height: 18px;
        color: rgba(48,46,53, 0.87);
    }
`

export const BidWrap = styled.div<any>`
    display: flex;
    align-items: center;
    margin-bottom: ${props => !props.last && '20px'};
    div:first-child {
        width: 40px;
        height: 40px;
        background: #C4C4C4;
        border-radius: 50%;
        margin-right: 17px;
    }
`

export const BidValues = styled.div<any>`
    display: flex;
    flex-direction: column;
    align-items: start;
    p {
        font-size: 12px;
        line-height: 26px;
        color: rgba(48,46,53, 0.87);
    }
    span {
        font-weight: 900;
        font-size: 16px;
        line-height: 19px;
        color: ${props => props.theme.textPrimary};
    }
`
export const NoDetailsAvailable = styled.div`
  margin-bottom: 30px;
  p {
    text-align: center;
  }
`
export const HeaderContainer = styled.div`
  margin-bottom: 20px;
`
export const HeaderPath = styled.div`
  margin: 0 0 24px 0;
  font-size: 16px;
  line-height: 19px;
  span {
    opacity: 0.5;
  }
`

export const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  line-height: 29px;
  color: ${colors.textPrimary};
`

export const FeatureHeading = styled.h4`
  margin: 0 0 30px 0;
  font-size: 15px;
  color: ${colors.textPrimary};
  text-align: left;
`
export const HeaderBtnCont = styled.div`
  display: flex;
  justify-content: space-between;
`
