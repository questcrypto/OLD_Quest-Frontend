import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Paper,
  Grid,
  Accordion,
  AccordionSummary,
} from '@material-ui/core'
import {
  useStyles,
  FlexDiv,
  FlexColumn,
  Heading,
  Value,
} from '../style'
import CustomInput from '../../components/shared/CustomInput'
import CustomButton from '../../components/shared/Button'
import { setKnab, setKnabr, setKnabrEarned, setLpKnabREarned, setUsdcKnabEarned } from '../../../../logic/actions/staking.action'
import Spinner from 'shared/loader-components/spinner'
import {
  getKNABBalance, getHarvestAll, getAssetsKNABrBalance, getPendingKnabr,
} from '../../../../modules/block-chain/BlockChainMethods'

const StakingHeader = (props: any) => {

  const classes = useStyles();

  const {
    setKnab,
    setKnabr,
    staking: { knab, knabr, knabr_earned, usdc_knabr_earned, lp_knabr_earned },
    walletAddress,
    setKnabrEarned, setLpKnabREarned, setUsdcKnabEarned
  } = props;

  const [knabRBal, setKnabR] = useState({ value: '0.0000', dollarValue: '0.00' })
  const [conknabBal, setConknabBal] = useState({ value: '00.00', dollarValue: '214.261' })
  const [knabREarn, setKnabREarn] = useState({ value: '00.00', dollarValue: '0.00' })

  const [convertValue, setConvertValue] = useState(0.00)
  const [loader, setLoader] = useState({ ctkBtn: false, harvestLoad: false });

  const handleChange = (e: any) => {
    try {
      setConvertValue(e.target.value);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (walletAddress.length > 0) {
      stateUpdate();
    }
  }, [walletAddress]);

  const stateUpdate = () => {
    try {

      getAssetsKNABrBalance().then((res) => {
        // console.log(res);
        setKnabr(res);
      }, err => { console.log(err) })

      getPendingKnabr(0).then((res) => {
        // console.log(res);
        setKnabrEarned(res);
      }, err => { console.log(err) })

      getPendingKnabr(1).then((res) => {
        // console.log(res);
        setLpKnabREarned(res);
      }, err => { console.log(err) })

      getPendingKnabr(2).then((res) => {
        // console.log(res);
        setUsdcKnabEarned(res);
      }, err => { console.log(err) })

    } catch (error) { console.log(error) }
  }

  const convertToKnabFn = () => {
    try {
      console.log(convertValue);
      stateUpdate();
    } catch (err) { console.log(err) }
  }

  const harvestFn = () => {
    try {
      setLoader({ ...loader, harvestLoad: true });
      getHarvestAll().then((res: any) => {
        if (res) {
          setLoader({ ...loader, harvestLoad: false });
          stateUpdate();
        }
      }, err => {
        setLoader({ ...loader, harvestLoad: false });
        console.log(err)
      })
    } catch (err) { console.log(err) }
  }

  return (
    <>
      <Grid container spacing={3}>

        <Grid item md={7} xs={12}>
          <Paper className={classes.rowDiv}>

            <FlexDiv>
              <FlexColumn>
                <Heading>KNABr Balance</Heading>
                <Value>
                  {/* { knabRBal['value']}  */} {knabr}
                  (${knabRBal['dollarValue']})
                </Value>
              </FlexColumn>

              <FlexColumn>
                <Heading>Converted KNAB Balance</Heading>
                <Value>
                  {/* {conknabBal['value']} (~${conknabBal['dollarValue']}) */}
                  {0.00} (~${0.00})
                </Value>
              </FlexColumn>
            </FlexDiv><br />

            <FlexDiv>
              <CustomInput
                id="knabrBalance"
                type="number"
                value={convertValue}
                onChange={handleChange}
                adornment={' | MAX'}
              />
              <CustomButton
                size="large"
                style={{
                  backgroundColor: '#1E3444',
                  padding: '8px 48px',
                  marginLeft: '12px',
                }}
                onClick={convertToKnabFn}
              >
                {loader.ctkBtn ? <Spinner /> : <span>Convert&nbsp;To&nbsp;KNAB</span>}
              </CustomButton>
            </FlexDiv>

          </Paper>
        </Grid>

        <Grid item md={5} xs={12}>
          <Paper className={classes.rowDiv}>

            <Heading>Total KNABr Earned</Heading><br />
            <FlexDiv>
              <FlexColumn>
                <Value>
                  {/* {knabr_earned + usdc_knabr_earned + lp_knabr_earned} KNABr */}
                  { parseFloat(knabr_earned) + parseFloat(usdc_knabr_earned) + parseFloat(lp_knabr_earned) } KNABr
                </Value>
                <Value>
                  (${knabREarn['dollarValue']})
                </Value>
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
                {loader.harvestLoad ? <Spinner /> : 'Harvest'}
              </CustomButton>
            </FlexDiv>
          </Paper>
        </Grid>
      </Grid>

      <Accordion classes={{ root: classes.accordionHeadRoot }}>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          classes={{
            // root: classes.accordionSummary,
            // expandIcon: classes.expandIcon
          }}
        >
          <FlexDiv>
            <FlexColumn></FlexColumn>
            <FlexColumn>Token</FlexColumn>
            <FlexColumn>Yield(APY)</FlexColumn>
            <FlexColumn>Current Balance</FlexColumn>
            <FlexColumn>Rewards</FlexColumn>
            <FlexColumn></FlexColumn>
          </FlexDiv>
        </AccordionSummary>
      </Accordion>

    </>
  );
}

// export default StakingHeader;
const mapStateToProps = (state: any) => ({
  staking: state.staking,
  walletAddress: state.user.walletConAddress
})
export default connect(mapStateToProps, { setKnab, setKnabr, setKnabrEarned, setLpKnabREarned, setUsdcKnabEarned })(StakingHeader)
