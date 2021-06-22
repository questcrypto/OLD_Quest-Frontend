import { Paper, makeStyles, Typography, Grid, Slider } from '@material-ui/core'
// import KnabIcon from 'assets/icons/KNAB.svg'
import { StyledSlider, SliderWrap } from './style'

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

const RaisedTokens = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.mainDiv}>
        <Paper className={classes.root} style={{ opacity: 1 }}>
          <div>
            <Typography variant="subtitle1">&nbsp;&nbsp;&nbsp;Raised Tokens</Typography>
            <SliderWrap>
              <StyledSlider
                value={0}
                // onChange={(e: any, val: any) => handleEquityValue(e, val)}
                // valueLabelFormat={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="on"
                step={0.01}
                min={0}
                max={100}
              />
            </SliderWrap>
            <Grid container spacing={4} style={{ padding: '38px 0px' }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Grid item md={4} xs={12}>
                Current Bonus Ratio
                <br />
                1.5
                <br />
                Contributors can recieve
              </Grid>
              <Grid item md={7} xs={12}>
                The ICO ends in <br />
                56 : 04: 56 : 49
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    </>
  )
}

export default RaisedTokens
