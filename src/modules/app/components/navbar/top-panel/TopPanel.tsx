import React, { useEffect, useState } from 'react'
import { PrimaryButton } from 'shared/components/buttons'
import { connect } from 'react-redux'
import { logout } from 'logic/actions/user.actions'
import Web3 from 'web3'
import { TopPanelCont } from './style'
import Notifications from './components/Notifications'

const TopPanel = (props: any) => {
  const [account, setAccount] = useState(false)
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

  const checkWalletAccount = async () => {
    const coinbase = await web3?.eth.getCoinbase()
    if (props.userInfo && coinbase) {
      if (props.userInfo.publicaddress !== coinbase) {
        props.logout()
        return
      }
    }
  }

  useEffect(() => {
    checkWalletAccount()
  })

  // Event handler to handle metamask account change
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', function () {
      props.logout()
    })
  }

  return (
    <TopPanelCont>
      {/* <Notifications /> */}
      {!account && <PrimaryButton>Connect Wallet</PrimaryButton>}
    </TopPanelCont>
  );
}

const mapStateToProps = (state: any) => ({
  loggedIn: state.user.loggedIn,
  userInfo: state.user.userInfo,
})

export default connect(mapStateToProps, { logout })(TopPanel)
