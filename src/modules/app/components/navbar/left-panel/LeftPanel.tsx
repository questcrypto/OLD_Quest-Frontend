import React from 'react'
import { connect } from 'react-redux'
import { logout } from 'logic/actions/user.actions'
import { useStyles, LeftPanelCont, QuestLogoCont, ListItemText } from './style'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ApartmentIcon from '@material-ui/icons/Apartment'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import AssessmentIcon from '@material-ui/icons/Assessment'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import EventIcon from '@material-ui/icons/Event'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import Logo from 'assets/images/QuestLogo.svg'

const LeftPanel = (props: any) => {
  const classes = useStyles()
  const { logout } = props

  return (
    <LeftPanelCont>
      <QuestLogoCont>
        <img src={Logo} alt="" />
      </QuestLogoCont>
      <Divider />
      <List>
        <ListItem button className={classes.itemButtonStyle}>
          <ApartmentIcon className={classes.iconStyle} />
          <ListItemText>Properties</ListItemText>
        </ListItem>
        <ListItem button className={classes.itemButtonStyle}>
          <AccountBalanceIcon className={classes.iconStyle} />
          <ListItemText>Treasury</ListItemText>
        </ListItem>
        <ListItem button className={classes.itemButtonStyle}>
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
        <ListItem button className={classes.signOutStyle} onClick={() => logout()}>
          <PowerSettingsNewIcon className={classes.iconStyle} />
          <ListItemText>Sign Out</ListItemText>
        </ListItem>
      </List>
    </LeftPanelCont>
  )
}

export default connect(null, { logout })(LeftPanel)
