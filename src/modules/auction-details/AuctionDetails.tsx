import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
    useStyles,
    AuctionDetailsCont,
    HeaderContainer,
    NoDetailsAvailable,
    HeaderPath,
    HeaderTitle,
    AuctionStatsGrid,
    TotalTokensSold,
    ReservePriceGrid,
    Info,
    StyledLinearProgress,
    StyledTitle,
    DateWrap,
    BidWrap,
    BidValues,
    ImageWrap,
    SmallImageWrap,
    TitleGrid,
    CurrentBidGrid,
    StyledBid,
    EquityGrid,
    ShareLinksGrid,
    Header,
    Links,
    TokenDiv,
    Top,
    Bottom,
    SliderWrap,
    StyledSlider,
    StyledDiv,
} from './style'
import ComponentLoader from 'shared/loader-components/component-loader'
import Grid from '@material-ui/core/Grid'
import {  Button } from '@material-ui/core'
import coin from 'assets/images/coin.png'
import bell from 'assets/images/bell.svg'
import copy from 'assets/images/copy.svg'
import facebook from 'assets/images/facebook.svg'
import twitter from 'assets/images/twitter.svg'
import telegram from 'assets/images/telegram.svg'
import exclamation from 'assets/images/exclamation.svg'
import question from 'assets/images/question.svg'
import alarm from 'assets/images/alarm.svg'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'
import { colors } from 'shared/styles/theme'

