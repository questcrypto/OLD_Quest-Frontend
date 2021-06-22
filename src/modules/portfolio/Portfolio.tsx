import { useState } from 'react'
import { Typography, Grid, Paper } from '@material-ui/core'
import { useStyles } from './style'
import CustomButton from './components/shared/Button'
// import Question from '../../assets/icons/question.svg'
// import MaticIcon from 'assets/icons/matic.svg'
// import KnabDummy from 'assets/icons/knab_dummy.svg'
import USDC from 'assets/icons/USDC.svg'
import KNAB from 'assets/icons/KNAB.svg'
import MoreWithCrypto from './components/MoreWithCrypto'
import YourAssets from './components/YourAssets'
import BuyAndConvertModal from './components/BuyAndConvertModal'
import { getWeb3Val, buyKnab, getStableCoinBalance, handlestableCoinapproval } from '../../modules/block-chain/BlockChainMethods'
import { stableCoinAbi, stableCoinContractAddress, ICOAddress } from '../../modules/block-chain/abi'
import { successAlert, errorAlert } from 'logic/actions/alerts.actions'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { logout } from 'logic/actions/user.actions'
import history from 'modules/app/components/history'
import { Paths } from 'modules/app/components/routes/types'
import HoverModal from './components/HoverModal'
import { getKNABBalance } from '../../modules/block-chain/BlockChainMethods'

const Portfolio = (props: any) => {
  const classes = useStyles()

  const [pb, setPb] = useState(0)
  const [bcModal, setBcModal] = useState(false)
  const [isConfirm, setIsConfirm] = useState(false)
  const [isTransaction, setIsTransaction] = useState(false)
  const [loader, setLoader] = useState(false)
  const [hoverModal, setHoverModal] = useState(false)

  const { errorAlert, loggedIn, successAlert } = props

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
          // console.log(res, 'blc')
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
  const handleBuyKNABModal = () => {
    try {
      setHoverModal(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleHoverModalClose = () => {
    try {
      setHoverModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleTestPage = () => history.push(Paths.learnMore)

  const getBalance = async () => {
    const KNABBalance: any = await getKNABBalance()

    console.log(KNABBalance / 10 ** 18)
    setPb(KNABBalance / 10 ** 18)
  }
  // setPb(props.KNABBalance)
  const KNABbalance = props.KNABBalance
  // const conv = Number(KNABbalance.toFixed(3))
  // console.log(KNABbalance, conv, typeof conv, 'blc')
  // console.log(pb, 'blc')
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography className={classes.title} variant="h6">
          Portfolio
        </Typography>
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
            {/* 00.00 KNAB */}
            {/* {props.KNABBalance || pb.toFixed(3)} KNAB */}
            {KNABbalance || pb.toFixed(3)} KNAB
          </CustomButton>
          &nbsp;&nbsp;&nbsp;
          <CustomButton size="small" style={{ backgroundColor: '#1E3444', padding: '0px 16px' }} onClick={() => handleAuction()}>
            Real Estate Auctions
          </CustomButton>
          &nbsp;&nbsp;&nbsp;
          <CustomButton size="small" style={{ backgroundColor: '#1E3444', padding: '0px 16px' }}>
            Buy | Convert Quest
          </CustomButton>
          &nbsp;&nbsp;&nbsp;
          <CustomButton size="small" style={{ backgroundColor: '#1E3444', padding: '0px 16px' }} onClick={openbcModal}>
            {/* Buy | Convert KNAB */}
            Buy KNAB
          </CustomButton>
          &nbsp;&nbsp;&nbsp;
          {/* <CustomButton
            size="small"
            disableElevation
            disableFocusRipple
            disableRipple
            style={{ backgroundColor: '#858585', padding: '0px 16px' }}
            onClick={() => handleTestPage()}
          >
            Test
          </CustomButton> */}
        </div>
      </div>

      <Grid container spacing={4} style={{ padding: '32px 0px' }}>
        <Grid item md={7} xs={12}>
          <Paper className={classes.portfolioDiv}>
            <Typography variant="subtitle1">Portfolio Balance</Typography>
            <div>
              <Typography variant="h4">
                {props.KNABBalance || pb.toFixed(2)} KNAB
                {getBalance}
                {/* <img src={Question} alt="question" style={{ position: 'relative', left: '6px', bottom: '2px' }} /> */}
              </Typography>
            </div>
            <div className={classes.pfBtnDiv}>
              <div>
                <CustomButton size="large" style={{ backgroundColor: '#1E3444', padding: '8px 80px' }}>
                  Buy Quest Tokens
                </CustomButton>
                <br />
                <span className={classes.pfBtnhelpText}>Purchase Equity in Real Estate</span>
              </div>
              <div>
                <CustomButton
                  size="large"
                  style={{ backgroundColor: '#1E3444', padding: '8px 80px' }}
                  onClick={openbcModal}
                  // onMouseOver={handleBuyKNABModal}
                  // onMouseLeave={handleHoverModalClose}
                >
                  Buy KNAB Tokens
                </CustomButton>
                <br />
                <span className={classes.pfBtnhelpText}>Purchase ICO tokens from Quest Crypto</span>
              </div>
            </div>
          </Paper>

          {/* <Paper className={classes.portfolioDiv2}>
            <Typography variant="subtitle1">
              Portfolio Balance
            </Typography>
            <div>
              <Typography variant="h4">
                {pb.toFixed(2)}
                <img src={Question} alt="question" style={{ position: 'relative', left: '6px', bottom: '2px' }} />
              </Typography>
            </div>
          </Paper> */}

          <YourAssets getBalance={getBalance} />
        </Grid>

        <Grid item md={5} xs={12}>
          <MoreWithCrypto getBalance={getBalance} />
        </Grid>
      </Grid>

      {/* Buy or Convert Quest Modal */}
      {/* <BuyAndConvertModal
        show={bcQuestModal}
        toggleModal={handlebcQuestModalClose}
        onClose={handlebcQuestModalClose}
        headerText="Buying | Converting Quest Tokens"
        options1={options1}
        options2={options2}
      /> */}

      {/* Buy or Convert KNAB Modal */}
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
      <HoverModal show={hoverModal} headerText="Buy KNAB Tokens" toggleModal={handleHoverModalClose} onClose={handleHoverModalClose} />
    </div>
  )
}

// const options1 = [{ name: 'Matic', icon: MaticIcon, id: 'matic_from', key: 'matic' },
// { name: 'Knab', icon: KnabDummy, id: 'knab_from', key: 'knab' }]
// const options2 = [{ name: 'Knab', icon: KnabDummy, id: 'knab_to', key: 'knab' },
// { name: 'Matic', icon: MaticIcon, id: 'matic_to', key: 'matic' }]
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

// export default Portfolio;
const mapStateToProps = (state: any) => ({
  loading: state.user.loading,
  loggedIn: state.user.loggedIn,
  KNABBalance: state.user.KNABBalance,
})
export default withRouter(connect(mapStateToProps, { successAlert, errorAlert })(Portfolio))
