import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    paginationCont: {
      marginTop: '50px',
    },
    tableHeadStyle: {
      boxShadow: '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 1px 8px rgba(0, 0, 0, 0.12);',
    },
    tableCellStyle: {
      color: colors.textPrimary,
    },
    tableRowStyle: {
      '&:nth-child(even)': {
        background: '#F8F3ED',
      },
      '&:th': {
        color: colors.textPrimary,
        fontSize: '20px !important',
      },
    },
  })
)

export const NoDataContainer = styled.div`
  margin: 50px 0;
  width: 100%;
  p {
    text-align: center;
  }
`
