import { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import axios from 'axios'
import { makeStyles, Paper, Typography, Grid } from '@material-ui/core'
import CustomButton from '../components/shared/Button'
// import TokenCard from './TokenCard'
import KnabrCard from './KnabrCard'
import TokensData from './TokensData'
import TokensGraph from '../components/Graph/Graph'
import { getKNABbalance } from 'logic/actions/user.actions'
import { getKNABBalance } from '../../../modules/block-chain/BlockChainMethods'
import KnabCard from './KnabCard'
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

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    // backgroundColor: '#E5E5E5'
    paddingTop: theme.spacing(7),
    paddingRight: theme.spacing(5),
  },
  header: {
    display: 'flex',
    // padding: '30px',
  },
  btnDiv: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: '1em',
    fontWeight: 'bold',
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
const TokenDetails = (props: any) => {
  const classes = useStyles()
  const {
    hasApplcationAccess,
    loggedIn,
    // getKNABbalance,
    errorAlert,
    successAlert,
    applicationAccess,
  } = props
  const [bcModal, setBcModal] = useState(false)
  const [isConfirm, setIsConfirm] = useState(false)
  const [isTransaction, setIsTransaction] = useState(false)
  const [loader, setLoader] = useState(false)
  const [showIPBlockingModal, setIPBlockingModal] = useState(false)
  const [appAccess, setApplicationAccess] = useState(true)
  // useEffect(() => {
  //   const appAccess = localStorage.getItem('access')
  //   hasApplcationAccess(appAccess)
  // }, [])
  // const blockedCountriesCodes = ['US', 'AL', 'BA', 'BY', 'CD', 'CI', 'UA', 'CU', 'IQ', 'IR', 'KP', 'LR', 'MK', 'MM', 'RS', 'SD', 'SY', 'ZW']

  // useEffect(() => {
  //   axios
  //     // .get('https://api.ipify.org')
  //     .get('https://ipapi.co/json/')
  //     .then((response) => {
  //       // console.log(response.data.country_code, '***')
  //       const isFrom = blockedCountriesCodes.includes(response.data.country_code)
  //       if (isFrom) {
  //         setApplicationAccess(false)
  //         hasApplcationAccess(false)
  //         //@ts-ignore
  //         // localStorage.setItem('access', false)
  //       } else {
  //         setApplicationAccess(true)
  //         hasApplcationAccess(true)
  //         //@ts-ignore
  //         // localStorage.setItem('access', true)
  //       }
  //     })
  //     .catch((err) => console.log(err))
  // })
  const getBalance = async () => {
    const KNABBalance: any = await getKNABBalance()
    getKNABbalance(KNABBalance / 10 ** 18)
  }

  useEffect(() => {
    getBalance()
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
  return (
    <>
      {/* {!appAccess ? (
        <IPBlockingModal
          show={showIPBlockingModal}
          toggleModal={toggleIPBLockingModal}
          onClose={toggleIPBLockingModal}
          // hasAccess={handleApplicationAccess}
          hasAccess={appAccess}
        />
      ) : (
        ''
      )} */}
      <IPBlockingModal
        show={showIPBlockingModal}
        toggleModal={toggleIPBLockingModal}
        onClose={toggleIPBLockingModal}
        // hasAccess={handleApplicationAccess}
        hasAccess={appAccess}
      />
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography className={classes.title}>Token Details</Typography>
          <div className={classes.btnDiv}>
            <CustomButton
              size="small"
              disableElevation
              disableFocusRipple
              disableRipple
              style={{ backgroundColor: '#858585', padding: '0px 16px' }}
            >
              00.00 KNABr
            </CustomButton>
            &nbsp;&nbsp;&nbsp;
            <CustomButton
              size="small"
              disableElevation
              disableFocusRipple
              disableRipple
              style={{ backgroundColor: '#858585', padding: '0px 16px' }}
            >
              {props.isWalletCon ? props.KNABBalance : 0} KNAB
            </CustomButton>
            &nbsp;&nbsp;&nbsp;
            <CustomButton
              size="small"
              style={{ backgroundColor: '#1E3444', padding: '0px 16px' }}
              onClick={props.applicationAccess ? () => handleAuction() : handleBlocking}
            >
              Real Estate Auctions
            </CustomButton>
            &nbsp;&nbsp;&nbsp;
            <CustomButton
              size="small"
              style={{ backgroundColor: '#1E3444', padding: '0px 16px' }}
              onClick={props.applicationAccess ? () => history.push(Paths.login) : handleBlocking}
            >
              Buy | Convert Quest
            </CustomButton>
            &nbsp;&nbsp;&nbsp;
            <CustomButton
              size="small"
              style={{ backgroundColor: '#1E3444', padding: '0px 16px' }}
              onClick={applicationAccess ? openbcModal : handleBlocking}
            >
              Buy KNAB
            </CustomButton>
          </div>
        </div>
        <br />
        <Paper>
          <br />
          <Grid container spacing={2} className={classes.paper}>
            <Grid item md={5} xs={12}>
              <KnabCard />
            </Grid>
            <Grid item md={7} xs={12}>
              {/* <TokenCard /> */}
              <KnabrCard />
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.paper}>
            <Grid item md={12} xs={12}>
              <TokensGraph />
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.paper}>
            <Grid item md={12} xs={12}>
              <TokensData handlePopup={handleBlocking} />
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
  isWalletCon: state.user.isWalletCon,
  KNABBalance: state.user.KNABBalance,
  applicationAccess: state.user.applicationAccess,
  loggedIn: state.user.loggedIn,
  loading: state.user.loading,
})
export default withRouter(connect(mapStateToProps, { hasApplcationAccess, successAlert, errorAlert, getKNABbalance })(TokenDetails))
