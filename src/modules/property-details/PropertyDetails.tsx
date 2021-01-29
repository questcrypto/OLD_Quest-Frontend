import React from 'react'
import { makeStyles, createStyles, Theme, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import DescriptionIcon from '@material-ui/icons/Description'
import { Box, Button, Container, Tab } from '@material-ui/core'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { spacing } from '@material-ui/system'
import MuiButton from '@material-ui/core/Button'
import plot from 'assets/images/plot.png'
import coin from 'assets/images/coin.png'
import pdf from 'assets/images/pdf.svg'
import files from 'assets/images/files.svg'
import roof from 'assets/images/roof.png'
import pool from 'assets/images/pool.png'
import heating from 'assets/images/heating.png'
import exterior from 'assets/images/exterior.png'
import land from 'assets/images/land.png'
import floor from 'assets/images/floor.png'
import air from 'assets/images/air.png'
import window from 'assets/images/window.png'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 1010,
      marginTop: 100,
      height: 600,
    },

    image: {
      width: 511,
      height: 385,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    table: {
      minWidth: 650,
    },
  })
)

function createData(name: string, features: string, name2: string, features2: string) {
  return { name, features, name2, features2 }
}

const rows = [
  createData('Roof', 'Asphault Shingle', 'Pool', 'Yes'),
  createData('Heating', 'Forced Air', 'Pool Features', 'Heated,filters'),
  createData('Air Conditioning', 'Central', 'Exterior ', 'Yes'),
  createData('Floor', 'Hardwood,Carpet', 'Landscaping', 'Brick'),
  createData('Window Covering', 'None', 'Lot Facts', '.25 Acre'),
  createData('Exterior Features', 'Brick', '-', '-'),
  // createData('Pool', 'Yes'),
  // createData('Pool Features', 'Heated,filters'),
  // createData('Exterior ', 'Yes'),
  // createData('Landscaping', 'Brick'),
  // createData('Lot Facts', '.25 Acre'),
]
const rows1 = [
  createData('Type', 'SFR', 'Parking Spaces', '3'),
  createData('Style', 'Rambler', 'Fin Bsmt', '95%'),
  createData('Year Built', '1977', 'Basement', 'Yes'),
  createData('Acres', '0.25', 'Driveway', 'Yes'),
  createData('Deck', 'Yes', 'Water Shares', 'None'),
  createData('Patio', 'Yes', 'Spa', 'None'),
  createData('Garage', '2 Car', 'Zoning', 'Residential'),
  createData('Carport', 'No', '-', '-'),
  // createData('Parking Spaces', '3'),
  // createData('Fin Bsmt', '95%'),
  // createData('Basement', 'Yes'),
  // createData('Driveway', 'Yes'),
  // createData('Water Shares', 'None'),
  // createData('Spa', 'None'),
  // createData('Zoning', 'Residential'),
]

