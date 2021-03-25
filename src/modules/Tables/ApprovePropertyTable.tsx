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
import { PrimaryButton } from 'shared/components/buttons'
import { getFullName } from 'shared/helpers/globalFunction'
import Spinner from 'shared/loader-components/spinner'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'
import EmptyPage from 'shared/empty-page'

const ApprovePropertyTable = (props: any) => {
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loading, setLoading] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const { type, data, dataLoading, setActiveTab, updateApprove } = props

  const handleApproveByAdmin = async (id: any) => {
    setSelectedId(id)
    const approvedData = { id }
    try {
      setLoading(true)
      await axios.post(`${apiBaseUrl}/properties/ApproveByHOAAdmin`, approvedData)
      updateApprove()
      setActiveTab('published')
    } catch (error) {
      console.log('error==>', error)
    } finally {
      setLoading(false)
    }
  }

  const renderTableRows = (rowData: any, index: number) => {
    return (
      <TableRow key={index} className={classes.tableRowStyle}>
        <TableCell component="th" scope="row">
          {`${rowData.Address1},${rowData.State},${rowData.Country}`}
        </TableCell>
        <TableCell>{getFullName(rowData.Fname, rowData.Lname)}</TableCell>
        <TableCell>{getPropertyType(rowData.PropertyType)}</TableCell>
        <TableCell>Pending</TableCell>
        <TableCell>${parseFloat(rowData.CurrentValue).toFixed(2)}</TableCell>
        {!!type && type === 'admin' && (
          <TableCell>
            <PrimaryButton onClick={() => handleApproveByAdmin(rowData.id)}>
              {selectedId === rowData.id && loading ? <Spinner /> : 'Approve'}
            </PrimaryButton>
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
                {!!type && type === 'admin' && <TableCell>ACTION</TableCell>}
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
              <EmptyPage name="for approval" />
            </NoDataContainer>
          )}
        </TableContainer>
      )}
    </Grid>
  )
}
export default ApprovePropertyTable
