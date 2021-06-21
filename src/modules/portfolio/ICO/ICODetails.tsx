import { makeStyles, Paper, Typography, Grid } from '@material-ui/core'
import CustomButton from '../components/shared/Button'
// import history from 'modules/app/components/history'
// import { Paths } from 'modules/app/components/routes/types'
import ICOHoldings from './ICOHoldings'
import RaisedTokens from './RaisedTokes'
import RewardsGrid from './RewardsGrid'
import TokensRemaining from './TokensRemainng'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    // backgroundColor: '#E5E5E5'
    paddingTop: theme.spacing(7),
    paddingRight: theme.spacing(5),
  },
  header: {
    display: 'flex',
  },
  btnDiv: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  title: {
    // color: '#C4C4C4',
    fontSize: '0.em',
  },
  subTitle: {
    color: '##C4C4C4',
    fontWeight: 'bold',
    fontSize: '1em',
  },
}))
const ICODetails = () => {
  const classes = useStyles()
  // const handleBackButton = () => history.push(Paths.root)

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography className={classes.title}>
          {/* `${}` */}
          ICO Details
        </Typography>
        <div className={classes.btnDiv}>
          <CustomButton
            size="small"
            disableElevation
            disableFocusRipple
            disableRipple
            style={{ backgroundColor: '#858585', padding: '0px 16px' }}
          >
            00.00 KNABr
          </CustomButton>
          &nbsp;&nbsp;&nbsp;
          <CustomButton
            size="small"
            disableElevation
            disableFocusRipple
            disableRipple
            style={{ backgroundColor: '#858585', padding: '0px 16px' }}
          >
            00.00 KNAB
          </CustomButton>
          &nbsp;&nbsp;&nbsp;
          <CustomButton size="small" style={{ backgroundColor: '#1E3444', padding: '0px 16px' }}>
            Real Estate Auctions
          </CustomButton>
          &nbsp;&nbsp;&nbsp;
          <CustomButton size="small" style={{ backgroundColor: '#1E3444', padding: '0px 16px' }}>
            Buy | Convert Quest
          </CustomButton>
          &nbsp;&nbsp;&nbsp;
          <CustomButton size="small" style={{ backgroundColor: '#1E3444', padding: '0px 16px' }}>
            {/* Buy | Convert KNAB */}
            Buy KNAB
          </CustomButton>
        </div>
      </div>
      <br />

      <Paper>
        <br />
        <Grid container spacing={4} style={{ padding: '38px 0px' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Grid item md={5} xs={12}>
            <ICOHoldings />
          </Grid>
          <Grid item md={5} xs={12}>
            <RaisedTokens />
          </Grid>
        </Grid>
        <Grid container spacing={4} style={{ padding: '38px 0px' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Grid item md={10} xs={12}>
            <TokensRemaining />
          </Grid>
        </Grid>
        <Grid container spacing={4} style={{ padding: '38px 0px' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Grid item md={10} xs={12}>
            <RewardsGrid />
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default ICODetails
