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
import { setKnabBal, setKnabrBal } from '../../../../logic/actions/staking.action'
import Spinner from 'shared/loader-components/spinner'
import { getKNABBalance } from '../../../../modules/block-chain/BlockChainMethods'

const StakingHeader = (props: any) => {

  const classes = useStyles();

  const {
    setKnabBal,
    setKnabrBal,
    staking: { knab, knabr },
    walletAddress
  } = props;

  const [knabRBal, setKnabR] = useState({ value: '0.0000', dollarValue: '0.00' })
  const [conknabBal, setConknabBal] = useState({ value: '00.00', dollarValue: '214.261' })
  const [knabREarn, setKnabREarn] = useState({ value: '00.00', dollarValue: '0.00' })

  const [convertValue, setConvertValue] = useState(0.00)
  const [loader, setLoader] = useState({ ctkBtn: false, harBtn: false });

  const handleChange = (e: any) => {
    try {
      setConvertValue(e.target.value);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // console.log(walletAddress);
    // if (walletAddress.length > 0) {
    //   const res = getKNABBalance();
    //   res.then((data) => {
    //     console.log(data);
    //   }, err => { console.log(err) })
    // }
  }, [walletAddress]);

  const convertToKnabFn = () => {
    try {
      console.log(convertValue);
    } catch (err) { console.log(err) }
  }

  const harvestFn = () => {
    try {

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
                  {conknabBal['value']} (~${conknabBal['dollarValue']})
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
                  {knabREarn['value']} KNABr
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
                {loader.harBtn ? <Spinner /> : 'Harvest'}
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
export default connect(mapStateToProps, { setKnabBal, setKnabrBal })(StakingHeader)
