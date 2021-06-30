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
import UpArrow from 'assets/icons/UpArrowAccord.svg'
import DownArrow from 'assets/icons/DownArrowAccord.svg'
import CustomInput from '../../components/shared/CustomInput'
import CustomButton from '../../components/shared/Button'
import Info from 'assets/images/info.svg'
import StakeKnabModal from './StakeKnabModal'
import { handleKnabApproval, withdraw, getAssetsKNABBalance, getAssetsKNABrBalance } from '../../../../modules/block-chain/BlockChainMethods'
import { KNABAddressTest, KNABabi } from '../../../../modules/block-chain/abi'
import Spinner from 'shared/loader-components/spinner'
import { setKnab, setKnabr } from '../../../../logic/actions/staking.action';

const useStyles = makeStyles((theme) => ({
  accordionRoot: {
    // marginTop: '28px',
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
  }
}));

const StakingRow1 = (props: any) => {

  const classes = useStyles();
  const { 
    user: { walletConAddress, web3Instance },
    staking: { knab, knabr } 
  } = props;

  useEffect(() => {
    if (walletConAddress) {

      getAssetsKNABBalance().then((res) => {
        console.log(res);
        setKnab(res);
      }, err => { console.log(err) })

      getAssetsKNABrBalance().then((res) => {
        console.log(res);
        setKnabr(res);
      }, err => { console.log(err) })

    }
  }, [walletConAddress])

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
      if (isOpen) { setIsOpen(false) }
      else { setIsOpen(true) }
    } catch { }
  }

  const stakeFn = () => {
    try {
      setShow(true);
    } catch (error) { console.log(error) }
  }

  const ApproveKnabTokFn = async () => {
    try {
      setLoader({ ...loader, approveLoad: true });
      const knabContract = new web3Instance.eth.Contract(KNABabi, KNABAddressTest);
      const accounts = await web3Instance.eth.getAccounts()
      handleKnabApproval(knabContract, accounts[0], knabAppValue).then((res: any) => {
        if (res) {
          setLoader({ ...loader, approveLoad: false });
        }
      }, err => {
        setLoader({ ...loader, approveLoad: false });
        console.log(err)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const unStakeFn = () => {
    try {
      setLoader({ ...loader, unstakeLoad: true });
      withdraw(0, knabUnStakeValue).then((res: any) => {
        if (res) {
          setLoader({ ...loader, unstakeLoad: false });
        }
      }, err => {
        setLoader({ ...loader, unstakeLoad: false });
        console.log(err)
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
              <Avatar src={KNAB} alt="" />
            </FlexColumn>
            <FlexColumn>
              <AccordHeading>KNAB</AccordHeading>
              <AccordValue>$0 TVL</AccordValue>
            </FlexColumn>
            <FlexColumn>
              <AccordHeading>0%</AccordHeading>
              <AccordValue>0%(24hr)</AccordValue>
            </FlexColumn>
            <FlexColumn>
              <AccordHeading>$0.00</AccordHeading>
              <AccordValue>{ knab } KNAB</AccordValue>
            </FlexColumn>
            <FlexColumn>
              <AccordHeading>$0.00</AccordHeading>
              <AccordValue>{ knabr } Knab R</AccordValue>
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
                        <Heading>KNAB Balance</Heading>
                        <Value>{ knab }</Value>
                        <Value>($00.00)</Value>
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
                      Add KNAB Token for Approval
                    </Typography>
                    <div className={classes.knabInput}>
                      <div className={classes.KnabIc}>
                        <img src={KNAB} alt="" />
                        <span>KNAB</span>
                      </div>
                      <CustomInput
                        id="knab"
                        type="number"
                        value={knabAppValue}
                        onChange={(e: any) => setKnabAppValue(e.target.value)}
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
                        onClick={ApproveKnabTokFn}
                      >
                        {loader.approveLoad ? <Spinner /> : <span>Approve&nbsp;KNAB&nbsp;Token</span>}
                      </CustomButton>
                    </div>
                    <FlexColumn className={classes.knabValues}>
                      <Value>Receive: 0.0000($0.0000)</Value>
                      <Value>Price impact: 0.0000%</Value>
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
                      <Heading>KNAB Staked</Heading>
                      <Value>0.0000 ($0.00)</Value>
                    </div><br />
                    <FlexDiv>
                      <CustomInput
                        id="knabStake"
                        type="number"
                        value={knabUnStakeValue}
                        onChange={(e: any) => setKnabUnStakeValue(e.target.value)}
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
                      <FlexRow>
                        <img src={Info} alt="" className={classes.infoImg} />
                        Lorem ipsum dolor sit amet, adipiscing elit sed do eiusmod Yield 10.71%
                      </FlexRow>
                    </div>
                  </Paper>
                  <Paper className={classes.stakedDiv2}>
                    <div className={classes.headStaDiv}>
                      <Heading>KNABr Earned</Heading>
                    </div><br />
                    <FlexDiv>
                      <FlexColumn>
                        <Value>{ knabr }</Value>
                        <Value>($0.00)</Value>
                      </FlexColumn>
                      <CustomButton
                        size="small"
                        style={{
                          backgroundColor: '#1E3444',
                          padding: '8px 48px',
                          marginLeft: '12px',
                        }}
                      >
                        {/* Harvest */}
                        {loader.harvestLoad ? <Spinner /> : <span>Harvest</span>}
                      </CustomButton>
                    </FlexDiv><br />
                    <div className={classes.stakInfoText}>
                      <FlexRow>
                        <img src={Info} alt="" className={classes.infoImg} />
                        Lorem ipsum dolor sit amet, adipiscing elit sed do eiusmod Yield 10.71%
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
      />
    </>
  );
}

// export default StakingRow1;
const mapStateToProps = (state: any) => ({
  user: state.user,
  staking: state.staking
})

export default connect(mapStateToProps, {})(StakingRow1)