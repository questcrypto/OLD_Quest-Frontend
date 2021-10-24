import { Paper, makeStyles, Typography, Grid, Card, CardContent } from '@material-ui/core'
// import { fetchValue, fetchDetails } from '../../../modules/block-chain/BlockChainMethods'
import { useState, useEffect } from 'react'
import { getUSDCRaised } from '../../../modules/block-chain/BlockChainMethods'
const commaNumber = require('comma-number')

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    position: 'relative',
  },
  root: {
    height: 'auto',
    padding: '12px 0px'
  },
  title: {
    color: '#858585',
    fontSize: '0.8em',
  },
  subTitle: {
    color: '#000',
    // fontWeight: 'bold',
    fontSize: '1em',
  },
  content: {
    marginTop: '5px',
  },
  outerDiv: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  innerDiv: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    padding: '12px 0px',
    margin: '0px 30px',
    borderBottom: '2px solid #F5F5F5'
  },
  innerSubDiv: {
    display: 'flex',
  }
}))
const TokensRemaining = (props: any) => {
  const classes = useStyles()
  const [raisedTokens, setRaisedTokens] = useState(0)
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
          <div className={classes.outerDiv}>
            <div className={classes.innerDiv}>
              <div className={classes.innerSubDiv}>
                <Typography className={classes.title}>KNAB Tokens remaining</Typography>
              </div>
              <div className={classes.innerSubDiv}>
                <Typography className={classes.subTitle}>{props.tokensData.tokensLeft}</Typography>
              </div>
            </div>
            <div className={classes.innerDiv}>
              <div className={classes.innerSubDiv}>
                <Typography className={classes.title}>ICO Price</Typography>
              </div>
              <div className={classes.innerSubDiv}>
                <Typography className={classes.subTitle}>$ 1</Typography>
              </div>
            </div>
          </div>
          <div className={classes.outerDiv}>
            <div className={classes.innerDiv}>
              <div className={classes.innerSubDiv}>
                <Typography className={classes.title}>Fund raising goal</Typography>
              </div>
              <div className={classes.innerSubDiv}>
                <Typography className={classes.subTitle}>80 million USDC</Typography>
              </div>
            </div>
            <div className={classes.innerDiv}>
              <div className={classes.innerSubDiv}>
                <Typography className={classes.title}>Total Market cap</Typography>
              </div>
              <div className={classes.innerSubDiv}>
                <Typography className={classes.subTitle}>{raisedTokens} USDC</Typography>
              </div>
            </div>
          </div>
          {/* <Grid container spacing={4}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Grid item md={3} xs={12}>
              <Typography className={classes.title}>KNAB Tokens remaining</Typography>
            </Grid>
            <Grid item md={2} xs={12}>
              <Typography className={classes.subTitle}>{props.tokensData.tokensLeft}</Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Typography className={classes.title}>ICO Price</Typography>
            </Grid>
            <Grid item md={2} xs={12}>
              <Typography className={classes.subTitle}>$ 1</Typography>
            </Grid>
          </Grid> */}
          {/* <Grid container spacing={4} className={classes.content}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Grid item md={3} xs={12}>
              <Typography className={classes.title}>Fund raising goal</Typography>
            </Grid>
            <Grid item md={2} xs={12}>
              <Typography className={classes.subTitle}>80 million USDC</Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Typography className={classes.title}>Total Market cap</Typography>
            </Grid>
            <Grid item md={2} xs={12}>
              <Typography className={classes.subTitle}>{raisedTokens} USDC</Typography>
            </Grid>
          </Grid> */}
        </Paper>
      </div>
    </>
  )
}

export default TokensRemaining
