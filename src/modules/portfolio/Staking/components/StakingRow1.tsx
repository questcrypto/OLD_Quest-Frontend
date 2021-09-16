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
import UpArrow from 'assets/icons/UpArrowAccord.svg'
import DownArrow from 'assets/icons/DownArrowAccord.svg'
import CustomInput from '../../components/shared/CustomInput'
import CustomButton from '../../components/shared/Button'
import Info from 'assets/images/info.svg'
import Question from 'assets/icons/question.svg'
import StakeKnabModal from './StakeKnabModal'
import {
  handleKnabApproval,
  withdraw,
  getAssetsKNABBalance,
  getAssetsKNABrBalance,
  getStake,
  getPendingKnabr,
  getTvlKnab,
  getHarvest,
  getAllocation
} from '../../../../modules/block-chain/BlockChainMethods'
import { KNABAddressTest, KNABabi } from '../../../../modules/block-chain/abi'
import Spinner from 'shared/loader-components/spinner'
import { setKnab, setKnabDollar, setKnabStaked, setKnabStakedDollar, setKnabr, setKnabrEarned, setTvlKnab, accordActionFn, setAprK } from '../../../../logic/actions/staking.action';
import { successAlert, errorAlert } from 'logic/actions/alerts.actions'

const useStyles = makeStyles((theme) => ({
  accordionRoot: {
    // marginTop: '28px',
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
    boxSizing: 'border-box',
    height: '100%',
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
  questionImg: {
    padding: '0px 4px',
    width: '15px',
    position: 'relative',
    top: '2px',
    cursor: 'pointer'
  },
  padLR: {
    paddingRight: '16px'
  },
  hr: {
    height: '24px',
    color: '#EDEDED',
    opacity: '0.5'
  },
  divResp1: {
    '@media (max-width: 450px)': {
      flexDirection: 'column'
    }
  }
}));

const StakingRow1 = (props: any) => {

  const classes = useStyles();
  const {
    user: { walletConAddress, web3Instance },
    staking: { knab, knab_dollar, knab_staked, knab_staked_dollar, knabr, knabr_earned, tvl_knab, accordAction, apr_k },
    setKnab, setKnabDollar, setKnabStaked, setKnabStakedDollar, setKnabr, setKnabrEarned, setTvlKnab, accordActionFn,
    successAlert, errorAlert,
    setAprK
  } = props;

  useEffect(() => {
    if (walletConAddress.length > 0) {
      stateUpdate();
    }
  }, [walletConAddress])

  const stateUpdate = () => {
    try {

      getAllocation(0).then((res: any) => {
        setAprK( res * 100);
        // setAprK(0);
      })

      getAssetsKNABBalance().then((res) => {
        // console.log(res);
        setKnab(res);
        setKnabDollar(res);
      }, err => { console.log(err) })

      getStake(0).then((res) => {
        // console.log('Pool 1', res);
        setKnabStaked(res);
        setKnabStakedDollar(res);
      }, err => { console.log(err) })

      getAssetsKNABrBalance().then((res) => {
        setKnabr(res);
      }, err => { console.log(err) })

      getPendingKnabr(0).then((res) => {
        // console.log(res);
        setKnabrEarned(res);
      }, err => { console.log(err) })

      getTvlKnab().then((res) => {
        // console.log(res);
        setTvlKnab(res);
      }, err => { console.log(err) })
    } catch (err) { console.log(err) }
  }

  const [loader, setLoader] = useState({ approveLoad: false, unstakeLoad: false, harvestLoad: false })

  const [show, setShow] = useState(false);
  const [knabAppValue, setKnabAppValue] = useState(0.00);
  const [knabUnStakeValue, setKnabUnStakeValue] = useState(0.00);

  // useEffect(() => {
  //   console.log('web3Instance', web3Instance);
  // }, [web3Instance]);

  const toggleModal = () => {
    try {
      if (show) {
        setShow(false);
      }
      else { setShow(true) }
    } catch (error) { console.log(error) }
  }

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    try {
      // if (isOpen) { setIsOpen(false) }
      // if (accordAction['first']) { setIsOpen(false) }
      // else { setIsOpen(true) }
      const temp = accordAction['first'];
      accordActionFn({ ...accordAction, first: !temp, second: false, third: false, four_three: false })
    } catch { }
  }

  const stakeFn = () => {
    try {
      setShow(true);
    } catch (error) { console.log(error) }
  }

  const ApproveKnabTokFn = async () => {
    try {
      if ((knabAppValue / 1) > (knab / 1)) {
        errorAlert('Insufficient KNAB balance in wallet to Approve KNAB');
        setKnabAppValue(0);
        return;
      }
      setLoader({ ...loader, approveLoad: true });
      const knabContract = new web3Instance.eth.Contract(KNABabi, KNABAddressTest);
      const accounts = await web3Instance.eth.getAccounts()
      handleKnabApproval(knabContract, accounts[0], knabAppValue).then((res: any) => {
        // console.log(res);
        if (res) {
          setLoader({ ...loader, approveLoad: false });
          successAlert('Transaction completed successfully')
          setKnabAppValue(0);
        }
      }, err => {
        setLoader({ ...loader, approveLoad: false });
        console.log(err)
        errorAlert('Something went wrong , please try again')
        setKnabAppValue(0);
      })
    } catch (error) {
      console.log(error)
    }
  }

  const unStakeFn = () => {
    try {
      if ((knabUnStakeValue / 1) > (knab_staked / 1)) {
        errorAlert('Insufficent balance in wallet to Unstake');
        setKnabUnStakeValue(0);
        return;
      }
      setLoader({ ...loader, unstakeLoad: true });
      withdraw(0, knabUnStakeValue).then((res: any) => {
        if (res) {
          setLoader({ ...loader, unstakeLoad: false });
          stateUpdate();
          successAlert('Transaction completed successfully')
          setKnabUnStakeValue(0);
        }
      }, err => {
        setLoader({ ...loader, unstakeLoad: false });
        console.log(err)
        errorAlert('Something went wrong , please try again')
        setKnabUnStakeValue(0);
      })
    } catch (error) { console.log(error) }
  }

  const harvestFn = () => {
    try {
      setLoader({ ...loader, harvestLoad: true });
      getHarvest(0).then((res: any) => {
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

  const approveMaxClickApprove = () => {
    try {
      setKnabAppValue(knab);
    } catch (error) { console.log(error) }
  }

  const unstakeMaxClick = () => {
    try {
      setKnabUnStakeValue(knab_staked);
    } catch (error) { console.log(error) }
  }

  return (
    <>
      <Accordion classes={{ root: classes.accordionRoot }} expanded={accordAction['first']}>
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
              <Avatar src={KNAB} alt="" />
            </FlexColumn>
            <FlexColumn>
              <AccordHeading className={classes.padLR}>KNAB</AccordHeading>
              <AccordValue className={classes.padLR}>${tvl_knab} TVL</AccordValue>
            </FlexColumn>
            <FlexColumn>
              <AccordHeading className={classes.padLR}>{apr_k}%</AccordHeading>
              <AccordValue className={classes.padLR}>{apr_k}%(24hr)</AccordValue>
            </FlexColumn>
            <FlexColumn>
              <AccordHeading className={classes.padLR}>${knab_dollar}</AccordHeading>
              <AccordValue className={classes.padLR}>{knab} KNAB</AccordValue>
            </FlexColumn>
            <FlexColumn>
              <AccordHeading className={classes.padLR}>{knabr_earned}</AccordHeading>
              <AccordValue className={classes.padLR}> Knab R</AccordValue>
            </FlexColumn>
            <FlexColumn>
              <AccordArrIcon src={!accordAction['first'] ? UpArrow : DownArrow} alt='' />
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
                          KNAB Balance
                          <CustomTooltip
                            title="For more info refer to assets table"
                            arrow>
                            <img src={Question} alt="" className={classes.questionImg} />
                          </CustomTooltip>
                        </Heading>
                        <Value>{knab}</Value>
                        <Value>(${knab_dollar})</Value>
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
                            }}
                            onClick={stakeFn}
                            disabled={!(knab > 0)}
                          >
                            Stake
                          </CustomButton>
                        </div>
                      </CustomTooltip>
                    </FlexDiv>
                  </div>

                  <div className={classes.centerDiv}>
                    <Typography variant="subtitle1">
                      Add KNAB Token for Approval
                    </Typography>
                    <div className={classes.knabInput}>
                      <div className={classes.KnabIc}>
                        <img src={KNAB} alt="" />
                        <span>KNAB&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <hr className={classes.hr} />
                      </div>
                      <CustomInput
                        id="knab"
                        type="number"
                        value={knabAppValue}
                        onChange={(e: any) => setKnabAppValue(e.target.value)}
                        adornment={' | MAX'}
                        adornmentClick={approveMaxClickApprove}
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
                        onClick={ApproveKnabTokFn}
                        disabled={!(knabAppValue > 0)}
                      >
                        {loader.approveLoad ? <Spinner /> : <span>Approve&nbsp;KNAB&nbsp;Token</span>}
                      </CustomButton>
                    </div>
                    <FlexColumn className={classes.knabValues}>
                      {/* <Value>Receive: 0.00($0.00)</Value>
                      <Value>Price impact: 0.00%</Value>
                      <Value>Fee: 0.00% ~ 0.00%</Value>
                      <Value>Max Slippage: 0%</Value> */}
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
                      <Heading>
                        KNAB Staked
                        {/* <CustomTooltip 
                          title="info" 
                          arrow>
                          <img src={Question} alt="" className={classes.questionImg} />
                        </CustomTooltip> */}
                      </Heading>
                      <Value>{knab_staked} (${knab_staked_dollar})</Value>
                    </div><br />
                    <FlexDiv className={classes.divResp1}>
                      <CustomInput
                        id="knabStake"
                        type="number"
                        value={knabUnStakeValue}
                        onChange={(e: any) => setKnabUnStakeValue(e.target.value)}
                        adornment={' | MAX'}
                        adornmentClick={unstakeMaxClick}
                      />
                      <CustomButton
                        size="small"
                        style={{
                          backgroundColor: '#1E3444',
                          padding: '8px 48px',
                          marginLeft: '12px',
                          maxWidth: '100%'
                        }}
                        onClick={unStakeFn}
                        disabled={!(knabUnStakeValue > 0)}
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
                        <Value>{knabr_earned}</Value>
                        {/* <Value>($0.00)</Value> */}
                      </FlexColumn>
                      <CustomButton
                        size="small"
                        style={{
                          backgroundColor: '#1E3444',
                          padding: '8px 48px',
                          marginLeft: '12px',
                          maxWidth: '100%'
                        }}
                        onClick={harvestFn}
                        disabled={!(knabr_earned > 0)}
                      >
                        {/* Harvest */}
                        {loader.harvestLoad ? <Spinner /> : <span>Harvest</span>}
                      </CustomButton>
                    </FlexDiv><br />
                    <div className={classes.stakInfoText}>
                      <FlexRow>
                        <img src={Info} alt="" className={classes.infoImg} />
                        KNABr earned are automatically harvested when u stake more KNAB
                      </FlexRow>
                    </div>
                  </Paper>
                </FlexColumn>
              </Grid>
            </Grid>
          </div>
        </AccordionDetails>
      </Accordion>
      <StakeKnabModal
        show={show}
        toggleModal={toggleModal}
        stUpdate={stateUpdate}
      />
    </>
  );
}

// export default StakingRow1;
const mapStateToProps = (state: any) => ({
  user: state.user,
  staking: state.staking
})

export default connect(mapStateToProps, {
  setKnab,
  setKnabDollar,
  setKnabStaked,
  setKnabStakedDollar,
  setKnabr,
  setKnabrEarned,
  setTvlKnab,
  accordActionFn,
  successAlert, errorAlert,
  setAprK
})(StakingRow1)