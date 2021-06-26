import { Paper, makeStyles, Typography, Grid } from '@material-ui/core'
// import { useState, useEffect } from 'react'
import KnabIcon from 'assets/icons/KNAB.svg'
import { connect } from 'react-redux'
// import Warning from '../../../assets/icons/warning.svg'
// import Question from '../../../assets/icons/question.svg'

const useStyles = makeStyles((theme) => ({
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
  mainDiv: {
    position: 'relative',
  },
  root: {
    height: 'auto',
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
  secondLineText: {
    color: '#C4C4C4',
  },
}))

const MoreWithCrypto = (props: any) => {
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
                <Typography variant="subtitle2">KNABr</Typography>
                <Typography className={classes.secondLineText} variant="h5">
                  $6.76 2.58%
                </Typography>
              </div>
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
            <Typography variant="subtitle2" className={classes.secondLineText}>
              {`**This is subject to market variations for field.`}
            </Typography>
          </div>
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

export default connect(mapStateToProps, {})(MoreWithCrypto)
