import { Paper, makeStyles, Typography, Slider, Tooltip, Avatar, withStyles, Theme } from '@material-ui/core'
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { useState, useEffect } from 'react'
import TableContainer from '@material-ui/core/TableContainer'
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
  getQuestBalance,
  getQuestSupply,
  getKnabrSupply,
  getUsdcSupply,
  getLpSupply,
  getLp2Supply
} from 'modules/block-chain/BlockChainMethods'
import { walletConnect, walletConnectAddress, setChainId } from 'logic/actions/user.actions'
import { setQuest, setQuestSupply, setKnabSupply, setUsdcSupply, setKnabrSupply, setLpSupply, setLp2Supply } from 'logic/actions/staking.action'
import { errorAlert } from 'logic/actions/alerts.actions'
import KnabIcon from 'assets/icons/KNAB.svg'
import CoinIcon from 'assets/icons/USDC.svg'
import KnabDummy from 'assets/icons/knab_dummy.svg'
import {
  KNABAddressTest,
  stableCoinAbi,
  KNABaddress,
  KNABrAddress,
  USDCAddress,
  LPTokenAddress,
  LPTokenAddress2,
  questAddress
} from 'modules/block-chain/abi'
const commaNumber = require('comma-number')

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    position: 'relative',
  },
  root: {
    height: 'auto',
    marginTop: theme.spacing(4),
  },
  title: {
    padding: theme.spacing(2),
    fontWeight: 'bolder',
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
    cursor: 'pointer',
  },
  iconImg: {
    paddingRight: '6px',
  },
  avatarImg: {
    width: '35px',
    height: '35px',
    border: 'none'
  },
  avatarImg2: {
    width: '35px',
    height: '35px',
    border: 'none',
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
    // background: '#858585',
    // background: 'rgba(133, 133, 133, 0.85)',
    color: '#FFFFFF',
    '&:hover': {
      background: 'rgba(133, 133, 133, 0.85)',
      transition: 'background 1s linear'
    }
  },
  hoverBtnTxt: {
    position: 'relative',
    left: '3%',
  },
}))

let tableInfo = tableData.tableData

