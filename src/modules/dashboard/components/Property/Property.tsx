import React from 'react'
import './Property.css'
import { makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Property_table from '../property-table/PropertyTable'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import BackupIcon from '@material-ui/icons/Backup'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import Progressbar from 'shared/progress-bar/ProgressBar'

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
        <Box p={3}>
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}))

export default function SimpleTabs() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div className="Property">
      <div>
        <div className="Property_progress">
          <Progressbar />
          <p style={{ color: '#302E35' }}> &nbsp;643 new properties to onboard</p>
        </div>
        <div className="Property_head">
          <h1>Properties</h1>
          <div className="Props_search">
            <form className="Props_form">
              <input className="Props_input" type="text" placeholder="Search by Username" name="search2" />
              <Button className="Props_searchicon" variant="contained" color="primary">
                <SearchIcon />
              </Button>
            </form>
          </div>
          <Button className="Props_button" variant="contained">
            Add New Property
          </Button>
        </div>
      </div>
      <AppBar elevation={0} position="static">
        <Tabs className="Property_table" value={value} onChange={handleChange} aria-label="phone">
          <Tab style={{ color: '#302E35' }} label="New" {...a11yProps(0)} />
          <Tab style={{ color: '#302E35' }} label="Published" {...a11yProps(1)} />
          <Tab style={{ color: '#302E35' }} label="Pre-Auction" {...a11yProps(2)} />
          <Tab style={{ color: '#302E35' }} label="On-Auction" {...a11yProps(3)} />
          <Tab style={{ color: '#302E35' }} label="Post-Auction" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
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
    </div>
  )
}
