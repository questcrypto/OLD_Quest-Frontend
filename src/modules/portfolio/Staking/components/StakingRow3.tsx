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
  Value,
  CustomTooltip
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
  getLoanAmount2,
  withdrawUsdc,
  getAllocation
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
  setLoanAmount,
  accordActionFn,
  setAprU
} from '../../../../logic/actions/staking.action';
import { successAlert, errorAlert } from 'logic/actions/alerts.actions'
import Question from 'assets/icons/question.svg'

const useStyles = makeStyles((theme) => ({
  accordionRoot: {
    marginTop: '28px',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    '@media (max-width: 450px)': {
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  accordionSummary: {},
  expandIcon: {},
  summaryContent: {},
  mainDiv: {
    backgroundColor: '#F8F8F9',
    padding: theme.spacing(3),
    width: '100%',
    '@media (max-width: 450px)': {
      width: '-webkit-fill-available',
      padding: theme.spacing(1)
    }
  },
  balMainDiv: {
    padding: theme.spacing(2),
    height: '100%',
    boxSizing: 'border-box'
  },
  head: {
    borderBottom: '1px solid #E4E4E4',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  headResponsive: {
    '@media (max-width: 450px)': {
      flexDirection: 'column',
    }
  },
  centerDiv: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  knabInput: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    '@media (max-width: 450px)': {
      display: 'block',
    }
  },
  KnabIc: {
    display: 'flex',
    border: '1px solid #EDEDED',
    borderRight: 'none',
    alignItems: 'center',
    padding: '4px 8px',
    '& $img': {
      paddingRight: theme.spacing(1)
    }
  },
  knabBtnDiv: {
    display: 'flex',
    flexDirection: 'row',
    '@media (max-width: 450px)': {
      flexDirection: 'column'
    }
  },
  knabValues: {
    fontSize: '14px',
    textAlign: 'right'
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
  },
  hr: {
    height: '24px',
    color: '#EDEDED',
    opacity: '0.5'
  },
  questionImg: {
    padding: '0px 4px',
    width: '15px',
    position: 'relative',
    top: '2px',
    cursor: 'pointer'
  },
  loanDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    '@media (max-width: 450px)': {
      flexDirection: 'column'
    }
  },
  divResp1: {
    '@media (max-width: 450px)': {
      flexDirection: 'column'
    }
  }
}));

const StakingRow3 = (props: any) => {

  const classes = useStyles();
  const {
    staking: { tvl_usdc, usdc, usdc_dollar, knabr, usdc_staked, usdc_staked_dollar, usdc_knabr_earned, loan_amount, accordAction,
      apr_u },
    user: { walletConAddress, web3Instance },
    setTvlUsdc, setUsdc, setUsdcDollar, setKnabr, setUsdcStaked, setUsdcStakedDollar, setUsdcKnabEarned, setLoanAmount,
    accordActionFn,
    errorAlert, successAlert,
    setAprU
  } = props;
  const [isWithdraw, setIsWithdraw] = useState(true);

  useEffect(() => {
    if (walletConAddress.length > 0) {
      stateUpdate();
    }
  }, [walletConAddress])

  const stateUpdate = () => {
    try {

      getAllocation(3).then((res: any) => {
        setAprU(res * 100);
        // setAprU(0);
      })

      getTvlUsdc().then((res) => {
        console.log(res);
        setTvlUsdc(res);
      }, err => { console.log(err) })

      // getStakeUsdc(3).then((res) => {
      //   // console.log(res);
      //   setTvlUsdc(res);
      // }, err => { console.log(err) })

      getAssetsUSDCBalance().then((res) => {
        // console.log(res);
        setUsdc(res);
        setUsdcDollar(res);
      }, err => { console.log(err) })

      getAssetsKNABrBalance().then((res) => {
        // console.log(res);
        setKnabr(res);
      }, err => { console.log(err) })

      getStakeUsdc(3).then((res) => {
        // console.log(res);
        setUsdcStaked(res / 10 ** 6);
        setUsdcStakedDollar(res / 10 ** 6);
      }, err => { console.log(err) })

      getPendingKnabr(3).then((res) => {
        // console.log(res);
        setUsdcKnabEarned(res);
      }, err => { console.log(err) })

      getLoanAmount().then((res) => {
        // console.log('Loan Amount', res);
        if (res === 0) {
          // console.log('Loan amount is zero')
          getLoanAmount2().then((res) => {
            // console.log('Loan Amount 2', res);
            setIsWithdraw(false);
            setLoanAmount(res);
          });
        } else {
          setLoanAmount(res);
          setIsWithdraw(true);
        }
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
      // if (isOpen) { setIsOpen(false) }
      // if (accordAction['third']) { setIsOpen(false) }
      // else { setIsOpen(true) }
      const temp = accordAction['third'];
      accordActionFn({ ...accordAction, first: false, second: false, third: !temp, four_three: false })
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
      if ((usdcAppr / 1) > (usdc / 1)) {
        errorAlert('Insufficent USDC balance in wallet to Approve');
        setUsdcAppr(0);
        return;
      }
      setLoader({ ...loader, approveLoad: true });
      const usdcContract = new web3Instance.eth.Contract(stableCoinAbi, USDCAddress);
      const accounts = await web3Instance.eth.getAccounts()
      handleUsdcApproval(usdcContract, accounts[0], usdcAppr).then((res: any) => {
        if (res) {
          setLoader({ ...loader, approveLoad: false });
          successAlert('Transaction completed successfully')
          setUsdcAppr(0);
        }
      }, err => {
        setLoader({ ...loader, approveLoad: false });
        console.log(err)
        errorAlert('Something went wrong , please try again')
        setUsdcAppr(0);
      })
    } catch (error) { console.log(error) }
  }

  const unStakeFn = () => {
    try {
      if ((usdcUnStake / 1) > (usdc_staked / 1)) {
        errorAlert('Insufficent balance in wallet to Unstake');
        setUsdcUnStake(0);
        return;
      }
      setLoader({ ...loader, unstakeLoad: true });
      let usdcUnstake2 = usdcUnStake * 10 ** 6;
      getStakeUsdc(3).then((res: any) => {
        if (usdcUnstake2 <= res) {
          console.log('1st case');
          withdrawUsdc(3, usdcUnstake2).then((res1: any) => {
            if (res1) {
              setLoader({ ...loader, unstakeLoad: false });
              stateUpdate();
              successAlert('Transaction completed successfully')
              setUsdcUnStake(0);
            }
          }, err => {
            setLoader({ ...loader, unstakeLoad: false });
            console.log(err)
          })
        } else if (usdcUnstake2 > res && res !== 0 && res !== '0') {
          withdrawUsdc(3, (res)).then((res2: any) => {
            let temp = 0;
            if (res2) {
              temp++;
              withdrawLoan(3, (usdcUnstake2 - res)).then((res3: any) => {
                if (res3) {
                  temp++;
                  setLoader({ ...loader, unstakeLoad: false });
                  stateUpdate();
                  successAlert('Transaction completed successfully')
                  setUsdcUnStake(0);
                }
              }, err => {
                if (temp === 1) {
                  successAlert('You have requested for ' + usdcUnStake + 'but' + res + ' has been withdrawn');
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
        } else {
          // console.log('Third case', usdcUnstake2);
          withdrawLoan(3, (usdcUnstake2)).then((res4: any) => {
            if (res4) {
              setLoader({ ...loader, unstakeLoad: false });
              stateUpdate();
              successAlert('Transaction completed successfully')
              setUsdcUnStake(0);
            }
          }, err => {
            setLoader({ ...loader, unstakeLoad: false });
            console.log(err)
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

  const approveMaxUsdcClick = () => {
    try {
      setUsdcAppr(usdc);
    } catch (error) { console.log(error) }
  }

  const approveMaxUnstakeClick = () => {
    try {
      if (isWithdraw) {
        setUsdcUnStake(parseFloat(usdc_staked) + parseFloat(loan_amount));
      } else {
        setUsdcUnStake(parseFloat(usdc_staked));
      }
    } catch (error) { console.log(error) }
  }

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <>
      <Accordion classes={{ root: classes.accordionRoot }} expanded={accordAction['third']} >
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
              {/* <AccordValue className={classes.padLR}>${(parseFloat(usdc_staked) + parseFloat(loan_amount)).toFixed(2)} TVL</AccordValue> */}
            </FlexColumn>
            <FlexColumn>
              <AccordHeading className={classes.padLR}>
                {apr_u}%
                <CustomTooltip
                  title={'For Detailed APY on Integrated Defi Protocol click here'}
                  arrow>
                  <img src={Question} alt="" className={classes.questionImg} onClick={() => openInNewTab('https://polygon.curve.fi/pools?see=0x1E8AA3D8380662F925B99AD418cac657dbB63F3e')} />
                </CustomTooltip>
              </AccordHeading>
              <AccordValue className={classes.padLR}>{apr_u}%(24hr)</AccordValue>
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
              <AccordArrIcon src={!accordAction['third'] ? UpArrow : DownArrow} alt='' />
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
                    <FlexDiv className={classes.headResponsive}>
                      <FlexColumn>
                        <Heading>
                          USDC Balance
                          <CustomTooltip
                            title="For more info refer to assets table"
                            arrow>
                            <img src={Question} alt="" className={classes.questionImg} />
                          </CustomTooltip>
                        </Heading>
                        <Value>{usdc}</Value>
                        <Value>(${usdc_dollar})</Value>
                      </FlexColumn>
                      <CustomTooltip
                        title="User has to approve tokens before staking"
                        arrow>
                        <div>
                          <CustomButton
                            size="small"
                            style={{
                              backgroundColor: '#1E3444',
                              padding: '8px 48px',
                              maxWidth: '100%'
                            }}
                            onClick={stakeFn}
                            disabled={!(usdc > 0)}
                          >
                            Stake
                          </CustomButton>
                        </div>
                      </CustomTooltip>
                    </FlexDiv>
                  </div>

                  <div className={classes.centerDiv}>
                    <Typography variant="subtitle1">
                      Add USDC Token for Approval
                    </Typography>
                    <div className={classes.knabInput}>
                      <div className={classes.KnabIc}>
                        <img src={USDC} alt="" />
                        <span>USDC&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <hr className={classes.hr} />
                      </div>
                      <CustomInput
                        id="knab"
                        type="number"
                        value={usdcAppr}
                        onChange={(e: any) => { setUsdcAppr(e.target.value) }}
                        adornment={' | MAX'}
                        adornmentClick={approveMaxUsdcClick}
                        style={{ borderLeft: 'none' }}
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
                          maxWidth: '100%'
                        }}
                        onClick={ApproveUsdcTokenFn}
                        disabled={!(usdcAppr > 0)}
                      >
                        {loader.approveLoad ? <Spinner /> : <span>Approve&nbsp;USDC&nbsp;Token</span>}
                      </CustomButton>
                    </div>
                    {/* <FlexColumn className={classes.knabValues}>
                      <Value>Receive: 0.00($0.00)</Value>
                      <Value>Price impact: 0.00%</Value>
                      <Value>Fee: 0.00% ~ 0.11%</Value>
                      <Value>Max Slippage: 1%</Value>
                    </FlexColumn> */}
                    <FlexColumn className={classes.knabValues}>
                      <Value>Receive: NA</Value>
                      <Value>Price impact: NA</Value>
                      <Value>Fee: &nbsp;&nbsp;&nbsp;0</Value>
                      <Value>Max Slippage: NA</Value>
                    </FlexColumn>
                  </div>
                </Paper>
              </Grid>

              <Grid item md={5} xs={12}>
                <FlexColumn>
                  <Paper className={classes.stakedDiv}>
                    <div className={classes.headStaDiv}>

                      {/* <Heading>
                        USDC Staked (With Profit) */}
                      {/* <CustomTooltip
                          title="info"
                          arrow>
                          <img src={Question} alt="" className={classes.questionImg} />
                        </CustomTooltip> */}
                      {/* </Heading>
                      <Value>{(parseFloat(usdc_staked) + parseFloat(loan_amount)).toFixed(2)}
                        (${(parseFloat(usdc_staked_dollar) + parseFloat(loan_amount)).toFixed(2)})</Value> */}

                      <Heading>
                        USDC Staked :
                      </Heading>
                      <div className={classes.loanDiv}>
                        <div>
                          <Heading>
                            Total
                            <CustomTooltip
                              title="Total Staked Value"
                              arrow>
                              <img src={Question} alt="" className={classes.questionImg} />
                            </CustomTooltip>
                          </Heading>
                          <Value>{(parseFloat(usdc_staked) + parseFloat(loan_amount)).toFixed(2)}</Value>
                        </div>
                        <div>
                          <Heading>
                            Defi
                            <CustomTooltip
                              title="User has to wait for 5 mins to unstake the Defi amount (70% of total stake)"
                              arrow>
                              <img src={Question} alt="" className={classes.questionImg} />
                            </CustomTooltip>
                          </Heading>
                          <Value>{parseFloat(usdc_staked).toFixed(2)}</Value>
                        </div>
                        <div>
                          <Heading>
                            Loan
                            <CustomTooltip
                              title="User has to wait for 10 mins/when loan is paid to unstake the loan amount (30% of total stake)"
                              arrow>
                              <img src={Question} alt="" className={classes.questionImg} />
                            </CustomTooltip>
                          </Heading>
                          <Value style={{ color: isWithdraw ? 'green' : 'red' }}>
                            {parseFloat(loan_amount).toFixed(2)}
                            <CustomTooltip
                              title="Red indicates user can't unstake, Green indicates user can unstake"
                              arrow>
                              <img src={Question} alt="" className={classes.questionImg} />
                            </CustomTooltip>
                          </Value>
                        </div>
                      </div>
                    </div><br />
                    <FlexDiv className={classes.divResp1}>
                      <CustomInput
                        id="knabStake"
                        type="number"
                        value={usdcUnStake}
                        onChange={(e: any) => { setUsdcUnStake(e.target.value) }}
                        adornment={' | MAX'}
                        adornmentClick={approveMaxUnstakeClick}
                      />
                      <CustomButton
                        size="small"
                        style={{
                          backgroundColor: '#1E3444',
                          padding: '8px 48px',
                          marginLeft: '12px',
                        }}
                        onClick={unStakeFn}
                        disabled={!(usdcUnStake > 0)}
                      >
                        {/* Unstake */}
                        {loader.unstakeLoad ? <Spinner /> : <span>Unstake</span>}
                      </CustomButton>
                    </FlexDiv><br />
                    {/* <div className={classes.stakInfoText}>
                      <FlexRow>
                        <img src={Info} alt="" className={classes.infoImg} />
                        User has to wait for 5 mins to unstake the staked amount
                      </FlexRow>
                    </div> */}
                  </Paper>
                  <Paper className={classes.stakedDiv2}>
                    <div className={classes.headStaDiv}>
                      <Heading>
                        KNABr Earned
                        <CustomTooltip
                          title="KNAB receipt tokens(KNABr) rewards for QC staking which are convertable to KNAB"
                          arrow>
                          <img src={Question} alt="" className={classes.questionImg} />
                        </CustomTooltip>
                      </Heading>
                    </div><br />
                    <FlexDiv className={classes.divResp1}>
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
                        disabled={!(usdc_knabr_earned > 0)}
                      >
                        {/* Harvest */}
                        {loader.harvestLoad ? <Spinner /> : <span>Harvest</span>}
                      </CustomButton>
                    </FlexDiv><br />
                    <div className={classes.stakInfoText}>
                      <FlexRow>
                        <img src={Info} alt="" className={classes.infoImg} />
                        KNABr earned are automatically harvested when u stake more USDC
                      </FlexRow>
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
  accordActionFn,
  successAlert, errorAlert,
  setAprU
})(StakingRow3)