const YourAssets = (props: any) => {

  const polygonScanLink = 'https://polygonscan.com/'
  const {
    loggedIn,
    isWalletCon,
    getBalance,
    // hasAccess,
    // handleBlocking,
    staking: { knab, knabr, usdc, quest, quest_supply, knab_supply, usdc_supply, knabr_supply, lp_supply, lp, lp2, lp2_supply },
    setQuest,
    setQuestSupply,
    setKnabSupply,
    setUsdcSupply,
    setKnabrSupply,
    setLpSupply,
    setLp2Supply
  } = props
  const classes = useStyles()
  const [isWallet, setIsWallet] = useState(false)
  const [show, setShow] = useState(false)
  // useEffect(() => {
  //   setIsWallet(loggedIn);
  // }, [loggedIn])
  useEffect(() => {
    setIsWallet(isWalletCon);

    getQuestBalance().then((res) => {
      setQuest(res)
    })

    getQuestSupply().then((res) => {
      setQuestSupply(res)
    })

    getKnabrSupply().then((res) => {
      setKnabrSupply(res);
    })

    getUsdcSupply().then((res) => {
      setUsdcSupply(res);
    })

    getLpSupply().then((res) => {
      setLpSupply(res);
    })

    getLp2Supply().then((res) => {
      setLp2Supply(res);
    })

  }, [isWalletCon])

  const { errorAlert, walletConnect, walletConnectAddress, setChainId } = props
  const [dataLoading, setDataLoading] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [tokenDummy, setTokenDummy] = useState('')
  const [assetsKNABBalance, setAssetsKNABBalance] = useState(0)
  const [assetsKNABrBalance, setassetsKNABrBalance] = useState('0')
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
  // const tableBody2 = [
  //   {
  //     asset: { icon: `${KnabIcon}`, name: 'KNAB' },
  //     balance: `${assetsKNABBalance}`,
  //     availableQty: commaNumber(100000000),
  //     price: 1,
  //     // holdings: { value: assetsKNABBalance / 100000000, percent: 0.0 },
  //     holdings: { value: (assetsKNABBalance / 100000000).toFixed(2) , percent: 0.0 },
  //   },
  //   {
  //     asset: { icon: `${CoinIcon}`, name: 'KNABr' },
  //     balance: `${assetsKNABrBalance}`,
  //     availableQty: '0.00',
  //     price: 0.0,
  //     holdings: { value: `$ 0`, percent: 0.0 },
  //   },
  //   {
  //     asset: { icon: `${CoinIcon}`, name: 'USDC' },
  //     balance: `${assetsUSDCBalance}`,
  //     availableQty: commaNumber(1243483555),
  //     price: 1,
  //     // holdings: { value: assetsUSDCBalance / 1243483555, percent: 0.0 },
  //     holdings: { value: (assetsUSDCBalance / 1243483555).toFixed(2), percent: 0.0 },
  //   },
  //   {
  //     asset: { icon: `${CoinIcon}`, name: 'KNAB-USDC' },
  //     balance: `${assetsKNAB_USDCBalance}`,
  //     availableQty: '0.00',
  //     price: 0.0,
  //     holdings: { value: `$ 0`, percent: 0.0 },
  //   },
  // ]
  const tableBody2 = [
    {
      asset: { icon: `${KnabIcon}`, name: 'KNAB' },
      balance: `${knab}`,
      availableQty: commaNumber(knab_supply),
      price: `$1`,
      // holdings: { value: assetsKNABBalance / 100000000, percent: 0.0 },
      holdings: { value: `${knab_supply > 0 ? ((knab * 100) / knab_supply).toFixed(3) : '0.00'} %`, percent: 0.0 },
    },
    {
      asset: { icon: `${CoinIcon}`, name: 'KNABr' },
      balance: `${knabr}`,
      availableQty: commaNumber(knabr_supply),
      price: `$0.0`,
      holdings: { value: `${knabr_supply > 0 ? ((knabr * 100) / knabr_supply).toFixed(3) : '0.00'} % `, percent: 0.0 },
    },
    {
      asset: { icon: `${CoinIcon}`, name: 'USDC' },
      balance: `${usdc}`,
      availableQty: commaNumber(usdc_supply),
      price: `$1`,
      // holdings: { value: assetsUSDCBalance / 1243483555, percent: 0.0 },
      holdings: { value: `${usdc_supply > 0 ? ((usdc * 100) / usdc_supply).toFixed(3) : '0.00'} %`, percent: 0.0 },
    },
    {
      asset: { icon: `${CoinIcon}`, name: 'KNAB-USDC(Q)' },
      // balance: `${assetsKNAB_USDCBalance}`,

      // balance: `${lp * 10 ** 4}`,
      balance: `${(lp / 10 ** 14).toFixed(3)}`,
      availableQty: commaNumber((lp_supply * (10 ** 4)).toFixed(3)),
      price: `$0.0`,
      // holdings: { value: `${lp_supply > 0 ? ((lp * 100) / lp_supply).toFixed(3) : '0.00'} %`, percent: 0.0 },
      holdings: { value: `${lp_supply > 0 ? (((lp/10**14) * 100) / lp_supply).toFixed(3) : '0.00'} %`, percent: 0.0 },
    },
    {
      asset: { icon: `${CoinIcon}`, name: 'KNAB-USDC(S)' },
      // balance: `${assetsKNAB_USDCBalance}`,

      // balance: `${lp2 * 10 ** 4}`,
      balance: `${(lp2 / 10 ** 14).toFixed(3)}`,
      availableQty: commaNumber((lp2_supply * (10 ** 4)).toFixed(3)),
      price: `$0.0`,
      // holdings: { value: `${lp2_supply > 0 ? ((lp2 * 100) / lp2_supply).toFixed(3) : '0.00'} %`, percent: 0.0 },
      holdings: { value: `${lp2_supply > 0 ? (((lp2/10**14) * 100) / lp2_supply).toFixed(3) : '0.00'} %`, percent: 0.0 },
    },
    {
      asset: { icon: `${KnabDummy}`, name: 'QUEST' },
      balance: `${quest}`,
      availableQty: `${quest_supply}`,
      price: `$1`,
      holdings: { value: `${quest_supply > 0 ? ((quest * 100) / quest_supply).toFixed(3) : '0.00'} %`, percent: 0.0 },
    },
  ]
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        window.alert('Please install MetaMask first.')
        return
      }
      setDataLoading(true)
      const web3 = await getWeb3Val()
      if (web3) {
        const chainId = await web3.eth.getChainId()
        // console.log(chainId);
        setChainId(chainId)
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
    } catch (error :any) {
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
    const questBalance: any = await getQuestBalance()
    const questSupplyVal: any = await getQuestSupply()
    // console.log(typeof KNABBalance, typeof KNABrBalance, typeof USDCBalance, typeof KNAB_USDCBalance, '***')
    // setAssetsKNABBalance(KNABBalance / 10 ** 18)
    // setassetsKNABrBalance(KNABrBalance / 10 ** 18)
    // setassetsUSDCBalance(USDCBalance / 10 ** 6)
    // setKNAB_usdcBalance2(KNAB_USDCBalance / 10 ** 18)
    setAssetsKNABBalance(KNABBalance)
    setassetsKNABrBalance(parseFloat(KNABrBalance).toFixed(2))
    setassetsUSDCBalance(USDCBalance)
    setKNAB_usdcBalance2(KNAB_USDCBalance)
    setQuest(questBalance)
    setQuestSupply(questSupplyVal)
  }
  useEffect(() => {
    if (isWalletCon) handleAssetsKNABBalance()
  }, [isWalletCon])

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const openInNewTab2 = (url: string, asset: any) => {
    console.log(asset);
    let finalUrl;
    switch (asset) {
      case 'KNAB':
        finalUrl = url + 'token/' + KNABaddress;
        break;
      case 'KNABr':
        finalUrl = url + 'token/' + KNABrAddress;
        break;
      case 'USDC':
        finalUrl = url + 'token/' + USDCAddress;
        break;
      case 'KNAB-USDC(Q)':
        finalUrl = url + 'token/' + LPTokenAddress;
        break;
      case 'KNAB-USDC(S)':
        finalUrl = url + 'token/' + LPTokenAddress2;
        break;
      case 'QUEST':
        finalUrl = url + 'token/' + questAddress;
        break;
    }
    const newWindow = window.open(finalUrl, '_blank', 'noopener,noreferrer')
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
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableInfo &&
                  tableInfo.tableHeaders &&
                  tableInfo.tableHeaders.map((header: any, index: any) => {
                    return (
                      <TableCell key={index} style={{ fontWeight: 'bolder' }}>
                        {header.label}
                      </TableCell>
                    )
                  })}
                <TableCell style={{ fontWeight: 'bolder' }}>Chart</TableCell>
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
                              <div
                                className={classes.firstDiv}
                                onClick={() => openInNewTab2(`${polygonScanLink}`, row[item.key].name)}>
                                {row[item.key].name === 'KNAB-USDC(Q)' || row[item.key].name === 'KNAB-USDC(S)' ?
                                  <AvatarGroup max={2}>
                                    <Avatar alt="" src={KnabIcon} style={{ background: '#FFF' }} className={classes.avatarImg} />
                                    <Avatar alt="" src={CoinIcon} className={classes.avatarImg2} />
                                  </AvatarGroup> :
                                  <img src={row[item.key].icon} alt="" className={classes.iconImg} />
                                }


                                {/* <img src={KnabIcon} alt="" className={classes.iconImg} /> */}
                                {row[item.key].name}
                              </div>
                            )}
                            {item.key === 'price' && (
                              <div>
                                {row[item.key]} <br />
                                {/* <span className={classes.percentText}>+{row[item.key].percent}%</span> */}
                              </div>
                            )}
                            {item.key === 'holdings' && (
                              <div>
                                <div>
                                  {row[item.key].value}
                                  {/* <br />
                                <Slider value={row[item.key]} classes={{ root: classes.sliderRoot, thumb: classes.sliderThumb }} /> */}
                                </div>
                              </div>
                            )}
                            {item.key === 'balance' && (
                              <span>
                                {index === 3 || index === 4 ?
                                  <span>
                                    {row[item.key]}
                                    <CustomTooltip
                                      title="Multiplied by 10000"
                                      arrow>
                                      <img src={Question} alt="" className={classes.questionImg} />
                                    </CustomTooltip>
                                  </span>
                                  : row[item.key]
                                }
                              </span>
                            )
                            }
                            {item.key === 'availableQty' && (
                              <span>
                                {index === 3 || index === 4 ?
                                  <span>
                                    {row[item.key]}
                                    <CustomTooltip
                                      title="Multiplied by 10000"
                                      arrow>
                                      <img src={Question} alt="" className={classes.questionImg} />
                                    </CustomTooltip>
                                  </span>
                                  : row[item.key]
                                }
                              </span>
                            )
                            }
                            {item.key !== 'asset' && item.key !== 'price' && item.key !== 'holdings' && item.key !== 'balance'&& item.key !== 'availableQty' && row[item.key]}
                          </TableCell>
                        )
                      })}
                      <TableCell style={{ cursor: 'pointer' }}>
                        <img
                          src={Chart}
                          alt=""
                          // onClick={() => openInNewTab(`http://localhost:3000${Paths.tokenDetails}`)}
                          onClick={() => openInNewTab(`https://questcrypto.app${Paths.tokenDetails}`)}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <div className={classes.btnDiv}>
          <CustomButton size="large" style={{ backgroundColor: '#1E3444', padding: '8px 24px' }}>
            View More
          </CustomButton>
        </div> */}
      </Paper>

      {
        show && !isWallet && (
          <div className={classes.hoverBtnDiv} onMouseOut={() => setShow(false)}>
            <CustomButton
              size="small"
              style={{ backgroundColor: '#1E3444', padding: '8px 48px' }}
              onClick={connectWallet}
            // onClick={props.applicationAccess ? connectWallet : handleBlocking}
            >
              {dataLoading ? 'Connecting ...' : 'Connect Wallet'}
            </CustomButton>
            <Typography variant="subtitle2" className={classes.hoverBtnTxt}>
              For Accessing Complete Features
            </Typography>
          </div>
        )
      }
    </div >
  )
}

// export default YourAssets;
const mapStateToProps = (state: any) => ({
  loggedIn: state.user.loggedIn,
  isWalletCon: state.user.isWalletCon,
  userInfo: state.user.userInfo,
  walletConnectAddress: state.user.walletConnectAddress,
  web3Instance: state.user.web3Instance,
  // applicationAccess: state.user.applicationAccess,
  staking: state.staking,
})

export default connect(mapStateToProps, {
  errorAlert,
  walletConnect,
  walletConnectAddress,
  setChainId,
  setQuest,
  setQuestSupply,
  setKnabSupply,
  setUsdcSupply,
  setKnabrSupply,
  setLpSupply,
  setLp2Supply
})(YourAssets)

const CustomTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#878787',
    fontFamily: 'NexaRegular',
    color: '#FFF'
  },
  arrow: {
    color: '#C4C4C4',
  },
}))(Tooltip)
