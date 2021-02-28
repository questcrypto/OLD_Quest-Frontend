import React, { useState } from 'react'
import { useStyles, PaginationText, NoDataContainer } from './style'
import { getPropertyType } from 'shared/helpers/globalFunction'
import Grid from '@material-ui/core/Grid'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Paper from '@material-ui/core/Paper'
import ComponentLoader from 'shared/loader-components/component-loader'
import { PrimaryButton, SecondaryButton } from 'shared/components/buttons'
import CustomModal from 'shared/custom-modal'
import { ReviewAuctionModal } from 'modules/modals'
import Pagination from '@material-ui/lab/Pagination'
import { getFullName } from 'shared/helpers/globalFunction'
import Spinner from 'shared/loader-components/spinner'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'

const PreAuctionTable = (props: any) => {
  const classes = useStyles()
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [selectedAuctionId, setSelectedAuctionId] = useState('')
  const { data, dataLoading, type, updatePreAuction, refreshPreAuction } = props

  const handleReviewAuction = (auctionDataVal: any, propertyValue: any) => {
    const dataVal = { ...auctionDataVal, propertyValue }
    setModalData(dataVal)
    setShowModal(true)
  }
  const handleTreasuryAdminAction = async (auctionId: any) => {
    setSelectedAuctionId(auctionId)
    try {
      setLoading(true)
      const data = {
        id: auctionId,
      }
      await axios.post(`${apiBaseUrl}/auction/activateAuction`, data)
      refreshPreAuction()
    } catch (error) {
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
              <PrimaryButton variant="contained" onClick={() => handleTreasuryAdminAction(AuctionDetail[0].id)} disabled={loading}>
                {selectedAuctionId === AuctionDetail[0].id && loading ? <Spinner /> : 'Approve'}
              </PrimaryButton>
            ) : (
              <SecondaryButton variant="contained" disabled>
                Pending
              </SecondaryButton>
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
                  {!!type && type === 'owner' && <TableCell>ACTION</TableCell>}
                  {!!type && type === 'treasuryAdmin' && <TableCell>ACTION</TableCell>}
                </TableRow>
              </TableHead>
              {!!data && data.length > 0 && <TableBody>{data.map((row: any, k: number) => renderTableRows(row, k))}</TableBody>}
            </Table>
            {!!data && data.length === 0 && (
              <NoDataContainer>
                <p>No data available</p>
              </NoDataContainer>
            )}
          </TableContainer>
          {!!data && data.length > 10 && (
            <Grid container className={classes.paginationCont} justify="space-between">
              <PaginationText>Showing 1 to 15 of 35 element</PaginationText>
              <Pagination count={10} showFirstButton showLastButton />
            </Grid>
          )}
          <CustomModal show={showModal} toggleModal={setShowModal}>
            <ReviewAuctionModal data={modalData} setShowModal={setShowModal} updatePreAuction={updatePreAuction} />
          </CustomModal>
        </div>
      )}
    </Grid>
  )
}
export default PreAuctionTable
