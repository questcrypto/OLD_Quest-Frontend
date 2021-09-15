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
  KNABFarmaddress,
  KnabrFarmAbi,
  KNABAddressTest,
  KNABrAddress,
  USDCAddress,
  LPTokenAddress,
  stratabi,
  stratAddress1,
  stratAddress2,
  stratAddress3,
  rewardsAddress,
  rewardsabi,
  questabi,
  questAddress,
  LPTokenAddress2,
  stratAddress43,
  aaveAddress,
  aaveabi
} from './abi'
let web3: Web3
// import axios from 'axios'

let isWallectConnect: boolean = false
let quickNode = process.env.REACT_APP_QUICK_NODE_HTTP;
// let quickNode = 'https://matic-mumbai.chainstacklabs.com/';

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
  // web3 = new Web3(window.ethereum)
  const web3 = new Web3(new Web3.providers.HttpProvider('https://matic-mainnet.chainstacklabs.com'))
  return web3.utils.toWei(totalAmount.toString(), 'ether')
}
export const convertToEther = (totalAmount: any) => {
  // web3 = new Web3(window.ethereum)
  const web3 = new Web3(new Web3.providers.HttpProvider('https://matic-mainnet.chainstacklabs.com'))
  return parseInt(web3.utils.fromWei(totalAmount.toString(), 'ether'))
}

export const convertToEther2 = (totalAmount: any) => {
  const web3 = new Web3(new Web3.providers.HttpProvider('https://matic-mainnet.chainstacklabs.com'))
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
  } catch (err) { }
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
    const res = await auctionContract.methods.saveBid(auctionId, totalAmount* 10**6, address, DaiAddress).send({ from: accounts[0] })
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
  // const res = await contractDai.methods.approve(user, convertToWei(ApproveAmount)).send({ from: account })
  const res = await contractDai.methods.approve(user, ApproveAmount * 10 ** 6).send({ from: account })
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

// export const getStableCoinBalance = async () => {
//   const web3 = await getWeb3Val()
//   if (web3) {
//     const accounts = await web3.eth.getAccounts()
//     const stableCoinContract = new web3.eth.Contract(stableCoinAbi, stableCoinContractAddress)
//     const res = await stableCoinContract.methods.balanceOf(accounts[0]).call()
//     const stableCoinBalance: any = res * 10 ** 6
//     console.log(stableCoinBalance, '&&&')
//     return parseInt(stableCoinBalance)
//   }
// }
export const getStableCoinBalance = async () => {
  // const web3 = await getWeb3Val()
  const web3 = new Web3(window.ethereum)
  if (web3 && isWallectConnect) {
    const accounts = await web3.eth.getAccounts()
    const stableCoinContract = new web3.eth.Contract(stableCoinAbi, stableCoinContractAddress)
    const res = await stableCoinContract.methods.balanceOf(accounts[0]).call()
    const stableCoinBalance: any = res / 10 ** 6
    return stableCoinBalance
  }
  return 0
}

export const buyKnab = async (amount: number, referral: any) => {
  const web3 = await getWeb3Val()
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const ICOinstance = new web3.eth.Contract(ICOabi, ICOAddress)
    const gasPrice = await gasPriceFn()
    const res: any = await ICOinstance.methods.buy(convertToWei(amount), referral).send({ from: accounts[0], gasPrice })
    return res
  }
}

export const handlestableCoinapproval = async (contractStableCoin: any, account: string, ApproveAmount: any) => {
  const deci = await contractStableCoin.methods.decimals().call()
  const gasPrice = await gasPriceFn()
  const res = await contractStableCoin.methods.approve(ICOAddress, ApproveAmount * 10 ** deci).send({ from: account, gasPrice })
  return res
}