const PropertyDetails = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src="https://i.pinimg.com/564x/c9/aa/f8/c9aaf8853557c381c80ee827db0dad64.jpg" />
            </ButtonBase>
            <Box m={2} />
            <Typography variant="body2" color="textSecondary">
              More Images
            </Typography>
            <Box m={2} />
            <Grid>
              <Grid container spacing={1}>
                <Paper>
                  <Box p={6} width="1rem" />
                </Paper>
                <Box m={1} />
                <Paper>
                  <Box p={6} width="1rem" />
                </Paper>
                <Box m={1} />
                <Paper>
                  <Box p={6} width="1rem" />
                </Paper>
                <Box m={1} />
                <Paper>
                  <Box p={6} width="1rem" />
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  1901 Thornridge Cir.
                </Typography>
                <Typography variant="body2" gutterBottom>
                  1228,Los Angeles, CA
                </Typography>
                <Box m={3} />
                <Typography variant="body2" color="textSecondary">
                  <img src={plot} alt="" /> 190 m2
                  <img src={coin} alt="" /> $ 23,500.00
                </Typography>
                <Box m={3} />
                <Typography variant="body2" color="textSecondary">
                  Central Valley Home In Taylorsville with a large backyard pool. Completely remodeled in 2016 everything up to date. 6
                  Bedrooms and 2 Full bathrooms. Living Room and Downstairs family room laundry room etc… and a true 2 car garage.
                </Typography>
                <Box m={3} />
                <Typography gutterBottom variant="subtitle1">
                  Documents uploads
                </Typography>
                <Box m={3} />
                <Grid>
                  <Grid container spacing={1}>
                    <Paper>
                      <Box p={1} width="5rem" height="1rem" />
                      <img
                        src={files}
                        alt="files"
                        height="50px"
                        width="50px"
                        style={{
                          color: '#1E3444',
                          marginLeft: '25px',
                          marginBottom: '25px',
                        }}
                      />
                    </Paper>
                    <Box m={1} />
                    <Paper>
                      <Box p={1} width="5rem" height="1rem" />
                      <img
                        src={pdf}
                        alt="pdf"
                        height="50px"
                        width="50px"
                        style={{
                          color: '#1E3444',
                          marginLeft: '25px',
                          marginBottom: '25px',
                        }}
                      />
                    </Paper>
                    <Box m={1} />
                    <Paper>
                      <Box p={1} width="5rem" height="1rem" />
                      <img
                        src={files}
                        alt="files"
                        height="50px"
                        width="50px"
                        style={{
                          color: '#1E3444',
                          marginLeft: '25px',
                          marginBottom: '25px',
                        }}
                      />
                    </Paper>
                    <Box m={1} />
                    <Paper>
                      <Box p={1} width="5rem" height="1rem" />
                      <img
                        src={pdf}
                        alt="pdf"
                        height="50px"
                        width="50px"
                        style={{
                          color: '#1E3444',
                          marginLeft: '25px',
                          marginBottom: '25px',
                        }}
                      />
                    </Paper>
                    Property <br />
                    verified
                  </Grid>
                </Grid>
                <Box m={12} />
                <Button
                  variant="outlined"
                  style={{
                    color: '#E0E0E0;',
                    marginLeft: '10px',
                    backgroundColor: '#E0E0E0',
                  }}
                >
                  LIVE AUCTION
                </Button>
                <Button
                  variant="outlined"
                  style={{
                    color: '#E0E0E0;',
                    marginLeft: '10px',
                    backgroundColor: '#E0E0E0',
                  }}
                >
                  Button text
                </Button>
                <Button
                  variant="outlined"
                  style={{
                    color: '#F2F2F2',
                    marginLeft: '10px',
                    backgroundColor: '#1E3444',
                  }}
                >
                  Button text
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="body2" gutterBottom>
                EDIT <CreateOutlinedIcon style={{ color: '#1E3444', fontSize: 'medium' }} />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Paper className={classes.paper}>
        {/* <Grid container>
          <Grid item xs={12}>
            <Paper>Rental facts and features</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <img src={roof} alt="roof"></img> Roof
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <img src={pool} alt="pool"></img> Pool
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <img src={heating} alt="heating"></img> Heating
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <img src={pool} alt="pool"></img> Pool Features
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <img src={air} alt="air"></img> Air Conditioning
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <img src={exterior} alt="exterior"></img> Exterior
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <img src={floor} alt="floor"></img> Floor
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <img src={land} alt="land"></img> Landscaping
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <img src={window} alt="window"></img> Window Covering
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <img src={land} alt="land"></img> Lot Facts
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <img src={exterior} alt="exterior"></img> Exterior Features
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>Features</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>Type</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>Parking Spaces</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>Style</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>Fin Bsmt</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>Year Built</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>Basement</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>Acres</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>Driveway</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>Deck</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>Water</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>Patio</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>Water Shares</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>Garage</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>Spa</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>Carport</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>Zoning</Paper>
          </Grid>
        </Grid> */}

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Rental facts and features</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.features}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.features}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Features</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows1.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.features}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.features}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}
export default PropertyDetails
