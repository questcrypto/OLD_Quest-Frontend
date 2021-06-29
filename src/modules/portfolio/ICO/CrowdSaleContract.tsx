import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { getUSDCRaised } from '../../../modules/block-chain/BlockChainMethods'

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: `${theme.spacing(4)}px ${theme.spacing(14)}px`,
    // paddingTop: theme.spacing(2),
  },
  table: {
    // minWidth: 650,
    // border: '1px solid #C4C4C4',
    borderRadius: '10px',
    width: 1140,
  },
  tableHeader: {
    fontSize: '24px',
    backgroundColor: '#E1B56F',
    padding: theme.spacing(2),
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: '15px 15px 0px 0px',
  },
  thDiv: {
    fontWeight: 'bold',
    fontSize: '18px',
    border: '1px solid #C4C4C4',
  },
  tdDiv: {
    border: '1px solid #C4C4C4',
  },
  totalDiv: {
    backgroundColor: '#1E3445',
    color: '#FFFFFF',
    // borderRadius: '0px 0px 14px 14px'
  },
  totalDivText: {
    color: '#FFFFFF',
  },
  totalDivTextSpec1: {
    color: '#FFFFFF',
    borderRadius: '0px 0px 0px 15px',
  },
  totalDivTextSpec2: {
    color: '#FFFFFF',
    borderRadius: '0px 0px 15px 0px',
  },
}))

const CrowdSaleContract = () => {
  const classes = useStyles()
  const [raisedTokens, setRaisedTokens] = useState(0)
  useEffect(() => {
    const displayRaisedTokens = async () => {
      const tokens = await getUSDCRaised()
      setRaisedTokens(tokens)
    }
    displayRaisedTokens()
  }, [])
  const tranche = Math.floor(raisedTokens / 10000000) + 1
  const tableBodyData = [
    { tranche: 1, sales: '10,000,000', bonusRatio: 1.5, bonusKNAB: '5,000,000', totalKNAB: '15,000,000' },
    { tranche: 2, sales: '10,000,000', bonusRatio: 1.4, bonusKNAB: '4,000,000', totalKNAB: '14,000,000' },
    { tranche: 3, sales: '10,000,000', bonusRatio: 1.3, bonusKNAB: '3,000,000', totalKNAB: '13,000,000' },
    { tranche: 4, sales: '10,000,000', bonusRatio: 1.2, bonusKNAB: '2,000,000', totalKNAB: '12,000,000' },
    { tranche: 5, sales: '10,000,000', bonusRatio: 1.15, bonusKNAB: '1,500,000', totalKNAB: '11,500,000' },
    { tranche: 6, sales: '10,000,000', bonusRatio: 1.15, bonusKNAB: '1,500,000', totalKNAB: '11,500,000' },
    { tranche: 7, sales: '10,000,000', bonusRatio: 1.15, bonusKNAB: '1,500,000', totalKNAB: '11,500,000' },
    { tranche: 8, sales: '10,000,000', bonusRatio: 1.15, bonusKNAB: '1,500,000', totalKNAB: '11,500,000' },
  ]
  return (
    <div className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={5} className={classes.tableHeader}>
              Crowdsale Contract - Rewards
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.thDiv}>Tranche</TableCell>
            <TableCell className={classes.thDiv}>KNAB Sales</TableCell>
            <TableCell className={classes.thDiv}>Ratio</TableCell>
            <TableCell className={classes.thDiv}>Bonus KNAB</TableCell>
            <TableCell className={classes.thDiv}>Total KNAB</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableBodyData.map((rows, key) => {
            if (tranche === rows.tranche) {
              return (
                <TableRow selected key={key}>
                  <TableCell className={classes.tdDiv}>{rows.tranche}</TableCell>
                  <TableCell className={classes.tdDiv}>{rows.sales}</TableCell>
                  <TableCell className={classes.tdDiv}>{rows.bonusRatio}</TableCell>
                  <TableCell className={classes.tdDiv}>{rows.bonusKNAB}</TableCell>
                  <TableCell className={classes.tdDiv}>{rows.totalKNAB}</TableCell>
                </TableRow>
              )
            }
            return (
              <TableRow key={key}>
                <TableCell className={classes.tdDiv}>{rows.tranche}</TableCell>
                <TableCell className={classes.tdDiv}>{rows.sales}</TableCell>
                <TableCell className={classes.tdDiv}>{rows.bonusRatio}</TableCell>
                <TableCell className={classes.tdDiv}>{rows.bonusKNAB}</TableCell>
                <TableCell className={classes.tdDiv}>{rows.totalKNAB}</TableCell>
              </TableRow>
            )
          })}
          <TableRow className={classes.totalDiv}>
            <TableCell className={classes.totalDivTextSpec1}>Totals</TableCell>
            <TableCell className={classes.totalDivText}>80,000,000</TableCell>
            <TableCell></TableCell>
            <TableCell className={classes.totalDivText}>20,000,000</TableCell>
            <TableCell className={classes.totalDivTextSpec2}>100,000,000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default CrowdSaleContract
