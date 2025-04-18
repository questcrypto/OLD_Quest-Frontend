import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Paper, Typography } from '@material-ui/core'
import { useStyles, Headers, FlexItem } from './style'
import StakingHeader from './components/StakingHeader'
import StakingRow1 from './components/StakingRow1'
import StakingRow2 from './components/StakingRow2'
import StakingRow3 from './components/StakingRow3'
import StakingRow43 from './components/StakingRow43'

import CustomButton from '../components/shared/Button'
import { getWeb3Val } from 'modules/block-chain/BlockChainMethods'
import { walletConnect, walletConnectAddress, setChainId } from 'logic/actions/user.actions'
import { errorAlert } from 'logic/actions/alerts.actions'
import { setKnab, setKnabr } from '../../../logic/actions/staking.action'
import { handleKnabApproval, withdraw, getAssetsKNABBalance, getAssetsKNABrBalance } from '../../../modules/block-chain/BlockChainMethods'

const Staking = (props: any) => {
  const classes = useStyles()

  const { loggedIn, isWalletCon, getBalance, walletConnect, walletConnectAddress, walletConAddress, setKnab, setKnabr, setChainId } = props
  const [dataLoading, setDataLoading] = useState(false)
  const [isWallet, setIsWallet] = useState(false)
  const [show, setShow] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')

  useEffect(() => {
    // console.log('More With Crypto', isWalletCon);
    setIsWallet(isWalletCon)
  }, [isWalletCon])

  useEffect(() => {
    if (walletConAddress.length > 0) {
      getAssetsKNABBalance().then(
        (res) => {
          // console.log(res)
          setKnab(res)
        },
        (err) => {
          console.log(err)
        }
      )

      getAssetsKNABrBalance().then(
        (res) => {
          // console.log(res)
          setKnabr(res)
        },
        (err) => {
          console.log(err)
        }
      )

      // const data = getTvl(0);
      // console.log(data);

      // getTvl(0).then((res) => {
      //   console.log(res);
      // }, err => { console.log(err) })
    }
  }, [walletConAddress])

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        window.alert('Please install MetaMask first.')
        return
      }
      setDataLoading(true)
      const web3 = await getWeb3Val()
      if (web3) {
        const chainId = await web3.eth.getChainId();
        // console.log(chainId);
        setChainId(chainId);
        const coinbase = await web3.eth.getCoinbase()
        if (!coinbase) {
          window.alert('Please activate Wallet first.')
          return
        }
        const publicaddress = coinbase.toLowerCase()
        setWalletAddress(publicaddress)
        walletConnectAddress(publicaddress)
        walletConnect(true)
        getBalance()
        // getBalance()
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
    }
  }

  return (
    <div className={classes.relativeDiv}>
      <Paper className={classes.root} style={{ opacity: isWallet ? 1 : 0.4 }} onMouseOver={() => setShow(true)}>
        <Typography variant="h6">QC Staking</Typography>
        <div className={classes.mainDiv}>
          <StakingHeader />
          <StakingRow1 />
          <StakingRow2 />
          <StakingRow43 />
          <StakingRow3 />
        </div>
      </Paper>

      {show && !isWallet && (
        <div className={classes.hoverBtnDiv} onMouseOut={() => setShow(false)}>
          <CustomButton size="small" style={{ backgroundColor: '#1E3444', padding: '8px 48px' }} onClick={connectWallet}>
            {/* Connect Wallet */}
            {dataLoading ? 'Connecting ...' : 'Connect Wallet'}
          </CustomButton>
          <Typography variant="subtitle2" className={classes.hoverBtnTxt}>
            For Accessing Complete Features
          </Typography>
        </div>
      )}
    </div>
  )
}

// export default Staking;
const mapStateToProps = (state: any) => ({
  loggedIn: state.user.loggedIn,
  isWalletCon: state.user.isWalletCon,
  walletConAddress: state.user.walletConAddress,
  staking: state.staking,
})

export default connect(mapStateToProps, {
  errorAlert,
  walletConnect,
  walletConnectAddress,
  setKnab,
  setKnabr,
  setChainId
})(Staking)
