import React, { useState } from 'react'
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
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'
import EmptyPage from 'shared/empty-page'

const PublishedPropertyTable = (props: any) => {
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { type, data, dataLoading } = props

  const handleDetails = (id: any) => {
    history.push(`${Paths.treasuryPropertyDetails}/${id}`)
  }

  const renderTableRows = (rowData: any, index: number) => {
    return (
      <TableRow key={index} className={classes.tableRowStyle}>
        <TableCell component="th" scope="row">{`${rowData.Address1},${rowData.State},${rowData.Country}`}</TableCell>
        <TableCell>{getFullName(rowData.Fname, rowData.Lname)}</TableCell>
        <TableCell>{getPropertyType(rowData.PropertyType)}</TableCell>
        <TableCell>Approved</TableCell>
        <TableCell>${parseFloat(rowData.CurrentValue).toFixed(2)}</TableCell>
        {!!type && type === 'treasuryAdmin' && (
          <TableCell>
            <span style={{ cursor: 'pointer' }} onClick={() => handleDetails(rowData.id)}>
              View Details
            </span>
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
                {!!type && type === 'treasuryAdmin' && <TableCell>DETAILS</TableCell>}
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
              <EmptyPage name="here for-publish" />
            </NoDataContainer>
          )}
        </TableContainer>
      )}
    </Grid>
  )
}
export default PublishedPropertyTable
