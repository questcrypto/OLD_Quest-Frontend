import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  root: {
    background: colors.paperBackground,
    marginTop: '20px',
  },
  paginationCont: {
    marginTop: '50px',
  },
  tableHeadStyle: {
    boxShadow: '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 1px 8px rgba(0, 0, 0, 0.12);',
  },
  tableCellStyle: {
    color: colors.textPrimary,
  },
  addPropertyBtn: {
    width: '100% !important',
    height: '36px',
    color: `${colors.white} !important`,
    backgroundColor: `${colors.primary} !important`,
    fontSize: '12px',
    padding: '10px 5px',
    '&:hover': {
      backgroundColor: `${colors.primary} !important`,
    },
  },
  authorizationStyle: {
    background: colors.paperBackground,
    paddingRight: '24px',
    '&:before': {
      borderBottom: 'none',
    },
  },
}))

export const PaginationText = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.textPrimary};
`
export const NoDataContainer = styled.div`
  margin: 50px 0;
  p {
    text-align: center;
  }
`
