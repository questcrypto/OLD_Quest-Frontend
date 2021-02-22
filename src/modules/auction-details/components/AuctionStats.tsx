import React from 'react'
import {
  auctionStatsStyle,
  StatTitle,
  StatTimeText,
  StatCircle,
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

const AuctionStats = (props: any) => {
  const classes = auctionStatsStyle()

  return (
    <Box>
      <StatsInfoCont>
        <StatTitle>Auction stats</StatTitle>
        <StyledLinearProgress variant="determinate" value={60} />
        <StatsTimeInfo>
          <AlarmIcon />
          <StatTimeText>Auction ends 29 Jan 2021 at 01:30:08 GMT</StatTimeText>
        </StatsTimeInfo>
        <StatsInfo>
          <StatCircle />
          <div>
            <StatText>Total Bidders</StatText>
            <BoldText>563</BoldText>
          </div>
        </StatsInfo>
        <StatsInfo>
          <StatCircle />
          <div>
            <StatText>Eligible Bids</StatText>
            <BoldText>1,103</BoldText>
          </div>
        </StatsInfo>
        <StatsInfo>
          <StatCircle />
          <div>
            <StatText>Total Bids</StatText>
            <BoldText>2,251</BoldText>
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
