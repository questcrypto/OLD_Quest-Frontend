import React from 'react'
import {
  auctionStatsStyle,
  StatTitle,
  StatTimeText,
  BoldText,
  LightText,
  StatsInfoCont,
  StatsTimeInfo,
  StatsInfo,
  StatText,
  TokenSoldInfo,
  ConfirmationInfo,
  StyledLinearProgress,
} from './style'
import Box from '@material-ui/core/Box'
import AlarmIcon from '@material-ui/icons/Alarm'
import PriorityHighIcon from '@material-ui/icons/PriorityHigh'
import HelpIcon from '@material-ui/icons/Help'
import TotalBiddersIcon from 'assets/icons/total-bidders.svg'
import EligibleBidIcon from 'assets/icons/eligible-bids.svg'
import TotalBidsIcon from 'assets/icons/total-bids.svg'
import { getDaysValue } from 'shared/helpers/globalFunction'
import moment from 'moment'

const AuctionStats = (props: any) => {
  const classes = auctionStatsStyle()
  const { bidStats, auctionDetails } = props

  const getProgressValue = (startDate: Date, endDate: Date) => {
    const daysRemaining = getDaysValue(new Date(), endDate)
    const totalDays = getDaysValue(startDate, endDate)
    const daysDIff = totalDays - daysRemaining
    const progressVal = (daysDIff / totalDays) * 100
    return progressVal
  }

  return (
    <Box>
      <StatsInfoCont>
        <StatTitle>Auction stats</StatTitle>
        <StyledLinearProgress variant="determinate" value={getProgressValue(auctionDetails[0].startDate, auctionDetails[0].endDate)} />
        <StatsTimeInfo>
          <AlarmIcon />
          <StatTimeText>{`Auction ends ${moment(auctionDetails[0].endDate).utc().format('MMM Do YYYY HH:mm:ss')}`}</StatTimeText>
        </StatsTimeInfo>
        <StatsInfo>
          <img src={TotalBiddersIcon} alt="" />
          <div>
            <StatText>Total Bidders</StatText>
            <BoldText>{parseInt(bidStats.totalBidders).toLocaleString()}</BoldText>
          </div>
        </StatsInfo>
        <StatsInfo>
          <img src={EligibleBidIcon} alt="" />
          <div>
            <StatText>Eligible Bids</StatText>
            <BoldText>{parseInt(bidStats.eligibleBids).toLocaleString()}</BoldText>
          </div>
        </StatsInfo>
        <StatsInfo>
          <img src={TotalBidsIcon} alt="" />
          <div>
            <StatText>Total Bids</StatText>
            <BoldText>{bidStats.totalBids ? parseInt(bidStats.totalBids).toLocaleString() : 0}</BoldText>
          </div>
        </StatsInfo>
      </StatsInfoCont>
      <TokenSoldInfo>
        <StatText>Total property tokens sold </StatText>
        <BoldText>86%</BoldText>
      </TokenSoldInfo>
      <ConfirmationInfo>
        <PriorityHighIcon className={classes.priorityIconStyle} />
        <LightText>Reserve price not met.</LightText>
        <HelpIcon className={classes.helpIconStyle} />
      </ConfirmationInfo>
    </Box>
  )
}
export default AuctionStats
