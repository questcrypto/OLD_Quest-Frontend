import { useEffect } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { makeStyles, Paper, Typography, Grid } from '@material-ui/core'
import CustomButton from '../components/shared/Button'
import TokenCard from './TokenCard'
import KnabrCard from './KnabrCard'
import TokensData from './TokensData'
import TokensGraph from '../components/Graph/Graph'
import { getKNABbalance } from 'logic/actions/user.actions'
import { getKNABBalance } from '../../../modules/block-chain/BlockChainMethods'
import KnabCard from './KnabCard'
// import KnabCard from './KnabCard'

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
const TokenDetails = (props: any) => {
  const classes = useStyles()
  const getBalance = async () => {
    const KNABBalance: any = await getKNABBalance()
    getKNABbalance(KNABBalance / 10 ** 18)
  }

  useEffect(() => {
    getBalance()
  }, [])
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
            {props.KNABBalance} KNAB
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
            Buy KNAB
          </CustomButton>
        </div>
      </div>
      <br />
      <Paper>
        <br />
        <Grid container spacing={2} className={classes.paper}>
          <Grid item md={5} xs={12}>
            <KnabCard />
          </Grid>
          <Grid item md={7} xs={12}>
            {/* <TokenCard /> */}
            <KnabrCard />
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
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  KNABBalance: state.user.KNABBalance,
})
export default withRouter(connect(mapStateToProps, { getKNABbalance })(TokenDetails))
