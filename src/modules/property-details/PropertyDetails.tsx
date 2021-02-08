import React, { useState } from 'react'
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
import roof from 'assets/images/roof.svg'
import pool from 'assets/images/pool.png'
import heating from 'assets/images/heating.png'
import air from 'assets/images/air.png'
import exterior from 'assets/images/exterior.png'
import floor from 'assets/images/floor.png'
import land from 'assets/images/land.png'
import window from 'assets/images/window.png'

import { SpaceBarSharp } from '@material-ui/icons'
import { useStyles }  from './style'

const PropertyDetails = () => {
  const classes = useStyles()

  const [roof1, setroof] = useState('Asphault Shingle')
  const [pool1, setpool] = useState('Yes')
  const [heating1, setheating1] = useState('Forced air')
  const [pool2, setpool1] = useState('Heated Features')
  const [air1, setair1] = useState('Central')
  const [exterior1, setexterior1] = useState('Brick 70%')
  const [floor1, setfloor1] = useState('Hardwood,Carpet')
  const [land1, setland1] = useState('Yes')
  const [window1, setwindow1] = useState('None')
  const [lot, setlot] = useState('25 Acre')
  const [exterior2, setexterior2] = useState('Brick')
  const [type, settype] = useState('SFR')
  const [parking, setparking] = useState('3')
  const [style, setstyle] = useState('Rambler')
  const [fin, setfin] = useState('95%')
  const [year, setyear] = useState('1997')
  const [bsmt, setbsmt] = useState('Yes')
  const [acres, setacres] = useState('0.25')
  const [driveway, setdriveway] = useState('Yes')
  const [deck, setdeck] = useState('Yes')
  const [water, setwater] = useState('City')
  const [patio, setpatio] = useState('Yes')
  const [water1, setwater1] = useState('None')
  const [garage, setgarage] = useState('2 Car')
  const [spa, setspa] = useState('None')
  const [carport, setcarport] = useState('No')
  const [zoning, setzoning] = useState('Residential')


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
        <div  className={classes.features}>
          <h4  className={classes.feature1}>Rental facts and features</h4>
        </div>
        <div  className={classes.features}>
          <div  className={classes.features}>
            <div  className={classes.features}>
              <p  className={classes.feature1}>
                <img src={roof} alt="" /> Roof
              </p>
              <p  className={classes.feature2}>{roof1}</p>
            </div>

            <div  className={classes.features} style={{ marginLeft: '10px' }}>
              <p  className={classes.feature1}>
                <img src={pool} alt="" /> Pool
              </p>
              <p  className={classes.feature2}>{pool1}</p>
            </div>
          </div>
        </div>
        <div  className={classes.features}>
          <div  className={classes.features}>
            <div  className={classes.features}>
              <p  className={classes.feature1}>
                <img src={heating} alt="" /> Heating
              </p>
              <p  className={classes.feature2}>{heating1}</p>
            </div>

            <div  className={classes.features} style={{ marginLeft: '10px' }}>
              <p  className={classes.feature1}>
                <img src={pool} alt="" /> Pool Features
              </p>
              <p  className={classes.feature2}>{pool2}</p>
            </div>
          </div>
        </div>
        <div  className={classes.features}>
          <div  className={classes.features}>
            <div  className={classes.features}>
              <p  className={classes.feature1}>
                <img src={air} alt="" /> Air Conditioning
              </p>
              <p  className={classes.feature2}>{air1}</p>
            </div>

            <div  className={classes.features} style={{ marginLeft: '10px' }}>
              <p  className={classes.feature1}>
                <img src={exterior} alt="" /> Exterior
              </p>
              <p  className={classes.feature2}>{exterior1}</p>
            </div>
          </div>
        </div>
        <div  className={classes.features}>
          <div  className={classes.features}>
            <div  className={classes.features}>
              <p  className={classes.feature1}>
                <img src={floor} alt="" /> Floor
              </p>
              <p  className={classes.feature2}>{floor1}</p>
            </div>

            <div  className={classes.features} style={{ marginLeft: '10px' }}>
              <p  className={classes.feature1}>
                <img src={land} alt="" /> Landscaping
              </p>
              <p  className={classes.feature2}>{land1}</p>
            </div>
          </div>
        </div>

        <div  className={classes.features}>
          <div  className={classes.features}>
            <div  className={classes.features}>
              <p  className={classes.feature1}>
                <img src={window} alt="" /> Window Covering
              </p>
              <p  className={classes.feature2}>{window1}</p>
            </div>

            <div  className={classes.features} style={{ marginLeft: '10px' }}>
              <p  className={classes.feature1}>
                <img src={land} alt="" /> Lot Facts
              </p>
              <p  className={classes.feature2}>{lot}</p>
            </div>
          </div>
        </div>
        <div  className={classes.features}>
          <div  className={classes.features}>
            <div  className={classes.features}>
              <p  className={classes.feature1}>
                <img src={exterior} alt="" /> Exterior Features
              </p>
              <p  className={classes.feature2}>{exterior2}</p>
            </div>
            <div  className={classes.features} style={{ marginLeft: '10px' }}/>
          </div>
        </div>

        <div  className={classes.features}>
          <h4  className={classes.feature1}>Features</h4>
        </div>
        <div  className={classes.features}>
          <div  className={classes.features}>
            <div  className={classes.features}>
              <p  className={classes.feature1}> Type
              </p>
              <p  className={classes.feature2}>{type}</p>
            </div>

            <div  className={classes.features} style={{ marginLeft: '10px' }}>
              <p  className={classes.feature1}> Parking Spaces
              </p>
              <p  className={classes.feature2}>{parking}</p>
            </div>
          </div>
        </div>

        <div  className={classes.features}>
          <div  className={classes.features}>
            <div  className={classes.features}>
              <p  className={classes.feature1}> Style
              </p>
              <p  className={classes.feature2}>{style}</p>
            </div>

            <div  className={classes.features} style={{ marginLeft: '10px' }}>
              <p  className={classes.feature1}> Fin Bsmt
              </p>
              <p  className={classes.feature2}>{fin}</p>
            </div>
          </div>
        </div>

        <div  className={classes.features}>
          <div  className={classes.features}>
            <div  className={classes.features}>
              <p  className={classes.feature1}> Year Built
              </p>
              <p  className={classes.feature2}>{year}</p>
            </div>

            <div  className={classes.features} style={{ marginLeft: '10px' }}>
              <p  className={classes.feature1}> Basement
              </p>
              <p  className={classes.feature2}>{bsmt}</p>
            </div>
          </div>
        </div>

        <div  className={classes.features}>
          <div  className={classes.features}>
            <div  className={classes.features}>
              <p  className={classes.feature1}> Acres
              </p>
              <p  className={classes.feature2}>{acres}</p>
            </div>

            <div  className={classes.features} style={{ marginLeft: '10px' }}>
              <p  className={classes.feature1}> Driveway
              </p>
              <p  className={classes.feature2}>{driveway}</p>
            </div>
          </div>
        </div>

        <div  className={classes.features}>
          <div  className={classes.features}>
            <div  className={classes.features}>
              <p  className={classes.feature1}> Deck
              </p>
              <p  className={classes.feature2}>{deck}</p>
            </div>

            <div  className={classes.features} style={{ marginLeft: '10px' }}>
              <p  className={classes.feature1}> Water
              </p>
              <p  className={classes.feature2}>{water}</p>
            </div>
          </div>
        </div>
        <div  className={classes.features}>
          <div  className={classes.features}>
            <div  className={classes.features}>
              <p  className={classes.feature1}> Patio
              </p>
              <p  className={classes.feature2}>{patio}</p>
            </div>

            <div  className={classes.features} style={{ marginLeft: '10px' }}>
              <p  className={classes.feature1}> Water Shares
              </p>
              <p  className={classes.feature2}>{water1}</p>
            </div>
          </div>
        </div>
        <div  className={classes.features}>
          <div  className={classes.features}>
            <div  className={classes.features}>
              <p  className={classes.feature1}> Garage
              </p>
              <p  className={classes.feature2}>{garage}</p>
            </div>

            <div  className={classes.features} style={{ marginLeft: '10px' }}>
              <p  className={classes.feature1}> Spa
              </p>
              <p  className={classes.feature2}>{spa}</p>
            </div>
          </div>
        </div>
        <div  className={classes.features}>
          <div  className={classes.features}>
            <div  className={classes.features}>
              <p  className={classes.feature1}> Carport</p>
              <p  className={classes.feature2}>{carport}</p>
            </div>

            <div  className={classes.features} style={{ marginLeft: '10px' }}>
              <p  className={classes.feature1}> Zoning</p>
              <p  className={classes.feature2}>{zoning}</p>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  )
}
export default PropertyDetails
