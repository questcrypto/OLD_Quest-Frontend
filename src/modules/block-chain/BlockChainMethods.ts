import Web3 from 'web3'
import {
  auctionAbi,
  auctionContractAddress,
  daiAbi,
  DAIContractAddress,
  selfAbi,
  slcAbi,
  SLFContractAddress,
  stableCoinAbi,
  stableCoinContractAddress,
  ICOabi,
  ICOAddress,
  KNABaddress,
  KNABabi,
} from './abi'
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

export const convertToWei = (totalAmount: any) => {
  return web3.utils.toWei(totalAmount.toString(), 'ether')
}
export const convertToEther = (totalAmount: any) => {
  return parseInt(web3.utils.fromWei(totalAmount.toString(), 'ether'))
}

export const convertToEther2 = (totalAmount: any) => {
  return web3.utils.fromWei(totalAmount.toString(), 'ether')
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

export const handleEndAuction = async (contractSLC: any, account: string, auctionID: string, propId: string) => {
  const res = await contractSLC.methods.EndAuction(auctionID, propId).send({ from: account })
  return res
}

export const configureBlockchainAuction = async (
  startDate: any,
  endDate: any,
  auctionId: any,
  minReserve: any,
  slReserve: any,
  propertyValue: any,
  propId: any
) => {
  const web3 = await getWeb3Val()

  if (web3) {
    const accounts = await web3.eth.getAccounts()

    const SLFInstance = new web3.eth.Contract(selfAbi, SLFContractAddress)
    const SLCAddress = await SLFInstance.methods.PROPERTY_ERC20_ADDRESS(propId).call()
    const SLCInstance = new web3.eth.Contract(slcAbi, SLCAddress)
    const newStartDate = new Date(startDate).getTime() / 1000
    const newEndDate = new Date(endDate).getTime() / 1000

    const res: any = await SLCInstance.methods
      .EnlistAuction(
        auctionId,
        newStartDate,
        newEndDate,
        convertToWei(minReserve),
        convertToWei(slReserve),
        convertToWei(propertyValue),
        propId
      )
      .send({ from: accounts[0] })
    return res
  }
}

export const currentBidValue = async (auctionId: any) => {
  const web3 = await getWeb3Val()

  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const auctionContract = new web3.eth.Contract(auctionAbi, auctionContractAddress)

    const res: any = await auctionContract.methods
      .BidTokensTransferred(DAIContractAddress, auctionId, accounts[0])
      .call({ from: accounts[0] })
    const currentBidValue: any = convertToEther(res)
    return parseInt(currentBidValue)
  }
}

export const saveBlockchainBid = async (auctionId: string, totalAmount: any, address: string, DaiAddress: any) => {
  const web3 = await getWeb3Val()

  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const auctionContract = new web3.eth.Contract(auctionAbi, auctionContractAddress)
    const res = await auctionContract.methods.saveBid(auctionId, convertToWei(totalAmount), address, DaiAddress).send({ from: accounts[0] })
    return res
  }
}

export const getDaiBalance = async () => {
  const web3 = await getWeb3Val()

  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const daiContract = new web3.eth.Contract(daiAbi, DAIContractAddress)
    const res = await daiContract.methods.balanceOf(accounts[0]).call()

    const daiBalance: any = convertToEther(res)
    return parseInt(daiBalance)
  }
}

export const handleStoreDaiClaimAmount = async (
  contractAuction: any,
  account: string,
  auctionID: string,
  DaiClaimersArray: any,
  DaiClaimAmount: any
) => {
  DaiClaimAmount = DaiClaimAmount.map((el: any) => convertToWei(el))

  const res = await contractAuction.methods
    .StoreBidTokenClaimAmount(auctionID, DaiClaimersArray, DaiClaimAmount, DAIContractAddress)
    .send({ from: account })
  return res
}
export const handleStoreWinTokenAmount = async (
  contractSLC: any,
  account: string,
  auctionID: string,
  BiddersArray: any,
  BidAmount: any
) => {
  BidAmount = BidAmount.map((el: any) => convertToWei(el))

  const res = await contractSLC.methods.STORE_AUCTION_TOKENS_TO_BE_GIVEN(auctionID, BiddersArray, BidAmount).send({ from: account })
  return res
}

export const getApprovedTokens = async () => {
  const web3 = await getWeb3Val()

  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const daiContract = new web3.eth.Contract(daiAbi, DAIContractAddress)
    const res = await daiContract.methods.allowance(accounts[0], auctionContractAddress).call()

    const approvedTokens: any = convertToEther(res)

    return parseInt(approvedTokens)
  }

  return 0
}

export const handleDAIapproval = async (contractDai: any, account: string, user: any, ApproveAmount: any) => {
  const res = await contractDai.methods.approve(user, convertToWei(ApproveAmount)).send({ from: account })
  return res
}

export const handleAuctionWinTokenClaim = async (contractSLC: any, account: string, auctionID: any, TreasuryAddress: any) => {
  const res = await contractSLC.methods.GET_AUCTION_WIN_SLC(auctionID, TreasuryAddress).send({ from: account })
  return res
}

export const handleDAITokenClaim = async (contractAuction: any, account: string, auctionID: any, TreasuryAddress: any) => {
  const res = await contractAuction.methods.claimBidTokensback(auctionID, TreasuryAddress, DAIContractAddress).send({ from: account })
  return res
}

export const getPropertyId = async (auctionId: any) => {
  const web3: any = await getWeb3Val()

  const auctionContract = new web3.eth.Contract(auctionAbi, auctionContractAddress)

  const { property_id } = await auctionContract.methods.auction(auctionId).call()
  return property_id
}

export const getStableCoinBalance = async () => {
  const web3 = await getWeb3Val()
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const stableCoinContract = new web3.eth.Contract(stableCoinAbi, stableCoinContractAddress)
    const res = await stableCoinContract.methods.balanceOf(accounts[0]).call()
    const stableCoinBalance: any = convertToEther(res)
    return parseInt(stableCoinBalance)
  }
}

export const buyKnab = async (amount: number) => {
  const web3 = await getWeb3Val()
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const ICOinstance = new web3.eth.Contract(ICOabi, ICOAddress)
    const res: any = await ICOinstance.methods.buy(convertToWei(amount)).send({ from: accounts[0] })
    return res
  }
}

export const handlestableCoinapproval = async (contractStableCoin: any, account: string, ApproveAmount: any) => {
  const deci = await contractStableCoin.methods.decimals().call()
  console.log(ApproveAmount * 10 ** deci, 'abc')
  const res = await contractStableCoin.methods.approve(ICOAddress, ApproveAmount * 10 ** deci).send({ from: account })
  return res
}

export const fetchValue = async (amount: number) => {
  const IcoContract = new web3.eth.Contract(ICOabi, ICOAddress)
  const res = await IcoContract.methods.KnabAmount(convertToWei(amount)).call()
  return convertToEther2(res)
}

export const fetchDetails = async () => {
  const IcoContract = new web3.eth.Contract(ICOabi, ICOAddress)
  const res = await IcoContract.methods.details().call()
  return { tokensSold: convertToEther2(res['0']), tokensLeft: convertToEther2(res['1']) }
}

export const getKNABBalance = async () => {
  const web3 = await getWeb3Val()
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const KNABContract = new web3.eth.Contract(KNABabi, KNABaddress)
    const res = await KNABContract.methods.balanceOf(accounts[0]).call()
    const KNABBalance: any = res
    // console.log(res, 'blc')
    return parseInt(KNABBalance)
  }
}
