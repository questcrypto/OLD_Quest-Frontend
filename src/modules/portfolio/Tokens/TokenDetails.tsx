import { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import axios from 'axios'
import { makeStyles, Paper, Typography, Grid } from '@material-ui/core'
import CustomButton from '../components/shared/Button'
// import TokenCard from './TokenCard'
import KnabrCard from './KnabrCard'
import TokensData from './TokensData'
import TokensGraph from '../components/Graph/BasicGraph'
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
    paddingTop: theme.spacing(2),
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
        const url = window.location.href;
        let referralId: any = '';
        if (url.includes('referral')) {
          referralId = url.split('/').pop();
        }
        const data = buyKnab(fromData, referralId);
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
  const backFn = () => {
    try {
      history.push(Paths.root)
    } catch (error) { console.log(error) }
  }

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
      {/* <IPBlockingModal
        show={showIPBlockingModal}
        toggleModal={toggleIPBLockingModal}
        onClose={toggleIPBLockingModal}
        // hasAccess={handleApplicationAccess}
        hasAccess={appAccess}
      /> */}
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography className={classes.title}>Token&nbsp;Details</Typography>
          <div className={classes.btnDiv}>
            <CustomButton
              size="small"
              disableElevation
              disableFocusRipple
              disableRipple
              style={{ backgroundColor: '#858585', padding: '8px 16px', margin: '0 0 10px 0' }}
            >
              00.00 KNABr
            </CustomButton>
            &nbsp;&nbsp;&nbsp;
            <CustomButton
              size="small"
              disableElevation
              disableFocusRipple
              disableRipple
              style={{ backgroundColor: '#858585', padding: '8px 16px', margin: '0 0 10px 0' }}
            >
              {props.isWalletCon ? props.KNABBalance : 0} KNAB
            </CustomButton>
            &nbsp;&nbsp;&nbsp;
            <CustomButton
              size="small"
              style={{ backgroundColor: '#1E3444', padding: '8px 16px', margin: '0 0 10px 0' }}
              // onClick={props.applicationAccess ? () => handleAuction() : handleBlocking}
              onClick={() => handleAuction()}
            >
              Real Estate Auctions
            </CustomButton>
            &nbsp;&nbsp;&nbsp;
            <CustomButton
              size="small"
              style={{ backgroundColor: '#1E3444', padding: '8px 16px', margin: '0 0 10px 0' }}
              // onClick={props.applicationAccess ? () => history.push(Paths.login) : handleBlocking}
              onClick={() => history.push(Paths.login)}
            >
              Buy | Convert Quest
            </CustomButton>
            &nbsp;&nbsp;&nbsp;
            <CustomButton
              size="small"
              style={{ backgroundColor: '#1E3444', padding: '8px 16px', margin: '0 0 10px 0' }}
              onClick={applicationAccess ? openbcModal : handleBlocking}
            >
              Buy KNAB
            </CustomButton>
          </div>
        </div>
        <br />
        <Paper>
          <br />
          <Grid container spacing={4} className={classes.paper}>
            <Grid item md={12} xs={12} style={{ paddingBottom: '24px', paddingTop: '0px' }}>
              <CustomButton
                size="small"
                disableElevation
                disableFocusRipple
                disableRipple
                style={{
                  backgroundColor: '#C4C4C4', padding: '4px 16px',
                  color: '#000', borderRadius: '5px'
                }}
                onClick={backFn}
              >
                Back
              </CustomButton>
            </Grid>
            <Grid item md={5} xs={12}>
              <KnabCard />
            </Grid>
            <Grid item md={5} xs={12}>
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
