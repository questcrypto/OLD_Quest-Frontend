import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { createStyles, makeStyles } from '@material-ui/core/styles'

export const DrawerWrapper = styled.div`
  position: absolute;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  top: 0%;
  scrollbar-width: none;
  height: 100vh;
  min-height: 600px;
  transform: ${(props: any) => (props.open ? 'none' : 'translateX(-240px)')};
  transition: all 0.2s;
`

export const useStyles = makeStyles(() =>
  createStyles({
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
      height: '100vh',
      minHeight: '600px',
    },

    closeDrawerBtn: {
      // eslint-disable-next-line no-useless-computed-key
      ['@media (min-width:990px)']: {
        display: 'none',
      },
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
      fontFamily: 'RobotoRegular',
    },

    dividerStyle: {
      width: '46px',
      margin: '0 0 54px 30px !important',
    },
    signOutStyle: {
      position: 'absolute',
      bottom: '20px',
    },
    signOutDividerStyle: {
      width: '46px',
      margin: '0 0 30px 30px !important',
    },
  })
)

export const QuestLogoCont = styled.div`
  width: 179px;
  height: 112px;
  box-sizing: border-box;
  padding: 30px 12px;
  img { 
    width: 155px;
    /* height: 48px; */
  }
`
export const ListItemText = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.textPrimary};
  font-family: RobotoRegular;
`
