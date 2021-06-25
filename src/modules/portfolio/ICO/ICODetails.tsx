import { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { makeStyles, Paper, Typography, Grid } from '@material-ui/core'
import CustomButton from '../components/shared/Button'
import { fetchValue, fetchDetails } from '../../../modules/block-chain/BlockChainMethods'
import ICOHoldings from './ICOHoldings'
import RaisedTokens from './RaisedTokes'
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
const ICODetails = (props: any) => {
  const { getKNABbalance } = props
  const classes = useStyles()
  // const handleBackButton = () => history.push(Paths.root)
  const [formData, setFormData] = useState({ from: 1, to: '' })
  const [swapData, setSwapData] = useState({ bonusRatio: 0, tokensSold: '0', tokensLeft: '0' })

  const getBalance = async () => {
    const KNABBalance: any = await getKNABBalance()
    getKNABbalance(KNABBalance / 10 ** 18)
    // setPb(KNABBalance / 10 ** 18)
  }

  useEffect(() => {
    getBalance()
  }, [])
  console.log(props, '***')
  // useEffect(() => {
  //   fetchValue(formData.from).then(
  //     (res) => {
  //       console.log(res, '***')
  //       setFormData({ ...formData, to: res })
  //     },
  //     (err) => {
  //       console.log(err)
  //     }
  //   )
  //   // Tokens Sold and Left
  //   fetchDetails().then(
  //     (res) => {
  //       setSwapData({
  //         ...swapData,
  //         tokensSold: commaNumber(res['tokensSold']),
  //         tokensLeft: commaNumber(res['tokensLeft']),
  //       })
  //       const a = Number(formData.to) * 10 ** 6
  //       const b = formData.from * 10 ** 6
  //       if (b == 0) {
  //         // setSwapData({ ...swapData, bonusRatio:  })
  //       } else {
  //         setSwapData({ ...swapData, bonusRatio: a / b })
  //       }
  //       // console.log(res)
  //     },
  //     (err) => {
  //       console.log(err)
  //     }
  //   )
  // }, [])
  // console.log(swapData, '***')
  // console.log(formData, '***')
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
            {/* 00.00 KNAB */}
            {Number(props.KNABBalance.toFixed(3))} KNAB
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
        <Grid container spacing={3} style={{ padding: '38px 0px' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Grid item md={4} xs={12}>
            <ICOHoldings knabBalance={props.KNABBalance} />
          </Grid>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Grid item md={8} xs={12}>
            <RaisedTokens />
          </Grid>
        </Grid>
        <Grid container spacing={4} style={{ padding: '38px 0px' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Grid item md={10} xs={12}>
            <TokensRemaining swapData={swapData} />
          </Grid>
        </Grid>
        <Grid container spacing={4} style={{ padding: '38px 0px' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Grid item md={10} xs={12}>
            <CrowdSaleContract />
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  KNABBalance: state.user.KNABBalance,
})
export default withRouter(connect(mapStateToProps, { getKNABbalance })(ICODetails))
