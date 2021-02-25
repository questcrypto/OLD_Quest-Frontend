import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
)
export const Txt = styled.p`
  colors: ${colors.textPrimary};
`
export const TransactionTableCont = styled.div`
  margin-top: 20px;
`
