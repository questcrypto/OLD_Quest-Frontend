import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  makeStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import {
  FlexDiv,
  FlexRow,
  FlexColumn,
  AccordHeading,
  AccordValue,
  AccordArrIcon,
  Heading,
  Value
} from '../style'
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import KNAB from 'assets/icons/KNAB.svg'
import USDC from 'assets/icons/USDC.svg'
import UpArrow from 'assets/icons/UpArrowAccord.svg'
import DownArrow from 'assets/icons/DownArrowAccord.svg'
import CustomInput from '../../components/shared/CustomInput'
import CustomButton from '../../components/shared/Button'
import Info from 'assets/images/info.svg'
import StakeUsdcModal from './StakeUsdcModal'
import { USDCAddress, stableCoinAbi } from '../../../../modules/block-chain/abi'
import {
  handleUsdcApproval,
  withdraw,
  getAssetsUSDCBalance,
  getAssetsKNABrBalance,
  getTvlUsdc,
  getStake,
  getPendingKnabr,
  getHarvest,
  // getDefiAmount,
  withdrawLoan,
  getStakeUsdc,
  getLoanAmount,
  withdrawUsdc,
} from '../../../../modules/block-chain/BlockChainMethods'
import Spinner from 'shared/loader-components/spinner'
import {
  setTvlUsdc,
  setUsdc,
  setUsdcDollar,
  setKnabr,
  setUsdcStaked,
  setUsdcStakedDollar,
  setUsdcKnabEarned,
  setLoanAmount
} from '../../../../logic/actions/staking.action';
import { successAlert, errorAlert } from 'logic/actions/alerts.actions'

const useStyles = makeStyles((theme) => ({
  accordionRoot: {
    marginTop: '28px',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  },
  accordionSummary: {},
  expandIcon: {},
  summaryContent: {},
  mainDiv: {
    backgroundColor: '#F8F8F9',
    padding: theme.spacing(3),
    width: '100%'
  },
  balMainDiv: {
    padding: theme.spacing(2)
  },
  head: {
    borderBottom: '1px solid #E4E4E4',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  centerDiv: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  knabInput: {
    paddingTop: theme.spacing(2),
    display: 'flex'
  },
  KnabIc: {
    display: 'flex',
    border: '1px solid #EDEDED',
    alignItems: 'center',
    padding: theme.spacing(1),
    '& $img': {
      paddingRight: theme.spacing(1)
    }
  },
  knabBtnDiv: {
    display: 'flex',
    flexDirection: 'row',
  },
  knabValues: {
    fontSize: '14px'
  },
  stakedDiv: {
    padding: theme.spacing(2)
  },
  stakedDiv2: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2)
  },
  headStaDiv: {
    lineHeight: '2'
  },
  stakInfoText: {
    color: '#6F7583',
    fontSize: '14px'
  },
  infoImg: {
    display: 'flex',
    alignItems: 'flex-top',
    paddingRight: theme.spacing(1)
  },
  padLR: {
    paddingRight: '16px'
  }
}));

