import {
  Paper,
  makeStyles,
  Typography
} from '@material-ui/core';

import Question from 'assets/icons/question.svg';
import KnabDummy from 'assets/icons/knab_dummy.svg';

const useStyles = makeStyles(theme => ({
  root: {
    height: 'auto',
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

const MoreWithCrypto = () => {

  const classes = useStyles();

  return (
    <Paper className={classes.root}>

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
                    { item.title }
                  </Typography>
                  <Typography variant="subtitle2" className={classes.secondLineText}>
                    { item.subTitle }
                  </Typography>
                </div>
              </div>
              <div className={classes.line}></div>
            </div>
          )
        })
      }

      {/* <div className={classes.contentDiv}>
        <div className={classes.contentImgDiv}>
          <img src={KnabDummy} alt="" />
        </div>
        <div className={classes.contentTextDiv}>
          <Typography variant="subtitle2">
            Lipsum text
          </Typography>
          <Typography variant="subtitle2" className={classes.secondLineText}>
            Spend crypto, get rewards
          </Typography>
        </div>
      </div>
      <div className={classes.line}></div>

      <div className={classes.contentDiv}>
        <div className={classes.contentImgDiv}>
          <img src={KnabDummy} alt="" />
        </div>
        <div className={classes.contentTextDiv}>
          <Typography variant="subtitle2">
            Lipsum text
          </Typography>
          <Typography variant="subtitle2" className={classes.secondLineText}>
            Get Cash using your Bitcoin as collateral
          </Typography>
        </div>
      </div>
      <div className={classes.line}></div>

      <div className={classes.contentDiv}>
        <div className={classes.contentImgDiv}>
          <img src={KnabDummy} alt="" />
        </div>
        <div className={classes.contentTextDiv}>
          <Typography variant="subtitle2">
            Lipsum text
          </Typography>
          <Typography variant="subtitle2" className={classes.secondLineText}>
            Get Cash using your Bitcoin as collateral
          </Typography>
        </div>
      </div>
      <div className={classes.line}></div> */}

    </Paper>
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

export default MoreWithCrypto;