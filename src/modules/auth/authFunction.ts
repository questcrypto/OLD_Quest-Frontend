import Web3 from 'web3'

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
