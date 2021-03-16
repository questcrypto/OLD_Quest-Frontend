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
import { PrimaryButton } from 'shared/components/buttons'
import { getFullName } from 'shared/helpers/globalFunction'
import Spinner from 'shared/loader-components/spinner'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'
import EmptyPage from 'shared/empty-page'

const ApprovePropertyTable = (props: any) => {
  const classes = useStyles()
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
                  {!!type && type === 'admin' && <TableCell>ACTION</TableCell>}
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
                      <TableCell>Pending</TableCell>
                      <TableCell>${parseFloat(row.CurrentValue).toFixed(2)}</TableCell>
                      {!!type && type === 'admin' && (
                        <TableCell>
                          <PrimaryButton onClick={() => handleApproveByAdmin(row.id)}>
                            {selectedId === row.id && loading ? <Spinner /> : 'Approved'}
                          </PrimaryButton>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
            {!!data && data.length === 0 && (
              <NoDataContainer>
                <EmptyPage name="for approval" />
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
export default ApprovePropertyTable
