import React from 'react'
import './Landing_page.css'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import ApartmentIcon from '@material-ui/icons/Apartment'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import AssessmentIcon from '@material-ui/icons/Assessment'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import EventIcon from '@material-ui/icons/Event'
import AdjustIcon from '@material-ui/icons/Adjust'
import Property from '../Property/Property'
import Button from '@material-ui/core/Button'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}
let iconStyles = {
  fontSize: '36px',
  color: '#12005e',
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  tabs: {
    borderLeft: `0px solid ${theme.palette.divider}`,
  },
}))

const LandingPage = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }
  return (
    <div className="main">
      <div className="wrapper">
        <div className={classes.root}>
          <div className="wrapper_left">
            <div className="wrapper_topicon">
              <p className="logo">Strategic Land</p>
            </div>
            <div className="wrapper_tabs">
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
              >
                <Tab
                  style={{ color: '#302E35;' }}
                  icon={<ApartmentIcon style={{ color: '#1E3444' }} />}
                  label="Properties"
                  aria-label="right"
                  {...a11yProps(0)}
                />
                <Tab
                  style={{ color: '#302E35;' }}
                  icon={<AccountBalanceIcon style={{ color: '#1E3444' }} />}
                  label="Treasury"
                  aria-label="phone"
                  {...a11yProps(1)}
                />
                <Tab
                  style={{ color: '#302E35;' }}
                  icon={<AssessmentIcon style={{ color: '#1E3444' }} />}
                  label="Auctions"
                  aria-label="Home"
                  {...a11yProps(0)}
                />
                <Tab
                  style={{ color: '#302E35;' }}
                  icon={<AccountBalanceWalletIcon style={{ color: '#1E3444' }} />}
                  label="Wallets"
                  aria-label="Home"
                  {...a11yProps(0)}
                />
                <Tab
                  style={{ color: '#302E35;' }}
                  icon={<EventIcon style={{ color: '#1E3444' }} />}
                  label="Chat"
                  aria-label="Home"
                  {...a11yProps(0)}
                />
              </Tabs>
            </div>
            <div className="wrapper_logout">
              <PowerSettingsNewIcon style={{ color: 'black' }} />
            </div>
          </div>
          <div className="wrapper_right">
            <div className="wrapper_right_top">
              <Button className="wrapper_button" variant="contained">
                Connect Wallet
              </Button>
            </div>
            <TabPanel value={value} index={0}>
              <Property />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <h1>Add Content here</h1>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <h1>Add Content here</h1>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <h1>Add Content here</h1>
            </TabPanel>
            <TabPanel value={value} index={4}>
              <h1>Add Content here</h1>
            </TabPanel>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LandingPage
