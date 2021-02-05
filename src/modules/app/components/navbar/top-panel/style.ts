import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  buttonStyle: {
    color: colors.white,
    backgroundColor: colors.primary,
    fontSize: '12px',
    padding: '8px !important',
    fontWeight: 400,
    marginRight: '20px',
    
    '&:hover': {
      backgroundColor: colors.primary,
    },
  },
})

export const TopPanelCont = styled.div`
  padding: 15px 10px 0 0;
  display: flex;
  justify-content: flex-end;
`