export const fetchValue = async (amount: number) => {
  // const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-mainnet.matic.network'))
  // const web3 = new Web3(new Web3.providers.HttpProvider('https://matic-mainnet.chainstacklabs.com'))
  const web3 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  const IcoContract = new web3.eth.Contract(ICOabi, ICOAddress)
  const res = await IcoContract.methods.KnabAmount(convertToWei(amount)).call()
  return convertToEther2(res)
}

export const fetchDetails = async () => {
  // const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-mainnet.matic.network'))
  // const web3 = new Web3(new Web3.providers.HttpProvider('https://matic-mainnet.chainstacklabs.com'))
  const web3 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  const IcoContract = new web3.eth.Contract(ICOabi, ICOAddress)
  const res = await IcoContract.methods.details().call()
  return { tokensSold: convertToEther2(res['0']), tokensLeft: convertToEther2(res['1']) }
}

export const getKNABBalance = async () => {
  const web3 = await getWeb3Val()
  const web32 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const KNABContract = new web32.eth.Contract(KNABabi, KNABaddress)
    const res = await KNABContract.methods.balanceOf(accounts[0]).call()
    const KNABBalance: any = res
    return parseInt(KNABBalance)
  }
}

export const getUSDCRaised = async () => {
  // const web3 = await getWeb3Val()
  // const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-mainnet.matic.network'))
  // const web3 = new Web3(new Web3.providers.HttpProvider('https://matic-mainnet.chainstacklabs.com'))
  const web3 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const ICOContract = new web3.eth.Contract(ICOabi, ICOAddress)
    const res = await ICOContract.methods._amountRaised().call()
    const USDCRaised: any = convertToEther2(res)
    return USDCRaised
  }
}

export const getisWallet = (walletCon: boolean) => (isWallectConnect = walletCon)

export const deposit = async (pid: number, amount: number) => {
  const web3 = await getWeb3Val()
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const farmContract = new web3.eth.Contract(KnabrFarmAbi, KNABFarmaddress)
    const res = await farmContract.methods.deposit(pid, convertToWei(amount)).send({ from: accounts[0] })
    return res;
    // console.log(res)
  }
}

export const depositUsdc = async (pid: number, amount: number) => {
  const web3 = await getWeb3Val()
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const farmContract = new web3.eth.Contract(KnabrFarmAbi, KNABFarmaddress)
    const res = await farmContract.methods.deposit(pid, amount * 10 ** 6).send({ from: accounts[0] })
    return res;
    // console.log(res)
  }
}

export const gasPriceFn = async () => {
  let desiredFee: number = 20000000000
  let gasPrice: any
  const gasFee2 = await fetch('https://gasstation-mainnet.matic.network')
    .then((response) => response.json())
    .then((json) => {
      gasPrice = json.fast * (10 ** 9)

      if (gasPrice > desiredFee) {
        gasPrice = desiredFee
      }
      desiredFee = gasPrice
    })
  return desiredFee
}

export const handleKnabApproval = async (contractKnab: any, account: string, ApproveAmount: number) => {
  const gasPrice = await gasPriceFn()
  const res = await contractKnab.methods.approve(KNABFarmaddress, convertToWei(ApproveAmount)).send({ from: account, gasPrice })
  return res;
  // console.log(res)
}

export const handleUsdcApproval = async (contractUsdc: any, account: string, ApproveAmount: number) => {
  const gasPrice = await gasPriceFn()
  const deci = await contractUsdc.methods.decimals().call()
  const res = await contractUsdc.methods.approve(KNABFarmaddress, ApproveAmount * 10 ** deci).send({ from: account, gasPrice })
  // const res = await contractUsdc.methods.approve(USDCAddress, ApproveAmount * 10 ** 6).send({ from: account, gasPrice })
  return res;
  // console.log(res)
}

