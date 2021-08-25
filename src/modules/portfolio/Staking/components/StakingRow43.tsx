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
import AvatarGroup from '@material-ui/lab/AvatarGroup';
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
import Spinner from 'shared/loader-components/spinner'
import {
  handleKnabUsdcApproval,
  deposit,
  withdraw,
  getLpBalance2,
  getAssetsKNABrBalance,
  getTvlKnabUsdc2,
  getStake,
  getPendingKnabr,
  getHarvest
} from '../../../../modules/block-chain/BlockChainMethods'
import { LPTokenAddress, KNABabi } from '../../../../modules/block-chain/abi';
import {
  setTvlKnabUsdc2,
  setLp2,
  setLpDollar2,
  setKnabr,
  setLpStaked2,
  setLpStakedDollar2,
  setLpKnabREarned2,
  accordActionFn
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
  btnCenterText: {
    display: 'flex',
    justifyContent: 'center',
    color: '#848E9C',
    padding: '16px 60px',
    '& $h6': {
      textAlign: 'center'
    }
  },
  btnCenter: {
    display: 'flex',
    justifyContent: 'center'
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
  },
  questionImg: {
    padding: '0px 4px',
    width: '15px',
    position: 'relative',
    top: '2px',
    cursor: 'pointer'
  },
  divResp1: {
    '@media (max-width: 450px)': {
      flexDirection: 'column'
    }
  }
}));

