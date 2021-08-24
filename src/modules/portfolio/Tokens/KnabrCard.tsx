import { useEffect } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Paper, makeStyles, Typography, Grid } from '@material-ui/core'
import KnabIcon from 'assets/icons/KNAB.svg'
import Exclamation from 'assets/images/exclamation.png'
import triangle from 'assets/images/upArrow.png'
import { getAssetsKNABrBalance } from '../../../modules/block-chain/BlockChainMethods'
import { setKnabr } from 'logic/actions/staking.action'

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

const KnabrCard = (props: any) => {
  const classes = useStyles()
  const {
    staking: { knab, knabr },
    setKnabr
  } = props;
  useEffect(() => {
    getAssetsKNABrBalance().then((res) => {
      // console.log(res);
      setKnabr(res);
    }, err => { console.log(err) })
  }, [])

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  
  return (
    <>
      <div className={classes.mainDiv}>
        <Paper className={classes.root} style={{ opacity: 1 }}
          onClick={() => openInNewTab(`https://polygonscan.com/`)}>
          <div>
            <div className={classes.contentDiv}>
              <div className={classes.contentImgDiv}>
                <img src={KnabIcon} alt="" className={classes.iconImg} />
              </div>
              <div className={classes.contentTextDiv}>
                <Typography>KNABr</Typography>
                <Typography className={classes.secondLineText} variant="h5">
                  {/* $6.76 &nbsp; */}
                  {props.isWalletCon ? knabr : 0}&nbsp;
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
                0.00
              </Grid>
              <Grid item md={3} xs={12}>
                Price <br />
                $0.00
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

// export default KnabrCard
const mapStateToProps = (state: any) => ({
  isWalletCon: state.user.isWalletCon,
  staking: state.staking,
})
export default withRouter(connect(mapStateToProps, {
  setKnabr
})(KnabrCard))
