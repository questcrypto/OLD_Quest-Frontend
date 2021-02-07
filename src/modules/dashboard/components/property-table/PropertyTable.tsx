import React from 'react'
import { CustomTableHead, CustomTableCell } from './style'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import EditIcon from '@material-ui/icons/Edit'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'

function CreateData(location: string, manager: string, type: string, status: string, owner: string, action: string) {
  return { location, manager, type, status, owner, action }
}

const rows = [
  CreateData('5th Avenue, New York', 'Castaneda', 'Condo', 'New', '$45210.4', 'Okay'),
  CreateData('5th Avenue, New York', 'Vanessa', 'Condo', 'New', '$45210.4', 'Okay'),
  CreateData('5th Avenue, New York', 'Schimta', 'Condo', 'New', '$45210.4', 'Okay'),
  CreateData('5th Avenue, New York', 'Perry', 'Condo', 'New', '$45210.4', 'Okay'),
]

const PropertyTable = () => {
  const handleAction = () => {
    history.push(Paths.propertyDetails)
  }

  return (
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
        <TableBody>
          {rows.map((row, k) => (
            <TableRow key={k}>
              <CustomTableCell component="th" scope="row">
                {row.location}
              </CustomTableCell>
              <CustomTableCell>{row.manager}</CustomTableCell>
              <CustomTableCell>{row.type}</CustomTableCell>
              <CustomTableCell>{row.status}</CustomTableCell>
              <CustomTableCell>{row.owner}</CustomTableCell>
              {row.action === 'Okay' ? (
                <CustomTableCell>
                  <EditIcon style={{ cursor: 'pointer' }} onClick={() => handleAction()} />
                </CustomTableCell>
              ) : (
                <CustomTableCell>{row.action}</CustomTableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default PropertyTable
