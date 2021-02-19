import React from 'react'
import { useStyles, PaginationText, NoDataContainer } from './style'
import Grid from '@material-ui/core/Grid'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Paper from '@material-ui/core/Paper'
import Pagination from '@material-ui/lab/Pagination'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Select from '@material-ui/core/Select'

const dataVal = [
  {
    name: 'Test',
    upLoadedOn: '29 Jan 2021',
    uploadedBy: 'White Castaneda',
    authorization: 'Public',
  },
]

const DocumentsTable = (props: any) => {
  const classes = useStyles()
  const { data } = props

  return (
    <Grid>
      <TableContainer component={Paper} className={classes.root}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '300px' }}>NAME</TableCell>
              <TableCell>UPLOADED ON</TableCell>
              <TableCell>UPLOADED BY</TableCell>
              <TableCell>AUTHORIZATION</TableCell>
              <TableCell style={{ width: '50px' }} />
            </TableRow>
          </TableHead>
          {!!dataVal && dataVal.length > 0 && (
            <TableBody className={classes.tableHeadStyle}>
              {dataVal.map((row: any, k: number) => (
                <TableRow key={k}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.upLoadedOn}</TableCell>
                  <TableCell>{row.uploadedBy}</TableCell>
                  <TableCell>
                    <Select
                      native
                      inputProps={{
                        name: 'authorization',
                        id: 'authorization',
                      }}
                      className={classes.authorizationStyle}
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <MoreVertIcon />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        {!!dataVal && dataVal.length === 0 && (
          <NoDataContainer>
            <p>No data available</p>
          </NoDataContainer>
        )}
      </TableContainer>
      {!!dataVal && dataVal.length > 10 && (
        <Grid container className={classes.paginationCont} justify="space-between">
          <PaginationText>Showing 1 to 15 of 35 element</PaginationText>
          <Pagination count={10} showFirstButton showLastButton />
        </Grid>
      )}
    </Grid>
  )
}
export default DocumentsTable
