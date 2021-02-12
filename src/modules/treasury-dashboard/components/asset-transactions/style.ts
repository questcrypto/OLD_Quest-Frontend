import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import { Grid } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      gridGap: '16px',
    },
    title: {
      marginBottom: '20px',
    },
    weekDetails: {
      marginBottom: '38px',
    },
    requests: {
      marginBottom: '41px',

    },
    transactions: {
      marginBottom: '16px',
    },
    date: {
      marginBottom: '13px',
    },
    btn2Style: {
      color: `${colors.white} !important`,
      backgroundColor: colors.primary,
      fontSize: '14px',
      '&:hover': {
        backgroundColor: colors.primary,
      },
      width: '100%',
      maxWidth: '147px',
    },
  })
)

export const AssetTransactionsWrapper = styled.div``

export const TransactionWrap = styled<any>(Grid)`
  &:after {
    content: "";
    border-bottom: 1px solid #E0E0E0;
    width: 98%;
    margin-top: 18px;
  }
`

export const VerticalDivider = styled.div<any>`
  width: 1px;
  height: 29px;
  background: #BDBDBD;
`

export const TransactionsPanel = styled<any>(Grid)`
  padding: 26px 39px 19px 22px;
  background: ${props => props.theme.white};
`

export const TransactionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  background: grey;
`

export const PrimaryText = styled.span<any>`
  font-weight: 900;
  font-size: 18px;
  line-height: 22px;
  color: ${props => props.theme.textPrimary};
  margin-right: 7px;
`

export const SecondaryText = styled.p<any>`
  margin: 0;
  font-size: 14px;
  line-height: 26px;
  color: ${props => props.theme.textPrimary};
  opacity: 0.87;

`

export const ValueText = styled.span<any>`
  font-weight: 900;
  font-size: 17px;
  line-height: 20px;
  color: ${props => props.theme.textPrimary};
`

export const TransactionValue = styled.span<any>`
  font-weight: 900;
  font-size: 15px;
  line-height: 18px;
  color: ${props => props.theme.textPrimary};
`

export const TransactionStatus = styled.span<any>`
  font-weight: 900;
  font-size: 16px;
  line-height: 19px;
  color: ${props => props.theme.textPrimary};
`

export const IdText = styled.span<any>`
  font-size: 12px;
  line-height: 26px;
  opacity: 0.87;
  color: ${props => props.theme.textPrimary};
`