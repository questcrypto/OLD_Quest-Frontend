import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    signOutDividerStyle: {
      width: '46px',
      margin: '0 0 30px 30px',
    },
  })
)
export const LeftPanelCont = styled.div`
  background: ${colors.white};
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`
export const QuestLogoCont = styled.div`
  padding: 30px 12px;
`
export const ListItemText = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.textPrimary};
`
export const SignOutCont = styled.div`
  margin-top: 80px;
`
