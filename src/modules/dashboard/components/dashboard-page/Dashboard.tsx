import React from 'react'
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
import Property from '../property/Property'
import Button from '@material-ui/core/Button'

import './dashboard.css'

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
        <Box p={2}>
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
const iconStyles = {
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

const DashPage = () => {
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
              <p className="logo">
                <img src="./logo.png" alt="LOGO" height="40" />{' '}
              </p>
            </div>
            <div className="wrapper_tabs">
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs"
                className={classes.tabs}
                style={{ height: '88vh' }}
              >
                <Tab
                  style={{ color: '#302E35', textTransform: 'capitalize' }}
                  {...a11yProps(0)}
                  icon={
                    <div
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        paddingLeft: '0px',
                      }}
                    >
                      <ApartmentIcon
                        style={{
                          color: '#1E3444',
                          fontSize: '22px',
                          float: 'left',
                          marginRight: '10px',
                        }}
                      />
                      Properties
                    </div>
                  }
                  aria-label="right"
                />

                <Tab
                  style={{
                    color: '#302E35',
                    marginLeft: '0px',
                    marginTop: '10px',
                    textTransform: 'capitalize',
                  }}
                  {...a11yProps(1)}
                  icon={
                    <div
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        paddingLeft: '0px',
                      }}
                    >
                      <AccountBalanceIcon
                        style={{
                          color: '#1E3444',
                          fontSize: '22px',
                          float: 'left',
                          marginRight: '10px',
                        }}
                      />
                      Treasury
                    </div>
                  }
                  aria-label="phone"
                />

                <Tab
                  style={{
                    color: '#302E35',
                    marginLeft: '0px',
                    marginTop: '10px',
                    textTransform: 'capitalize',
                  }}
                  {...a11yProps(0)}
                  icon={
                    <div
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        paddingLeft: '0px',
                      }}
                    >
                      <AssessmentIcon
                        style={{
                          color: '#1E3444',
                          fontSize: '22px',
                          float: 'left',
                          marginRight: '10px',
                        }}
                      />
                      Auctions
                    </div>
                  }
                  aria-label="Home"
                />

                <Tab
                  style={{
                    color: '#302E35',
                    marginLeft: '0px',
                    marginTop: '10px',
                    textTransform: 'capitalize',
                  }}
                  {...a11yProps(0)}
                  icon={
                    <div
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        paddingLeft: '0px',
                      }}
                    >
                      <AccountBalanceWalletIcon
                        style={{
                          color: '#1E3444',
                          fontSize: '22px',
                          float: 'left',
                          marginRight: '10px',
                        }}
                      />
                      Wallets
                    </div>
                  }
                  aria-label="Home"
                />

                <Tab
                  style={{
                    color: '#302E35',
                    marginLeft: '0px',
                    marginTop: '10px',
                    textTransform: 'capitalize',
                  }}
                  {...a11yProps(0)}
                  icon={
                    <div
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        paddingLeft: '0px',
                      }}
                    >
                      <EventIcon
                        style={{
                          color: '#1E3444',
                          fontSize: '22px',
                          float: 'left',
                          marginRight: '10px',
                        }}
                      />
                      logs
                    </div>
                  }
                  aria-label="Home"
                />

                <Tab style={{ position: 'absolute', bottom: '20px', textTransform: 'capitalize' }} aria-label="Home" {...a11yProps(0)} />
                <div className=" displayFlex01">
                  <PowerSettingsNewIcon className="Flex01 powericon" style={{ color: 'black', fontSize: '22px' }} />
                  <div className="Flex02">Sign Out</div>
                </div>
              </Tabs>
            </div>
          </div>
          <div className="wrapper_right">
            <div
              className="wrapper_right_top"
              style={{
                // background: "red",
                position: 'relative',
                height: '50px',
              }}
            >
              <Button className="wrapper_button" variant="contained" style={{ right: '3vw', position: 'absolute' }}>
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
export default DashPage
