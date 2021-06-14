import {
  Paper,
  makeStyles,
  Typography
} from '@material-ui/core';
import { useState, useEffect } from 'react';

import Question from 'assets/icons/question.svg';
import KnabDummy from 'assets/icons/knab_dummy.svg';
import CustomButton from './shared/Button';
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  hoverBtnDiv: {
    // display: 'block',
    // position: 'absolute',
    // top: '40%',
    // left: '25%',
    // color: '#FFFFFF'
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
    color: '#FFFFFF'
  },
  hoverBtnTxt: {
    // color: '#FFFFFF'
    position: 'relative',
    left: '3%'
  },
  mainDiv: {
    position: 'relative',
  },
  root: {
    height: 'auto',
    // '&:hover': {
    //   opacity: 0.4
    // },

    // opacity: 0.4,
    // padding: theme.spacing(2)
  },
  title: {
    padding: theme.spacing(2)
  },
  questionImg: {
    width: '13px',
    height: '13px',
    paddingLeft: '6px',
    position: 'relative',
    top: '2px'
  },
  line: {
    height: '1px',
    width: '100%',
    backgroundColor: '#DEDEDE',
  },
  contentDiv: {
    display: 'flex',
    padding: theme.spacing(2)
  },
  contentImgDiv: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: '12px'
  },
  contentTextDiv: {},
  secondLineText: {
    color: '#C4C4C4'
  }
}));

const MoreWithCrypto = (props: any) => {

  const classes = useStyles();
  const { loggedIn } = props;
  const [isWallet, setIsWallet] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setIsWallet(loggedIn);
  }, [loggedIn])

  return (
    <>
      <div className={classes.mainDiv}>

        <Paper
          className={classes.root}
          style={{ opacity: isWallet? 1: 0.4 }}
          onMouseOver={() => setShow(true)}
        >
          <Typography variant="subtitle1" className={classes.title}>
            Do more with Crypto
            <img src={Question} alt="question" className={classes.questionImg} />
          </Typography>
          <div className={classes.line}></div>

          {
            content.map((item, ind) => {
              return (
                <div key={ind}>
                  <div className={classes.contentDiv} >
                    <div className={classes.contentImgDiv}>
                      <img src={item.icon} alt="" />
                    </div>
                    <div className={classes.contentTextDiv}>
                      <Typography variant="subtitle2">
                        {item.title}
                      </Typography>
                      <Typography variant="subtitle2" className={classes.secondLineText}>
                        {item.subTitle}
                      </Typography>
                    </div>
                  </div>
                  <div className={classes.line}></div>
                </div>
              )
            })
          }
        </Paper>

        {show && !isWallet && !loggedIn &&
          <div
            className={classes.hoverBtnDiv}
            onMouseOut={() => setShow(false)}
          >
            <CustomButton
              size="small"
              style={{ backgroundColor: '#1E3444', padding: '8px 48px' }}
            >
              Connect Wallet
            </CustomButton>
            <Typography variant="subtitle2" className={classes.hoverBtnTxt}>
              For Accessing Complete Features
            </Typography>
          </div>
        }
      </div>
    </>
  );
}

const content = [
  {
    icon: KnabDummy,
    title: 'Lipsum text',
    subTitle: 'Spend crypto, get rewards'
  },
  {
    icon: KnabDummy,
    title: 'Lipsum text',
    subTitle: 'Get Cash using your Bitcoin as collateral'
  },
  {
    icon: KnabDummy,
    title: 'Lipsum text',
    subTitle: 'Get Cash using your Bitcoin as collateral'
  }
]

// export default MoreWithCrypto;
const mapStateToProps = (state: any) => ({
  loggedIn: state.user.loggedIn,
})

export default connect(mapStateToProps, { })(MoreWithCrypto)