import React, { useState, useEffect } from 'react'
import ReactDataGrid from 'react-data-grid'
import axios from 'axios'
import { Paper, makeStyles, Typography, Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    position: 'relative',
  },
  root: {
    height: 'auto',
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
  title: {
    // color: '#C4C4C4',
    fontSize: '1.5em',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: '12px',
    backgroundColor: '#E1B56F',
  },
}))
const columns = [
  { key: 'id', name: 'Tranche' },
  { key: 'sales', name: 'KNAB Sales' },
  { key: 'ratio', name: 'Ratio' },
  { key: 'bonus', name: 'Bonus KNAB' },
  { key: 'total', name: 'Total KNAB' },
]

const initialRows = [
  { id: 1, sales: '10,000,000', ratio: '1.5', bonus: '5000.00', total: '15,000.00' },
  { id: 2, sales: '10,000,000', ratio: '1.4', bonus: '4000.00', total: '14,000.00' },
  { id: 3, sales: '10,000,000', ratio: '1.3', bonus: '3000.00', total: '13,000.00' },
  { id: 4, sales: '10,000,000', ratio: '1.2', bonus: '2000.00', total: '12,000.00' },
  { id: 5, sales: '10,000,000', ratio: '1.15', bonus: '15000.00', total: '11,000.00' },
  { id: 6, sales: '10,000,000', ratio: '1.15', bonus: '5000.00', total: '11,500.00' },
]

export default function RewardsGrid() {
  const classes = useStyles()
  return (
    <>
      <div className={classes.mainDiv}>
        <Paper className={classes.root} style={{ opacity: 1 }}>
          <div>
            <Typography className={classes.title}>&nbsp;&nbsp;&nbsp;Crowdsale Contract-Rewards</Typography>
            <div className="col-md-12">
              <ReactDataGrid columns={columns} rows={initialRows} />
            </div>
          </div>
        </Paper>
      </div>
    </>
  )
}
