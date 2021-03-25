import React, { useState } from 'react'
import { useStyles, NoDataContainer } from './style'
import { getPropertyType } from 'shared/helpers/globalFunction'
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
import ComponentLoader from 'shared/loader-components/component-loader'
import { PrimaryButton, SecondaryButton } from 'shared/components/buttons'
import CustomModal from 'shared/custom-modal'
import { ReviewAuctionModal } from 'modules/modals'
import { getFullName } from 'shared/helpers/globalFunction'
import Spinner from 'shared/loader-components/spinner'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'
import EmptyPage from 'shared/empty-page'
import { configureBlockchainAuction } from 'modules/block-chain/BlockChainMethods'

const PreAuctionTable = (props: any) => {
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [selectedAuctionId, setSelectedAuctionId] = useState('')
  const { data, dataLoading, type, updatePreAuction, refreshPreAuction, refreshOnAuction } = props

  const handleReviewAuction = (auctionDataVal: any, propertyValue: any) => {
    const dataVal = { ...auctionDataVal, propertyValue }
    setModalData(dataVal)
    setShowModal(true)
  }
  const handleTreasuryAdminAction = async (auctionDetails: any) => {
    setSelectedAuctionId(auctionDetails.id)
    try {
      setLoading(true)
      const data = {
        id: auctionDetails.id,
      }
      const { startDate, endDate, id, minReserve, slReserve, suggestedLowestBid, propidId } = auctionDetails
      await configureBlockchainAuction(startDate, endDate, id, minReserve, slReserve, suggestedLowestBid, propidId)
      await axios.post(`${apiBaseUrl}/auction/activateAuction`, data)
      refreshPreAuction()
      refreshOnAuction()
    } catch (error) {
      console.log('error => ', error)
    } finally {
      setLoading(false)
    }
  }

  const renderTableRows = (rowData: any, index: number) => {
    const { PropertyDetails, AuctionDetail } = rowData
    return (
      <TableRow key={index} className={classes.tableRowStyle}>
        <TableCell component="th" scope="row">
          {`${PropertyDetails.Address1},${PropertyDetails.State},${PropertyDetails.Country}`}
        </TableCell>
        <TableCell>{getFullName(PropertyDetails.Fname, PropertyDetails.Lname)}</TableCell>
        <TableCell>{getPropertyType(PropertyDetails.PropertyType)}</TableCell>
        <TableCell>New</TableCell>
        <TableCell>${parseFloat(PropertyDetails.CurrentValue).toFixed(2)}</TableCell>
        {!!type && type === 'owner' && (
          <TableCell>
            {AuctionDetail[0].isApprovedByOwner ? (
              <SecondaryButton variant="contained" disabled>
                In review
              </SecondaryButton>
            ) : (
              <PrimaryButton variant="contained" onClick={() => handleReviewAuction(AuctionDetail[0], PropertyDetails.CurrentValue)}>
                Review Auction
              </PrimaryButton>
            )}
          </TableCell>
        )}
        {!!type && type === 'treasuryAdmin' && (
          <TableCell>
            {AuctionDetail[0].isApprovedByOwner ? (
              <PrimaryButton variant="contained" onClick={() => handleTreasuryAdminAction(AuctionDetail[0])} disabled={loading}>
                {selectedAuctionId === AuctionDetail[0].id && loading ? <Spinner /> : 'Approve'}
              </PrimaryButton>
            ) : (
              <>
                {AuctionDetail[0].status === 5 ? (
                  <SecondaryButton variant="contained" disabled>
                    Rejected
                  </SecondaryButton>
                ) : (
                  <SecondaryButton variant="contained" disabled>
                    Pending
                  </SecondaryButton>
                )}
              </>
            )}
          </TableCell>
        )}
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
                {!!type && type === 'owner' && <TableCell>ACTION</TableCell>}
                {!!type && type === 'treasuryAdmin' && <TableCell>ACTION</TableCell>}
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
              <EmptyPage name="for pre-auction" />
            </NoDataContainer>
          )}
        </TableContainer>
      )}
      <CustomModal show={showModal} toggleModal={setShowModal}>
        <ReviewAuctionModal data={modalData} setShowModal={setShowModal} updatePreAuction={updatePreAuction} />
      </CustomModal>
    </Grid>
  )
}
export default PreAuctionTable
