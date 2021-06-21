import { useStyles } from '../style'
import { Paper, Typography, Grid } from '@material-ui/core'
import CustomButton from './shared/Button'
import TokenCard from './TokenCard'
import FullICODetails from './FullICODetails'
import Graph from './Graph/Graph'
import history from 'modules/app/components/history'
import { Paths } from 'modules/app/components/routes/types'

const LearnMore = () => {
  const classes = useStyles()
  const handleBackButton = () => history.push(Paths.root)

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography className={classes.title} variant="h6">
          Token
        </Typography>
        <div className={classes.btnDiv}>
          <CustomButton
            size="small"
            disableElevation
            disableFocusRipple
            disableRipple
            style={{ backgroundColor: '#858585', padding: '0px 16px' }}
          >
            00.00 KNABr
          </CustomButton>
          &nbsp;&nbsp;&nbsp;
          <CustomButton
            size="small"
            disableElevation
            disableFocusRipple
            disableRipple
            style={{ backgroundColor: '#858585', padding: '0px 16px' }}
          >
            00.00 KNAB
          </CustomButton>
          &nbsp;&nbsp;&nbsp;
          <CustomButton size="small" style={{ backgroundColor: '#1E3444', padding: '0px 16px' }}>
            Real Estate Auctions
          </CustomButton>
          &nbsp;&nbsp;&nbsp;
          <CustomButton size="small" style={{ backgroundColor: '#1E3444', padding: '0px 16px' }}>
            Buy | Convert Quest
          </CustomButton>
          &nbsp;&nbsp;&nbsp;
          <CustomButton size="small" style={{ backgroundColor: '#1E3444', padding: '0px 16px' }}>
            {/* Buy | Convert KNAB */}
            Buy KNAB
          </CustomButton>
        </div>
      </div>
      <br />

      <Paper>
        <br />
        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
        <CustomButton
          size="small"
          disableElevation
          disableFocusRipple
          disableRipple
          style={{ backgroundColor: '#858585', padding: '0px 16px' }}
          onClick={() => handleBackButton()}
          // onClick={openbcModal}
        >
          back
        </CustomButton>
        <Grid container spacing={4} style={{ padding: '38px 0px' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Grid item md={5} xs={12}>
            <TokenCard />
          </Grid>
          <Grid item md={5} xs={12}>
            <TokenCard />
          </Grid>
        </Grid>
        <Grid container spacing={4} style={{ padding: '38px 0px' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Grid item md={10} xs={12}>
            <Graph />
          </Grid>
        </Grid>
        <Grid container spacing={4} style={{ padding: '38px 0px' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Grid item md={10} xs={12}>
            <FullICODetails />
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default LearnMore
