import React from 'react'
import { PropertyTableWarper, CustomTableHead, CustomTableCell, PaginationCont, PaginationText, NoDataContainer } from './style'
import { getPropertyType } from 'shared/helpers/globalFunction'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import EditIcon from '@material-ui/icons/Edit'
import Pagination from '@material-ui/lab/Pagination'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'

const PropertyTable = (props: any) => {
  const { data } = props
  console.log('data==>', data)

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
    <PropertyTableWarper>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <CustomTableHead>
            <TableRow>
              <CustomTableCell>LOCATION</CustomTableCell>
              <CustomTableCell>MANAGER</CustomTableCell>
              <CustomTableCell>TYPE</CustomTableCell>
              <CustomTableCell>STATUS</CustomTableCell>
              <CustomTableCell>VALUE</CustomTableCell>
              <CustomTableCell>ACTION</CustomTableCell>
            </TableRow>
          </CustomTableHead>
          {!!data && data.length > 0 && (
            <TableBody>
              {data.map((row: any, k: number) => (
                <TableRow key={k}>
                  <CustomTableCell component="th" scope="row">
                    {`${row.Address1},${row.State},${row.Country}`}
                  </CustomTableCell>
                  <CustomTableCell>{getName(row.Fname, row.Lname)}</CustomTableCell>
                  <CustomTableCell>{getPropertyType(row.PropertyType)}</CustomTableCell>
                  <CustomTableCell>New</CustomTableCell>
                  <CustomTableCell>${parseFloat(row.CurrentValue).toFixed(2)}</CustomTableCell>
                  <CustomTableCell>
                    <EditIcon style={{ cursor: 'pointer' }} onClick={() => handleAction(row.id)} />
                  </CustomTableCell>
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
        <PaginationCont>
          <PaginationText>Showing 1 to 15 of 35 element</PaginationText>
          <Pagination count={10} showFirstButton showLastButton />
        </PaginationCont>
      )}
    </PropertyTableWarper>
  )
}
export default PropertyTable
