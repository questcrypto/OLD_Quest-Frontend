import { useEffect, useState } from 'react'
// import { PrimaryButton } from 'shared/components/buttons'
import { connect } from 'react-redux'
import { logout, logout2, walletConnect, walletConnectAddress, setChainId } from 'logic/actions/user.actions'
import Web3 from 'web3'
import { TopPanelCont } from './style'
// import Notifications from './components/Notifications'
import { makeStyles } from '@material-ui/core'

import CustomButton from '../../../../../modules/portfolio/components/shared/Button'
// import { apiBaseUrl } from 'services/global-constant'
import axios from 'axios'
import { getWeb3Val, getKNABBalance, getisWallet } from 'modules/block-chain/BlockChainMethods'
import { errorAlert } from 'logic/actions/alerts.actions'
import { loginStart, getKNABbalance, setWeb3Instance } from 'logic/actions/user.actions'
import MetaMaskIcon from '../../../../../assets/icons/metaMaskIcon.svg'
import { hasApplcationAccess } from 'logic/actions/user.actions'
import IPBlockingModal from 'modules/portfolio/IPBlocking/IPBlockingModal'

const useStyles = makeStyles((theme) => ({
  walletDiv: {
    display: 'flex',
    border: '1px solid #C4C4C4',
    borderRadius: '5px',
    // padding: '4px 8px',
    padding: '4px 12px',
  },
  walletDivText: {
    paddingLeft: '8px',
    position: 'relative',
    top: '3px',
  },
  walletDivTag: {
    padding: '4px 12px',
    marginRight: '16px',
    // backgroundColor: 'linear-gradient(180deg, #E6BA73 0%, #BA8E4D 100%)',
    borderRadius: '5px',
    fontSize: '18px',
    color: '#ec9609',
    // color: '#BA8E4D',
    border: '1px solid'
  },
  walletDivTagText: {
  }
}))

