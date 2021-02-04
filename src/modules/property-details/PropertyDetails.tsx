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
      height: 650,
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
        <div className="displayFlex_pa01">
          <h4 className="flex_ch_01">Rental facts and features</h4>
        </div>
        <div className="displayFlex_pa01">
          <div className="displayFlex_pa01">
            <div className="displayFlex_pa01">
              <p className="flex_ch_01">
                <img src={roof} alt="" /> Roof
              </p>
              <p className="flex_ch_02">{roof1}</p>
            </div>

            <div className="displayFlex_pa01" style={{ marginLeft: '10px' }}>
              <p className="flex_ch_01">
                <img src={pool} alt="" /> Pool
              </p>
              <p className="flex_ch_02">{pool1}</p>
            </div>
          </div>
        </div>
        <div className="displayFlex_pa01">
          <div className="displayFlex_pa01">
            <div className="displayFlex_pa01">
              <p className="flex_ch_01">
                <img src={heating} alt="" /> Heating
              </p>
              <p className="flex_ch_02">{heating1}</p>
            </div>

            <div className="displayFlex_pa01" style={{ marginLeft: '10px' }}>
              <p className="flex_ch_01">
                <img src={pool} alt="" /> Pool Features
              </p>
              <p className="flex_ch_02">{pool2}</p>
            </div>
          </div>
        </div>
        <div className="displayFlex_pa01">
          <div className="displayFlex_pa01">
            <div className="displayFlex_pa01">
              <p className="flex_ch_01">
                <img src={air} alt="" /> Air Conditioning
              </p>
              <p className="flex_ch_02">{air1}</p>
            </div>

            <div className="displayFlex_pa01" style={{ marginLeft: '10px' }}>
              <p className="flex_ch_01">
                <img src={exterior} alt="" /> Exterior
              </p>
              <p className="flex_ch_02">{exterior1}</p>
            </div>
          </div>
        </div>
        <div className="displayFlex_pa01">
          <div className="displayFlex_pa01">
            <div className="displayFlex_pa01">
              <p className="flex_ch_01">
                <img src={floor} alt="" /> Floor
              </p>
              <p className="flex_ch_02">{floor1}</p>
            </div>

            <div className="displayFlex_pa01" style={{ marginLeft: '10px' }}>
              <p className="flex_ch_01">
                <img src={land} alt="" /> Landscaping
              </p>
              <p className="flex_ch_02">{land1}</p>
            </div>
          </div>
        </div>

        <div className="displayFlex_pa01">
          <div className="displayFlex_pa01">
            <div className="displayFlex_pa01">
              <p className="flex_ch_01">
                <img src={window} alt="" /> Window Covering
              </p>
              <p className="flex_ch_02">{window1}</p>
            </div>

            <div className="displayFlex_pa01" style={{ marginLeft: '10px' }}>
              <p className="flex_ch_01">
                <img src={land} alt="" /> Lot Facts
              </p>
              <p className="flex_ch_02">{lot}</p>
            </div>
          </div>
        </div>
        <div className="displayFlex_pa01">
          <div className="displayFlex_pa01">
            <div className="displayFlex_pa01">
              <p className="flex_ch_01">
                <img src={exterior} alt="" /> Exterior Features
              </p>
              <p className="flex_ch_02">{exterior2}</p>
            </div>
            <div className="displayFlex_pa01" style={{ marginLeft: '10px' }}/>
          </div>
        </div>

        <div className="displayFlex_pa01">
          <h4 className="flex_ch_01">Features</h4>
        </div>
        <div className="displayFlex_pa01">
          <div className="displayFlex_pa01">
            <div className="displayFlex_pa01">
              <p className="flex_ch_01"> Type
              </p>
              <p className="flex_ch_02">{type}</p>
            </div>

            <div className="displayFlex_pa01" style={{ marginLeft: '10px' }}>
              <p className="flex_ch_01"> Parking Spaces
              </p>
              <p className="flex_ch_02">{parking}</p>
            </div>
          </div>
        </div>

        <div className="displayFlex_pa01">
          <div className="displayFlex_pa01">
            <div className="displayFlex_pa01">
              <p className="flex_ch_01"> Style
              </p>
              <p className="flex_ch_02">{style}</p>
            </div>

            <div className="displayFlex_pa01" style={{ marginLeft: '10px' }}>
              <p className="flex_ch_01"> Fin Bsmt
              </p>
              <p className="flex_ch_02">{fin}</p>
            </div>
          </div>
        </div>

        <div className="displayFlex_pa01">
          <div className="displayFlex_pa01">
            <div className="displayFlex_pa01">
              <p className="flex_ch_01"> Year Built
              </p>
              <p className="flex_ch_02">{year}</p>
            </div>

            <div className="displayFlex_pa01" style={{ marginLeft: '10px' }}>
              <p className="flex_ch_01"> Basement
              </p>
              <p className="flex_ch_02">{bsmt}</p>
            </div>
          </div>
        </div>

        <div className="displayFlex_pa01">
          <div className="displayFlex_pa01">
            <div className="displayFlex_pa01">
              <p className="flex_ch_01"> Acres
              </p>
              <p className="flex_ch_02">{acres}</p>
            </div>

            <div className="displayFlex_pa01" style={{ marginLeft: '10px' }}>
              <p className="flex_ch_01"> Driveway
              </p>
              <p className="flex_ch_02">{driveway}</p>
            </div>
          </div>
        </div>

        <div className="displayFlex_pa01">
          <div className="displayFlex_pa01">
            <div className="displayFlex_pa01">
              <p className="flex_ch_01"> Deck
              </p>
              <p className="flex_ch_02">{deck}</p>
            </div>

            <div className="displayFlex_pa01" style={{ marginLeft: '10px' }}>
              <p className="flex_ch_01"> Water
              </p>
              <p className="flex_ch_02">{water}</p>
            </div>
          </div>
        </div>
        <div className="displayFlex_pa01">
          <div className="displayFlex_pa01">
            <div className="displayFlex_pa01">
              <p className="flex_ch_01"> Patio
              </p>
              <p className="flex_ch_02">{patio}</p>
            </div>

            <div className="displayFlex_pa01" style={{ marginLeft: '10px' }}>
              <p className="flex_ch_01"> Water Shares
              </p>
              <p className="flex_ch_02">{water1}</p>
            </div>
          </div>
        </div>
        <div className="displayFlex_pa01">
          <div className="displayFlex_pa01">
            <div className="displayFlex_pa01">
              <p className="flex_ch_01"> Garage
              </p>
              <p className="flex_ch_02">{garage}</p>
            </div>

            <div className="displayFlex_pa01" style={{ marginLeft: '10px' }}>
              <p className="flex_ch_01"> Spa
              </p>
              <p className="flex_ch_02">{spa}</p>
            </div>
          </div>
        </div>
        <div className="displayFlex_pa01">
          <div className="displayFlex_pa01">
            <div className="displayFlex_pa01">
              <p className="flex_ch_01"> Carport</p>
              <p className="flex_ch_02">{carport}</p>
            </div>

            <div className="displayFlex_pa01" style={{ marginLeft: '10px' }}>
              <p className="flex_ch_01"> Zoning</p>
              <p className="flex_ch_02">{zoning}</p>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  )
}
export default PropertyDetails
