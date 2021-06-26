import { makeStyles } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

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
          <TableRow>
            <TableCell className={classes.tdDiv}>1</TableCell>
            <TableCell className={classes.tdDiv}>10,000,000</TableCell>
            <TableCell className={classes.tdDiv}>1.5</TableCell>
            <TableCell className={classes.tdDiv}>5,000,000</TableCell>
            <TableCell className={classes.tdDiv}>15,000,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tdDiv}>2</TableCell>
            <TableCell className={classes.tdDiv}>10,000,000</TableCell>
            <TableCell className={classes.tdDiv}>1.4</TableCell>
            <TableCell className={classes.tdDiv}>4,000,000</TableCell>
            <TableCell className={classes.tdDiv}>14,000,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tdDiv}>3</TableCell>
            <TableCell className={classes.tdDiv}>10,000,000</TableCell>
            <TableCell className={classes.tdDiv}>1.3</TableCell>
            <TableCell className={classes.tdDiv}>3,000,000</TableCell>
            <TableCell className={classes.tdDiv}>13,000,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tdDiv}>4</TableCell>
            <TableCell className={classes.tdDiv}>10,000,000</TableCell>
            <TableCell className={classes.tdDiv}>1.2</TableCell>
            <TableCell className={classes.tdDiv}>2,000,000</TableCell>
            <TableCell className={classes.tdDiv}>12,000,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tdDiv}>5</TableCell>
            <TableCell className={classes.tdDiv}>10,000,000</TableCell>
            <TableCell className={classes.tdDiv}>1.15</TableCell>
            <TableCell className={classes.tdDiv}>1,500,000</TableCell>
            <TableCell className={classes.tdDiv}>11,500,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tdDiv}>6</TableCell>
            <TableCell className={classes.tdDiv}>10,000,000</TableCell>
            <TableCell className={classes.tdDiv}>1.15</TableCell>
            <TableCell className={classes.tdDiv}>1,500,000</TableCell>
            <TableCell className={classes.tdDiv}>11,500,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tdDiv}>7</TableCell>
            <TableCell className={classes.tdDiv}>10,000,000</TableCell>
            <TableCell className={classes.tdDiv}>1.15</TableCell>
            <TableCell className={classes.tdDiv}>1,500,000</TableCell>
            <TableCell className={classes.tdDiv}>11,500,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tdDiv}>8</TableCell>
            <TableCell className={classes.tdDiv}>10,000,000</TableCell>
            <TableCell className={classes.tdDiv}>1.15</TableCell>
            <TableCell className={classes.tdDiv}>1,500,000</TableCell>
            <TableCell className={classes.tdDiv}>11,500,000</TableCell>
          </TableRow>
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
