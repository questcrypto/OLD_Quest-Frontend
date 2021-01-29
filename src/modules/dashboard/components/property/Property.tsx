import React from 'react'
import './Property.css'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Property_table from '../property-table/PropertyTable'
import Button from '@material-ui/core/Button'
import Progressbar from 'shared/progress-bar/ProgressBar'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { fade, makeStyles, Theme } from '@material-ui/core/styles'

import Pagination from '@material-ui/lab/Pagination'
import PaginationItem from '@material-ui/lab/PaginationItem'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    border: '1px solid black',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '12ch',
      },
    },
  },
}))

export default function SimpleTabs() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  const handleAddProperty = () => {
    history.push(Paths.addPropertyForm)
  }

  return (
    <div className="Property">
      <div>
        <div className="Property_progress">
          <Progressbar />
          <p style={{ color: '#302E35' }}>&nbsp;643 new properties to onboard</p>
        </div>
        <div className="Property_head">
          <h1>Properties</h1>
        </div>
      </div>
      <div className="FlexForLinks">
        <div className="Flex01ForLinks">
          <AppBar elevation={0} position="static">
            <Tabs className="Property_table" value={value} onChange={handleChange}>
              <Tab style={{ color: '#302E35', textTransform: 'none' }} label="New" {...a11yProps(0)} />
              <Tab style={{ color: '#302E35', textTransform: 'none' }} label="Published" {...a11yProps(1)} />
              <Tab style={{ color: '#302E35', textTransform: 'none' }} label="Pre-Auction" {...a11yProps(2)} />
              <Tab style={{ color: '#302E35', textTransform: 'none' }} label="On-Auction" {...a11yProps(3)} />
              <Tab style={{ color: '#302E35', textTransform: 'none' }} label="Post-Auction" {...a11yProps(4)} />
            </Tabs>
          </AppBar>
        </div>
        <div className="Flex02ForLinks" style={{ marginRight: '20px' }}>
          <div className="FlexForLinks">
            <div className="Flex01ForLinks">
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  style={{ zIndex: 1 }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            </div>
            <div className="Flex02ForLinks">
              <Button
                className="Props_button"
                variant="contained"
                style={{
                  padding: '19px',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <div
                  onClick={() => handleAddProperty()}
                  style={{
                    boxSizing: 'border-box',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: '0px',
                    left: '0px',
                    margin: 'auto',
                    paddingTop: '7px',
                  }}
                >
                  Add New Property
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <TabPanel value={value} index={0}>
        <Property_table />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Content can be added here
      </TabPanel>
      <TabPanel value={value} index={2}>
        Content can be added here
      </TabPanel>
      <TabPanel value={value} index={3}>
        Content can be added here
      </TabPanel>
      <TabPanel value={value} index={4}>
        Content can be added here
      </TabPanel>

      <div className="FlexForFlexforpaginationpa">
        {/* <Pagination count={10} /> */}
        <div className="Flexforpagination01">Showing 1 to 15 of 35 element</div>
        <div className="Flexforpagination02">
          <Pagination count={10} showFirstButton showLastButton />
        </div>
      </div>
    </div>
  )
}
