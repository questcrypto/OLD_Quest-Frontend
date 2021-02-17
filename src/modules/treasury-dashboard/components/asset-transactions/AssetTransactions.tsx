import React from 'react'
import {
  AssetTransactionsWrapper,
  SecondaryText,
  useStyles,
  TransactionsPanel,
  TransactionValue,
  TransactionStatus,
  IdText,
  PrimaryText,
  ValueText,
  VerticalDivider,
  TransactionWrap,
} from './style'
import Paper from '@material-ui/core/Paper'
import EditIcon from '@material-ui/icons/Edit'
import Pagination from '@material-ui/lab/Pagination'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'
import { Button, Grid } from '@material-ui/core'
import DownGreenArrow from 'assets/images/downGeen.svg'
import UpRedArrow from 'assets/images/upRed.svg'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const TransactionEntry = (entry: any, classes: any) => {
  return (
    <Grid container direction="column">
      <SecondaryText className={classes.date}>{entry?.date}Today</SecondaryText>
      <Grid container item xs={12} alignItems="flex-start">
        <Grid item xs={2} container>
          {/* <img src={ArrowUpwardIcon} alt="arrow" /> */}
        </Grid>
        <TransactionWrap container item xs={10}>
          <Grid container direction="column" item xs={7}>
            <TransactionStatus>{entry?.status!}Minted</TransactionStatus>
            <IdText>{`ID:${entry?.id!}`}bvnqts12488866222eqmp3dgs001st</IdText>
          </Grid>
          <Grid container item xs={5} justify="flex-end">
            <TransactionValue>{entry?.value!}-985642.989 QST</TransactionValue>
          </Grid>
        </TransactionWrap>
      </Grid>
    </Grid>
  )
}

const AssetTransactions = (props: any) => {
  const { data } = props
  const classes = useStyles()

  return (
    <AssetTransactionsWrapper>
      <TransactionsPanel container direction="column" component={Paper}>
        <PrimaryText className={classes.title}>Quest Coin Transactions</PrimaryText>
        <Grid container item xs={12} className={classes.weekDetails}>
          <Grid container direction="column" xs={5}>
            <SecondaryText>Transactions this week</SecondaryText>
            <ValueText>2354456</ValueText>
          </Grid>
          <Grid container xs={2} alignItems="center">
            <VerticalDivider />
          </Grid>
          <Grid container direction="column" item xs={5}>
            <SecondaryText>Quest burnt this week</SecondaryText>
            <ValueText>225668101 QST</ValueText>
          </Grid>
        </Grid>
        <Grid container item xs={12} alignItems="center" className={classes.requests}>
          <Grid container direction="column" item xs={6}>
            <SecondaryText>Exchange Request</SecondaryText>
            <ValueText>42</ValueText>
          </Grid>
          <Grid container xs={6} direction="column" alignItems="flex-end">
            <Button className={classes.btn2Style}>View Requests</Button>
          </Grid>
        </Grid>
        <Grid container item xs={12} className={classes.transactions}>
          <PrimaryText>Latest Transactions</PrimaryText>
        </Grid>
        {TransactionEntry({}, classes)}
      </TransactionsPanel>
    </AssetTransactionsWrapper>
  )
}
export default AssetTransactions
