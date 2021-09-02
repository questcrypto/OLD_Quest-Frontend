import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { createStyles, makeStyles } from '@material-ui/core/styles'

export const auctionConfigStyle = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
      maxWidth: '600px',
      boxSizing: 'border-box',
    },
    rootAuctionStyle: {
      padding: '40px',
      background: colors.paperBackground,
    },
    btnGroupStyle: {
      marginTop: '10px',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    btnStyle: {
      marginRight: '20px',
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
      fontFamily: 'RobotoRegular',
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
