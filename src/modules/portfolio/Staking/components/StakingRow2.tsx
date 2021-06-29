import { useState } from 'react'
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

const StakingRow2 = (props: any) => {

  const classes = useStyles();

  const [lpStackVal, setLpStackVal] = useState(0.00)

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    try {
      if (isOpen) { setIsOpen(false) }
      else { setIsOpen(true) }
    } catch { }
  }

  const unStakeFn = () => {
    try {
      console.log(lpStackVal);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Accordion classes={{ root: classes.accordionRoot }} >
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
              <Avatar alt="" src={KNAB} />
              <Avatar alt="" src={USDC} />
            </AvatarGroup>
          </FlexRow>
          <FlexColumn>
            <AccordHeading>KNAB-USDC</AccordHeading>
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
                      <Heading>LP Balance</Heading>
                      <Value>000.00</Value>
                      <Value>($00.00)</Value>
                    </FlexColumn>
                    <CustomButton
                      size="small"
                      style={{
                        backgroundColor: '#1E3444',
                        padding: '8px 48px',
                      }}
                    >
                      Approve
                    </CustomButton>
                    <CustomButton
                      size="small"
                      style={{
                        backgroundColor: '#375A74',
                        padding: '8px 48px',
                        marginLeft: '12px'
                      }}
                    >
                      Stake
                    </CustomButton>
                  </FlexDiv>
                </div>

                <FlexColumn>
                  <div className={classes.btnCenterText}>
                    <Typography variant="subtitle2">
                      Add/remove liquidity to the KNAB-USDT on Quick Swap to get LP tokens.
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
                    >
                      Add Liquidity on Quick Swap
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
                    >
                      Remove Liquidity on Quick Swap
                    </CustomButton>
                  </div>
                </FlexColumn>

              </Paper>
            </Grid>

            <Grid item md={5} xs={12}>
              <FlexColumn>
                <Paper className={classes.stakedDiv}>
                  <div className={classes.headStaDiv}>
                    <Heading>LP Staked</Heading>
                    <Value>0.0000 ($0.00)</Value>
                  </div><br />
                  <FlexDiv>
                    <CustomInput
                      id="knabStake"
                      type="number"
                      value={lpStackVal}
                      onChange={(e: any) => setLpStackVal(e.target.value)}
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
  );
}

export default StakingRow2;