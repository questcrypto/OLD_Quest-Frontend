import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { createStyles, makeStyles } from '@material-ui/core/styles'

export const docTableStyle = makeStyles(() =>
  createStyles({
    root: {
      background: colors.paperBackground,
      marginTop: '20px',
    },
    paginationCont: {
      marginTop: '50px',
    },
    fileLink: {
      textDecoration: 'none',
      color: 'white',
      backgroundColor: colors.primary,
      padding: '8px 10px',
      borderRadius: '4px',
      fontSize: '14px',
      fontFamily: 'RobotoBold',
    },
    tableHeadRowStyle: {
      padding: '24px 20px',
      '&:th': {
        fontSize: '15px',
        lineHeight: '18px',
        color: colors.textPrimary,
        fontFamily: 'RobotoBold',
      },
      // boxShadow: '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 1px 8px rgba(0, 0, 0, 0.12);',
    },

    tableRowStyle: {
      '&:nth-child(even)': {
        background: '#F8F3ED',
      },
    },
    authorizationStyle: {
      background: 'transparent',
      paddingRight: '5px',
      '&:before': {
        borderBottom: 'none',
      },
    },
  })
)
export const auctionConfigStyle = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
      maxWidth: '700px',
      boxSizing: 'border-box',
    },
    rootAuctionStyle: {
      padding: '30px',
      background: colors.paperBackground,
    },
    btnGroupStyle: {
      marginTop: '10px',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    auctionInfoBox: {
      background: colors.lightGray,
      padding: '16px 30px',
    },
    auctionInfoText: {
      fontSize: '12px',
      lineHeight: '16px',
      margin: 0,
      color: colors.textPrimary,
    },
  })
)

export const PaginationText = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.textPrimary};
  font-family: RobotoRegular;
`
export const NoDataContainer = styled.div`
  margin: 50px 0;
  p {
    text-align: center;
  }
`
export const HeaderCont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  svg {
    cursor: pointer;
  }
`
export const TitleText = styled.h2`
  font-size: 20px;
  margin: 0;
  color: ${colors.textPrimary};
  font-family: RobotoBold;
`
