import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Web3 from 'web3'

import { useStyles, TopPanelCont } from './style'
import { connect } from 'react-redux'
import { logout } from '../../../../../logic/actions/user.actions'

const TopPanel = (props: any) => {
  const [account, setAccount] = useState(false)
  const classes = useStyles()
  const web3: Web3 = new Web3(window.ethereum)
  setInterval(function () {
    async function getAccount() {
      const coinbase = await web3?.eth.getCoinbase()
      if (!coinbase) {
        setAccount(false)
        return
      }
      const publicaddress = coinbase.toLowerCase()

      if (publicaddress) setAccount(true)
    }
    getAccount()
  }, 1000)

  // Event handler to handle metamask account change
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', function () {
      props.logout()
    })
  }

  return <TopPanelCont>{!account && <Button className={classes.buttonStyle}>Connect Wallet</Button>}</TopPanelCont>
}

const mapStateToProps = (state: any) => ({
  loggedIn: state.user.loggedIn,
})

export default connect(mapStateToProps, { logout })(TopPanel)
