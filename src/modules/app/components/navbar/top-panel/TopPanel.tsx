import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Web3 from 'web3'
import { useStyles, TopPanelCont } from './style'

const TopPanel = () => {
  const classes = useStyles()
  const [account, setAccount] = useState<boolean>(false)
  const web3: Web3 = new Web3(window.ethereum)
  setInterval(function () {
    async function getAccount() {
      const coinbase = await web3?.eth.getCoinbase()
      if (!coinbase) {
        setAccount(false)
        return
      }
      const publicaddress = coinbase.toLowerCase()
      console.log(publicaddress)
      if (publicaddress) setAccount(true)
    }
    getAccount()
  }, 1000);
 console.log(account)
  return (
    <TopPanelCont>
      {!account &&
        <Button className={classes.buttonStyle}>Connect Wallet</Button>
      }
    </TopPanelCont>
  )
}
export default TopPanel