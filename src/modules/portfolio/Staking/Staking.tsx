import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Paper, Typography } from '@material-ui/core'
import {
  useStyles,
  Headers,
  FlexItem
} from './style'
import StakingHeader from './components/StakingHeader'
import StakingRow1 from './components/StakingRow1'
import StakingRow2 from './components/StakingRow2'
import StakingRow3 from './components/StakingRow3'

import CustomButton from '../components/shared/Button'
import { getWeb3Val } from 'modules/block-chain/BlockChainMethods'
import { walletConnect, walletConnectAddress } from 'logic/actions/user.actions'
import { errorAlert } from 'logic/actions/alerts.actions'

const Staking = (props: any) => {

  const classes = useStyles();

  const { loggedIn, isWalletCon, getBalance, walletConnect, walletConnectAddress } = props
  const [dataLoading, setDataLoading] = useState(false)
  const [isWallet, setIsWallet] = useState(false)
  const [show, setShow] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')

  useEffect(() => {
    // console.log('More With Crypto', isWalletCon);
    setIsWallet(isWalletCon)
  }, [isWalletCon])

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
        <Typography variant="h6">
          QC Staking
        </Typography>
        <div className={classes.mainDiv}>
          <StakingHeader />
          <StakingRow1 />
          <StakingRow2 />
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
  );
}

// export default Staking;
const mapStateToProps = (state: any) => ({
  loggedIn: state.user.loggedIn,
  isWalletCon: state.user.isWalletCon,
  walletConnectAddress: state.user.walletConnectAddress,
})

export default connect(mapStateToProps, { errorAlert, walletConnect, walletConnectAddress })(Staking)