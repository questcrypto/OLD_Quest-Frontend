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
// import Spinner from 'shared/loader-components/spinner'
import { PrimaryButton } from 'shared/components/buttons'
import CustomModal from 'shared/custom-modal'
import { ReviewAuctionModal } from 'modules/modals'
import Pagination from '@material-ui/lab/Pagination'
import { getFullName } from 'shared/helpers/globalFunction'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'

const PreAuctionTable = (props: any) => {
  const classes = useStyles()
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState<any>()
  const { data, dataLoading, type } = props

  const handleReviewAuction = () => {
    setShowModal(true)
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
                </TableRow>
              </TableHead>
              {!!data && data.length > 0 && (
                <TableBody>
                  {data.map((row: any, k: number) => (
                    <TableRow key={k} className={classes.tableRowStyle}>
                      <TableCell component="th" scope="row">
                        {`${row.Address1},${row.State},${row.Country}`}
                      </TableCell>
                      <TableCell>{getFullName(row.Fname, row.Lname)}</TableCell>
                      <TableCell>{getPropertyType(row.PropertyType)}</TableCell>
                      <TableCell>New</TableCell>
                      <TableCell>${parseFloat(row.CurrentValue).toFixed(2)}</TableCell>
                      {!!type && type === 'owner' && (
                        <TableCell>
                          <PrimaryButton onClick={() => handleReviewAuction()}>Review Auction</PrimaryButton>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              )}
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
            <ReviewAuctionModal setShowModal={setShowModal} />
          </CustomModal>
        </div>
      )}
    </Grid>
  )
}
export default PreAuctionTable
