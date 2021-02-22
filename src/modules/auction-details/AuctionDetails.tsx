import React from 'react'
import { withRouter } from 'react-router'
import { useStyles, HeaderContainer, HeaderPath, HeaderTitle } from './style'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import PropertyImages from './components/PropertyImages'
import AuctionBid from './components/AuctionBid'
import AuctionStats from './components/AuctionStats'

const AuctionDetails = (props: any) => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <HeaderContainer>
        <HeaderPath>
          <span>Properties / New / ID522011</span> / Auction
        </HeaderPath>
        <HeaderTitle>Property </HeaderTitle>
      </HeaderContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} container>
          <PropertyImages />
        </Grid>
        <Grid item xs={12} sm={6} md={5} container>
          <AuctionBid />
        </Grid>
        <Grid item xs={12} sm={6} md={3} container>
          <AuctionStats />
        </Grid>
      </Grid>
    </Box>
  )
}
export default withRouter(AuctionDetails)
