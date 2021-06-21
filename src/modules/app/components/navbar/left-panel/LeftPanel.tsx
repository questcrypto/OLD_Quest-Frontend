import React from 'react'
import { connect } from 'react-redux'
import { logout, logout2 } from 'logic/actions/user.actions'
import { useStyles, QuestLogoCont, ListItemText } from './style'
import Grid from '@material-ui/core/Grid'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ApartmentIcon from '@material-ui/icons/Apartment'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import AssessmentIcon from '@material-ui/icons/Assessment'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import EventIcon from '@material-ui/icons/Event'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import QuestLogo from 'assets/images/questFullLogo.svg'
import history from 'modules/app/components/history'
import { Paths } from 'modules/app/components/routes/types'
import { DrawerWrapper } from './style'
import { IconButton } from '@material-ui/core'
import { handleDrawerClose } from 'logic/actions/drawer.open'
import { Close } from '@material-ui/icons'
// import questLogo from 'assets/images/questLoginLogo.png';
import questLogo from 'assets/images/questDashboardLogo.svg'
import PieIcon from 'assets/icons/pieIcon.svg'

const LeftPanel = (props: any) => {
  const classes = useStyles()
  const { userInfo, logout, openDrawer, handleDrawerClose, loggedIn, logout2 } = props

  const handleProperty = () => {
    if (loggedIn) {
      history.push(Paths.dashboard)
    } else {
      logout(false)
      history.push(Paths.login)
    }
  }
  const handleAuction = () => {
    // if (loggedIn && !!userInfo && userInfo.role === 2) {
    // history.push(Paths.auction)
    // } else {
    //   logout(false)
    // history.push(Paths.login)
    // }
    if (loggedIn) {
      history.push(Paths.auction)
    } else {
      logout(false)
      history.push(Paths.login)
    }
  }

  const handlePortfolio = () => {
    try {
      history.push(Paths.portfolio)
    } catch (error) {
      console.log(error)
    }
  }

  const logOutFn = () => {
    try {
      logout(false)
      // logout2(false);
      setTimeout(() => {
        history.push('/login')
      }, 100)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    //@ts-ignore
    <DrawerWrapper open={openDrawer}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <IconButton className={classes.closeDrawerBtn} onClick={() => handleDrawerClose()}>
          <Close />
        </IconButton>

        <Grid className={classes.root}>
          <QuestLogoCont>
            {/* <img src={QuestLogo} alt="" /> */}
            <img src={questLogo} alt="" />
          </QuestLogoCont>
          <Divider className={classes.dividerStyle} />
          <List>
            {/* {!!userInfo && loggedIn && */}
            {
              <ListItem button className={classes.itemButtonStyle} onClick={() => handleProperty()}>
                <ApartmentIcon className={classes.iconStyle} />
                <ListItemText>Properties</ListItemText>
              </ListItem>
            }
            {/* {loggedIn && !!userInfo && userInfo.role === 2 && ( */}
            {/* // {( */}
            <ListItem button className={classes.itemButtonStyle} onClick={() => handleAuction()}>
              <AssessmentIcon className={classes.iconStyle} />
              <ListItemText>Real Estate Auctions</ListItemText>
            </ListItem>
            {/* // )} */}
            <ListItem button className={classes.itemButtonStyle} onClick={() => handlePortfolio()}>
              <img src={PieIcon} alt="Icon" /> &nbsp;&nbsp;&nbsp;
              <ListItemText>Portfolio</ListItemText>
            </ListItem>
            {loggedIn && !!userInfo && userInfo.role !== 2 && (
              <>
                <ListItem button className={classes.itemButtonStyle}>
                  <AccountBalanceIcon className={classes.iconStyle} />
                  <ListItemText>Treasury</ListItemText>
                </ListItem>
                <ListItem button className={classes.itemButtonStyle}>
                  <AccountBalanceWalletIcon className={classes.iconStyle} />
                  <ListItemText>Wallets</ListItemText>
                </ListItem>
                <ListItem button className={classes.itemButtonStyle}>
                  <EventIcon className={classes.iconStyle} />
                  <ListItemText>Logs</ListItemText>
                </ListItem>
              </>
            )}
          </List>
          {/* <Grid className={classes.signOutStyle}>
            <Divider className={classes.signOutDividerStyle} /> */}
          {/* <ListItem button onClick={() => logout()}> */}
          {/* <ListItem button onClick={logOutFn}>
              <PowerSettingsNewIcon className={classes.iconStyle} />
              <ListItemText> */}
          {/* Disconnect */}
          {/* Sign Out
              </ListItemText>
            </ListItem>
          </Grid> */}
        </Grid>
      </Drawer>
    </DrawerWrapper>
  )
}
const mapStateToProps = (state: any) => ({
  userInfo: state.user.userInfo,
  openDrawer: state.drawer.openDrawer,
  loggedIn: state.user.loggedIn,
})

export default connect(mapStateToProps, { logout, handleDrawerClose, logout2 })(LeftPanel)