const StakingRow43 = (props: any) => {

  const addLiquidityUrl = 'https://app.sushi.com/add/0xE1f186285252FE4d3b0D5Aa161F58320Cb5057B8/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
  const removeLiquidityUrl = 'https://app.sushi.com/pool';

  const classes = useStyles();
  const {
    user: { walletConAddress, web3Instance },
    staking: { tvl_knab_usdc2, lp2, lp_dollar2, knabr, lp_staked2, lp_staked_dollar2, lp_knabr_earned2, accordAction },
    setTvlKnabUsdc2, setLp2, setLpDollar2, setKnabr, setLpStaked2, setLpStakedDollar2, setLpKnabREarned2, setLoanAmount,
    accordActionFn,
    errorAlert, successAlert,
  } = props;

  useEffect(() => {
    if (walletConAddress.length > 0) {
      stateUpdate();
    }
  }, [walletConAddress])

  const stateUpdate = () => {
    try {
      getTvlKnabUsdc2().then((res) => {
        // console.log(res);
        setTvlKnabUsdc2(res);
      }, err => { console.log(err) })

      getLpBalance2().then((res) => {
        // console.log(res);
        setLp2(res);
        setLpDollar2(res);
      }, err => { console.log(err) })

      getAssetsKNABrBalance().then((res) => {
        // console.log(res);
        setKnabr(res);
      }, err => { console.log(err) })

      getStake(2).then((res) => {
        // console.log(res);
        setLpStaked2(res);
        setLpStakedDollar2(res);
      }, err => { console.log(err) })

      getPendingKnabr(2).then((res) => {
        // console.log(res);
        setLpKnabREarned2(res);
      }, err => { console.log(err) })
    } catch (err) { console.log(err) }
  }

  const [lpUnStackVal, setLpUnStackVal] = useState(0.00)
  const [loader, setLoader] = useState({ approveLoad: false, stakeLoad: false, unstakeLoad: false, harvestLoad: false })

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    try {
      // if (isOpen) { setIsOpen(false) }
      // if (accordAction['second']) { setIsOpen(false) }
      // else { setIsOpen(true) }
      const temp = accordAction['four_three'];
      accordActionFn({ ...accordAction, first: false, second: false, third: false, four_three: !temp })
    } catch { }
  }

  const approveFn = async () => {
    try {
      setLoader({ ...loader, approveLoad: true });
      const Contract = new web3Instance.eth.Contract(KNABabi, LPTokenAddress);
      const accounts = await web3Instance.eth.getAccounts()
      handleKnabUsdcApproval(Contract, accounts[0], lp2).then((res: any) => {
        if (res) {
          setLoader({ ...loader, approveLoad: false });
          successAlert('Transaction completed successfully')
        }
      }, err => {
        setLoader({ ...loader, approveLoad: false });
        console.log(err)
        errorAlert('Something went wrong , please try again')
      })
    } catch (error) {
      console.log(error)
    }
  }

  const stakeFn = async () => {
    try {
      setLoader({ ...loader, stakeLoad: true });
      deposit(2, lp2).then((res: any) => {
        if (res) {
          setLoader({ ...loader, stakeLoad: false });
          stateUpdate();
          successAlert('Transaction completed successfully')
        }
      }, err => {
        setLoader({ ...loader, stakeLoad: false });
        console.log(err)
        errorAlert('Something went wrong , please try again')
      })
    } catch (error) {
      console.log(error)
    }
  }

  const unStakeFn = () => {
    try {
      if ((lpUnStackVal / 1) > (lp_staked2 / 1)) {
        errorAlert('Insufficent LP balance in wallet to Unstake');
        setLpUnStackVal(0);
        return;
      }
      setLoader({ ...loader, unstakeLoad: true });
      withdraw(2, lpUnStackVal).then((res: any) => {
        if (res) {
          setLoader({ ...loader, unstakeLoad: false });
          stateUpdate();
          successAlert('Transaction completed successfully')
          setLpUnStackVal(0);
        }
      }, err => {
        setLoader({ ...loader, unstakeLoad: false });
        console.log(err)
        errorAlert('Something went wrong , please try again')
        setLpUnStackVal(0);
      })
    } catch (error) {
      console.log(error)
    }
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

  const approveMaxLpClick = () => {
    try {
      setLpUnStackVal(lp_staked2);
    } catch (error) { console.log(error) }
  }

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <Accordion classes={{ root: classes.accordionRoot }} expanded={accordAction['four_three']}>
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
          <FlexRow>
            {/* <img src={KNAB} alt="" />  */}
            {/* <img src={USDC} alt="" /> */}
            <AvatarGroup max={2}>
              <Avatar alt="" src={KNAB} style={{ background: '#FFF' }} />
              <Avatar alt="" src={USDC} />
            </AvatarGroup>
          </FlexRow>
          <FlexColumn>
            <AccordHeading className={classes.padLR}>KNAB-USDC(S)</AccordHeading>
            <AccordValue className={classes.padLR}>${tvl_knab_usdc2} TVL</AccordValue>
          </FlexColumn>
          <FlexColumn>
            <AccordHeading className={classes.padLR}>0%</AccordHeading>
            <AccordValue className={classes.padLR}>0%(24hr)</AccordValue>
          </FlexColumn>
          <FlexColumn>
            <AccordHeading className={classes.padLR}>${lp_dollar2}</AccordHeading>
            <AccordValue className={classes.padLR}>{lp2} LP</AccordValue>
          </FlexColumn>
          <FlexColumn>
            <AccordHeading className={classes.padLR}>{lp_knabr_earned2}</AccordHeading>
            <AccordValue className={classes.padLR}>Knab R</AccordValue>
          </FlexColumn>
          <FlexColumn>
            <AccordArrIcon src={!accordAction['second'] ? UpArrow : DownArrow} alt='' />
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
                        LP Balance
                        <CustomTooltip
                          title="For more info refer to assets table"
                          arrow>
                          <img src={Question} alt="" className={classes.questionImg} />
                        </CustomTooltip>
                      </Heading>
                      <Value>{lp2}</Value>
                      {/* <Value>($00.00)</Value> */}
                    </FlexColumn>
                    <CustomButton
                      size="small"
                      style={{
                        backgroundColor: '#1E3444',
                        padding: '8px 48px',
                      }}
                      onClick={approveFn}
                      disabled={!(lp2 > 0)}
                    >
                      {/* Approve */}
                      {loader.approveLoad ? <Spinner /> : <span>Approve</span>}
                    </CustomButton>
                    <CustomTooltip
                      title="User has to approve tokens before staking"
                      arrow>
                      <div>
                        <CustomButton
                          size="small"
                          style={{
                            backgroundColor: '#375A74',
                            padding: '8px 48px',
                            marginLeft: '12px'
                          }}
                          onClick={stakeFn}
                          disabled={!(lp2 > 0)}
                        >
                          {/* Stake */}
                          {loader.stakeLoad ? <Spinner /> : <span>Stake</span>}
                        </CustomButton>
                      </div>
                    </CustomTooltip>
                  </FlexDiv>
                </div>

                <FlexColumn>
                  <div className={classes.btnCenterText}>
                    <Typography variant="subtitle2">
                      Add/remove liquidity to the KNAB-USDC on Quick Swap together to get LP tokens.
                      Then stake those LP tokens on Quest Crypto to receive QC rewards.
                    </Typography>
                  </div>
                  <div className={classes.btnCenter}>
                    <CustomButton
                      size="small"
                      style={{
                        backgroundColor: '#1E3444',
                        padding: '8px 60px',
                        marginTop: '12px'
                      }}
                      onClick={() => openInNewTab(`${addLiquidityUrl}`)}
                    >
                      Add Liquidity on Sushi Swap
                    </CustomButton>
                  </div>
                  <div className={classes.btnCenter}>
                    <CustomButton
                      size="small"
                      style={{
                        backgroundColor: '#375A74',
                        padding: '8px 48px',
                        marginTop: '12px'
                      }}
                      onClick={() => openInNewTab(`${removeLiquidityUrl}`)}
                    >
                      Remove Liquidity on Sushi Swap
                    </CustomButton>
                  </div>
                </FlexColumn>

              </Paper>
            </Grid>

            <Grid item md={5} xs={12}>
              <FlexColumn>
                <Paper className={classes.stakedDiv}>
                  <div className={classes.headStaDiv}>
                    <Heading>
                      LP Staked
                      {/* <CustomTooltip
                        title="info"
                        arrow>
                        <img src={Question} alt="" className={classes.questionImg} />
                      </CustomTooltip> */}
                    </Heading>
                    <Value>{lp_staked2}
                      {/* (${lp_staked_dollar}) */}
                    </Value>
                  </div><br />
                  <FlexDiv className={classes.divResp1}>
                    <CustomInput
                      id="knabStake"
                      type="number"
                      value={lpUnStackVal}
                      onChange={(e: any) => setLpUnStackVal(e.target.value)}
                      adornment={' | MAX'}
                      adornmentClick={approveMaxLpClick}
                    />
                    <CustomButton
                      size="small"
                      style={{
                        backgroundColor: '#1E3444',
                        padding: '8px 48px',
                        marginLeft: '12px',
                      }}
                      onClick={unStakeFn}
                      disabled={!(lpUnStackVal > 0)}
                    >
                      {/* Unstake */}
                      {loader.unstakeLoad ? <Spinner /> : <span>Unstake</span>}
                    </CustomButton>
                  </FlexDiv><br />
                  <div className={classes.stakInfoText}>
                    <FlexRow>
                      <img src={Info} alt="" className={classes.infoImg} />
                      User has to wait for 5 mins to unstake the staked amount
                    </FlexRow>
                  </div>
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
                      <Value>{lp_knabr_earned2}</Value>
                      {/* <Value>($0.00)</Value> */}
                    </FlexColumn>
                    <CustomButton
                      size="small"
                      style={{
                        backgroundColor: '#1E3444',
                        padding: '8px 48px',
                        marginLeft: '12px',
                      }}
                      onClick={harvestFn}
                      disabled={!(lp_knabr_earned2 > 0)}
                    >
                      {/* Harvest */}
                      {loader.harvestLoad ? <Spinner /> : <span>Harvest</span>}
                    </CustomButton>
                  </FlexDiv><br />
                  <div className={classes.stakInfoText}>
                    <FlexRow>
                      <img src={Info} alt="" className={classes.infoImg} />
                      KNABr earned are automatically harvested when u stake more LP
                    </FlexRow>
                  </div>
                </Paper>
              </FlexColumn>
            </Grid>
          </Grid>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

// export default StakingRow2;
const mapStateToProps = (state: any) => ({
  user: state.user,
  staking: state.staking
})

export default connect(mapStateToProps, {
  setTvlKnabUsdc2,
  setLp2,
  setLpDollar2,
  setKnabr,
  setLpStaked2,
  setLpStakedDollar2,
  setLpKnabREarned2,
  accordActionFn,
  errorAlert, successAlert,
})(StakingRow43)