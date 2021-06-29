import { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { makeStyles, Paper, Typography, Grid } from '@material-ui/core'
import CustomButton from '../components/shared/Button'
import { fetchDetails } from '../../../modules/block-chain/BlockChainMethods'
import ICOHoldings from './ICOHoldings'
import RaisedTokens from './RaisedTokens'
import TokensRemaining from './TokensRemainng'
import CrowdSaleContract from './CrowdSaleContract'
import { getKNABbalance } from 'logic/actions/user.actions'
import { getKNABBalance } from '../../../modules/block-chain/BlockChainMethods'
const commaNumber = require('comma-number')

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
const ICODetails = (props: any) => {
  const { getKNABbalance } = props
  const classes = useStyles()
  const [tokensData, setTokensData] = useState({ bonusRatio: 0, tokensSold: '0', tokensLeft: '0' })

  const getBalance = async () => {
    const KNABBalance: any = await getKNABBalance()
    getKNABbalance(KNABBalance / 10 ** 18)
  }

  useEffect(() => {
    getBalance()
  }, [])
  useEffect(() => {
    // Tokens Sold and Left
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
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography className={classes.title}>ICO Details</Typography>
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
            {props.isWalletCon ? Number(props.KNABBalance.toFixed(3)) : 0.0} KNAB
            {/* {Number(props.KNABBalance.toFixed(3))} KNAB */}
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
            <ICOHoldings
              knabBalance={props.isWalletCon ? props.KNABBalance : 0}
              // knabBalance={props.KNABBalance}
            />
          </Grid>
          <Grid item md={7} xs={12}>
            <RaisedTokens tokensData={tokensData} />
          </Grid>
        </Grid>
        <Grid spacing={2} className={classes.paper}>
          <Grid item md={12} xs={12}>
            <TokensRemaining tokensData={tokensData} />
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.paper}>
          <Grid item md={12} xs={12}>
            <CrowdSaleContract />
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  KNABBalance: state.user.KNABBalance,
  isWalletCon: state.user.isWalletCon,
})
export default withRouter(connect(mapStateToProps, { getKNABbalance })(ICODetails))
