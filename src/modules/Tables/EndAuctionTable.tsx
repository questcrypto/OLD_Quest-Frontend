import React, { useState } from 'react'
import { connect } from 'react-redux'
import { errorAlert } from 'logic/actions/alerts.actions'
import { useStyles, NoDataContainer } from './style'
import { getPropertyType } from 'shared/helpers/globalFunction'
import ComponentLoader from 'shared/loader-components/component-loader'
import Grid from '@material-ui/core/Grid'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import CustomPagination from './CustomPagination'
import Paper from '@material-ui/core/Paper'
import { getFullName } from 'shared/helpers/globalFunction'
import { PrimaryButton } from 'shared/components/buttons'
import Spinner from 'shared/loader-components/spinner'
import EmptyPage from 'shared/empty-page'
import {
  auctionContractAddress,
  auctionAbi,
  slcAbi,
  SLCContractAddress,
  daiAbi,
  DAIContractAddress,
  selfAbi,
  SLFContractAddress,
} from 'modules/block-chain/abi'
import {
  getWeb3Val,
  handleEndAuction,
  handleStoreWinTokenAmount,
  handleStoreDaiClaimAmount,
  handleDAIapproval,
} from 'modules/block-chain/BlockChainMethods'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'

const EndAuctionTable = (props: any) => {
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loading, setLoading] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const { data, dataLoading, errorAlert } = props

  const endAuction = async (auctionID: string, propId: any) => {
    setSelectedId(auctionID)
    try {
      setLoading(true)
      const web3 = await getWeb3Val()
      if (web3) {
        const accounts = await web3.eth.getAccounts()
        const auctionContract = new web3.eth.Contract(auctionAbi, auctionContractAddress)

        // read slc address from mapping
        const SLFInstance = new web3.eth.Contract(selfAbi, SLFContractAddress)
        const SLCAddress = await SLFInstance.methods.PROPERTY_ERC20_ADDRESS(propId).call()

        const slcContract = new web3.eth.Contract(slcAbi, SLCAddress)
        const daiContract = new web3.eth.Contract(daiAbi, DAIContractAddress)
        const res: any = await handleEndAuction(slcContract, accounts[0], auctionID, propId)
        const eventRes = await auctionContract.getPastEvents('AuctionSuccess', { fromBlock: res.blockNumber, toBlock: res.blockNumber })
        const auctionStatus: boolean = eventRes[0].returnValues[1]
        console.log('Event res', eventRes)
        console.log('Auction Status', auctionStatus)
        if (auctionStatus === true) {
          const res: any = await axios.post(`${apiBaseUrl}/auction/EndAuction`, { auctionID, auctionStatus })
          console.log('End Auction res, auctionStatus', res, auctionStatus)
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
          const arr: [] = res.data.Claimers_Amount_Array
          let sum = 0
          arr.forEach((element) => {
            sum += element
          })
          await handleDAIapproval(daiContract, accounts[0], auctionContractAddress, sum)
        } else {
          const res: any = await axios.post(`${apiBaseUrl}/auction/EndAuction`, { auctionID, auctionStatus })
          console.log('End Auction res, auctionStatus', res, auctionStatus)
          await handleStoreDaiClaimAmount(
            auctionContract,
            accounts[0],
            auctionID,
            res.data.Claimers_Address_Array,
            res.data.Claimers_Amount_Array
          )
          const arr: [] = res.data.Claimers_Amount_Array
          let sum = 0
          arr.forEach((element) => {
            sum += element
          })
          await handleDAIapproval(daiContract, accounts[0], auctionContractAddress, sum)
        }
      }
    } catch (error) {
      if (!!error && error.response && error.response.data.message) {
        errorAlert(error.response.data.message)
      } else {
        errorAlert('Something went wrong , please try again')
      }
    } finally {
      setLoading(false)
    }
  }

  const renderTableRows = (rowData: any, index: number) => {
    const { PropertyDetails, AuctionDetail } = rowData
    return (
      <TableRow key={index} className={classes.tableRowStyle}>
        <TableCell
          component="th"
          scope="row"
        >{`${PropertyDetails.Address1},${PropertyDetails.State},${PropertyDetails.Country}`}</TableCell>
        <TableCell>{getFullName(PropertyDetails.Fname, PropertyDetails.Lname)}</TableCell>
        <TableCell>{getPropertyType(PropertyDetails.PropertyType)}</TableCell>
        <TableCell>Approved</TableCell>
        <TableCell>${parseFloat(PropertyDetails.CurrentValue).toFixed(2)}</TableCell>
        <TableCell>
          <PrimaryButton
            onClick={() => endAuction(AuctionDetail[0].id, AuctionDetail[0].propidId)}
            disabled={AuctionDetail[0].status !== 2 || loading}
          >
            {selectedId === AuctionDetail[0].id && loading ? <Spinner /> : 'End Auction'}
          </PrimaryButton>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <Grid>
      {dataLoading ? (
        <ComponentLoader />
      ) : (
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
                {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map((row: any, k: number) =>
                  renderTableRows(row, k)
                )}
              </TableBody>
            )}
            {!!data && data.length > 10 && (
              <TableFooter>
                <TableRow>
                  <CustomPagination rows={data} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} page={page} setPage={setPage} />
                </TableRow>
              </TableFooter>
            )}
          </Table>
          {!!data && data.length === 0 && (
            <NoDataContainer>
              <EmptyPage name="here for end-auction" />
            </NoDataContainer>
          )}
        </TableContainer>
      )}
    </Grid>
  )
}
export default connect(null, { errorAlert })(EndAuctionTable)