const StakingRow3 = (props: any) => {

  const classes = useStyles();
  const {
    staking: { tvl_usdc, usdc, usdc_dollar, knabr, usdc_staked, usdc_staked_dollar, usdc_knabr_earned, loan_amount },
    user: { walletConAddress, web3Instance },
    setTvlUsdc, setUsdc, setUsdcDollar, setKnabr, setUsdcStaked, setUsdcStakedDollar, setUsdcKnabEarned, setLoanAmount,
    errorAlert, successAlert,
  } = props;

  useEffect(() => {
    if (walletConAddress.length > 0) {
      stateUpdate();
    }
  }, [walletConAddress])

  const stateUpdate = () => {
    try {
      // getTvlUsdc().then((res) => {
      //   // console.log(res);
      //   setTvlUsdc(res);
      // }, err => { console.log(err) })

      getStakeUsdc(4).then((res) => {
        // console.log(res);
        setTvlUsdc(res);
      }, err => { console.log(err) })

      getAssetsUSDCBalance().then((res) => {
        // console.log(res);
        setUsdc(res);
        setUsdcDollar(res);
      }, err => { console.log(err) })

      getAssetsKNABrBalance().then((res) => {
        // console.log(res);
        setKnabr(res);
      }, err => { console.log(err) })

      getStakeUsdc(4).then((res) => {
        // console.log(res);
        setUsdcStaked(res);
        setUsdcStakedDollar(res);
      }, err => { console.log(err) })

      getPendingKnabr(4).then((res) => {
        // console.log(res);
        setUsdcKnabEarned(res);
      }, err => { console.log(err) })

      getLoanAmount().then((res) => {
        // console.log('Loan Amount', res);
        setLoanAmount(res);
      }, err => { console.log(err) })

    } catch (err) { console.log(err) }
  }

  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState({ approveLoad: false, unstakeLoad: false, harvestLoad: false })
  const [usdcAppr, setUsdcAppr] = useState(0.00);
  const [usdcUnStake, setUsdcUnStake] = useState(0.00);

  const handleOpen = () => {
    try {
      if (isOpen) { setIsOpen(false) }
      else { setIsOpen(true) }
    } catch { }
  }

  const toggleModal = () => {
    try {
      if (show) { setShow(false) }
      else { setShow(true) }
    } catch (error) { console.log(error) }
  }

  const stakeFn = () => {
    try {
      setShow(true);
    } catch (error) { console.log(error) }
  }

  const ApproveUsdcTokenFn = async () => {
    try {
      setLoader({ ...loader, approveLoad: true });
      const usdcContract = new web3Instance.eth.Contract(stableCoinAbi, USDCAddress);
      const accounts = await web3Instance.eth.getAccounts()
      handleUsdcApproval(usdcContract, accounts[0], usdcAppr).then((res: any) => {
        if (res) {
          setLoader({ ...loader, approveLoad: false });
          successAlert('Transaction completed successfully')
        }
      }, err => {
        setLoader({ ...loader, approveLoad: false });
        console.log(err)
        errorAlert('Something went wrong , please try again')
      })
    } catch (error) { console.log(error) }
  }

  const unStakeFn = () => {
    try {
      setLoader({ ...loader, unstakeLoad: true });

      getStakeUsdc(3).then((res: any) => {
        if (usdcUnStake < res) {
          // console.log('Defi Amount', res);
          withdrawUsdc(4, usdcUnStake).then((res1: any) => {
            if (res1) {
              setLoader({ ...loader, unstakeLoad: false });
              stateUpdate();
              successAlert('Transaction completed successfully')
            }
          }, err => {
            setLoader({ ...loader, unstakeLoad: false });
            console.log(err)
          })
        } else if (usdcUnStake > res) {
          withdrawUsdc(4, (res)).then((res2: any) => {
            let temp = 0;
            if (res2) {
              temp++;
              withdrawLoan(4, (usdcUnStake - res)).then((res3: any) => {
                if (res3) {
                  temp++;
                  setLoader({ ...loader, unstakeLoad: false });
                  stateUpdate();
                  successAlert('Transaction completed successfully')
                }
              }, err => {
                if (temp === 1) {
                  successAlert('You have requested for' + usdcUnStake + 'but' + res + 'has been withdrawn');
                }
                setLoader({ ...loader, unstakeLoad: false });
                console.log(err)
              })
              // setLoader({ ...loader, unstakeLoad: false });
              // stateUpdate();
            }
          }, err => {
            setLoader({ ...loader, unstakeLoad: false });
            console.log(err)
            errorAlert('Something went wrong , please try again')
          })
        }
      }, err => { console.log(err) });

    } catch (error) { console.log(error) }
  }

  const harvestFn = () => {
    try {
      setLoader({ ...loader, harvestLoad: true });
      getHarvest(2).then((res: any) => {
        if (res) {
          setLoader({ ...loader, harvestLoad: false });
          stateUpdate();
          successAlert('Transaction completed successfully')
        }
      }, err => {
        setLoader({ ...loader, harvestLoad: false });
        console.log(err)
        errorAlert('Something went wrong , please try again')
      })
    } catch (error) { console.log(error) }
  }

  return (
    <>
      <Accordion classes={{ root: classes.accordionRoot }}>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          classes={{
            root: classes.accordionSummary,
            // expandIcon: classes.expandIcon
          }}
          onClick={handleOpen}
        >
          <FlexDiv>
            <FlexColumn>
              <Avatar src={USDC} alt="" />
            </FlexColumn>
            <FlexColumn>
              <AccordHeading className={classes.padLR}>USDC</AccordHeading>
              <AccordValue className={classes.padLR}>${tvl_usdc} TVL</AccordValue>
            </FlexColumn>
            <FlexColumn>
              <AccordHeading className={classes.padLR}>0%</AccordHeading>
              <AccordValue className={classes.padLR}>0%(24hr)</AccordValue>
            </FlexColumn>
            <FlexColumn>
              <AccordHeading className={classes.padLR}>${usdc_dollar}</AccordHeading>
              <AccordValue className={classes.padLR}>{usdc} USDC</AccordValue>
            </FlexColumn>
            <FlexColumn>
              <AccordHeading className={classes.padLR}>{usdc_knabr_earned}</AccordHeading>
              <AccordValue className={classes.padLR}>Knab R</AccordValue>
            </FlexColumn>
            <FlexColumn>
              <AccordArrIcon src={!isOpen ? UpArrow : DownArrow} alt='' />
            </FlexColumn>
          </FlexDiv>
        </AccordionSummary>
        <AccordionDetails
          classes={{
            root: classes.summaryContent
          }}
        >
          <div className={classes.mainDiv}>
            <Grid container spacing={3}>

              <Grid item md={7} xs={12}>
                <Paper className={classes.balMainDiv}>

                  <div className={classes.head}>
                    <FlexDiv>
                      <FlexColumn>
                        <Heading>USDC Balance</Heading>
                        <Value>{usdc}</Value>
                        <Value>(${usdc_dollar})</Value>
                      </FlexColumn>
                      <CustomButton
                        size="small"
                        style={{
                          backgroundColor: '#1E3444',
                          padding: '8px 48px',
                        }}
                        onClick={stakeFn}
                      >
                        Stake
                      </CustomButton>
                    </FlexDiv>
                  </div>

                  <div className={classes.centerDiv}>
                    <Typography variant="subtitle1">
                      Add USDC Token for Approval
                    </Typography>
                    <div className={classes.knabInput}>
                      <div className={classes.KnabIc}>
                        <img src={USDC} alt="" />
                        <span>USDC</span>
                      </div>
                      <CustomInput
                        id="knab"
                        type="number"
                        value={usdcAppr}
                        onChange={(e: any) => { setUsdcAppr(e.target.value) }}
                        adornment={' | MAX'}
                      />
                    </div>
                  </div>

                  <div className={classes.knabBtnDiv}>
                    <div style={{ width: '100%' }}></div>
                    <div>
                      <CustomButton
                        size="small"
                        style={{
                          backgroundColor: '#1E3444',
                          padding: '8px 48px',
                          marginRight: '12px',
                        }}
                        onClick={ApproveUsdcTokenFn}
                      >
                        {loader.approveLoad ? <Spinner /> : <span>Approve&nbsp;USDC&nbsp;Token</span>}
                      </CustomButton>
                    </div>
                    <FlexColumn className={classes.knabValues}>
                      <Value>Receive: 0.00($0.00)</Value>
                      <Value>Price impact: 0.00%</Value>
                      <Value>Fee: 0.00% ~ 0.11%</Value>
                      <Value>Max Slippage: 1%</Value>
                    </FlexColumn>
                  </div>
                </Paper>
              </Grid>

              <Grid item md={5} xs={12}>
                <FlexColumn>
                  <Paper className={classes.stakedDiv}>
                    <div className={classes.headStaDiv}>
                      <Heading>USDC Staked (With Profit)</Heading>
                      <Value>{parseFloat(usdc_staked) + parseFloat(loan_amount)}
                        (${parseFloat(usdc_staked_dollar) + parseFloat(loan_amount)})</Value>
                    </div><br />
                    <FlexDiv>
                      <CustomInput
                        id="knabStake"
                        type="number"
                        value={usdcUnStake}
                        onChange={(e: any) => { setUsdcUnStake(e.target.value) }}
                        adornment={' | MAX'}
                      />
                      <CustomButton
                        size="small"
                        style={{
                          backgroundColor: '#1E3444',
                          padding: '8px 48px',
                          marginLeft: '12px',
                        }}
                        onClick={unStakeFn}
                      >
                        {/* Unstake */}
                        {loader.unstakeLoad ? <Spinner /> : <span>Unstake</span>}
                      </CustomButton>
                    </FlexDiv><br />
                    <div className={classes.stakInfoText}>
                      {/* <FlexRow>
                        <img src={Info} alt="" className={classes.infoImg} />
                        Lorem ipsum dolor sit amet, adipiscing elit sed do eiusmod Yield 10.71%
                      </FlexRow> */}
                    </div>
                  </Paper>
                  <Paper className={classes.stakedDiv2}>
                    <div className={classes.headStaDiv}>
                      <Heading>KNABr Earned</Heading>
                    </div><br />
                    <FlexDiv>
                      <FlexColumn>
                        <Value>{usdc_knabr_earned}</Value>
                        <Value>($0.00)</Value>
                      </FlexColumn>
                      <CustomButton
                        size="small"
                        style={{
                          backgroundColor: '#1E3444',
                          padding: '8px 48px',
                          marginLeft: '12px',
                        }}
                        onClick={harvestFn}
                      >
                        {/* Harvest */}
                        {loader.harvestLoad ? <Spinner /> : <span>Harvest</span>}
                      </CustomButton>
                    </FlexDiv><br />
                    <div className={classes.stakInfoText}>
                      {/* <FlexRow>
                        <img src={Info} alt="" className={classes.infoImg} />
                        Lorem ipsum dolor sit amet, adipiscing elit sed do eiusmod Yield 10.71%
                      </FlexRow> */}
                    </div>
                  </Paper>
                </FlexColumn>
              </Grid>
            </Grid>
          </div>
        </AccordionDetails>
      </Accordion>
      <StakeUsdcModal
        show={show}
        toggleModal={toggleModal}
        stUpdate={stateUpdate}
      />
    </>
  );
}

// export default StakingRow3;
const mapStateToProps = (state: any) => ({
  user: state.user,
  staking: state.staking
})

export default connect(mapStateToProps, {
  setTvlUsdc,
  setUsdc,
  setUsdcDollar,
  setKnabr,
  setUsdcStaked,
  setUsdcStakedDollar,
  setUsdcKnabEarned,
  setLoanAmount,
  successAlert, errorAlert,
})(StakingRow3)