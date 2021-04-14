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
import Divider from '@material-ui/core/Divider'
import { Grid } from '@material-ui/core'
import CloseIconImg from 'assets/icons/close-icon.svg'
import AuctionStatsIcon from 'assets/icons/auction-stats.svg'
import ClockIcon from 'assets/icons/clock.svg'
import TotalBiddersIcon from 'assets/icons/total-bidders-icon.svg'
import BiddingAmountIcon from 'assets/icons/total-bidding-amount.svg'
import EligibleBidsIcon from 'assets/icons/eligible-bids-icon.svg'
import EligibleBidAmountIcon from 'assets/icons/eligible-bids-icon.svg'
import ReserveAmountIcon from 'assets/icons/reserve-amount.svg'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import PriorityHighIcon from '@material-ui/icons/PriorityHigh'
import { getDaysValue } from 'shared/helpers/globalFunction'
import moment from 'moment'

const AuctionStats = (props: any) => {
  const classes = auctionStatsStyle()
  const { data, setShowStatus } = props

  const getProgressValue = (startDate: Date, endDate: Date) => {
    let progressVal = 100
    const daysRemaining = getDaysValue(new Date(), endDate)
    if (daysRemaining > 0) {
      const totalDays = getDaysValue(startDate, endDate)
      const daysDIff = totalDays - daysRemaining
      progressVal = (daysDIff / totalDays) * 100
    }

    return progressVal
  }

  return (
    <AuctionStatsCont>
      <CloseIcon src={CloseIconImg} alt="" onClick={() => setShowStatus(false)} />
      <Card className={classes.root}>
        <img className={classes.media} src={data.imgUrl} alt="" />
        <CardContent>
          <Grid container className={classes.titleContStyle} justify="space-between" alignItems="center">
            <Grid item className={classes.iconTxtContStyle}>
              <img src={AuctionStatsIcon} alt="" />
              <Title>Auction Stats</Title>
            </Grid>
            <Grid item className={classes.endDateContStyle}>
              <StyledLinearProgress variant="determinate" value={getProgressValue(data.startDate, data.endDate)} />
              <EndDateCont>
                <img src={ClockIcon} alt="" />
                <EndDateTxt>{`Ends at ${moment(data.endDate).format('MMM Do YYYY ')}`}</EndDateTxt>
              </EndDateCont>
            </Grid>
          </Grid>
          <Grid container className={classes.cardDataContStyle} alignItems="center">
            <Grid item className={classes.iconTxtContStyle}>
              <img src={TotalBiddersIcon} alt="" />
              <div>
                <CardLightText>Total Bidders</CardLightText>
                <CardBoldText>{parseInt(data.totalBidders).toLocaleString()}</CardBoldText>
              </div>
            </Grid>
            <Grid item className={classes.iconTxtContStyle}>
              <img src={BiddingAmountIcon} alt="" />
              <div>
                <CardLightText>Total Bidding Amount</CardLightText>
                <CardBoldText>{`$ ${parseFloat(data.totalBiddingAmount).toFixed(2)}`}</CardBoldText>
              </div>
            </Grid>
          </Grid>
          <Divider className={classes.dividerStyle} />
          <Grid container className={classes.cardDataContStyle} alignItems="center">
            <Grid item className={classes.iconTxtContStyle}>
              <img src={EligibleBidsIcon} alt="" />
              <div>
                <CardLightText>Eligible Bids</CardLightText>
                <CardBoldText>{parseInt(data.eligibleBids).toLocaleString()}</CardBoldText>
              </div>
            </Grid>
            <Grid item className={classes.iconTxtContStyle}>
              <img src={EligibleBidAmountIcon} alt="" />
              <div>
                <CardLightText>Eligible Bids Amount</CardLightText>
                <CardBoldText>{`$ ${parseFloat(data.eligibleBidAmount).toFixed(2)}`}</CardBoldText>
              </div>
            </Grid>
          </Grid>
          <Divider className={classes.dividerStyle} />
          <Grid container>
            <Grid item className={classes.iconTxtContStyle}>
              <img src={ReserveAmountIcon} alt="" />
              <div>
                <CardLightText>Reserve Amount</CardLightText>
                <CardBoldText>{`$ ${parseFloat(data.reserveAmount).toFixed(2)}`}</CardBoldText>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <ReservePriceCont confirmStatus={data.reservePriceMet}>
        {data.reservePriceMet ? <CheckCircleOutlineIcon /> : <PriorityHighIcon />}
        <ReserverAmountTxt>{data.reservePriceMet ? 'Reserve price met.' : 'Reserve price not met.'}</ReserverAmountTxt>
      </ReservePriceCont>
    </AuctionStatsCont>
  )
}

export default AuctionStats
