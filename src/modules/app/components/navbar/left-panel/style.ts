import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  drawer: {
    width: '240px',
  },
  drawerPaper: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    background: '#FBFBFB',
  },
  root: {
    position: 'sticky',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    top: 0,
    scrollbarWidth: 'none',
    height: '100vh',
    minHeight: '600px',
  },

  itemButtonStyle: {
    display: 'flex',
    marginBottom: '30px',
    alignItems: 'center',
  },
  iconStyle: {
    marginRight: '15px',
    width: '20px',
    height: '20px',
  },
  textStyle: {
    fontSize: '16px',
    lineHeight: '19px',
    color: colors.textPrimary,
  },

  dividerStyle: {
    width: '46px',
    margin: '0 0 54px 30px',
  },
  signOutStyle: {
    position: 'absolute',
    bottom: '20px',
  },
  signOutDividerStyle: {
    width: '46px',
    margin: '0 0 30px 30px',
  },
}))

export const QuestLogoCont = styled.div`
  padding: 30px 12px;
`
export const ListItemText = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.textPrimary};
`
