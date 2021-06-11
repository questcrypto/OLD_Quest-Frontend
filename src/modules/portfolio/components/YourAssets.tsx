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
import CustomButton from './shared/Button';
import * as tableData from '../../../assets/jsons/yourAssets.json';

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
  },
  btnDiv: {
    display: 'flex',
    justifyContent: 'center',
    padding: '16px 0px'
  },
  percentText: {
    color: '#858585'
  },
  sliderRoot: {
    color: '#858585'
  },
  sliderThumb: {
    width: '0px',
    '&:hover': {
      boxShadow: 'none'
    }
  }
}))


let tableInfo = tableData.tableData;

const YourAssets = () => {

  const classes = useStyles();

  return (
    <Paper className={classes.root}>

      <Typography variant="subtitle1" className={classes.title}>
        Your Assets
        <img src={Question} alt="question" className={classes.questionImg} />
      </Typography>

      <Table className={classes.table} aria-label="simple table">

        <TableHead>
          <TableRow>
            {tableInfo && tableInfo.tableHeaders &&
              tableInfo.tableHeaders.map((header: any, index: any) => {
                return (
                  <TableCell key={index}>{header.label}</TableCell>
                )
              })
            }
            <TableCell>Chart</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tableInfo && tableInfo.tableBody &&
            tableInfo.tableBody.map((row: any, index) => {
              return (
                <TableRow key={index}>
                  { tableInfo.tableHeaders.map((item: any, ind) => {
                    return (
                      <TableCell key={ind}>
                        { item.key === 'asset' &&
                          <div className={classes.firstDiv}>
                            {/* <img src={row[item.key].icon} alt="" className={classes.iconImg} /> */}
                            <img src={KnabDummy} alt="" className={classes.iconImg} />
                            { row[item.key].name }
                          </div>
                        }
                        {
                          item.key === 'price' &&
                          <div>
                            { row[item.key].value } <br />
                            <span className={classes.percentText} >
                             +{ row[item.key].percent }%
                             </span>
                          </div>
                        }
                        {
                          item.key === 'holdings' &&
                          <div>
                            <div>
                              { row[item.key] }<br />
                              <Slider 
                                value={row[item.key]} 
                                classes={{ root: classes.sliderRoot, thumb: classes.sliderThumb }} 
                              />
                            </div>
                          </div>
                        }
                        { item.key !== 'asset' && item.key !== 'price' && item.key !== 'holdings' && 
                          row[item.key] 
                        }
                      </TableCell>
                    )
                  })}
                  <TableCell>
                    <img src={Chart} alt="" />
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>

      <div className={classes.btnDiv}>
        <CustomButton
          size="large"
          style={{ backgroundColor: '#1E3444', padding: '8px 24px' }}
        >
          View More
        </CustomButton>
      </div>

    </Paper>
  );
}

export default YourAssets;