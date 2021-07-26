import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      // maxWidth: '1600px',
      margin: '0 auto',
      background: colors.themeBackground,
      // background: '#FFFFFF'
    },
    rightPanelStyle: {
      // padding: '30px',
      // padding: '15px',
      boxSizing: 'border-box'
    },
    mainDiv: {
      display: 'flex',
      flexDirection: 'row'
    },
    leftDiv: {
      '@media (max-width: 768px)': {
        width: '48px',
      },
    },
    rightDiv: {
      width: 'calc(100vw - 208px)',
      '@media (max-width: 768px)': {
        width: 'calc(100vw - 48px)',
      },
    },
    contentDiv: {
      padding: '32px',
      paddingLeft: '64px',
      boxSizing: 'border-box',
      height: '100%',
      position: 'relative',
      top: '60px',
      // maxWidth: '1600px',
      maxWidth: '1720px',
      margin: '0 auto',
      background: '#E5E5E5',
      // position: 'relative',
      // width: '85%',
      // left: '15%'
      '@media (max-width: 768px)': {
        paddingLeft: '0px',
        // background: '#FBFBFB'
      },
    },
    signUpMod: {
      padding: '16px',
    }
  })
)

export const StyledRoutesWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  background: ${colors.themeBackground};
`

export const StyledRoutes = styled.div`
  box-sizing: border-box;
`
