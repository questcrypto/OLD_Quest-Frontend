// import { connect } from 'react-redux'
import { Paper, makeStyles, Typography, Grid } from '@material-ui/core'
import KnabIcon from 'assets/icons/KNAB.svg'
import Exclamation from 'assets/images/exclamation.png'
import triangle from 'assets/images/upArrow.png'

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    position: 'relative',
  },
  root: {
    height: 'auto',
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
    width: '100%',
    backgroundColor: '#DEDEDE',
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
    color: '#C4C4C4',
    marginBottom: '2px',
  },
}))

const TokenCard = (props: any) => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.mainDiv}>
        <Paper className={classes.root} style={{ opacity: 1 }}>
          <div>
            <div className={classes.contentDiv}>
              <div className={classes.contentImgDiv}>
                <img src={KnabIcon} alt="" />
              </div>
              <div className={classes.contentTextDiv}>
                <Typography>KNABr</Typography>
                <Typography className={classes.secondLineText} variant="h5">
                  $6.76 &nbsp;
                  <span className={classes.arrowText}>
                    <img src={triangle} alt="" className={classes.arrowImage} />
                    2.58%
                  </span>
                </Typography>
                {/* <Typography className={classes.arrowText}></Typography> */}
              </div>
              {/* <Grid container spacing={2}>
                <Grid item md={4} xs={12}>
                  <Typography>KNABr</Typography>
                  <Typography>$6.76</Typography>
                  <Typography>$1200.00 USDC</Typography>
                </Grid>
              </Grid> */}
            </div>
            <Grid container spacing={4} style={{ padding: '38px 0px' }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Grid item md={4} xs={12}>
                Available Qty.
                <br />
                0.00000000
              </Grid>
              <Grid item md={3} xs={12}>
                Price <br />
                $56872.30
              </Grid>
              <Grid item md={2} xs={12}>
                Yield <br />
                +3.57%
              </Grid>
            </Grid>
            <hr />
            <Typography variant="subtitle2" className={classes.warningText}>
              <img src={Exclamation} alt="" className={classes.exclamationImage} /> This is subject to market variations for field.
            </Typography>
          </div>
        </Paper>
      </div>
    </>
  )
}

// export default MoreWithCrypto;
// const mapStateToProps = (state: any) => ({
//   loggedIn: state.user.loggedIn,
//   isWalletCon: state.user.isWalletCon,
//   walletConnectAddress: state.user.walletConnectAddress,
// })

// export default connect(mapStateToProps, {})(MoreWithCrypto)
export default TokenCard
