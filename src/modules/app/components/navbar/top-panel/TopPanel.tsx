import React from 'react'
import Button from '@material-ui/core/Button'
import { checkSLFAdmin, propertyInfo, GetPendingTransactions, getURIOfToken } from '../../../../../quest'

import { useStyles, TopPanelCont } from './style'
import { Input } from '@material-ui/core'
import Web3 from 'web3'
// Will hold the web3 instance

//  var res = checkSLFAdmin('0xF51632261987F4578425Ca91a48117E11516a4CF').then((data) => console.log(data));

const TopPanel = () => {
  const classes = useStyles()

  const handleClickEvent = async () => {
    var web3: Web3
    web3 = new Web3(window.ethereum)
    var act = await web3.eth.getCoinbase()
    console.log(act)
    var res = checkSLFAdmin(act).then((data) => console.log(data))
    // var res = propertyInfo(act).then((data) => console.log(data))
    // var res = getURIOfToken(act).then((data) => console.log(data))
    // var res = propertyInfo(act).then((data) => console.log(data))
    // var res = GetPendingTransactions(act).then((data) => console.log(data))

    alert(`${TopPanelCont['address']} `)
  }

  return (
    <TopPanelCont>
      <Input placeholder={'admin address'} name={'address'} />
      <Button className={classes.buttonStyle} onClick={handleClickEvent}>
        Connect Wallet
      </Button>
    </TopPanelCont>
  )
}
export default TopPanel
