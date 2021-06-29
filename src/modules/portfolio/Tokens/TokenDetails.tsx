import { makeStyles, Paper, Typography, Grid } from '@material-ui/core'
import CustomButton from '../components/shared/Button'
import TokenCard from './TokenCard'
import TokensData from './TokensData'
import TokensGraph from '../components/Graph/Graph'
// import history from 'modules/app/components/history'
// import { Paths } from 'modules/app/components/routes/types'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    // backgroundColor: '#E5E5E5'
    paddingTop: theme.spacing(7),
    paddingRight: theme.spacing(5),
  },
  header: {
    display: 'flex',
    // padding: '30px',
  },
  btnDiv: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: '1em',
    fontWeight: 'bold',
  },
  subTitle: {
    color: '##C4C4C4',
    fontWeight: 'bold',
    fontSize: '1em',
  },
  paper: {
    display: 'flex',
    padding: '30px',
  },
  gridHeight: {
    height: '100%',
  },
}))
const TokenDetails = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography className={classes.title}>Token Details</Typography>
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
        <Grid container spacing={2} className={classes.paper}>
          <Grid item md={5} xs={12}>
            <TokenCard />
          </Grid>
          <Grid item md={7} xs={12}>
            <TokenCard />
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.paper}>
          <Grid item md={12} xs={12}>
            <TokensGraph />
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.paper}>
          <Grid item md={12} xs={12}>
            <TokensData />
          </Grid>
        </Grid>
      </Paper>
      {/* <Paper>
        <br />
        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
        <CustomButton
          size="small"
          disableElevation
          disableFocusRipple
          disableRipple
          style={{ backgroundColor: '#858585', padding: '0px 16px' }}
          onClick={() => handleBackButton()}
          // onClick={openbcModal}
        >
          back
        </CustomButton>
        <Grid container spacing={4} style={{ padding: '38px 0px' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Grid item md={5} xs={12}>
            <TokenCard />
          </Grid>
          <Grid item md={5} xs={12}>
            <TokenCard />
          </Grid>
        </Grid>
        <Grid container spacing={4} style={{ padding: '38px 0px' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Grid item md={10} xs={12}>
            <Graph />
          </Grid>
        </Grid>
        <Grid container spacing={4} style={{ padding: '38px 0px' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Grid item md={10} xs={12}>
            <FullICODetails />
          </Grid>
        </Grid>
      </Paper> */}
    </div>
  )
}

export default TokenDetails