export const getAssetsKNABBalance = async () => {
  const web3 = await getWeb3Val()
  const web32 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const KNABContract = new web32.eth.Contract(KNABabi, KNABAddressTest)
    const res = await KNABContract.methods.balanceOf(accounts[0]).call()
    const KNABBalance: any = res
    // return parseInt(KNABBalance)
    return convertToEther2(KNABBalance)
  }
}
export const getAssetsKNABrBalance = async () => {
  const web3 = await getWeb3Val()
  const web32 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const KNABContract = new web32.eth.Contract(KNABabi, KNABrAddress)
    const res = await KNABContract.methods.balanceOf(accounts[0]).call()
    const KNABrBalance: any = res
    // return parseInt(KNABrBalance)
    return convertToEther2(KNABrBalance)
  }
}
export const getAssetsUSDCBalance = async () => {
  const web3 = await getWeb3Val()
  const web32 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    // const KNABContract = new web3.eth.Contract(KNABabi, USDCAddress)
    const KNABContract = new web32.eth.Contract(KNABabi, stableCoinContractAddress)
    const res = await KNABContract.methods.balanceOf(accounts[0]).call()
    const USDCbalance: any = res
    // console.log(USDCbalance, accounts[0], 'bbb')
    const data = USDCbalance / 10 ** 6;
    return data;
    // return parseInt(USDCbalance)
  }
}
export const getAssetsKNAB_USDCBalance = async () => {
  const web3 = await getWeb3Val()
  const web32 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const KNABContract = new web32.eth.Contract(KNABabi, LPTokenAddress)
    const res = await KNABContract.methods.balanceOf(accounts[0]).call()
    const KNAB_USDCBalance: any = res
    // return parseInt(KNAB_USDCBalance)
    return convertToEther2(KNAB_USDCBalance)
  }
}

export const getLpBalance = async () => {
  const web3 = await getWeb3Val()
  const web32 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const lpContract = new web32.eth.Contract(stableCoinAbi, LPTokenAddress)
    // const deci = await lpContract.methods.decimals().call()
    const res = await lpContract.methods.balanceOf(accounts[0]).call()
    // const lpBalance: any = res / 10 ** 6
    const lpBalance: any = convertToEther2(res)
    return lpBalance
  }
  return 0
}

export const handleKnabUsdcApproval = async (contractUsdc: any, account: string, ApproveAmount: number) => {
  const gasPrice = await gasPriceFn()
  const res = await contractUsdc.methods.approve(KNABFarmaddress, convertToWei(ApproveAmount)).send({ from: account, gasPrice })
  // console.log(res);
  return res;
}

export const withdraw = async (pid: number, amount: number) => {
  const web3 = await getWeb3Val()
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const farmContract = new web3.eth.Contract(KnabrFarmAbi, KNABFarmaddress)
    const res = await farmContract.methods.withdraw(pid, convertToWei(amount)).send({ from: accounts[0] })
    return res;
    // console.log(res);
  }
}

export const withdrawUsdc = async (pid: number, amount: number) => {
  const web3 = await getWeb3Val()
  const web32 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const accounts = await web3.eth.getAccounts()

    const aaveContract = new web32.eth.Contract(aaveabi, aaveAddress)
    const res1 = await aaveContract.methods.calc_token_amount([0, amount, 0], false ).call()
    const res2 = 0.001 *res1
    const farmContract = new web3.eth.Contract(KnabrFarmAbi, KNABFarmaddress)
    const res = await farmContract.methods.withdraw2(pid, (amount), (BigInt(res1) + BigInt(Math.floor(res2))) ).send({ from: accounts[0] })
    return res;
    // console.log(res);
  }
}

export const getStake = async (pid: number) => {
  const web3 = await getWeb3Val()
  const web32 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const farmContract = new web32.eth.Contract(KnabrFarmAbi, KNABFarmaddress)
    const res = await farmContract.methods.stakedWantTokens(pid, accounts[0]).call()
    // console.log('GetStake',pid, res)
    return convertToEther2(res);
  }
}

