import React from 'react'
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
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'

const DashboardTable = (props: any) => {
  const classes = useStyles()
  const { data, publishedLoading } = props

  const getName = (firstName: string, lastName: string) => {
    let fName = ''
    let lName = ''
    if (firstName) {
      fName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
    }
    if (lastName) {
      lName = lastName.charAt(0).toUpperCase() + lastName.slice(1)
    }
    const fullName = `${fName} ${lName}`

    return fullName
  }

  const handleDetails = (id: any) => {
    history.push(`${Paths.treasuryPropertyDetails}/${id}`)
  }

  return (
    <Grid>
      {publishedLoading ? (
        <ComponentLoader />
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>LOCATION</TableCell>
                <TableCell>MANAGER</TableCell>
                <TableCell>TYPE</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>VALUE</TableCell>
                <TableCell>DETAILS</TableCell>
              </TableRow>
            </TableHead>
            {!!data && data.length > 0 && (
              <TableBody className={classes.tableHeadStyle}>
                {data.map((row: any, k: number) => (
                  <TableRow key={k}>
                    <TableCell component="th" scope="row">
                      {`${row.Address1},${row.State},${row.Country}`}
                    </TableCell>
                    <TableCell>{getName(row.Fname, row.Lname)}</TableCell>
                    <TableCell>{getPropertyType(row.PropertyType)}</TableCell>
                    <TableCell>Approved</TableCell>
                    <TableCell>${parseFloat(row.CurrentValue).toFixed(2)}</TableCell>
                    <TableCell>
                      <span style={{ cursor: 'pointer' }} onClick={() => handleDetails(row.id)}>
                        View Details
                      </span>
                    </TableCell>
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
      )}

      {!!data && data.length > 10 && (
        <Grid container className={classes.paginationCont} justify="space-between">
          <PaginationText>Showing 1 to 15 of 35 element</PaginationText>
          <Pagination count={10} showFirstButton showLastButton />
        </Grid>
      )}
    </Grid>
  )
}
export default DashboardTable
