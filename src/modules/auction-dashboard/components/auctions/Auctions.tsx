import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  useStyles,
  StyledLinearProgress,
  AuctionsContainer,
  PropertyHeader,
  HeaderTitle,
  TabTitle,
  StyledGrid,
} from './style'

import { Box, Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core'

const AuctionsData = [
  {
    ImgUrl: `https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F37%2F2019%2F06%2F12170406%2Fmodern-home-exterior-gray-scheme-792ab713.jpg`,
    Title: '1024 Somma Way',
    SubTitle: 'QUEST24567',
    PropertyPrice: '$98.22',
    DayRemaining: '3 Days remaining',
    Price: '$18.22',
  },
]

const Auctions = (props: any) => {
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState('new')

  const PropertyCard = (props: {
    ImgUrl: string | undefined
    Title: string | undefined
    SubTitle: string | undefined
    PropertyPrice: string | undefined
    DayRemaining: string | undefined
    Price: string | undefined
  }) => {
    return (
      <Grid item xs={12} sm={6} lg={4}>
        <Card>
          <img alt="complex" src={props.ImgUrl} style={{ height: '250px', width: '100%' }} />
          <CardContent>
            <Typography variant="button" display="block" gutterBottom>
              {props.Title}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              {props.SubTitle}
            </Typography>

            <Grid container>
              <Grid item xs={6} sm={6} lg={6}>
                <p>Average Bid</p>
                <p> {props.PropertyPrice} </p>
              </Grid>
              <Grid item xs={6} sm={6} lg={6}>
                <p className={classes.Remaining}> {props.DayRemaining} </p>
                <StyledLinearProgress variant="determinate" value={70} className={classes.progressStyle} />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={6} sm={6} lg={6}>
                <p>Your Bid</p>
                <p>
                  {' '}
                  {props.Price} <span className={classes.BelowAverage}> ▼ Below Average</span>{' '}
                </p>
              </Grid>
              <Grid item xs={6} sm={6} lg={6}>
                <p className={classes.Remaining}>
                  {' '}
                  <p>
                    <b>
                      <a href="default.asp" target="_blank">
                        Upgrade your bid
                      </a>
                    </b>
                  </p>
                </p>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Box className={classes.btnGroup}>
              <Button className={classes.btn1Style}>live auction</Button>
              <Button className={classes.btn2Style}>property details</Button>
            </Box>
          </CardActions>
        </Card>
      </Grid>
    )
  }

  return (
    <AuctionsContainer>
      <PropertyHeader>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <HeaderTitle>Auctions</HeaderTitle>
          </Grid>
          <Grid item xs={3}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.tabStyle}>
          <Grid item xs={8}>
            <Grid container spacing={3}>
              <Grid item>
                <TabTitle onClick={() => setActiveTab('Participating')} active={activeTab === 'Participating'}>
                  Participating
                </TabTitle>
              </Grid>
              <Grid item>
                <TabTitle onClick={() => setActiveTab('Ongoing')} active={activeTab === 'Ongoing'}>
                  Ongoing
                </TabTitle>
              </Grid>
              <Grid item>
                <TabTitle onClick={() => setActiveTab('Upcoming')} active={activeTab === 'Upcoming'}>
                  Upcoming
                </TabTitle>
              </Grid>
              <Grid item>
                <TabTitle onClick={() => setActiveTab('Passed')} active={activeTab === 'Passed'}>
                  Passed
                </TabTitle>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </PropertyHeader>
      <StyledGrid container style={{ height: 'auto', width: '100%' }}>
        <StyledGrid container spacing={2}>
          {AuctionsData.map((FData) => {
            console.log('FData ', FData)
          })}

          <PropertyCard
            ImgUrl={AuctionsData[0].ImgUrl}
            Title={AuctionsData[0].Title}
            SubTitle={AuctionsData[0].SubTitle}
            PropertyPrice={AuctionsData[0].PropertyPrice}
            DayRemaining={AuctionsData[0].DayRemaining}
            Price={AuctionsData[0].Price}
          />
          <PropertyCard
            ImgUrl={AuctionsData[0].ImgUrl}
            Title={AuctionsData[0].Title}
            SubTitle={AuctionsData[0].SubTitle}
            PropertyPrice={AuctionsData[0].PropertyPrice}
            DayRemaining={AuctionsData[0].DayRemaining}
            Price={AuctionsData[0].Price}
          />
          <PropertyCard
            ImgUrl={AuctionsData[0].ImgUrl}
            Title={AuctionsData[0].Title}
            SubTitle={AuctionsData[0].SubTitle}
            PropertyPrice={AuctionsData[0].PropertyPrice}
            DayRemaining={AuctionsData[0].DayRemaining}
            Price={AuctionsData[0].Price}
          />
        </StyledGrid>
      </StyledGrid>
    </AuctionsContainer>
  )
}

const mapStateToProps = (state: any) => ({
  userInfo: state.user.userInfo,
})
export default connect(mapStateToProps)(Auctions)
