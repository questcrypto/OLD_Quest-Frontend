import styled from 'styled-components'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'

export const CustomTableHead = styled(TableHead)`
  background: #ffffff;
  
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 1px 8px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
`
export const CustomTableCell = styled(TableCell)`
  color: black;
  width: 10px;
  align: right;
`
