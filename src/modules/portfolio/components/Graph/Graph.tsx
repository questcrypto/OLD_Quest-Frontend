import React from 'react'
import { Paper, makeStyles, Typography, Grid, Card, CardContent } from '@material-ui/core'
import Chart from './Chart'

import triangle from 'assets/images/upArrow.png'
const useStyles = makeStyles((theme) => ({
  mainDiv: {
    position: 'relative',
  },
  root: {
    height: 'auto',
  },
  title: {
    // color: '#C4C4C4',
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
  subTitle: {
    // color: '#C4C4C4',
    // fontWeight: 'bold',
    fontSize: '0.8em',
  },
  content: {
    marginTop: '5px',
  },
  navHeading: {
    color: '#C4C4C4',
  },
  arrowImage: {
    height: 12,
    width: 12,
  },
  arrowText: {
    color: '#C4C4C4',
    fontSize: '0.9rem',
  },
}))

export default function Graph() {
  const classes = useStyles()
  return (
    <>
      <div className={classes.mainDiv}>
        <Grid container spacing={4}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Grid item md={2} xs={12}>
            <Typography className={classes.navHeading} variant="h5">
              Overview
            </Typography>
          </Grid>
          <Grid item md={2} xs={12}>
            <Typography className={classes.navHeading} variant="h5">
              Holdings
            </Typography>
          </Grid>
        </Grid>
        <br />
        <Paper className={classes.root} style={{ opacity: 1 }}>
          <Grid container spacing={4}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Grid item md={4} xs={12}>
              <Typography className={classes.title}>Price Change Chart</Typography>
            </Grid>
            <Grid item md={2} xs={12}>
              <Typography className={classes.subTitle}>1M Change</Typography>
            </Grid>
            <Grid item md={1} xs={12}>
              <Typography className={classes.subTitle}>
                <span className={classes.arrowText}>
                  <img src={triangle} alt="" className={classes.arrowImage} />
                  2.58%
                </span>
              </Typography>
            </Grid>
            {/* <Grid item md={3} xs={12}>
              <Typography className={classes.subTitle}>Month</Typography>
            </Grid> */}
          </Grid>
          <Chart />
        </Paper>
      </div>
    </>
  )
}
