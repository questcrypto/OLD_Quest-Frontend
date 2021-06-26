import { Paper, makeStyles, Typography, Grid } from '@material-ui/core'
import { connect } from 'react-redux'

import CustomButton from '../../../modules/portfolio/components/shared/Button'

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
const FullICODetails = (props: any) => {
  const classes = useStyles()

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
              <Typography className={classes.subTitle}>333,333 DOP</Typography>
            </Grid>
            <Grid item md={2} xs={12}>
              <Typography className={classes.title}>KNAB Tokens for sale.</Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Typography className={classes.subTitle}>500</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={4} className={classes.content}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Grid item md={2} xs={12}>
              <Typography className={classes.title}>ICO Price.</Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Typography className={classes.subTitle}>$0.6</Typography>
            </Grid>
            <Grid item md={2} xs={12}>
              <Typography className={classes.title}>% Of total supply</Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Typography className={classes.subTitle}>2.22%</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={4} className={classes.content}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Grid item md={2} xs={12}>
              <Typography className={classes.title}>Fund rising goal.</Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Typography className={classes.subTitle}>$200,0000</Typography>
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
              <Typography className={classes.title}>Total market cap</Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Typography className={classes.subTitle}>11,412,813 USDT</Typography>
            </Grid>
            <Grid item md={5} xs={12}>
              <CustomButton size="large" style={{ background: 'linear-gradient(180deg, #E6BA73 0%, #BA8E4D 100%)', padding: '4px 24px' }}>
                Full ICO Details
              </CustomButton>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  )
}

// export default MoreWithCrypto;
const mapStateToProps = (state: any) => ({
  loggedIn: state.user.loggedIn,
  isWalletCon: state.user.isWalletCon,
  walletConnectAddress: state.user.walletConnectAddress,
})

export default connect(mapStateToProps, {})(FullICODetails)
