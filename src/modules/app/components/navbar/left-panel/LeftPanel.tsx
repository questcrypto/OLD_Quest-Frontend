import React from 'react'
import { connect } from 'react-redux'
import { logout } from 'logic/actions/user.actions'
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

const LeftPanel = (props: any) => {
  const classes = useStyles()
  const { userInfo, logout } = props

  const handleProperty = () => {
    history.push(Paths.dashboard)
  }
  const handleAuction = () => {
    history.push(Paths.auction)
  }
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Grid className={classes.root}>
        <QuestLogoCont>
          <img src={QuestLogo} alt="" />
        </QuestLogoCont>
        <Divider className={classes.dividerStyle} />
        <List>
          <ListItem button className={classes.itemButtonStyle} onClick={() => handleProperty()}>
            <ApartmentIcon className={classes.iconStyle} />
            <ListItemText>Properties</ListItemText>
          </ListItem>
          {!!userInfo && userInfo.role !== 2 && (
            <>
              <ListItem button className={classes.itemButtonStyle}>
                <AccountBalanceIcon className={classes.iconStyle} />
                <ListItemText>Treasury</ListItemText>
              </ListItem>
              <ListItem button className={classes.itemButtonStyle} onClick={() => handleAuction()}>
                <AssessmentIcon className={classes.iconStyle} />
                <ListItemText>Auctions</ListItemText>
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
        <Grid className={classes.signOutStyle}>
          <Divider className={classes.signOutDividerStyle} />
          <ListItem button onClick={() => logout()}>
            <PowerSettingsNewIcon className={classes.iconStyle} />
            <ListItemText>Sign Out</ListItemText>
          </ListItem>
        </Grid>
      </Grid>
    </Drawer>
  )
}
const mapStateToProps = (state: any) => ({
  userInfo: state.user.userInfo,
})

export default connect(mapStateToProps, { logout })(LeftPanel)
