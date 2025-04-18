import { useState, useEffect } from 'react'
import { Paper, makeStyles, Typography, Grid, Tooltip } from '@material-ui/core'
import { StyledSlider, SliderWrap } from './style'
import { getUSDCRaised } from '../../../modules/block-chain/BlockChainMethods'
import { USDCAddress } from 'modules/block-chain/abi'

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    position: 'relative',
  },
  root: {
    height: 'auto',
    cursor: 'pointer',
    '&:hover': {
      border: '2px solid #E6BA73',
    },
  },
  headerFlex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  header: {
    display: 'flex',
    padding: '30px',
    fontSize: '0.8em',
    paddingBottom: '21.5px',
    // fontWeight: 'bold',
    // color: '#C4C4C4',
  },
  rightHeader: {
    display: 'flex',
    padding: '30px',
    // marginLeft: '170px',
    fontSize: '0.8em',
    paddingBottom: '0px',
    // fontWeight: 'bold',
    // color: '#C4C4C4',
  },
  label: {
    color: '#858585'
  },
  value: {
    color: '#000',
    fontWeight: 'bold',
  },
  detailsSubtitle: {
    fontSize: '1.5rem',
    // fontWeight: 'bold',
    color: '#D4A863'
  },
  title: {
    color: '#C4C4C4',
    fontSize: '0.8em',
  },
  subTitle: {
    color: '##C4C4C4',
    fontWeight: 'bold',
    fontSize: '1em',
  },
  details: {
    display: 'flex',
    padding: '30px',
  },
  detailsTitle: {
    fontSize: '0.7em',
  },
  nestedSubTitle: {
    fontSize: '0.7em',
    // color: '#C4C4C4',
    color: '#1E3444'
  },
}))

const RaisedTokens = (props: any) => {

  const polygonScanLink = 'https://polygonscan.com/';
  const polygonUsdcUrl = polygonScanLink + 'token/' + USDCAddress;
  
  const classes = useStyles()
  const [raisedTokens, setRaisedTokens] = useState(0)
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  useEffect(() => {
    let countDownDate = new Date('August 31, 2021 00:00:00').getTime()
    // Update the count down every 1 second
    let data = setInterval(function () {
      // Get today's date and time
      let now = new Date().getTime()

      // Find the distance between now and the count down date
      let distance = countDownDate - now

      // Time calculations for days, hours, minutes and seconds
      let days = Math.floor(distance / (1000 * 60 * 60 * 24))
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      let seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTime({
        ...time,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      })

      // If the count down is over
      if (distance < 0) {
        clearInterval(data)
        setTime({ ...time, days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)
  }, [])
  useEffect(() => {
    const displayRaisedTokens = async () => {
      const tokens = await getUSDCRaised()
      setRaisedTokens(tokens)
    }
    displayRaisedTokens()
  }, [])
  return (
    <div className={classes.mainDiv}>
      <Paper className={classes.root} style={{ opacity: 1 }}
        onClick={() => openInNewTab(`${polygonUsdcUrl}`)}>
        <Grid container className={classes.headerFlex}>
          <Grid item>
            <Typography className={classes.header}>
              <span className={classes.label}>Raised - </span>
              <span className={classes.value}>&nbsp;{raisedTokens} USDC</span>
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.rightHeader}>
              <span className={classes.label}>Target - </span>
              <span className={classes.value}>&nbsp;80 Million USDC</span>
            </Typography>
          </Grid>
        </Grid>
        <Tooltip title={raisedTokens} enterDelay={200} leaveDelay={100}>
          <SliderWrap>
            <StyledSlider value={raisedTokens ? raisedTokens : 0} aria-labelledby="discrete-slider" min={0} max={100000000} />
          </SliderWrap>
        </Tooltip>
        <Grid container className={classes.details} spacing={2}>
          <Grid item md={4} xs={12}>
            <Typography className={classes.detailsTitle}>Current Bonus Ratio</Typography>
            <Typography className={classes.detailsSubtitle}>1.5</Typography>
            <Typography className={classes.nestedSubTitle}>Contributors can recieve</Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            <Typography className={classes.detailsTitle}>The ICO ends in</Typography>
            <Typography className={classes.detailsSubtitle}>
              {time.days} : {time.hours}: {time.minutes} : {time.seconds}
            </Typography>
            <Typography className={classes.nestedSubTitle}>Days : Hours: Minutes : Seconds</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default RaisedTokens
