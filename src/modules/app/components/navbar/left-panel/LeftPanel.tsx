import React, { useState, useEffect } from 'react'
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
import CustomButton from '../../../../../modules/portfolio/components/shared/Button'
import web3modal from 'web3modal'
import { hasApplcationAccess } from 'logic/actions/user.actions'

import Web3 from 'web3'

const LeftPanel = (props: any) => {
  const classes = useStyles()
  const { userInfo, logout, openDrawer, handleDrawerClose, loggedIn, logout2, isWalletCon, walletConAddress, applicationAccess } = props
  const [account, setAccount] = useState('')

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
        // history.push('/login')
        history.push('/')
      }, 100)
    } catch (error) {
      console.log(error)
    }
  }

  function disConnectWallet() {
    window.location.reload()
    // web3.eth.accounts.wallet.remove(walletConAddress)
    // web3.eth.accounts.wallet.clear()
  }
  const setAppAccess = () => {
    hasApplcationAccess(false)
  }
  // console.log(applicationAccess, '***')
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
            {applicationAccess ? (
              <>
                <ListItem button className={classes.itemButtonStyle} onClick={() => handleProperty()}>
                  <ApartmentIcon className={classes.iconStyle} />
                  <ListItemText>Properties</ListItemText>
                </ListItem>

                <ListItem button className={classes.itemButtonStyle} onClick={() => handleAuction()}>
                  <AssessmentIcon className={classes.iconStyle} />
                  <ListItemText>Real Estate Auctions</ListItemText>
                </ListItem>
                <ListItem button className={classes.itemButtonStyle} onClick={() => handlePortfolio()}>
                  <img src={PieIcon} alt="Icon" /> &nbsp;&nbsp;&nbsp;
                  <ListItemText>Portfolio</ListItemText>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem button className={classes.itemButtonStyle} onClick={() => setAppAccess()}>
                  <ApartmentIcon className={classes.iconStyle} />
                  <ListItemText>Properties</ListItemText>
                </ListItem>
                <ListItem button className={classes.itemButtonStyle} onClick={() => setAppAccess()}>
                  <AssessmentIcon className={classes.iconStyle} />
                  <ListItemText>Real Estate Auctions</ListItemText>
                </ListItem>
                <ListItem button className={classes.itemButtonStyle} onClick={() => setAppAccess()}>
                  <img src={PieIcon} alt="Icon" /> &nbsp;&nbsp;&nbsp;
                  <ListItemText>Portfolio</ListItemText>
                </ListItem>
              </>
            )}
            {/* {loggedIn && !!userInfo && userInfo.role === 2 && ( */}
            {/* // {( */}
            {/* // )} */}

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
          {/* {isWalletCon ? (
            <Grid className={classes.signOutStyle}>
              <Divider className={classes.signOutDividerStyle} />
              <ListItem button>
                <CustomButton
                  size="large"
                  style={{ background: 'linear-gradient(180deg, #E6BA73 0%, #BA8E4D 100%)', padding: '4px 24px' }}
                  onClick={disConnectWallet}
                > */}
          {/* {dataLoading ? 'Connecting ...' : 'Connect Wallet'} */}
          {/* Disconnect Wallet
                </CustomButton>
              </ListItem>
            </Grid>
          ) : (
            ''
          )} */}
          {loggedIn ? (
            <Grid className={classes.signOutStyle}>
              <Divider className={classes.signOutDividerStyle} />
              {/* <ListItem button onClick={() => logout()}> */}
              <ListItem button onClick={logOutFn}>
                <PowerSettingsNewIcon className={classes.iconStyle} />
                <ListItemText>Sign Out</ListItemText>
              </ListItem>
            </Grid>
          ) : (
            ''
          )}

          {/* {isWalletCon ? (
            <Grid className={classes.signOutStyle}>
              <Divider className={classes.signOutDividerStyle} />
              <ListItem button>
                <CustomButton
                  size="large"
                  style={{ background: 'linear-gradient(180deg, #E6BA73 0%, #BA8E4D 100%)', padding: '4px 24px', marginBottom: '20px' }}
                  onClick={disConnectWallet}
                >
                  Disconnect Wallet
                </CustomButton>
              </ListItem>
            </Grid>
          ) : (
            ''
          )} */}

          {/* <CustomButton
            size="large"
            style={{ background: 'linear-gradient(180deg, #E6BA73 0%, #BA8E4D 100%)', padding: '4px 24px' }}
            onClick={connectWallet}
          >
            {dataLoading ? 'Connecting ...' : 'Connect Wallet'}
          </CustomButton> */}
        </Grid>
      </Drawer>
    </DrawerWrapper>
  )
}
const mapStateToProps = (state: any) => ({
  userInfo: state.user.userInfo,
  openDrawer: state.drawer.openDrawer,
  loggedIn: state.user.loggedIn,
  isWalletCon: state.user.isWalletCon,
  walletConAddress: state.user.walletConAddress,
  applicationAccess: state.user.applicationAccess,
})

export default connect(mapStateToProps, { logout, handleDrawerClose, logout2, hasApplcationAccess })(LeftPanel)
