import { useState, useEffect } from 'react'
import { Paper, makeStyles, Typography, Grid } from '@material-ui/core'
import { getStableCoinBalance } from '../../../modules/block-chain/BlockChainMethods'
import { Paths } from 'modules/app/components/routes/types'
import KnabIcon from 'assets/icons/KNAB.svg'

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    position: 'relative',
  },
  root: {
    height: 'auto',
    cursor: 'pointer',
    '&:hover': {
      border: '2px solid #E6BA73',
    },
  },
  header: {
    display: 'flex',
    padding: '30px',
  },
  contentDiv: {
    display: 'flex',
  },
  contentImgDiv: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: '12px',
    marginTop: '-20px',
    marginLeft: '20px',
  },
  contentImg: {
    height: '10vh',
  },
  contentTextDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    display: 'flex',
    padding: '30px',
  },
  detailsTitle: {
    fontSize: '0.7em',
  },
  detailsSubtitle: {
    fontSize: '1em',
    fontWeight: 'bold',
  },
  nestedSubTitle: {
    fontSize: '0.7em',
    color: '#C4C4C4',
  },
}))

const ICOHoldings = (props: any) => {
  const classes = useStyles()
  const [availableUSDC, setUSDC] = useState(0)

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  useEffect(() => {
    const displayMax = async () => {
      const usdcValue = await getStableCoinBalance()
      setUSDC(usdcValue)
    }
    displayMax()
  })
  return (
    <>
      <div className={classes.mainDiv} >
        <Paper
          className={classes.root}
          style={{ opacity: 1 }}
          // onClick={() => openInNewTab(`http://localhost:3000${Paths.tokenDetails}`)}
          onClick={() => openInNewTab(`https://polygonscan.com/`)}
        >
          <Typography className={classes.header}>ICO Holdings</Typography>
          <Grid container>
            <Grid item md={3} xs={12}>
              <div className={classes.contentImgDiv}>
                <img src={KnabIcon} alt="" className={classes.contentImg} />
              </div>
            </Grid>
            <Grid item md={3} xs={12} style={{ marginTop: '5px' }}>
              <div className={classes.contentTextDiv}>
                <Typography variant="h5">KNAB</Typography>
              </div>
            </Grid>
          </Grid>
          <Grid container className={classes.details} spacing={2}>
            <Grid item md={4} xs={12}>
              <Typography className={classes.detailsTitle}>KNAB Balance</Typography>
              <Typography className={classes.detailsSubtitle}>{Number(props.knabBalance.toFixed(3))}</Typography>
              <Typography className={classes.nestedSubTitle}>${Number(props.knabBalance.toFixed(3))} USDC</Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography className={classes.detailsTitle}>Available USDC</Typography>
              <Typography className={classes.detailsSubtitle}>{availableUSDC}</Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography className={classes.detailsTitle}>Supply of ICO</Typography>
              <Typography className={classes.detailsSubtitle}>10%</Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  )
}

export default ICOHoldings
