import { Paper, makeStyles, Typography, Grid } from '@material-ui/core'
import KnabIcon from 'assets/icons/KNAB.svg'

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    position: 'relative',
  },
  root: {
    height: 'auto',
  },
  //   title: {
  //     padding: theme.spacing(2),
  //   },
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
  title: {
    color: '#C4C4C4',
    fontSize: '0.8em',
  },
  subTitle: {
    color: '##C4C4C4',
    fontWeight: 'bold',
    fontSize: '1em',
  },
}))

const ICOHoldings = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.mainDiv}>
        <Paper className={classes.root} style={{ opacity: 1 }}>
          <div>
            <Typography variant="subtitle1">&nbsp;&nbsp;&nbsp;ICO Holdings</Typography>
            <div className={classes.contentDiv}>
              <div className={classes.contentImgDiv}>
                <img src={KnabIcon} alt="" />
              </div>
              <div className={classes.contentTextDiv}>
                <Typography variant="subtitle2">KNAB</Typography>
              </div>
            </div>
            <Grid container spacing={4} style={{ padding: '38px 0px' }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Grid item md={4} xs={12}>
                KNAB Balance
                <br />
                1000.000
                <br />
                $1200.00 USDC
              </Grid>
              <Grid item md={3} xs={12}>
                Available USDC <br />
                $56872.30
              </Grid>
              <Grid item md={2} xs={12}>
                Supply of ICO <br />
                +3.57%
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    </>
  )
}

export default ICOHoldings