export const getStakeUsdc = async (pid: number) => {
  const web3 = await getWeb3Val()
  const web32 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const farmContract = new web32.eth.Contract(KnabrFarmAbi, KNABFarmaddress)
    const res = await farmContract.methods.stakedWantTokens(pid, accounts[0]).call()
    // console.log('GetStake',pid, res)
    return res;
  }
}

export const getPendingKnabr = async (pid: number) => {
  const web3 = await getWeb3Val()
  const web32 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const farmContract = new web32.eth.Contract(KnabrFarmAbi, KNABFarmaddress)
    const res = await farmContract.methods.pendingKNABR(pid, accounts[0]).call()
    return convertToEther2(res)
  }
}

export const getTvlKnab = async () => {
  const web3 = await getWeb3Val()
  const web32 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const stratContract = new web32.eth.Contract(stratabi, stratAddress1)
    const res = await stratContract.methods.wantLockedTotal().call()
    return convertToEther2(res);
  }
}

export const getTvlKnabUsdc = async () => {
  const web3 = await getWeb3Val()
  const web32 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const stratContract = new web32.eth.Contract(stratabi, stratAddress2)
    const res = await stratContract.methods.wantLockedTotal().call()
    return convertToEther2(res);
  }
}

export const getTvlUsdc = async () => {
  const web3 = await getWeb3Val()
  const web32 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const stratContract = new web32.eth.Contract(stratabi, stratAddress3)
    const res = await stratContract.methods.wantLockedTotal().call()
    return convertToEther2(res);
  }
}

export const getHarvest = async (pid: number) => {
  const web3 = await getWeb3Val()
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const farmContract = new web3.eth.Contract(KnabrFarmAbi, KNABFarmaddress)
    const res = await farmContract.methods.harvestKNABR(pid).send({ from: accounts[0] })
    return res;
  }
}

export const getHarvestAll = async (harvest1: any, harvest2: any, harvest3: any) => {
  const web3 = await getWeb3Val()
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const farmContract = new web3.eth.Contract(KnabrFarmAbi, KNABFarmaddress)
    if (harvest1 > 0) {
      const res0 = await farmContract.methods.harvestKNABR(0).send({ from: accounts[0] })
    }
    if (harvest2 > 0) {
      const res1 = await farmContract.methods.harvestKNABR(1).send({ from: accounts[0] })
    }
    if (harvest3 > 0) {
      const res2 = await farmContract.methods.harvestKNABR(2).send({ from: accounts[0] })
    }
    return 1;
  }
}

export const withdrawLoan = async (pid: number, amount: number) => {
  const web3 = await getWeb3Val()
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const farmContract = new web3.eth.Contract(KnabrFarmAbi, KNABFarmaddress)
    console.log('With draw loan', amount);
    const res = await farmContract.methods.withdrawLoan(pid, amount).send({ from: accounts[0] })
    return res;
  }
}

// export const getDefiAmount = async () => {
//   const web3 = await getWeb3Val()
//   if (web3) {
//     const accounts = await web3.eth.getAccounts()
//     const stratContract = new web3.eth.Contract(KnabrFarmAbi, KNABFarmaddress)
//     const res = await stratContract.methods.calculatePartition(3, stratAddress3).call()
//     return convertToEther2(res);
//   }
// }

export const getLoanAmount = async () => {
  const web3 = await getWeb3Val()
  const web32 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const stratContract = new web32.eth.Contract(stratabi, stratAddress3)
    const res = await stratContract.methods.paymentrecieved(accounts[0]).call()
    return res / 10 ** 6;
  }
}

export const getLoanAmount2 = async () => {
  const web3 = await getWeb3Val()
  const web32 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const stratContract = new web32.eth.Contract(stratabi, stratAddress3)
    const res = await stratContract.methods.amountLoan(accounts[0]).call()
    return res / 10 ** 6;
  }
}


