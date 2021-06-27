import { Paper, Typography } from '@material-ui/core'
import {
  useStyles
} from './style'
import StakingHeader from './components/StakingHeader'
import StakingRow1 from './components/StakingRow1'
import StakingRow2 from './components/StakingRow2'
import StakingRow3 from './components/StakingRow3'

const Staking = (props: any) => {

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h6">
        QC Staking
      </Typography>
      <div className={classes.mainDiv}>
        <StakingHeader />
        <StakingRow1 />
        <StakingRow2 />
        <StakingRow3 />
      </div>
    </Paper>
  );
}

export default Staking;