import { Paper, makeStyles, Typography, Slider, Tooltip } from '@material-ui/core'
import { useState, useEffect } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
// import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import Question from 'assets/icons/question.svg'
import Chart from 'assets/images/chart.png'
// import KnabDummy from 'assets/icons/knab_dummy.svg'
import CustomButton from './shared/Button'
import * as tableData from '../../../assets/jsons/yourAssets.json'
import { connect } from 'react-redux'
import { Paths } from 'modules/app/components/routes/types'
// import Web3 from 'web3'
import {
  getWeb3Val,
  getAssetsKNABBalance,
  getAssetsKNABrBalance,
  getAssetsUSDCBalance,
  getAssetsKNAB_USDCBalance,
} from 'modules/block-chain/BlockChainMethods'
import { walletConnect, walletConnectAddress } from 'logic/actions/user.actions'
import { errorAlert } from 'logic/actions/alerts.actions'
import KnabIcon from 'assets/icons/KNAB.svg'
import CoinIcon from 'assets/icons/USDC.svg'
import { KNABAddressTest, stableCoinAbi } from 'modules/block-chain/abi'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
    marginTop: theme.spacing(4),
  },
  title: {
    padding: theme.spacing(2),
    // marginBottom: theme.spacing(1)
  },
  table: {
    minWidth: 650,
  },
  questionImg: {
    width: '13px',
    height: '13px',
    paddingLeft: '6px',
    position: 'relative',
    top: '2px',
  },
  firstDiv: {
    display: 'flex',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconImg: {
    paddingRight: '6px',
  },
  btnDiv: {
    display: 'flex',
    justifyContent: 'center',
    padding: '16px 0px',
  },
  percentText: {
    color: '#858585',
  },
  sliderRoot: {
    color: '#858585',
  },
  sliderThumb: {
    width: '0px',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  mainDiv: {
    position: 'relative',
  },
  hoverBtnDiv: {
    top: '0%',
    left: '0%',
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: '#858585',
    color: '#FFFFFF',
  },
  hoverBtnTxt: {
    position: 'relative',
    left: '3%',
  },
}))

let tableInfo = tableData.tableData

