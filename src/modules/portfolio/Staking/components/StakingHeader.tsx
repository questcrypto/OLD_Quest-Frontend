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

const StakingHeader = (props: any) => {

  const classes = useStyles();

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
              <Value>0.0000 ($0.00)</Value>
            </FlexColumn>

            <FlexColumn>
              <Heading>Converted KNAB Balance</Heading>
              <Value>
                00.00 (~$214.261)
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
                00.00 KNABr
              </Value>
              <Value>
                ($0.00)
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

export default StakingHeader;