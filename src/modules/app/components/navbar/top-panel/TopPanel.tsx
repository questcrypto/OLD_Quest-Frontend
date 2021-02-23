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
  }, 1000)
  console.log(account)
  return <TopPanelCont>{!account && <Button className={classes.buttonStyle}>Connect Wallet</Button>}</TopPanelCont>
}

export default TopPanel 



// if (typeof web3 !== 'undefined') {
//   web3 = new Web3(web3.currentProvider)
// } else {
//   // set the provider you want from Web3.providers
//   // var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
//   var web3 = new Web3('http://localhost:3000'); // TypeError:   this.provider.send is not a function
// }
// console.log(web3) // {eth: .., shh: ...} // it's here!
// if (!web3.isConnected()) {
//   console.log('fail')
// } else {
//   console.log('succ')
// }
// //var coinbase = web3.eth.coinbase;
// //var balance = web3.eth.getBalance(coinbase);
// //console.log(web3.eth.accounts);
// var version = web3.version.api
// console.log(version) // "0.2.0"
// var version = web3.version.node
// console.log(version)

//  return <TopPanelCont>{!account && <Button className={classes.buttonStyle}>Connect Wallet</Button>}</TopPanelCont>
// }

// export default TopPanel

//https://ethereum.stackexchange.com/questions/2783/watching-for-changes-in-web3-isconnected
