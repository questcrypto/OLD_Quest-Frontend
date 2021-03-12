import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Translate } from '@material-ui/icons'

export const DrawerWrapper = styled.div`
  position: absolute;
  overflow-Y: scroll;
  &::-webkit-scrollbar {
        display: none;
  };
  top: 0%;
  scrollbar-width: none;
  height: 100vh;
  min-height: 600px;
  transform: ${(props:any) => props.open? 'none' : 'translateX(-240px)'};
  transition: all 0.2s;
`;

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

    closeDrawerBtn:{
      ['@media (min-width:990px)'] : {
        display: 'none'
      }
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
  padding: 30px 12px;
`
export const ListItemText = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.textPrimary};
`
