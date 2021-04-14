import {
  auctionStatsStyle,
  AuctionStatsCont,
  StyledLinearProgress,
  CloseIcon,
  Title,
  EndDateTxt,
  EndDateCont,
  CardLightText,
  CardBoldText,
  ReservePriceCont,
  ReserverAmountTxt,
} from './style'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Divider from '@material-ui/core/Divider'
import { Grid } from '@material-ui/core'
import { PrimaryButton } from 'shared/components/buttons'
import CloseIconImg from 'assets/icons/close-icon.svg'
import PropertyImg from 'assets/images/property-img.svg'
import AuctionStatsIcon from 'assets/icons/auction-stats.svg'
import ClockIcon from 'assets/icons/clock.svg'
import TotalBiddersIcon from 'assets/icons/total-bidders-icon.svg'
import BiddingAmountIcon from 'assets/icons/total-bidding-amount.svg'
import TotalBidsIcon from 'assets/icons/total-bids-icon.svg'
import TotalDollarIcon from 'assets/icons/total-dollars.svg'
import EligibleBidsIcon from 'assets/icons/eligible-bids-icon.svg'
import EligibleBidAmountIcon from 'assets/icons/eligible-bids-icon.svg'
import ReserveAmountIcon from 'assets/icons/reserve-amount.svg'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

const AuctionStats = (props: any) => {
  const classes = auctionStatsStyle()
  const { setShowStats } = props

  return (
    <AuctionStatsCont>
      <CloseIcon src={CloseIconImg} alt="" onClick={() => setShowStats(false)} />
      <Card className={classes.root}>
        <img className={classes.media} src={PropertyImg} alt="" />
        <CardContent>
          <Grid container className={classes.titleContStyle} justify="space-between" alignItems="center">
            <Grid item className={classes.iconTxtContStyle}>
              <img src={AuctionStatsIcon} alt="" />
              <Title>Auction Stats</Title>
            </Grid>
            <Grid item className={classes.endDateContStyle}>
              <StyledLinearProgress variant="determinate" value={10} />
              <EndDateCont>
                <img src={ClockIcon} alt="" />
                <EndDateTxt>Ends at 29 Jan | 01:30:08 GMT</EndDateTxt>
              </EndDateCont>
            </Grid>
          </Grid>
          <Grid container className={classes.cardDataContStyle} alignItems="center">
            <Grid item className={classes.iconTxtContStyle}>
              <img src={TotalBiddersIcon} alt="" />
              <div>
                <CardLightText>Total Bidders</CardLightText>
                <CardBoldText>20</CardBoldText>
              </div>
            </Grid>
            <Grid item className={classes.iconTxtContStyle}>
              <img src={BiddingAmountIcon} alt="" />
              <div>
                <CardLightText>Total Bidding Amount</CardLightText>
                <CardBoldText>$ 24010.00 </CardBoldText>
              </div>
            </Grid>
          </Grid>
          <Divider className={classes.dividerStyle} />
          <Grid container className={classes.cardDataContStyle} alignItems="center">
            <Grid item className={classes.iconTxtContStyle}>
              <img src={TotalBidsIcon} alt="" />
              <div>
                <CardLightText>Total Bids</CardLightText>
                <CardBoldText>2,251</CardBoldText>
              </div>
            </Grid>
            <Grid item className={classes.iconTxtContStyle}>
              <img src={TotalDollarIcon} alt="" />
              <div>
                <CardLightText>Total Dollar Amount</CardLightText>
                <CardBoldText>$ 24010.00 </CardBoldText>
              </div>
            </Grid>
          </Grid>
          <Divider className={classes.dividerStyle} />
          <Grid container className={classes.cardDataContStyle} alignItems="center">
            <Grid item className={classes.iconTxtContStyle}>
              <img src={EligibleBidsIcon} alt="" />
              <div>
                <CardLightText>Eligible Bids</CardLightText>
                <CardBoldText>1,103</CardBoldText>
              </div>
            </Grid>
            <Grid item className={classes.iconTxtContStyle}>
              <img src={EligibleBidAmountIcon} alt="" />
              <div>
                <CardLightText>Eligible Bids Amount</CardLightText>
                <CardBoldText>$ 24010.00 </CardBoldText>
              </div>
            </Grid>
          </Grid>
          <Divider className={classes.dividerStyle} />
          <Grid container justify="center" alignItems="center">
            <Grid item className={classes.iconTxtContStyle}>
              <img src={ReserveAmountIcon} alt="" />
              <div>
                <CardLightText>Reserve Amount</CardLightText>
                <CardBoldText>$ 24010.00 </CardBoldText>
              </div>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <PrimaryButton fullWidth className={classes.btnStyle}>
                Full Details
              </PrimaryButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      <ReservePriceCont>
        <CheckCircleOutlineIcon />
        <ReserverAmountTxt>Reserve price met.</ReserverAmountTxt>
      </ReservePriceCont>
    </AuctionStatsCont>
  )
}

export default AuctionStats
