import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Web3 from 'web3'

import { useStyles, TopPanelCont } from './style'
import { connect } from 'react-redux'
import { logout } from '../../../../../logic/actions/user.actions'

const TopPanel = (props: any) => {
  console.log(props)
  const [account, setAccount] = useState(false)
  const classes = useStyles()
  const web3: Web3 = new Web3(window.ethereum)

  // setInterval(function () {
  //   async function getAccount() {
  //     const coinbase = await web3?.eth.getCoinbase()
  //     console.log('auth', coinbase)
  //     if (!coinbase) {
  //       setAccount(false)
  //       return
  //     }
  //     const publicaddress = coinbase.toLowerCase()

  //     if (publicaddress) setAccount(true)
  //   }
  //   getAccount()
  // }, 1000)

  const checkWalletAccount = async () => {
    const coinbase = await web3?.eth.getCoinbase()
    if (props.userInfo && coinbase) {
      if (props.userInfo.publicaddress !== coinbase) {
        console.log(props.userInfo.publicaddress, coinbase)
        props.logout()
        return
      }
    }

    if (!coinbase) {
      setAccount(false)
      return
    }
    const publicaddress = coinbase.toLowerCase()

    if (publicaddress) setAccount(true)
  }

  useEffect(() => {
    checkWalletAccount()
  }, [])

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
  userInfo: state.user.userInfo,
})

export default connect(mapStateToProps, { logout })(TopPanel)
