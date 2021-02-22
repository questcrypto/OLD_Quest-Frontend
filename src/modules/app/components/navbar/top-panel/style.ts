import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    buttonStyle: {
      color: colors.white,
      backgroundColor: colors.primary,
      fontSize: '14px',
      padding: '10px !important',
      '&:hover': {
        backgroundColor: colors.primary,
      },
    },
  })
)

export const TopPanelCont = styled.div`
  padding-right: 10px;
  display: flex;
  justify-content: flex-end;
  height: 80px;
  align-items: center;
`