export const getUSDCBalanceBuyKnab = async () => {
  const web3 = await getWeb3Val()
  const web32 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const KNABContract = new web32.eth.Contract(KNABabi, stableCoinContractAddress)
    const res = await KNABContract.methods.balanceOf(accounts[0]).call()
    const USDCbalance: any = res
    // console.log(USDCbalance, accounts[0], 'bbb')
    const data = USDCbalance / 10 ** 6;
    return data;
    // return parseInt(USDCbalance)
  }
}

export const depositKnabr = async (amount: any) => {
  const web3 = await getWeb3Val()
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const rewardsContract = new web3.eth.Contract(rewardsabi, rewardsAddress)
    const gasPrice = await gasPriceFn()
    const contractKnabr = new web3.eth.Contract(stableCoinAbi, KNABrAddress)
    await contractKnabr.methods.approve(rewardsAddress, convertToWei(amount)).send({ from: accounts[0], gasPrice }).then((async () => {
      const res = await rewardsContract.methods.deposit(convertToWei(amount)).send({ from: accounts[0], gasPrice })
      console.log('deposit BlockChainMethods', res)
      return res;
      // return await rewardsContract.methods.deposit(convertToWei(amount)).send({ from: accounts[0], gasPrice })
    }))

  }
}

export const claimRewards = async (amount: any) => {
  const web3 = await getWeb3Val()
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const rewardsContract = new web3.eth.Contract(rewardsabi, rewardsAddress)
    const gasPrice = await gasPriceFn()
    const res = await rewardsContract.methods.claimRewards(convertToWei(amount)).send({ from: accounts[0], gasPrice })
    return res;
  }
}

export const getStatus = async () => {
  const web3 = await getWeb3Val()
  const web32 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const rewardsContract = new web32.eth.Contract(rewardsabi, rewardsAddress)
    const res = await rewardsContract.methods.getStatus().call()
    return res;
  }
}

export const getKnabDeposited = async () => {
  const web3 = await getWeb3Val()
  const web32 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const rewardsContract = new web32.eth.Contract(rewardsabi, rewardsAddress)
    const res = await rewardsContract.methods.userDeposit(accounts[0]).call({ from: accounts[0] })
    return convertToEther2(res);
  }
}

export const getKnabRewards = async () => {
  const web3 = await getWeb3Val()
  const web32 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const rewardsContract = new web32.eth.Contract(rewardsabi, rewardsAddress)
    const res = await rewardsContract.methods.getKnab().call({ from: accounts[0] })
    return convertToEther2(res);
  }
}

export const getKNABAllowance = async () => {
  const web3 = await getWeb3Val()
  const web32 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const KNABContract = new web32.eth.Contract(KNABabi, KNABAddressTest)
    const res = await KNABContract.methods.allowance(accounts[0], KNABFarmaddress).call()
    const KNABBalance: any = res
    return convertToEther2(KNABBalance)
  }
}

export const getUSDCAllowance = async () => {
  const web3 = await getWeb3Val()
  const web32 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const KNABContract = new web32.eth.Contract(KNABabi, USDCAddress)
    const res = await KNABContract.methods.allowance(accounts[0], KNABFarmaddress).call()
    const KNABBalance: any = res
    return KNABBalance / 10 ** 6
  }
}

export const getQuestBalance = async () => {
  const web3 = await getWeb3Val()
  const web32 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const QuestContract = new web32.eth.Contract(questabi, questAddress)
    const res = await QuestContract.methods.balanceOf(accounts[0]).call()
    const QUESTbalance: any = res
    const data = convertToEther2(QUESTbalance)
    return data;
  }
}

export const handleUsdcApprovalQuest = async (contractUsdc: any, account: string, ApproveAmount: number) => {
  const gasPrice = await gasPriceFn()
  const deci = await contractUsdc.methods.decimals().call()
  const res = await contractUsdc.methods.approve(questAddress, ApproveAmount * (10 ** deci)).send({ from: account, gasPrice })
  // const res = await contractUsdc.methods.approve(questAddress, convertToWei(ApproveAmount)).send({ from: account, gasPrice })
  return res;
}

