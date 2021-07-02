import { useState, useEffect } from 'react'
import { Paper, makeStyles, Typography, Grid } from '@material-ui/core'
import CustomButton from '../../../modules/portfolio/components/shared/Button'
import { fetchDetails } from '../../../modules/block-chain/BlockChainMethods'
import { getUSDCRaised } from '../../../modules/block-chain/BlockChainMethods'
const commaNumber = require('comma-number')

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    position: 'relative',
  },
  root: {
    height: 'auto',
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
  content: {
    marginTop: '5px',
  },
  icoBtn: {
    background: 'linear-gradient(180deg, #E6BA73 0%, #BA8E4D 100%)',
    padding: '4px 24px',
    marginLeft: '40px',
  },
}))
const TokensData = (props: any) => {
  const { handlePopup } = props

  const classes = useStyles()
  const [tokensData, setTokensData] = useState({ bonusRatio: 0, tokensSold: '0', tokensLeft: '0' })
  const [raisedTokens, setRaisedTokens] = useState(0)

  useEffect(() => {
    fetchDetails().then(
      (res) => {
        setTokensData({
          ...tokensData,
          tokensSold: commaNumber(res['tokensSold']),
          tokensLeft: commaNumber(res['tokensLeft']),
        })
      },
      (err) => {
        console.log(err)
      }
    )
  }, [])
  useEffect(() => {
    const displayRaisedTokens = async () => {
      const tokens = await getUSDCRaised()
      setRaisedTokens(tokens)
    }
    displayRaisedTokens()
  }, [])
  return (
    <>
      <div className={classes.mainDiv}>
        <Paper className={classes.root} style={{ opacity: 1 }}>
          <Grid container spacing={4}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Grid item md={2} xs={12}>
              <Typography className={classes.title}>KNAB Tokens for sale.</Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Typography className={classes.subTitle}>10 Million</Typography>
            </Grid>
            <Grid item md={2} xs={12}>
              <Typography className={classes.title}>KNAB Tokens Remaining</Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Typography className={classes.subTitle}>{tokensData.tokensLeft}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={4} className={classes.content}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Grid item md={2} xs={12}>
              <Typography className={classes.title}>ICO Price.</Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Typography className={classes.subTitle}>$ 1</Typography>
            </Grid>
            <Grid item md={2} xs={12}>
              <Typography className={classes.title}>% Of Total Supply</Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Typography className={classes.subTitle}>10%</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={4} className={classes.content}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Grid item md={2} xs={12}>
              <Typography className={classes.title}>Fund Raising Goal.</Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Typography className={classes.subTitle}>80 Million USDC</Typography>
            </Grid>
            <Grid item md={2} xs={12}>
              <Typography className={classes.title}>APY</Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Typography className={classes.subTitle}>4.12%</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={4} className={classes.content}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Grid item md={2} xs={12}>
              <Typography className={classes.title}>Total Market Cap</Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Typography className={classes.subTitle}>{raisedTokens}</Typography>
            </Grid>
            <Grid item md={5} xs={12}>
              <CustomButton size="large" className={classes.icoBtn} onClick={() => handlePopup()}>
                Full ICO Details
              </CustomButton>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  )
}

export default TokensData
