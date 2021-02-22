import React, { useState, useEffect } from 'react'
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
import EditIcon from '@material-ui/icons/Edit'
import Pagination from '@material-ui/lab/Pagination'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'

const PropertyTable = (props: any) => {
  const { data } = props

  let FilteredValue: any

  console.log('this is prop data => ', props.searchquery)
  const classes = useStyles()

  const handleAction = (id: any) => {
    history.push(`${Paths.propertyDetails}/${id}`)
  }
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

  return (
    <Grid>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
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
            <TableBody className={classes.tableHeadStyle}>
              {/* {console.log("data => ", data)} */}
              {data.map((row: any, k: number) => (
                <TableRow key={k}>
                  <TableCell component="th" scope="row">
                    {`${row.Address1},${row.State},${row.Country}`}
                  </TableCell>
                  <TableCell>{getName(row.Fname, row.Lname)}</TableCell>
                  <TableCell>{getPropertyType(row.PropertyType)}</TableCell>
                  <TableCell>New</TableCell>
                  <TableCell>${parseFloat(row.CurrentValue).toFixed(2)}</TableCell>
                  <TableCell>
                    <EditIcon style={{ cursor: 'pointer' }} onClick={() => handleAction(row.id)} />
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
      {!!data && data.length > 10 && (
        <Grid container className={classes.paginationCont} justify="space-between">
          <PaginationText>Showing 1 to 15 of 35 element</PaginationText>
          <Pagination count={10} showFirstButton showLastButton />
        </Grid>
      )}
    </Grid>
  )
}
export default PropertyTable
