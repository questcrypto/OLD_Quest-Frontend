import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  useStyles,
  StyledLinearProgress,
  AuctionsContainer,
  PropertyHeader,
  HeaderTitle,
  ProgressText,
  PropertyTabCont,
  TabTitle,
  PropertySearchBox,
  StyledGrid,
  BidContainer,
  BidInfo,
} from './style'
// import PropertyTable from '../property-table/PropertyTable'
import { Box, Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core'
import ComponentLoader from 'shared/loader-components/component-loader'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'
import { getPublicAddress } from 'modules/auth/authFunction'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'
import { PriceContainer, PriceInfo } from 'modules/property-details/style'

const Auctions = (props: any) => {
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState('new')
  const [propertiesList, setPropertiesList] = useState<any>([])
  const [dataLoading, setDataLoading] = useState(false)
  const { userInfo } = props

  useEffect(() => {
    const getPropertiesList = async () => {
      try {
        setDataLoading(true)
        if (!!userInfo && userInfo.role === 1) {
          const res = await axios.get(`${apiBaseUrl}/properties/GetAllProperty`)
          setPropertiesList(res.data)
        }
        if (!!userInfo && userInfo.role === 2) {
          const publicaddress = await getPublicAddress()
          if (publicaddress) {
            const res = await axios.get(`${apiBaseUrl}/properties/GetProperty/${publicaddress}`)
            setPropertiesList(res.data)
          }
        }
      } catch (error) {
      } finally {
        setDataLoading(false)
      }
    }
    getPropertiesList()
  }, [userInfo])

  const handleAddProperty = () => {
    history.push(Paths.addPropertyForm)
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
      <StyledGrid container style={{ height: '200px', width: '1100px' }}>
        <StyledGrid container spacing={2}>
          <Grid item xs={12} sm={12} lg={4}>
            <Card>
              <CardActionArea>
                <img
                  alt="complex"
                  src={`https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F37%2F2019%2F06%2F12170406%2Fmodern-home-exterior-gray-scheme-792ab713.jpg`}
                  style={{ height: '250px', width: '430px' }}
                />
                <CardContent>
                  <Typography variant="button" display="block" gutterBottom>
                    1024 Somma Way
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    QUEST24567
                  </Typography>
                  <Grid item xs={6}>
                    <BidContainer>
                      <Grid>
                        <p>Average Bid</p>
                        <p> $98.22</p>
                      </Grid>
                      <BidInfo>
                        3 Days remaining
                        <StyledLinearProgress variant="determinate" value={70} className={classes.progressStyle} />
                      </BidInfo>
                    </BidContainer>
                    <BidContainer>
                      <Typography variant="caption" display="block" gutterBottom>
                        Your Bid
                      </Typography>
                      <p> $98.22</p>
                      <BidInfo>Upgrade your bid</BidInfo>
                    </BidContainer>
                  </Grid>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Box className={classes.btnGroup}>
                  <Button className={classes.btn1Style}>live auction</Button>
                  <Button className={classes.btn2Style}>property details</Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} lg={4}>
            <Card>
              <CardActionArea>
                <img
                  alt="complex"
                  src={`https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F37%2F2019%2F06%2F12170406%2Fmodern-home-exterior-gray-scheme-792ab713.jpg`}
                  style={{ height: '250px', width: '430px' }}
                />
                <CardContent>
                  <Typography variant="button" display="block" gutterBottom>
                    1024 Somma Way
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    QUEST24567
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Average Bid
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    $ 98.22
                  </Typography>
                  <BidInfo>
                    <p style={{ alignItems: 'right' }}>3 Days remaining</p>
                    <StyledLinearProgress variant="determinate" value={70} className={classes.progressStyle} />
                  </BidInfo>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Your Bid
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    $ 95.12
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Box className={classes.btnGroup}>
                  <Button className={classes.btn1Style}>live auction</Button>
                  <Button className={classes.btn2Style}>property details</Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} lg={4}>
            <Card>
              <CardActionArea>
                <img
                  alt="complex"
                  src={`https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F37%2F2019%2F06%2F12170406%2Fmodern-home-exterior-gray-scheme-792ab713.jpg`}
                  style={{ height: '250px', width: '430px' }}
                />
                <CardContent>
                  <Typography variant="button" display="block" gutterBottom>
                    1024 Somma Way
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    QUEST24567
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Average Bid
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    $ 98.22
                  </Typography>
                  <BidInfo>
                    <p style={{ alignItems: 'right' }}>3 Days remaining</p>
                    <StyledLinearProgress variant="determinate" value={70} className={classes.progressStyle} />
                  </BidInfo>
                  <Typography variant="caption" display="block" gutterBottom>
                    $ 95.12
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Box className={classes.btnGroup}>
                  <Button className={classes.btn1Style}>live auction</Button>
                  <Button className={classes.btn2Style}>property details</Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        </StyledGrid>
      </StyledGrid>
    </AuctionsContainer>
  )
}

const mapStateToProps = (state: any) => ({
  userInfo: state.user.userInfo,
})
export default connect(mapStateToProps)(Auctions)
