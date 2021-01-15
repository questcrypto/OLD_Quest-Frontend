import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'

export const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})
export const CustomTableHead = styled(TableHead)`
  color: black;
  width: 1000px;
  height: 10px;
  left: 100px;
  top: 265px;
  background: #ffffff;
  opacity: 0.6;
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 1px 8px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
`
export const CustomTableCell = styled(TableCell)`
  color: #302e35;
  width: 150px;
  align: right;
`
