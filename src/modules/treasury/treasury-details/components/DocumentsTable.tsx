import React from 'react'
import { docTableStyle, PaginationText, NoDataContainer } from './style'
import Box from '@material-ui/core/Box'
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
import EmptyPage from 'shared/empty-page'
import { formatExtendedDateString } from 'shared/helpers/globalFunction'
import { PrimaryButton } from 'shared/components/buttons'
import { apiBaseUrl } from 'services/global-constant'

const dataVal = [
  {
    name: 'Test',
    upLoadedOn: '29 Jan 2021',
    uploadedBy: 'White Castaneda',
    authorization: 'Public',
  },
  {
    name: 'Test',
    upLoadedOn: '29 Jan 2021',
    uploadedBy: 'White Castaneda',
    authorization: 'Public',
  },
  {
    name: 'Test',
    upLoadedOn: '29 Jan 2021',
    uploadedBy: 'White Castaneda',
    authorization: 'Public',
  },
]

const DocumentsTable = (props: any) => {
  const { data } = props
  const classes = docTableStyle()
  return (
    <Box>
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
          {!!data && data.length > 0 && (
            <TableBody>
              {data.map((row: any, k: number) => (
                <TableRow key={k} className={classes.tableRowStyle}>
                  <TableCell component="th" scope="row">
                    {row.Name}
                  </TableCell>
                  <TableCell>{formatExtendedDateString(row.CreatedAt)}</TableCell>
                  <TableCell>{'HOA Admin'}</TableCell>
                  <TableCell>Public</TableCell>
                  <TableCell>
                    <a className={classes.fileLink} target="__blank" href={`${apiBaseUrl}/${row.filename}`}>
                      View
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        {!!dataVal && dataVal.length === 0 && (
          <NoDataContainer>
            <EmptyPage name="here" />
          </NoDataContainer>
        )}
      </TableContainer>
      {!!dataVal && dataVal.length > 10 && (
        <Grid container className={classes.paginationCont} justify="space-between">
          <PaginationText>Showing 1 to 15 of 35 element</PaginationText>
          <Pagination count={10} showFirstButton showLastButton />
        </Grid>
      )}
    </Box>
  )
}
export default DocumentsTable
