import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
// import axios from 'axios'
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
// import QuestLogo from 'assets/images/questFullLogo.svg'
import history from 'modules/app/components/history'
import { Paths } from 'modules/app/components/routes/types'
import { DrawerWrapper } from './style'
import { IconButton } from '@material-ui/core'
import { handleDrawerClose } from 'logic/actions/drawer.open'
import { Close } from '@material-ui/icons'
// import questLogo from 'assets/images/questLoginLogo.png';
import questLogo from 'assets/images/questDashboardLogo.svg'
import PieIcon from 'assets/icons/pieIcon.svg'
// import CustomButton from '../../../../../modules/portfolio/components/shared/Button'
// import web3modal from 'web3modal'
// import { hasApplcationAccess } from 'logic/actions/user.actions'

// import Web3 from 'web3'
// import IPBlockingModal from 'modules/portfolio/IPBlocking/IPBlockingModal'
import CustomModal from 'shared/custom-modal'
import SignUpModal from 'shared/components/signup-modal'
import { openLoginModal, closeLoginModal } from 'logic/actions/user.actions'

const LeftPanel = (props: any) => {

  const [show, setShow] = useState(true)

  const toggleModal = () => {
    try {
      // setShow(false)
      closeLoginModal();
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // openLoginModal()
  }, [])

  const classes = useStyles()
  // const { userInfo, logout, openDrawer, handleDrawerClose, loggedIn, logout2, isWalletCon, walletConAddress, applicationAccess } = props
  const { userInfo, logout, openDrawer, handleDrawerClose, loggedIn, openLoginModal, closeLoginModal,
    user: { loginModal } } = props
  // const [account, setAccount] = useState('')
  const [appAccess, setApplicationAccess] = useState(true)
  // const [showIPBlockingModal, setIPBlockingModal] = useState(false)
  // const blockedCountriesCodes = ['US', 'AL', 'BA', 'BY', 'CD', 'CI', 'UA', 'CU', 'IQ', 'IR', 'KP', 'LR', 'MK', 'MM', 'RS', 'SD', 'SY', 'ZW']

  // useEffect(() => {
  //   axios
  //     // .get('https://api.ipify.org')
  //     .get('https://ipapi.co/json/')
  //     .then((response) => {
  //       // console.log(response.data.country_code, '***')
  //       const isFrom = blockedCountriesCodes.includes(response.data.country_code)
  //       if (isFrom) {
  //         setApplicationAccess(false)
  //         hasApplcationAccess(false)
  //         //@ts-ignore
  //         // localStorage.setItem('access', false)
  //       } else {
  //         setApplicationAccess(true)
  //         hasApplcationAccess(true)
  //         //@ts-ignore
  //         // localStorage.setItem('access', true)
  //       }
  //     })
  //     .catch((err) => console.log(err))
  // })
  const handleProperty = () => {
    if (loggedIn) {
      history.push(Paths.root)
    } else {
      history.push(Paths.dashboard)
    }
    // if (loggedIn) {
    //   history.push(Paths.dashboard)
    // } else {
    //   logout(false)
    //   history.push(Paths.login)
    // }
  }
  const handleAuction = () => {

    if (loggedIn) {
      history.push(Paths.auction)
    } else {
      openLoginModal();
    }

    // if (loggedIn) {
    //   history.push(Paths.auction)
    // } else {
    //   logout(false)
    //   history.push(Paths.login)
    // }
    // if (loggedIn && !!userInfo && userInfo.role === 2) {
    // history.push(Paths.auction)
    // } else {
    //   logout(false)
    // history.push(Paths.login)
    // }
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
        window.location.reload();
      }, 100)
    } catch (error) {
      console.log(error)
    }
  }

  const signInFn = () => {
    try {
      openLoginModal();
    } catch (error) { console.log(error) }
  }

  // const handleBlocking = () => {
  //   try {
  //     setIPBlockingModal(true)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // const toggleIPBLockingModal = () => {
  //   try {
  //     setIPBlockingModal(false)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
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
          <QuestLogoCont onClick={() => window.open(Paths.portfolio, '_self')}>
            {/* <img src={QuestLogo} alt="" /> */}
            <img src={questLogo} alt="" />
          </QuestLogoCont>
          <Divider className={classes.dividerStyle} />
          <List>
            <ListItem
              button
              className={classes.itemButtonStyle}
              // onClick={props.applicationAccess ? handleProperty : handleBlocking}
              onClick={() => handleProperty()}
            >
              <ApartmentIcon className={classes.iconStyle} />
              <ListItemText>Properties</ListItemText>
            </ListItem>
            <ListItem
              button
              className={classes.itemButtonStyle}
              // onClick={props.applicationAccess ? () => handleAuction() : handleBlocking}
              onClick={() => handleAuction()}
            >
              <AssessmentIcon className={classes.iconStyle} />
              <ListItemText>Real&nbsp;Estate Auctions</ListItemText>
            </ListItem>
            <ListItem
              button
              className={classes.itemButtonStyle}
              // onClick={props.applicationAccess ? () => handlePortfolio() : handleBlocking}
              onClick={() => handlePortfolio()}
            >
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
          {loggedIn && (
            <Grid className={classes.signOutStyle}>
              <Divider className={classes.signOutDividerStyle} />
              {/* <ListItem button onClick={() => logout()}> */}
              <ListItem button onClick={logOutFn}>
                <PowerSettingsNewIcon className={classes.iconStyle} />
                <ListItemText>Sign Out</ListItemText>
              </ListItem>
            </Grid>
          )}
          {/* {!loggedIn && (
            <Grid className={classes.signOutStyle}>
              <Divider className={classes.signOutDividerStyle} />
              <ListItem button onClick={signInFn}>
                <PowerSettingsNewIcon className={classes.iconStyle} />
                <ListItemText>Sign In</ListItemText>
              </ListItem>
            </Grid>
          )} */}

          {/* {isWalletCon && (
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
          )} */}
        </Grid>
      </Drawer>
      {/* <IPBlockingModal
          show={showIPBlockingModal}
          toggleModal={toggleIPBLockingModal}
          onClose={toggleIPBLockingModal}
          hasAccess={appAccess}
        /> */}
      <CustomModal
        // show={show}
        // toggleModal={toggleModal}
        show={loginModal}
        toggleModal={toggleModal}
      >
        <SignUpModal
          toggle={toggleModal}
        />
      </CustomModal>
    </DrawerWrapper>
  )
}
const mapStateToProps = (state: any) => ({
  userInfo: state.user.userInfo,
  openDrawer: state.drawer.openDrawer,
  loggedIn: state.user.loggedIn,
  isWalletCon: state.user.isWalletCon,
  walletConAddress: state.user.walletConAddress,
  // applicationAccess: state.user.applicationAccess,
  user: state.user
})

export default connect(mapStateToProps, { logout, handleDrawerClose, logout2, openLoginModal, closeLoginModal, })(LeftPanel)
