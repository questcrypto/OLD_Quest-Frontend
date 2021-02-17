import React from 'react'
import {
  PercentageText,
  AssetDetailsWrapper,
  AssetDetailsPanel,
  PhotoWrap,
  useStyles,
  Header,
  Mid,
  Footer,
  SecondaryText,
  ValueText,
  PropertiesPanel,
} from './style'
import { getPropertyType } from 'shared/helpers/globalFunction'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import EditIcon from '@material-ui/icons/Edit'
import Pagination from '@material-ui/lab/Pagination'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'
import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { VerticalDivider } from '../asset-transactions/style'

const AssetDetails = (props: any) => {
  const { data } = props
  const classes = useStyles()

  return (
    <AssetDetailsWrapper>
      <Grid container direction="column" className={classes.root}>
        <AssetDetailsPanel container direction="column" item xs={12}>
          <Header container items xs={12}>
            <PhotoWrap></PhotoWrap>
            <span className={classes.name}>Quest Coin</span>
            <span className={classes.value}>$1.30</span>
            <PercentageText>20%</PercentageText>
          </Header>
          <Mid container items xs={12}>
            <Grid container direction="column" xs={5}>
              <SecondaryText>Token Holder</SecondaryText>
              <ValueText>2344589</ValueText>
            </Grid>
            <Grid container xs={2} alignItems="center">
              <VerticalDivider />
            </Grid>
            <Grid container direction="column" xs={5}>
              <SecondaryText>Circulating Supply</SecondaryText>
              <ValueText>55648669201 QST</ValueText>
            </Grid>
          </Mid>
          <Footer container items xs={12}>
            <Grid container direction="column" xs={6}>
              <SecondaryText>Next Property Lot Req.</SecondaryText>
              <ValueText>63648669201 QST</ValueText>
            </Grid>
            <Grid container direction="column" xs={6} alignItems="flex-end">
              <Button className={classes.btn2Style}>Mint Quest</Button>
            </Grid>
          </Footer>
        </AssetDetailsPanel>
        <PropertiesPanel container direction="column" item xs={12}>
          <Header container items xs={12}>
            <span className={classes.name}>Properties</span>
          </Header>
          <Mid container items xs={12}>
            <Grid container direction="column" xs={5}>
              <SecondaryText>Token Holder</SecondaryText>
              <ValueText>2344589</ValueText>
            </Grid>
            <Grid container xs={2} alignItems="center">
              <VerticalDivider />
            </Grid>
            <Grid container direction="column" xs={5}>
              <SecondaryText>Circulating Supply</SecondaryText>
              <ValueText>55648669201 QST</ValueText>
            </Grid>
          </Mid>
          <Footer container items xs={12}>
            <Grid container direction="column" xs={6}>
              <SecondaryText>Properties to be tokenized</SecondaryText>
              <ValueText>15</ValueText>
            </Grid>
            <Grid container direction="column" xs={6} alignItems="flex-end">
              <Button className={classes.btn2Style}>View List</Button>
            </Grid>
          </Footer>
        </PropertiesPanel>
      </Grid>
    </AssetDetailsWrapper>
  )
}
export default AssetDetails
