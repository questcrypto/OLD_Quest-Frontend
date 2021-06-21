import { useState } from 'react'
import { useStyles } from '../style'
import { Paper, Typography, Grid } from '@material-ui/core'
import CustomButton from './shared/Button'
import MoreWithCrypto from '../components/MoreWithCrypto'
import TokenCard from './TokenCard'
import FullICODetails from './FullICODetails'
import Graph from './Graph/Graph'
// import KnabIcon from 'assets/icons/KNAB.svg'
import history from 'modules/app/components/history'
import { Paths } from 'modules/app/components/routes/types'
// import BuyAndConvertModal from '../components/BuyAndConvertModal'
// import { successAlert, errorAlert } from 'logic/actions/alerts.actions'
// import { getWeb3Val, buyKnab, getStableCoinBalance, handlestableCoinapproval } from '../../../modules/block-chain/BlockChainMethods'
// import { stableCoinAbi, stableCoinContractAddress, ICOAddress } from '../../../modules/block-chain/abi'

// import USDC from 'assets/icons/USDC.svg'
// import KNAB from 'assets/icons/KNAB.svg'
// import { withRouter } from 'react-router'
// import { connect } from 'react-redux'

const LearnMore = () => {
  const classes = useStyles()

  // const [bcModal, setBcModal] = useState(false)
  // const [isConfirm, setIsConfirm] = useState(false)
  // const [isTransaction, setIsTransaction] = useState(false)
  // const [loader, setLoader] = useState(false)
  const handleBackButton = () => history.push(Paths.root)

  // const openbcModal = () => {
  //   try {
  //     setBcModal(true)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // const handlebcModalClose = () => {
  //   try {
  //     setBcModal(false)
  //     setIsConfirm(false)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const submitModalFn = async (values: any) => {
  //   try {
  //     const fromData = values.from
  //     // if (loggedIn) {
  //     if (true) {
  //       setLoader(true)
  //       const web3 = await getWeb3Val()
  //       if (web3) {
  //         const accounts = await web3.eth.getAccounts()
  //         const contractSc = new web3.eth.Contract(stableCoinAbi, stableCoinContractAddress)
  //         // const res: any = await contractSc.methods.approve(ICOAddress, fromData).send({ from: accounts[0] });
  //         handlestableCoinapproval(contractSc, accounts[0], fromData).then(
  //           (res) => {
  //             if (res) {
  //               setLoader(false)
  //               setIsConfirm(true)
  //             }
  //           },
  //           (err) => {
  //             setLoader(false)
  //             console.log(err)
  //           }
  //         )
  //       }
  //     } else {
  //       alert('Please connect wallet to continue')
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const confirmTransaction = async (values: any) => {
  //   try {
  //     const fromData = values.from
  //     // console.log(typeof fromData);
  //     const web3 = await getWeb3Val()
  //     if (web3) {
  //       setIsTransaction(true)
  //       // const res2: any = await contractSc.methods.approve(accounts[0], 0);
  //       const data = buyKnab(fromData)
  //       data.then(
  //         (res) => {
  //           // console.log(res);
  //           setIsTransaction(false)
  //           setBcModal(false)
  //           setIsConfirm(false)
  //           successAlert('Transaction completed successfully')
  //         },
  //         (error) => {
  //           setIsTransaction(false)
  //           setBcModal(false)
  //           setIsConfirm(false)
  //           console.log(error)
  //           errorAlert('Something went wrong , please try again')
  //           // if (!!error && error.response && error.response.data.message) {
  //           //   errorAlert(error.response.data.message)
  //           // } else if (!!error.message) {
  //           //   errorAlert(error.message)
  //           // } else {
  //           //   errorAlert('Something went wrong , please try again')
  //           // }
  //         }
  //       )
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //     // setIsTransaction(false);
  //   }
  // }

  // const rejectTransaction = () => {
  //   try {
  //     setIsConfirm(false)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography className={classes.title} variant="h6">
          Token
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
            00.00 KNAB
          </CustomButton>
          &nbsp;&nbsp;&nbsp;
          <CustomButton size="small" style={{ backgroundColor: '#1E3444', padding: '0px 16px' }}>
            Real Estate Auctions
          </CustomButton>
          &nbsp;&nbsp;&nbsp;
          <CustomButton size="small" style={{ backgroundColor: '#1E3444', padding: '0px 16px' }}>
            Buy | Convert Quest
          </CustomButton>
          &nbsp;&nbsp;&nbsp;
          <CustomButton size="small" style={{ backgroundColor: '#1E3444', padding: '0px 16px' }}>
            {/* Buy | Convert KNAB */}
            Buy KNAB
          </CustomButton>
        </div>
      </div>
      <br />

      <Paper>
        <br />
        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
        <CustomButton
          size="small"
          disableElevation
          disableFocusRipple
          disableRipple
          style={{ backgroundColor: '#858585', padding: '0px 16px' }}
          onClick={() => handleBackButton()}
          // onClick={openbcModal}
        >
          back
        </CustomButton>
        <Grid container spacing={4} style={{ padding: '38px 0px' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Grid item md={5} xs={12}>
            <TokenCard />
          </Grid>
          <Grid item md={5} xs={12}>
            <TokenCard />
          </Grid>
        </Grid>
        <Grid container spacing={4} style={{ padding: '38px 0px' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Grid item md={10} xs={12}>
            <Graph />
          </Grid>
        </Grid>
        <Grid container spacing={4} style={{ padding: '38px 0px' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Grid item md={10} xs={12}>
            <FullICODetails />
          </Grid>
        </Grid>
      </Paper>
      {/* <BuyAndConvertModal
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
      /> */}
    </div>
  )
}

// const options1 = [{ name: 'USDC', icon: USDC, id: 'usdc_from', key: 'usdc' }]
// const options2 = [{ name: 'KNAB', icon: KNAB, id: 'knab_to', key: 'knab' }]
// const conversionData = {
//   usdc: {
//     usdc: 1,
//     knab: 2.672,
//   },
//   knab: {
//     knab: 1,
//     usdc: 0.374255,
//   },
// }

// const mapStateToProps = (state: any) => ({
//   loading: state.user.loading,
//   loggedIn: state.user.loggedIn,
// })
// export default withRouter(connect(mapStateToProps, { successAlert, errorAlert })(LearnMore))
export default LearnMore