const YourAssets = (props: any) => {
  const { loggedIn, isWalletCon, getBalance, hasAccess, handleBlocking } = props

  const classes = useStyles()
  const [isWallet, setIsWallet] = useState(false)
  const [show, setShow] = useState(false)

  // useEffect(() => {
  //   setIsWallet(loggedIn);
  // }, [loggedIn])

  useEffect(() => {
    setIsWallet(isWalletCon)
  }, [isWalletCon])

  const { errorAlert, walletConnect, walletConnectAddress } = props
  const [dataLoading, setDataLoading] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [tokenDummy, setTokenDummy] = useState('')
  const [assetsKNABBalance, setAssetsKNABBalance] = useState(0)
  const [assetsKNABrBalance, setassetsKNABrBalance] = useState(0)
  const [assetsUSDCBalance, setassetsUSDCBalance] = useState(0)
  const [assetsKNAB_USDCBalance, setKNAB_usdcBalance2] = useState(0)

  const getToken = () => {
    try {
      const token: any = localStorage.getItem('token')
      setTokenDummy(token)
    } catch (error) {
      console.log(error)
    }
  }
  const tableBody2 = [
    {
      asset: { icon: `${KnabIcon}`, name: 'KNAB' },
      balance: `${assetsKNABBalance}`,
      availableQty: '0.000000',
      price: { value: `$ 1`, percent: 0.0 },
      holdings: 0.0,
    },
    {
      asset: { icon: `${CoinIcon}`, name: 'KNABr' },
      balance: `${assetsKNABrBalance}`,
      availableQty: '0.000000',
      price: { value: `$ 0`, percent: 0.0 },
      holdings: 0.0,
    },
    {
      asset: { icon: `${CoinIcon}`, name: 'USDC' },
      balance: `${assetsUSDCBalance}`,
      availableQty: '0.000000',
      price: { value: `$ 1`, percent: 0.0 },
      holdings: 0.0,
    },
    {
      asset: { icon: `${CoinIcon}`, name: 'KNAB-USDC' },
      balance: `${assetsKNAB_USDCBalance}`,
      availableQty: '0.000000',
      price: { value: `$ 0`, percent: 0.0 },
      holdings: 0.0,
    },
  ]
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

  const handleAssetsKNABBalance = async () => {
    const KNABBalance: any = await getAssetsKNABBalance()
    const KNABrBalance: any = await getAssetsKNABrBalance()
    const USDCBalance: any = await getAssetsUSDCBalance()
    const KNAB_USDCBalance: any = await getAssetsKNAB_USDCBalance()
    console.log(typeof KNABBalance, typeof KNABrBalance, typeof USDCBalance, typeof KNAB_USDCBalance, '***')
    // setAssetsKNABBalance(KNABBalance / 10 ** 18)
    // setassetsKNABrBalance(KNABrBalance / 10 ** 18)
    // setassetsUSDCBalance(USDCBalance / 10 ** 6)
    // setKNAB_usdcBalance2(KNAB_USDCBalance / 10 ** 18)
    setAssetsKNABBalance(KNABBalance)
    setassetsKNABrBalance(KNABrBalance)
    setassetsUSDCBalance(USDCBalance)
    setKNAB_usdcBalance2(KNAB_USDCBalance)
  }
  useEffect(() => {
    if (isWalletCon) handleAssetsKNABBalance()
  }, [isWalletCon])
  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  return (
    <div className={classes.mainDiv}>
      <Paper className={classes.root} style={{ opacity: isWallet ? 1 : 0.4 }} onMouseOver={() => setShow(true)}>
        <Typography variant="subtitle1" className={classes.title}>
          Your Assets
          <Tooltip title="Lorem ipsum dolor sit amet" enterDelay={100} leaveDelay={100}>
            <img src={Question} alt="question" className={classes.questionImg} />
          </Tooltip>
        </Typography>

        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableInfo &&
                tableInfo.tableHeaders &&
                tableInfo.tableHeaders.map((header: any, index: any) => {
                  return <TableCell key={index}>{header.label}</TableCell>
                })}
              <TableCell>Chart</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tableInfo &&
              tableInfo.tableBody &&
              tableBody2.map((row: any, index) => {
                return (
                  <TableRow key={index}>
                    {tableInfo.tableHeaders.map((item: any, ind) => {
                      return (
                        <TableCell key={ind}>
                          {item.key === 'asset' && (
                            <div className={classes.firstDiv}>
                              <img src={row[item.key].icon} alt="" className={classes.iconImg} />
                              {/* <img src={KnabIcon} alt="" className={classes.iconImg} /> */}
                              {row[item.key].name}
                            </div>
                          )}
                          {item.key === 'price' && (
                            <div>
                              {row[item.key].value} <br />
                              {/* <span className={classes.percentText}>+{row[item.key].percent}%</span> */}
                            </div>
                          )}
                          {item.key === 'holdings' && (
                            <div>
                              <div>
                                {row[item.key]}
                                <br />
                                <Slider value={row[item.key]} classes={{ root: classes.sliderRoot, thumb: classes.sliderThumb }} />
                              </div>
                            </div>
                          )}
                          {item.key !== 'asset' && item.key !== 'price' && item.key !== 'holdings' && row[item.key]}
                        </TableCell>
                      )
                    })}
                    <TableCell>
                      <img src={Chart} alt="" onClick={() => openInNewTab(`http://localhost:3000${Paths.tokenDetails}`)} />
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>

        <div className={classes.btnDiv}>
          <CustomButton size="large" style={{ backgroundColor: '#1E3444', padding: '8px 24px' }}>
            View More
          </CustomButton>
        </div>
      </Paper>

      {show && !isWallet && (
        <div className={classes.hoverBtnDiv} onMouseOut={() => setShow(false)}>
          <CustomButton
            size="small"
            style={{ backgroundColor: '#1E3444', padding: '8px 48px' }}
            // onClick={connectWallet}
            onClick={hasAccess ? connectWallet : handleBlocking}
          >
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

// export default YourAssets;
const mapStateToProps = (state: any) => ({
  loggedIn: state.user.loggedIn,
  isWalletCon: state.user.isWalletCon,
  userInfo: state.user.userInfo,
  walletConnectAddress: state.user.walletConnectAddress,
  web3Instance: state.user.web3Instance,
})

export default connect(mapStateToProps, { errorAlert, walletConnect, walletConnectAddress })(YourAssets)
