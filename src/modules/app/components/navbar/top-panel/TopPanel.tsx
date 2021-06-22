import React, { useEffect, useState } from 'react'
import { PrimaryButton } from 'shared/components/buttons'
import { connect } from 'react-redux'
import { logout, logout2, walletConnect, walletConnectAddress } from 'logic/actions/user.actions'
import Web3 from 'web3'
import { TopPanelCont } from './style'
import Notifications from './components/Notifications'
import { makeStyles } from '@material-ui/core'

import CustomButton from '../../../../../modules/portfolio/components/shared/Button'
import { apiBaseUrl } from 'services/global-constant'
import axios from 'axios'
import { getWeb3Val, getKNABBalance } from 'modules/block-chain/BlockChainMethods'
import { errorAlert } from 'logic/actions/alerts.actions'
import { loginStart, getKNABbalance } from 'logic/actions/user.actions'
import MetaMaskIcon from '../../../../../assets/icons/metaMaskIcon.svg'

const useStyles = makeStyles((theme) => ({
  walletDiv: {
    display: 'flex',
    border: '1px solid #C4C4C4',
    borderRadius: '5px',
    padding: '4px 8px',
  },
  walletDivText: {
    paddingLeft: '8px',
    position: 'relative',
    top: '3px',
  },
}))

const TopPanel = (props: any) => {
  const classes = useStyles()

  const [account, setAccount] = useState(false)
  let web3: Web3 = new Web3(window.ethereum)

  const { loginStart, errorAlert, loggedIn, walletConnect, walletConAddress, getKNABbalance } = props
  const [dataLoading, setDataLoading] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [tokenDummy, setTokenDummy] = useState('')

  // setInterval(function () {
  //   async function getProvider() {
  //     if(web3) {

  //     } else {
  //       web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/7abab3b743864efd81bba0f969adf157'))
  //     }

  //     // const coinbase = await web3.eth.getCoinbase()
  //     // if (!coinbase) {
  //     //   setAccount(false)
  //     //   return
  //     // }
  //     // const publicaddress = coinbase.toLowerCase()

  //     // if (publicaddress) setAccount(true)
  //   }
  //   getProvider()
  // }, 1000)

  // const checkWalletAccount = async () => {
  //   const coinbase = await web3?.eth.getCoinbase()
  //   if (props.userInfo && coinbase) {
  //     if (props.userInfo.publicaddress !== coinbase) {
  //       props.logout()
  //       return
  //     }
  //   }
  // }

  // useEffect(() => {
  //   checkWalletAccount()
  // })

  useEffect(() => {
    getToken()
    setTimeout(() => {
      if (tokenDummy && tokenDummy.length > 0) {
        const data = async () => {
          const web3 = await getWeb3Val()
          if (web3) {
            const coinbase = await web3.eth.getCoinbase()
            setWalletAddress(coinbase)
          }
        }
        data()
      }
    }, 3000)
  }, [walletAddress, tokenDummy, loggedIn])

  // Event handler to handle metamask account change
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', function () {
      // props.logout()
      props.logout2()
      setWalletAddress('')
      // walletConnect(false);
    })
  }

  const getToken = () => {
    try {
      const token: any = localStorage.getItem('token')
      setTokenDummy(token)
    } catch (error) {
      console.log(error)
    }
  }
  const getBalance = async () => {
    const KNABBalance: any = await getKNABBalance()
    getKNABbalance(KNABBalance / 10 ** 18)
  }
  const connectWallet = async () => {
    try {
      setDataLoading(true)
      const web3 = await getWeb3Val()

      if (web3) {
        const coinbase = await web3.eth.getCoinbase()
        if (!coinbase) {
          window.alert('Please activate Wallet first.')
          return
        }
        const publicaddress = coinbase.toLowerCase()
        // let signatureData: any = ''
        // const result = await axios.get(`${apiBaseUrl}/user/GetNonce/${publicaddress}`);
        // signatureData = { publicaddress: result.data[0].publicaddress, nonce: result.data[0].nonce }
        // // }
        // const signature = await web3.eth.personal.sign(
        //   `I am signing my one-time nonce: ${signatureData.nonce}`,
        //   signatureData.publicaddress,
        //   ''
        // )
        // const loginData = { publicaddress, signature }
        // loginStart(loginData)
        setWalletAddress(publicaddress)
        walletConnectAddress(publicaddress)
        walletConnect(true)
        getBalance()
      }
    } catch (error) {
      if (!!error && error.response && error.response.data.message) {
        errorAlert(error.response.data.message)
      } else if (!!error.message) {
        errorAlert(error.message)
      } else {
        errorAlert('Something went wrong , please try again')
      }
    } finally {
      setTimeout(() => setDataLoading(false), 3000)
      getToken()
    }
  }
  useEffect(() => {
    // console.log(walletConAddress, '0000')
    if (walletConAddress !== '' && walletConnect) {
      setWalletAddress(walletConAddress)
    }
  })
  return (
    <TopPanelCont>
      {
        // loggedIn && (walletAddress !== '') && (tokenDummy !== '') ?
        walletAddress !== '' ? (
          <div className={classes.walletDiv}>
            <img src={MetaMaskIcon} alt="" />
            <span className={classes.walletDivText}>{`${walletAddress.substring(0, 4)}...${walletAddress.substring(37, 42)}`}</span>
          </div>
        ) : (
          <CustomButton
            size="large"
            style={{ background: 'linear-gradient(180deg, #E6BA73 0%, #BA8E4D 100%)', padding: '4px 24px' }}
            onClick={connectWallet}
          >
            {dataLoading ? 'Connecting ...' : 'Connect Wallet'}
          </CustomButton>
        )
        // <PrimaryButton>Connect Wallet</PrimaryButton>
      }
      {/* <Notifications /> */}
    </TopPanelCont>
  )
}

const mapStateToProps = (state: any) => ({
  loggedIn: state.user.loggedIn,
  userInfo: state.user.userInfo,
  walletConAddress: state.user.walletConAddress,
  KNABBalance: state.user.KNABBalance,
})

export default connect(mapStateToProps, { loginStart, errorAlert, logout, logout2, walletConnect, walletConnectAddress, getKNABbalance })(
  TopPanel
)
