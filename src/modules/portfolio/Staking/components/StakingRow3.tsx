import { useState } from 'react'
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
import { KNABAddressTest, KNABabi } from '../../../../modules/block-chain/abi'
import { handleUsdcApproval } from '../../../../modules/block-chain/BlockChainMethods'
import Spinner from 'shared/loader-components/spinner'

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
  }
}));

const StakingRow3 = (props: any) => {

  const classes = useStyles();
  const { user: { walletConAddress, web3Instance } } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState({ approveLoad: false })
  const [usdcAppr, setUsdcAppr] = useState(0.00);
  const [usdcStake, setUsdcStake] = useState(0.00);

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
      const knabContract = new web3Instance.eth.Contract(KNABabi, KNABAddressTest);
      const accounts = await web3Instance.eth.getAccounts()
      handleUsdcApproval(knabContract, accounts[0], usdcAppr).then((res: any) => {
        if (res) {
          setLoader({ ...loader, approveLoad: false });
        }
      }, err => {
        setLoader({ ...loader, approveLoad: false });
        console.log(err)
      })
    } catch (error) { console.log(error) }
  }

  const unStakeFn = () => {
    try {
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
              <AccordHeading>USDC</AccordHeading>
              <AccordValue>$1,163,99117 TVL</AccordValue>
            </FlexColumn>
            <FlexColumn>
              <AccordHeading>2,012.39%</AccordHeading>
              <AccordValue>5.51%(24hr)</AccordValue>
            </FlexColumn>
            <FlexColumn>
              <AccordHeading>$0.00</AccordHeading>
              <AccordValue>0.0000 LP</AccordValue>
            </FlexColumn>
            <FlexColumn>
              <AccordHeading>$0.00</AccordHeading>
              <AccordValue>0.0000 Knab R</AccordValue>
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
                        <Value>000.00</Value>
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
                      <Heading>USDC Staked</Heading>
                      <Value>0.0000 ($0.00)</Value>
                    </div><br />
                    <FlexDiv>
                      <CustomInput
                        id="knabStake"
                        type="number"
                        value={usdcStake}
                        onChange={(e: any) => { setUsdcStake(e.target.value) }}
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
                        Unstake
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
                        <Value>0.0000</Value>
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
                        Harvest
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
      <StakeUsdcModal
        show={show}
        toggleModal={toggleModal}
      />
    </>
  );
}

// export default StakingRow3;
const mapStateToProps = (state: any) => ({
  user: state.user,
})

export default connect(mapStateToProps, {})(StakingRow3)