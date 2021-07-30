import { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import axios from 'axios'
import { makeStyles, Paper, Typography, Grid } from '@material-ui/core'
import CustomButton from '../components/shared/Button'
import { fetchDetails } from '../../../modules/block-chain/BlockChainMethods'
import ICOHoldings from './ICOHoldings'
import RaisedTokens from './RaisedTokens'
import TokensRemaining from './TokensRemainng'
import CrowdSaleContract from './CrowdSaleContract'
import { getKNABbalance } from 'logic/actions/user.actions'
import { getKNABBalance } from '../../../modules/block-chain/BlockChainMethods'
import { hasApplcationAccess } from 'logic/actions/user.actions'
import { logout } from 'logic/actions/user.actions'
import history from 'modules/app/components/history'
import { Paths } from 'modules/app/components/routes/types'
import BuyAndConvertModal from '../components/BuyAndConvertModal'
import { getWeb3Val, buyKnab, handlestableCoinapproval } from '../../../modules/block-chain/BlockChainMethods'
import { stableCoinAbi, stableCoinContractAddress, ICOAddress } from '../../../modules/block-chain/abi'
import { successAlert, errorAlert } from 'logic/actions/alerts.actions'
import USDC from 'assets/icons/USDC.svg'
import KNAB from 'assets/icons/KNAB.svg'
import IPBlockingModal from '../IPBlocking/IPBlockingModal'
const commaNumber = require('comma-number')

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    // backgroundColor: '#E5E5E5'
    // paddingTop: theme.spacing(7),
    // paddingRight: theme.spacing(5),
  },
  header: {
    // display: 'flex',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnDiv: {
    // width: '100%',
    // display: 'flex',
    // justifyContent: 'flex-end',
  },
  title: {
    fontSize: '1em',
    fontWeight: 'bold',
    // width: '100%',
  },
  subTitle: {
    color: '##C4C4C4',
    fontWeight: 'bold',
    fontSize: '1em',
  },
  paper: {
    display: 'flex',
    padding: '30px',
  },
  gridHeight: {
    height: '100%',
  },
}))
const ICODetails = (props: any) => {
  const { getKNABbalance, errorAlert, loggedIn, successAlert, applicationAccess, hasApplcationAccess } = props
  const classes = useStyles()
  const [tokensData, setTokensData] = useState({ bonusRatio: 0, tokensSold: '0', tokensLeft: '0' })
  const [bcModal, setBcModal] = useState(false)
  const [isConfirm, setIsConfirm] = useState(false)
  const [isTransaction, setIsTransaction] = useState(false)
  const [loader, setLoader] = useState(false)

  const [appAccess, setApplicationAccess] = useState(true)
  const [showIPBlockingModal, setIPBlockingModal] = useState(true)
  const blockedCountriesCodes = ['US', 'AL', 'BA', 'BY', 'CD', 'CI', 'UA', 'CU', 'IQ', 'IR', 'KP', 'LR', 'MK', 'MM', 'RS', 'SD', 'SY', 'ZW']

  useEffect(() => {
    axios
      .get('https://ipapi.co/json/?key=55UO2jmzizMe4JbOojMgDTeczq2DA7LyLcTiLUTEg1x2grqYbr')
      .then((response) => {
        const isFrom = blockedCountriesCodes.includes(response.data.country_code)
        if (isFrom) {
          setApplicationAccess(false)
          hasApplcationAccess(false)
        } else {
          hasApplcationAccess(true)
          setApplicationAccess(true)
        }
      })
      .catch((err) => console.log(err))
  }, [props.applicationAccess])

  const handleBlocking = () => {
    try {
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

  const getBalance = async () => {
    const KNABBalance: any = await getKNABBalance()
    getKNABbalance(KNABBalance / 10 ** 18)
  }
  useEffect(() => {
    getBalance()
  }, [])
  useEffect(() => {
    fetchDetails().then(
      (res) => {
        setTokensData({
          ...tokensData,
          tokensSold: commaNumber(res['tokensSold']),
          tokensLeft: commaNumber(res['tokensLeft']),
        })
      },
      (err) => {
        console.log(err)
      }
    )
  }, [])
  const submitModalFn = async (values: any) => {
    try {
      const fromData = values.from
      // if (loggedIn) {
      if (true) {
        setLoader(true)
        const web3 = await getWeb3Val()
        if (web3) {
          const accounts = await web3.eth.getAccounts()
          const contractSc = new web3.eth.Contract(stableCoinAbi, stableCoinContractAddress)
          const res: any = await getKNABBalance()
          // console.log(res, '***')
          // const res: any = await contractSc.methods.approve(ICOAddress, fromData).send({ from: accounts[0] });

          handlestableCoinapproval(contractSc, accounts[0], fromData).then(
            (res) => {
              if (res) {
                setLoader(false)
                setIsConfirm(true)
              }
            },
            (err) => {
              setLoader(false)
              console.log(err)
            }
          )
        }
      } else {
        alert('Please connect wallet to continue')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const confirmTransaction = async (values: any) => {
    try {
      const fromData = values.from
      // console.log(typeof fromData);
      const web3 = await getWeb3Val()
      if (web3) {
        setIsTransaction(true)
        // const res2: any = await contractSc.methods.approve(accounts[0], 0);
        const data = buyKnab(fromData)
        data.then(
          (res) => {
            // console.log(res);
            setIsTransaction(false)
            setBcModal(false)
            setIsConfirm(false)
            successAlert('Transaction completed successfully')
            getBalance()
          },
          (error) => {
            setIsTransaction(false)
            setBcModal(false)
            setIsConfirm(false)
            console.log(error)
            errorAlert('Something went wrong , please try again')
            // if (!!error && error.response && error.response.data.message) {
            //   errorAlert(error.response.data.message)
            // } else if (!!error.message) {
            //   errorAlert(error.message)
            // } else {
            //   errorAlert('Something went wrong , please try again')
            // }
          }
        )
      }
    } catch (error) {
      console.log(error)
    } finally {
      // setIsTransaction(false);
    }
  }
  const rejectTransaction = () => {
    try {
      setIsConfirm(false)
    } catch (error) {
      console.log(error)
    }
  }
  const handleAuction = () => {
    if (loggedIn) {
      history.push(Paths.auction)
    } else {
      logout(false)
      history.push(Paths.login)
    }
  }
  const openbcModal = () => {
    try {
      setBcModal(true)
    } catch (error) {
      console.log(error)
    }
  }
  const handlebcModalClose = () => {
    try {
      setBcModal(false)
      setIsConfirm(false)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(applicationAccess, '*** applicationAccess')
  return (
    <>
      <section>
        {!appAccess && (
          <IPBlockingModal
            show={showIPBlockingModal}
            toggleModal={toggleIPBLockingModal}
            onClose={toggleIPBLockingModal}
            hasAccess={appAccess}
          />
        )}
      </section>
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography className={classes.title}>ICO Details</Typography>
          <div className={classes.btnDiv}>
            <CustomButton
              size="small"
              disableElevation
              disableFocusRipple
              disableRipple
              style={{ backgroundColor: '#858585', padding: '8px 16px', margin: '0 0 10px 0' }}
            >
              00.00&nbsp;KNABr
            </CustomButton>
            &nbsp;&nbsp;&nbsp;
            <CustomButton
              size="small"
              disableElevation
              disableFocusRipple
              disableRipple
              style={{ backgroundColor: '#858585', padding: '8px 16px', margin: '0 0 10px 0' }}
            >
              {props.isWalletCon && applicationAccess ? Number(props.KNABBalance.toFixed(3)) : 0.0}&nbsp;KNAB
              {/* {Number(props.KNABBalance.toFixed(3))} KNAB */}
            </CustomButton>
            &nbsp;&nbsp;&nbsp;
            <CustomButton
              size="small"
              style={{ backgroundColor: '#1E3444', padding: '8px 16px', margin: '0 0 10px 0' }}
              // onClick={appAccess && props.applicationAccess ? () => handleAuction() : handleBlocking}
              onClick={() => handleAuction()}
            >
              Real&nbsp;Estate&nbsp;Auctions
            </CustomButton>
            &nbsp;&nbsp;&nbsp;
            <CustomButton
              size="small"
              style={{ backgroundColor: '#1E3444', padding: '8px 16px', margin: '0 0 10px 0' }}
              // onClick={props.applicationAccess ? () => history.push(Paths.login) : handleBlocking}
              onClick={() => history.push(Paths.login)}
            >
              Buy&nbsp;|&nbsp;Convert&nbsp;Quest
            </CustomButton>
            &nbsp;&nbsp;&nbsp;
            <CustomButton
              size="small"
              style={{ backgroundColor: '#1E3444', padding: '8px 16px', margin: '0 0 10px 0' }}
              onClick={appAccess ? openbcModal : handleBlocking}
            >
              Buy&nbsp;KNAB
            </CustomButton>
          </div>
        </div>
        <br />

        <Paper>
          <br />
          <Grid container spacing={2} className={classes.paper}>
            <Grid item md={5} xs={12}>
              <ICOHoldings
                knabBalance={props.isWalletCon ? props.KNABBalance : 0}
                // knabBalance={props.KNABBalance}
              />
            </Grid>
            <Grid item md={7} xs={12}>
              <RaisedTokens tokensData={tokensData} />
            </Grid>
          </Grid>
          <Grid spacing={2} className={classes.paper}>
            <Grid item md={12} xs={12}>
              <TokensRemaining tokensData={tokensData} />
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.paper}>
            <Grid item md={12} xs={12}>
              <CrowdSaleContract />
            </Grid>
          </Grid>
        </Paper>
        {bcModal ? (
          <BuyAndConvertModal
            show={bcModal}
            toggleModal={handlebcModalClose}
            onClose={handlebcModalClose}
            // headerText="Buying | Converting KNAB Tokens"
            headerText="Buy KNAB Tokens"
            options1={options1}
            options2={options2}
            onModalSubmit={submitModalFn}
            isConfirm={isConfirm}
            conversionData={conversionData}
            confirmTransaction={confirmTransaction}
            rejectTransaction={rejectTransaction}
            isTransaction={isTransaction}
            loader={loader}
          />
        ) : (
          ''
        )}
      </div>
    </>
  )
}

const options1 = [{ name: 'USDC', icon: USDC, id: 'usdc_from', key: 'usdc' }]
const options2 = [{ name: 'KNAB', icon: KNAB, id: 'knab_to', key: 'knab' }]
const conversionData = {
  usdc: {
    usdc: 1,
    knab: 2.672,
  },
  knab: {
    knab: 1,
    usdc: 0.374255,
  },
}

const mapStateToProps = (state: any) => ({
  KNABBalance: state.user.KNABBalance,
  isWalletCon: state.user.isWalletCon,
  loggedIn: state.user.loggedIn,
  loading: state.user.loading,
  applicationAccess: state.user.applicationAccess,
})
export default withRouter(connect(mapStateToProps, { hasApplcationAccess, successAlert, errorAlert, getKNABbalance })(ICODetails))
