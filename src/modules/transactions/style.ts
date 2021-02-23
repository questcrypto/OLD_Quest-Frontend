import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginBottom: '50px',
    },
  })
)
export const Txt = styled.p`
  colors: ${colors.textPrimary};
`
