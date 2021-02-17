import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: '1600px',
    margin: '0 auto',
    background: colors.themeBackground,
  },
  rightPanelStyle: {
    padding: '30px',
    boxSizing: 'border-box',
  },
}))

export const StyledRoutesWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  background: ${colors.themeBackground};
`

export const StyledRoutes = styled.div`
  box-sizing: border-box;
`