const AuctionDetails = (props: any) => {
    const classes = useStyles()
    const [dataLoading, setDataLoading] = useState(false)
    const [propertyInfo, setPropertyInfo] = useState<any>({})
    const [imageList, setImageList] = useState<any>([])
    const [docList, setDocList] = useState<any>([])
    const [selectImg, setSelectImg] = useState('')
    const { userInfo } = props

    useEffect(() => {
        const propertyId = props.match.params.propertyId
        const getPropertyDetails = async () => {
            try {
                setDataLoading(true)
                const res = await axios.get(`${apiBaseUrl}/properties/GetSingleProperty/${propertyId}`)
                if (!!res && res.data) {
                    const images = []
                    const docs = []
                    setPropertyInfo(res.data)
                    for (const item of res.data.getDocs) {
                        if (item.type === 0) {
                            images.push(item)
                        }
                        if (item.type === 1) {
                            docs.push(item)
                        }
                    }
                    setImageList([...images])
                    setSelectImg(images[0].filename)
                    setDocList([...docs])
                }
            } catch (error) {
            } finally {
                setDataLoading(false)
            }
        }
        getPropertyDetails()
    }, [props.match.params.propertyId])

    const valuetext = (value: number) => {
        return `${value}%`
    }

    return (
        <AuctionDetailsCont>
            <HeaderContainer>
                <HeaderPath>
                    <span>Properties / New / {props.match.params.propertyId}</span> / Auction
                </HeaderPath>
                <HeaderTitle>Property</HeaderTitle>
            </HeaderContainer>
            {dataLoading ? (
                <ComponentLoader />
            ) : (
                    <div>
                        {!!propertyInfo && Object.values(propertyInfo).length > 0 ? (
                            <Grid container>
                                <Grid container item lg={9} xs={12}>
                                    <Grid container item xs={5} md={5}>
                                        <ImageWrap item xs={12} >
                                            <img className={classes.img} alt="complex" src={question} />
                                        </ImageWrap>
                                        <Grid container item xs={12}>
                                            {['image', 'image', 'image', 'image',].map(image => (
                                                <SmallImageWrap>
                                                    <img src={question} alt="image" />
                                                </SmallImageWrap>
                                            ))}
                                        </Grid>
                                        <span className={classes.info}>
                                            Central Valley Home In Taylorsville with a large backyard pool.
                                            Completely remodeled in 2016 everything up to date. 6 Bedrooms and 2 Full bathrooms.
                                            Living Room and Downstairs family room laundry room etc… and a true 2 car garage.
                                        </span>
                                    </Grid>
                                    <Grid item xs={7} md={7} direction="column" className={classes.midGrid}>
                                        <TitleGrid container item xs={12}>
                                            <p>1901 Thornridge Cir.</p>
                                            <span>Listing ID QUEST24567</span>
                                        </TitleGrid>
                                        <CurrentBidGrid container item xs={12}>
                                            <img src={coin} alt="coin" style={{ margin: '6px 10px 0 0' }} />
                                            <StyledBid>
                                                <p>Current Bid</p>
                                                <span>$ 98.22</span>
                                            </StyledBid>
                                        </CurrentBidGrid>
                                        <EquityGrid>
                                            <Top item xs={12}>
                                                <StyledDiv>
                                                    <p>Equity %</p>
                                                    <TokenDiv width={'85px'} inputBack={'#ECECEC'}>
                                                        <span>Token&nbsp;</span>
                                                        <p>26</p>
                                                    </TokenDiv>
                                                </StyledDiv>
                                                <SliderWrap>
                                                    <StyledSlider
                                                        defaultValue={30}
                                                        getAriaValueText={valuetext}
                                                        valueLabelFormat={valuetext}
                                                        aria-labelledby="discrete-slider"
                                                        valueLabelDisplay="auto"
                                                        step={10}
                                                        min={0}
                                                        max={100}
                                                    />
                                                </SliderWrap>
                                                <div style={{ display: 'flex', marginTop: '24px' }}>
                                                    <TokenDiv width={'232px'} back={'#ECECEC'}>
                                                        <span>Make a Bid&nbsp;</span>
                                                        <p>2586.50 USDC</p>
                                                    </TokenDiv>
                                                    <span className={classes.balance} style={{ marginLeft: '11px' }}>Per property token</span>
                                                </div>
                                            </Top>
                                            <Bottom container item xs={12}>
                                                <StyledDiv>
                                                    <TokenDiv width={'273px'} back={'#ECECEC'}>
                                                        <span>Token&nbsp;</span>
                                                        <p>2586.50 USDC</p>
                                                    </TokenDiv>
                                                    <Button className={classes.btn2Style}>MAKE BID</Button>
                                                </StyledDiv>
                                                <span className={classes.balance}>
                                                    Total wallet balance = 2597.88 USDC
                                                </span>
                                            </Bottom>
                                        </EquityGrid>
                                        <ShareLinksGrid>
                                            <Header>
                                                <p>Share Links</p>
                                                <div style={{ display: 'flex' }}>
                                                    <img src={bell} alt="bell" style={{ marginRight: '10px' }} />
                                                    <p>Register for notification</p>
                                                </div>
                                            </Header>
                                            <Links>
                                                <img src={copy} alt="copy" />
                                                <img src={facebook} alt="facebook" />
                                                <img src={twitter} alt="twitter" />
                                                <img src={telegram} alt="telegram" />
                                            </Links>
                                        </ShareLinksGrid>
                                    </Grid>
                                </Grid>

                                <AuctionStatsGrid container item lg={3} xs={12}>
                                    <StyledTitle item xs={12}>
                                        <p>Auction Stats</p>
                                    </StyledTitle>
                                    <Info container item xs={12} direction="column">
                                        <StyledLinearProgress variant="determinate" value={60} className={classes.progressStyle} />
                                        <DateWrap>
                                            <img src={alarm} alt="alarm" className={classes.alarm} />
                                            <p>Auction ends 29 Jan 2021 at 01:30:08 GMT</p>
                                        </DateWrap>
                                        <BidWrap>
                                            <div />
                                            <BidValues>
                                                <p>Total Bidders</p>
                                                <span>563</span>
                                            </BidValues>
                                        </BidWrap>
                                        <BidWrap>
                                            <div />
                                            <BidValues>
                                                <p>Eligible Bids</p>
                                                <span>1103</span>
                                            </BidValues>
                                        </BidWrap>
                                        <BidWrap last={true}>
                                            <div />
                                            <BidValues>
                                                <p>Total Bids</p>
                                                <span>2251</span>
                                            </BidValues>
                                        </BidWrap>
                                    </Info>
                                    <Grid container item xs={12}>
                                        <TotalTokensSold container item xs={12}>
                                            <p>Total property tokens sold </p>
                                            <span>86%</span>
                                        </TotalTokensSold>
                                        <ReservePriceGrid container item xs={12}>
                                            <img src={exclamation} alt="exclamation" className={classes.exclamation} />
                                            <p>Reserve price not met.</p>
                                            <img src={question} alt="question" className={classes.question} />
                                        </ReservePriceGrid>
                                    </Grid>
                                </AuctionStatsGrid>
                            </Grid>
                        ) : (
                                <NoDetailsAvailable>
                                    <p>No details available</p>
                                </NoDetailsAvailable>
                            )}
                    </div>
                )}
        </AuctionDetailsCont>
    )
}
const mapStateToProps = (state: any) => ({
    userInfo: state.user.userInfo,
})
export default withRouter(connect(mapStateToProps)(AuctionDetails))
