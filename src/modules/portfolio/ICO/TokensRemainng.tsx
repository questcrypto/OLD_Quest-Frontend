import { Paper, makeStyles, Typography, Grid, Card, CardContent } from '@material-ui/core'
// import { fetchValue, fetchDetails } from '../../../modules/block-chain/BlockChainMethods'
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
}))
const TokensRemaining = (props: any) => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.mainDiv}>
        <Paper className={classes.root} style={{ opacity: 1 }}>
          <Grid container spacing={4}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Grid item md={3} xs={12}>
              <Typography className={classes.title}>KNAB Tokens remainig</Typography>
            </Grid>
            <Grid item md={2} xs={12}>
              <Typography className={classes.subTitle}>{props.tokensData.tokensLeft}</Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Typography className={classes.title}>ICO Price</Typography>
            </Grid>
            <Grid item md={2} xs={12}>
              <Typography className={classes.subTitle}>1 USDC</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={4} className={classes.content}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Grid item md={3} xs={12}>
              <Typography className={classes.title}>Fund rising goal</Typography>
            </Grid>
            <Grid item md={2} xs={12}>
              <Typography className={classes.subTitle}>80 million</Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Typography className={classes.title}>Totala Market cap</Typography>
            </Grid>
            <Grid item md={2} xs={12}>
              <Typography className={classes.subTitle}>11,412,813 USDC</Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  )
}

export default TokensRemaining
