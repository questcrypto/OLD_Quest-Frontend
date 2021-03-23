import Web3 from 'web3'
import { slcAbi, SLCContractAddress } from './abi'
let web3: Web3

export const getWeb3Val = async () => {
  // Check if MetaMask is installed
  if (!window.ethereum) {
    window.alert('Please install MetaMask first.')
    return
  }
  if (!web3) {
    // Request account access if needed
    try {
      await window.ethereum.enable()
      // We don't know window.web3 version, so we use our own instance of Web3
      // with the injected provider given by MetaMask
      web3 = new Web3(window.ethereum)
    } catch (error) {
      window.alert('You need to allow MetaMask.')
      return
    }
  }
  return web3
}

export const getPublicAddress = async () => {
  const web3: Web3 = new Web3(window.ethereum)
  try {
    const coinbase = await web3.eth.getCoinbase()
    if (!coinbase) {
      window.alert('Please activate MetaMask first.')
      return
    } else {
      const publicaddress = coinbase.toLowerCase()
      return publicaddress
    }
  } catch (error) {
    return null
  }
}

export const handlePropertyDetailsSubmit = (contractSLF: any, account: string, propertyValue: number, date: number, propertyId: string) => {
  console.log('blockchain methods', account, propertyId)

  const propertyAmount = web3.utils.toWei(propertyValue.toString(), 'ether')

  return contractSLF.methods
    .ListProperty_details(propertyAmount, propertyAmount, propertyAmount, 100, 0, 1, 100, date, propertyId, propertyId)
    .send({ from: account })
}

export const getPendingTransaction = async (contractSLC: any, account: string) => {
  try {
    const pendingTransaction = await contractSLC.methods.getPendingTransactions().call({ from: account })
    if (pendingTransaction.length > 0) {
      const trans = await contractSLC.methods._transactions(pendingTransaction[0]).call({ from: account })
      return trans
    }
  } catch (err) {}
}
export const handleSignPendingTransactionSubmit = (contractSLC: any, account: string, transactionNumber: number) => {
  contractSLC.methods.signTransaction(transactionNumber).send({ from: account })
}

export const handleEndAuction = async (contractSLC: any, account: string, auctionID: string) => {
  let res = await contractSLC.methods.EndAuction(auctionID).send({ from: account })
  console.log(res)
  return res
}

export const configureBlockchainAuction = async (
  startDate: any,
  endDate: any,
  auctionId: any,
  minReserve: any,
  slReserve: any,
  suggestedLowestBid: any,
  propId: any
) => {
  const web3 = await getWeb3Val()
  console.log(web3)
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const SLCInstance = new web3.eth.Contract(slcAbi, SLCContractAddress)

    const newStartDate = new Date(startDate).getTime() / 1000
    const newEndDate = new Date(endDate).getTime() / 1000

    let res = await SLCInstance.methods
      .EnlistAuction(auctionId, newStartDate, newEndDate, minReserve, slReserve, suggestedLowestBid, propId)
      .send({ from: accounts[0] })
    return res
  }
}
