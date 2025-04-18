import { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Paper, makeStyles, Typography, Grid } from '@material-ui/core'
import KnabIcon from 'assets/icons/KNAB.svg'
import Exclamation from 'assets/images/exclamation.png'
import triangle from 'assets/images/upArrow.png'
import { getKNABbalance } from 'logic/actions/user.actions'
import { getKNABBalance } from '../../../modules/block-chain/BlockChainMethods'
import { KNABaddress } from 'modules/block-chain/abi'

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
  arrowImage: {
    height: 12,
    width: 12,
  },
  exclamationImage: {
    height: 15,
    width: 15,
    color: '#C4C4C4',
    marginLeft: '3px',
    marginRight: '3px',
    position: 'relative',
    top: '2px'
  },
  arrowText: {
    color: '#C4C4C4',
    fontSize: '0.9rem',
  },
  hoverBtnDiv: {
    top: '0%',
    left: '0%',
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: '#858585',
    color: '#FFFFFF',
  },
  hoverBtnTxt: {
    // color: '#FFFFFF'
    position: 'relative',
    left: '3%',
  },

  title: {
    padding: theme.spacing(2),
  },
  questionImg: {
    width: '13px',
    height: '13px',
    paddingLeft: '6px',
    position: 'relative',
    top: '2px',
  },
  line: {
    height: '1px',
    width: '80%',
    backgroundColor: '#DEDEDE',
    position: 'relative',
    left: '5%'
  },
  contentDiv: {
    display: 'flex',
    padding: theme.spacing(2),
  },
  contentImgDiv: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: '12px',
  },
  contentTextDiv: {},
  secondLineText: {},
  warningText: {
    // color: '#C4C4C4',
    // marginBottom: '2px',
    color: '#858585',
    padding: '16px',
    paddingBottom: '16px',
  },
  iconImg: {
    height: '7vh'
  }
}))

const KnabCard = (props: any) => {

  const polygonScanLink = 'https://polygonscan.com/';
  const polygonKnabUrl = polygonScanLink + 'token/' + KNABaddress;

  const { getKNABbalance } = props
  const classes = useStyles()
  const getBalance = async () => {
    const KNABBalance: any = await getKNABBalance()
    getKNABbalance(KNABBalance / 10 ** 18)
  }

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  useEffect(() => {
    getBalance()
  }, [])
  return (
    <>
      <div className={classes.mainDiv}>
        <Paper className={classes.root} style={{ opacity: 1 }}
          onClick={() => openInNewTab(`${polygonKnabUrl}`)}>
          <div>
            <div className={classes.contentDiv}>
              <div className={classes.contentImgDiv}>
                <img src={KnabIcon} alt="" className={classes.iconImg} />
              </div>
              <div className={classes.contentTextDiv}>
                <Typography>KNAB</Typography>
                <Typography className={classes.secondLineText} variant="h5">
                  {props.isWalletCon ? Number(props.KNABBalance.toFixed(3)) : 0} &nbsp;
                  <span className={classes.arrowText}>
                    <img src={triangle} alt="" className={classes.arrowImage} />
                    0.0%
                  </span>
                </Typography>
              </div>
            </div>
            <Grid container spacing={4} style={{ padding: '24px 0px' }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Grid item md={4} xs={12}>
                Available Qty.
                <br />
                100,000,000
              </Grid>
              <Grid item md={3} xs={12}>
                Price <br />
                $100,000,000
              </Grid>
              <Grid item md={2} xs={12}>
                Yield <br />
                +0.00%
              </Grid>
            </Grid>
            {/* <hr /> */}
            <div className={classes.line}></div>
            <Typography variant="subtitle2" className={classes.warningText}>
              <img src={Exclamation} alt="" className={classes.exclamationImage} /> This is subject to market variations for field.
            </Typography>
          </div>
        </Paper>
      </div>
    </>
  )
}

// export default KnabCard
const mapStateToProps = (state: any) => ({
  isWalletCon: state.user.isWalletCon,
  KNABBalance: state.user.KNABBalance,
})
export default withRouter(connect(mapStateToProps, { getKNABbalance })(KnabCard))
