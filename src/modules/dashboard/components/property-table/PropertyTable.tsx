import React from 'react'
import { useStyles, CustomTableHead, CustomTableCell } from './style'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'

import TableContainer from '@material-ui/core/TableContainer'

import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { ButtonBaseClassKey } from '@material-ui/core'

function createData(location: string, manager: string, type: string, status: string, owner: string, action: string) {
  return { location, manager, type, status, owner, action }
}

const rows = [
  createData('5th Avenue, New York', 'Castaneda', 'Condo', 'New', '$45210.4', 'Okay'),
  createData('5th Avenue, New York', 'Vanessa', 'Condo', 'New', '$45210.4', 'Okay'),
  createData('5th Avenue, New York', 'Schimta', 'Condo', 'New', '$45210.4', 'Okay'),
  createData('5th Avenue, New York', 'Perry', 'Condo', 'New', '$45210.4', 'Okay'),
  createData('5th Avenue, New York', 'Jesica', 'Condo', 'New', '$45210.4', 'Okay'),
  createData('5th Avenue, New York', 'Josefa', 'Condo', 'New', '$45210.4', 'Okay'),
]

const PropertyTable = () => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <CustomTableHead>
          <TableRow>
            <CustomTableCell>LOCATION</CustomTableCell>
            <CustomTableCell>MANAGER</CustomTableCell>
            <CustomTableCell>Type</CustomTableCell>
            <CustomTableCell>Status</CustomTableCell>
            <CustomTableCell>Owner</CustomTableCell>
            <CustomTableCell>Action</CustomTableCell>
          </TableRow>
        </CustomTableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.location}>
              <CustomTableCell component="th" scope="row">
                {row.location}
              </CustomTableCell>

              <CustomTableCell>{row.manager}</CustomTableCell>
              <CustomTableCell>{row.type}</CustomTableCell>
              <CustomTableCell>{row.status}</CustomTableCell>
              <CustomTableCell>{row.owner}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default PropertyTable
