import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Paper, Grid } from '@material-ui/core'
import {
  useStyles,
  FlexDiv,
  FlexColumn,
  Heading,
  Value
} from '../style'
import CustomInput from '../../components/shared/CustomInput'
import CustomButton from '../../components/shared/Button'
import { getKnabBal, getKnabrBal } from '../../../../logic/actions/staking.action'
import { getKNABBalance } from '../../../../modules/block-chain/BlockChainMethods'

const StakingHeader = (props: any) => {

  const classes = useStyles();

  const { 
    getKnabBal, 
    getKnabrBal,
    staking: { knab, knabr } 
  } = props;

  const [knabRBal, setKnabR] = useState({value: '0.0000', dollarValue: '0.00'})
  const [conknabBal, setConknabBal] = useState({value: '00.00', dollarValue: '214.261'})
  const [knabREarn, setKnabREarn] = useState({value: '00.00', dollarValue: '0.00'})

  const handleChange = (e: any) => {
    try {
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Grid container spacing={3}>

      <Grid item md={7} xs={12}>
        <Paper className={classes.rowDiv}>

          <FlexDiv>
            <FlexColumn>
              <Heading>KNABr Balance</Heading>
              <Value>
                {/* { knabRBal['value']}  */} { knabr }
                (${ knabRBal['dollarValue'] })
              </Value>
            </FlexColumn>

            <FlexColumn>
              <Heading>Converted KNAB Balance</Heading>
              <Value>
                { conknabBal['value'] } (~${ conknabBal['dollarValue'] })
              </Value>
            </FlexColumn>
          </FlexDiv><br />

          <FlexDiv>
            <CustomInput
              id="knabrBalance"
              type="number"
              value={0.00}
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
            >
              Convert&nbsp;To&nbsp;KNAB
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
                { knabREarn['value'] } KNABr
              </Value>
              <Value>
                (${ knabREarn['dollarValue'] })
              </Value>
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
          </FlexDiv>
        </Paper>
      </Grid>
    </Grid>
  );
}

// export default StakingHeader;
const mapStateToProps = (state: any) => ({
  staking: state.staking
})
export default connect(mapStateToProps, { getKnabBal, getKnabrBal })(StakingHeader)
