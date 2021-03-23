import React, { useState } from 'react'
import { useStyles, PaginationText, NoDataContainer } from './style'
import { getPropertyType } from 'shared/helpers/globalFunction'
import ComponentLoader from 'shared/loader-components/component-loader'
import Grid from '@material-ui/core/Grid'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Paper from '@material-ui/core/Paper'
import Pagination from '@material-ui/lab/Pagination'
import { getFullName } from 'shared/helpers/globalFunction'
import { PrimaryButton } from 'shared/components/buttons'
import Spinner from 'shared/loader-components/spinner'
import EmptyPage from 'shared/empty-page'
import { auctionContractAddress, auctionAbi, slcAbi, SLCContractAddress } from 'modules/block-chain/abi'
import { getWeb3Val, handleEndAuction, handleStoreWinTokenAmount, handleStoreDaiClaimAmount } from 'modules/block-chain/BlockChainMethods'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'

interface Props {
  data: any
  dataLoading: boolean
}

const EndAuctionTable = (props: Props) => {
  const [loading, setLoading] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const classes = useStyles()
  const { data, dataLoading } = props

  const endAuction = async (auctionID: string) => {
    setSelectedId(auctionID)
    setLoading(true)
    const web3 = await getWeb3Val()
    if (web3) {
      const accounts = await web3.eth.getAccounts()
      const auctionContract = new web3.eth.Contract(auctionAbi, auctionContractAddress)
      const slcContract = new web3.eth.Contract(slcAbi, SLCContractAddress)
      try {
        const res: any = await handleEndAuction(slcContract, accounts[0], auctionID)
        const eventRes = await auctionContract.getPastEvents('AuctionSuccess', { fromBlock: res.blockNumber, toBlock: res.blockNumber })
        const auctionStatus: boolean = eventRes[0].returnValues[1]
        if (auctionStatus === true) {
          const res: any = await axios.post(`${apiBaseUrl}/auction/EndAuction`, { auctionID, auctionStatus })
          await handleStoreWinTokenAmount(
            slcContract,
            accounts[0],
            auctionID,
            res.data.Auction_Winners_Array,
            res.data.Auction_Winner_Amount_Array
          )
          await handleStoreDaiClaimAmount(
            auctionContract,
            accounts[0],
            auctionID,
            res.data.Claimers_Address_Array,
            res.data.Claimers_Amount_Array
          )
        } else {
          const res: any = await axios.post(`${apiBaseUrl}/auction/EndAuction`, { auctionID, auctionStatus })
          await handleStoreDaiClaimAmount(
            auctionContract,
            accounts[0],
            auctionID,
            res.data.Claimers_Address_Array,
            res.data.Claimers_Amount_Array
          )
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }

  return (
    <Grid>
      {dataLoading ? (
        <ComponentLoader />
      ) : (
        <div>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead className={classes.tableHeadStyle}>
                <TableRow>
                  <TableCell>LOCATION</TableCell>
                  <TableCell>MANAGER</TableCell>
                  <TableCell>TYPE</TableCell>
                  <TableCell>STATUS</TableCell>
                  <TableCell>VALUE</TableCell>
                  <TableCell>ACTION</TableCell>
                </TableRow>
              </TableHead>
              {!!data && data.length > 0 && (
                <TableBody>
                  {data.map((row: any, k: number) => (
                    <TableRow key={k} className={classes.tableRowStyle}>
                      <TableCell
                        component="th"
                        scope="row"
                      >{`${row.PropertyDetails.Address1},${row.PropertyDetails.State},${row.PropertyDetails.Country}`}</TableCell>
                      <TableCell>{getFullName(row.PropertyDetails.Fname, row.PropertyDetails.Lname)}</TableCell>
                      <TableCell>{getPropertyType(row.PropertyDetails.PropertyType)}</TableCell>
                      <TableCell>Approved</TableCell>
                      <TableCell>${parseFloat(row.PropertyDetails.CurrentValue).toFixed(2)}</TableCell>
                      <TableCell>
                        <PrimaryButton onClick={() => endAuction(row.AuctionDetail[0].id)} disabled={loading}>
                          {selectedId === row.AuctionDetail[0].id && loading ? <Spinner /> : 'End Auction'}
                        </PrimaryButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
            {!!data && data.length === 0 && (
              <NoDataContainer>
                <EmptyPage name="here" />
              </NoDataContainer>
            )}
          </TableContainer>
          {!!data && data.length > 10 && (
            <Grid container className={classes.paginationCont} justify="space-between">
              <PaginationText>Showing 1 to 15 of 35 element</PaginationText>
              <Pagination count={10} showFirstButton showLastButton />
            </Grid>
          )}
        </div>
      )}
    </Grid>
  )
}
export default EndAuctionTable
