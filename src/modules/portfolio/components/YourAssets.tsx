import {
  Paper,
  makeStyles,
  Typography,
  Slider
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Question from 'assets/icons/question.svg';
import Chart from 'assets/images/chart.png';
import KnabDummy from 'assets/icons/knab_dummy.svg';

const useStyles = makeStyles(theme => ({
  root: {
    height: 'auto',
    marginTop: theme.spacing(4)
  },
  title: {
    padding: theme.spacing(2),
    // marginBottom: theme.spacing(1)
  },
  table: {
    minWidth: 650,
  },
  questionImg: {
    width: '13px',
    height: '13px',
    paddingLeft: '6px',
    position: 'relative',
    top: '2px'
  },
  firstDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconImg: {
    paddingRight: '6px'
  }
}))

const createData = (name: string, calories: number, fat: number, carbs: number, protein: number) => {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const YourAssets = () => {

  const classes = useStyles();

  return (
    <Paper className={classes.root}>

      <Typography variant="subtitle1" className={classes.title}>
        Your Assets
        <img src={Question} alt="question" className={classes.questionImg} />
      </Typography>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell>Dessert (100g serving)</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Fat&nbsp;(g)</TableCell>
              <TableCell>Carbs&nbsp;(g)</TableCell>
              <TableCell>Protein&nbsp;(g)</TableCell> */}
              {
                tableHeaders.map((header, index) => {
                  return (
                    <TableCell key={index}>{header.label}</TableCell>
                  )
                })
              }
              <TableCell>Chart</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  <div className={classes.firstDiv}>
                    <img src={KnabDummy} alt="" className={classes.iconImg}  />
                    KNAB-USDC
                  </div>
                </TableCell>
                <TableCell>$6.76</TableCell>
                <TableCell>0.000000</TableCell>
                <TableCell>
                  $56872.80 <br /> +3.57%
                </TableCell>
                <TableCell>
                  27.80% <br />
                  <Slider value={27.8}  />
                </TableCell>
                <TableCell>
                  <img src={Chart} alt="" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Paper>
  );
}

const tableHeaders = [
  {
    key: 'asset',
    label: 'Asset'
  },
  {
    key: 'balance',
    label: 'Balance'
  },
  {
    key: 'availableQty',
    label: 'Available Qty.'
  },
  {
    key: 'price',
    label: 'Price'
  },
  {
    key: 'holdings',
    label: 'Holdings'
  }
]

export default YourAssets;