export const handleQSTApproval = async (ApproveAmount: number) => {
  const web3 = await getWeb3Val()
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const questContract = new web3.eth.Contract(questabi, questAddress)
    const res = await questContract.methods.approve(questAddress, convertToWei(ApproveAmount)).send({ from: accounts[0] })
    return res
  }
}

export const buyQST = async (Amount: Number, referral: any) => {
  const web3 = await getWeb3Val()
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const questContract = new web3.eth.Contract(questabi, questAddress)
    // console.log(typeof web3.utils.toWei(String(Amount), "Mwei"))
    // console.log(web3.utils.toWei(String(Amount), "Mwei"))
    const res = await questContract.methods.buyQST(parseInt(web3.utils.toWei(String(Amount), "Mwei")), referral).send({ from: accounts[0] })
    return res;
  }
}

export const returnQST = async (Amount: number) => {
  const web3 = await getWeb3Val()
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const questContract = new web3.eth.Contract(questabi, questAddress)
    const res = await questContract.methods.returnQST(parseInt(web3.utils.toWei(String(Amount), "Mwei"))).send({ from: accounts[0] })
    return res
  }
}

export const getQuestSupply = async () => {
  // const web3 = await getWeb3Val()
  const web3 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const questContract = new web3.eth.Contract(questabi, questAddress)
    const res = await questContract.methods.totalSupply().call()
    const questSupply: any = convertToEther2(res)
    return questSupply
  }
}

export const getKnabrSupply = async () => {
  // const web3 = await getWeb3Val()
  const web3 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const questContract = new web3.eth.Contract(questabi, KNABrAddress)
    const res = await questContract.methods.totalSupply().call()
    const knabrSupply: any = convertToEther2(res)
    return knabrSupply
  }
}

export const getUsdcSupply = async () => {
  // const web3 = await getWeb3Val()
  const web3 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const questContract = new web3.eth.Contract(questabi, USDCAddress)
    const res = await questContract.methods.totalSupply().call()
    const usdcSupply: any = web3.utils.fromWei(res, "mwei")
    return usdcSupply
  }
}

export const getLpSupply = async () => {
  // const web3 = await getWeb3Val()
  const web3 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const questContract = new web3.eth.Contract(questabi, LPTokenAddress)
    const res = await questContract.methods.totalSupply().call()
    const lpSupply: any = convertToEther2(res)
    return lpSupply
  }
}

/////////////////////////////////////////////////////////////////////////////
// Staking Row43 Methods

export const getLpBalance2 = async () => {
  const web3 = await getWeb3Val()
  const web32 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const lpContract = new web32.eth.Contract(stableCoinAbi, LPTokenAddress2)
    // const deci = await lpContract.methods.decimals().call()
    const res = await lpContract.methods.balanceOf(accounts[0]).call()
    // const lpBalance: any = res / 10 ** 6
    const lpBalance: any = convertToEther2(res)
    return lpBalance
  }
  return 0
}

export const getTvlKnabUsdc2 = async () => {
  const web3 = await getWeb3Val()
  const web32 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const accounts = await web3.eth.getAccounts()
    const stratContract = new web32.eth.Contract(stratabi, stratAddress43)
    const res = await stratContract.methods.wantLockedTotal().call()
    return convertToEther2(res);
  }
}

export const getLp2Supply = async () => {
  // const web3 = await getWeb3Val()
  const web3 = new Web3(new Web3.providers.HttpProvider(String(quickNode)))
  if (web3) {
    const questContract = new web3.eth.Contract(questabi, LPTokenAddress2)
    const res = await questContract.methods.totalSupply().call()
    const lpSupply2: any = convertToEther2(res)
    return lpSupply2
  }
}

/////////////////////////////////////////////////////////////////////////////