const TopPanel = (props: any) => {
  const classes = useStyles()

  const [account, setAccount] = useState(false)
  let web3: Web3 = new Web3(window.ethereum)

  const {
    loginStart,
    errorAlert,
    loggedIn,
    walletConnect,
    walletConAddress,
    getKNABbalance,
    isWalletCon,
    walletConnectAddress,
    setWeb3Instance,
    hasApplcationAccess,
    setChainId,
    user: { chainId }
  } = props
  const [dataLoading, setDataLoading] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [tokenDummy, setTokenDummy] = useState('')
  const [appAccess, setApplicationAccess] = useState(true)
  const [showIPBlockingModal, setIPBlockingModal] = useState(true)

  const blockedCountriesCodes = ['US', 'AL', 'BA', 'BY', 'CD', 'CI', 'UA', 'CU', 'IQ', 'IR', 'KP', 'LR', 'MK', 'MM', 'RS', 'SD', 'SY', 'ZW']

  useEffect(() => {
    axios
      // .get('https://api.ipify.org')
      // .get('https://ipapi.co/json/')
      .get('https://ipapi.co/json/?key=55UO2jmzizMe4JbOojMgDTeczq2DA7LyLcTiLUTEg1x2grqYbr')
      .then((response) => {
        const isFrom = blockedCountriesCodes.includes(response.data.country_code)
        if (isFrom) {
          setApplicationAccess(false)
          hasApplcationAccess(false)
          //@ts-ignore
          // localStorage.setItem('access', false)
        } else {
          // console.log('***')
          hasApplcationAccess(true)
          setApplicationAccess(true)
          //@ts-ignore
          // localStorage.setItem('access', true)
        }
      })
      .catch((err) => console.log(err))
  }, [props.applicationAccess])
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
            if (isWalletCon) {
              const coinbase = await web3.eth.getCoinbase()
              setWalletAddress(coinbase)
              walletConnectAddress(coinbase)
            }
          }
        }
        data()
      }
    }, 3000)
    chainIdChecking();
  }, [walletAddress, tokenDummy, loggedIn])

  const chainIdChecking = async () => {
    try {
      const web3 = await getWeb3Val()
      if (web3) {
        const chainId = await web3.eth.getChainId();
        // console.log(chainId);
        setChainId(chainId);
      }
    }
    catch (error) { }
  }

  // Event handler to handle metamask account change
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', function () {
      // props.logout()
      props.logout2()
      setWalletAddress('')
      walletConnectAddress('')
      // walletConnect(false);
    })
    window.ethereum.on('networkChanged', function () {
      // props.logout()
      props.logout2()
      setWalletAddress('')
      walletConnectAddress('')
      setChainId('');
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

        // const networkId = await web3.eth.net.getId();
        const chainId = await web3.eth.getChainId();
        // console.log(chainId);
        setChainId(chainId);
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
        setWeb3Instance(web3)
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
  // useEffect(() => {
  //   // console.log(walletConAddress, '0000')
  //   if (walletConAddress !== '' && walletConnect) {
  //     setWalletAddress(walletConAddress)
  //   }
  // })
  // const setAppAccess = () => {
  //   hasApplcationAccess(false)
  // }
  const handleBlocking = () => {
    try {
      // hasApplcationAccess(false)
      setIPBlockingModal(true)
    } catch (error) {
      console.log(error)
    }
  }
  const toggleIPBLockingModal = () => {
    try {
      setIPBlockingModal(false)
    } catch (error) {
      console.log(error)
    }
  }
  // console.log(props.applicationAccess, appAccess, '***')
  return (
    <>
      {!appAccess ? (
        <IPBlockingModal
          show={showIPBlockingModal}
          toggleModal={toggleIPBLockingModal}
          onClose={toggleIPBLockingModal}
          // hasAccess={handleApplicationAccess}
          hasAccess={appAccess}
        />
      ) : (
        ''
      )}
      <TopPanelCont>
        {getisWallet(props.isWalletCon)}
        {
          // loggedIn && (walletAddress !== '') && (tokenDummy !== '') ?
          walletConAddress !== '' ? (
            // walletAddress !== '' ? (
            <>
              <div className={classes.walletDivTag}
                style={{ color: (chainId === 80001) || (chainId === 137) ? '#ec9609' : '#bf4834' }}
              >
                <span className={classes.walletDivTagText}>
                  {chainId === 80001 ? 'TESTNET' : chainId === 137 ? 'MAINNET' : 'Pls connect to Matic Network'}
                </span>
              </div>
              <div className={classes.walletDiv}>
                <img src={MetaMaskIcon} alt="" />
                <span className={classes.walletDivText}>{`${walletConAddress.substring(0, 4)}...${walletConAddress.substring(37, 42)}`}</span>
              </div>
            </>
          ) : (
            <>
              <CustomButton
                size="large"
                style={{ background: 'linear-gradient(180deg, #E6BA73 0%, #BA8E4D 100%)', padding: '4px 24px' }}
                onClick={appAccess && props.applicationAccess ? connectWallet : handleBlocking}
              // onClick={connectWallet}
              >
                {dataLoading ? 'Connecting ...' : 'Connect Wallet'}
              </CustomButton>
            </>
          )
          // <PrimaryButton>Connect Wallet</PrimaryButton>
        }
        {/* <Notifications /> */}
        &nbsp;&nbsp;
        {/* {isWalletCon ? ( */}
        {!loggedIn && isWalletCon ? (
          <CustomButton
            size="large"
            style={{ background: 'linear-gradient(180deg, #E6BA73 0%, #BA8E4D 100%)', padding: '4px 8px' }}
            onClick={() => window.location.reload()}
          >
            Disconnect Wallet
          </CustomButton>
        ) : (
          ''
        )}
      </TopPanelCont>
    </>
  )
}

const mapStateToProps = (state: any) => ({
  loggedIn: state.user.loggedIn,
  userInfo: state.user.userInfo,
  walletConAddress: state.user.walletConAddress,
  KNABBalance: state.user.KNABBalance,
  isWalletCon: state.user.isWalletCon,
  applicationAccess: state.user.applicationAccess,
  user: state.user,
})

export default connect(mapStateToProps, {
  hasApplcationAccess,
  loginStart,
  errorAlert,
  logout,
  logout2,
  walletConnect,
  walletConnectAddress,
  getKNABbalance,
  setWeb3Instance,
  setChainId
})(TopPanel)
