import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  root: {
    background: colors.paperBackground,
    marginTop: '20px',
  },
  paginationCont: {
    marginTop: '50px',
  },
  tableHeadStyle: {
    boxShadow: '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 1px 8px rgba(0, 0, 0, 0.12);',
  },
  authorizationStyle: {
    background: colors.paperBackground,
    paddingRight: '24px',
    '&:before': {
      borderBottom: 'none',
    },
  },
  rootAuctionStyle: {
    background: colors.paperBackground,
    padding: '30px',
  },
  btnGroupStyle: {
    margin: '30px 0',
  },
}))

export const PaginationText = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.textPrimary};
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
  margin-bottom: 50px;
  svg {
    cursor: pointer;
  }
`
export const TitleText = styled.h2`
  font-size: 20px;
  margin: 0;
  color: ${colors.textPrimary};
`
export const AuctionInfoBox = styled.div`
  background: ${colors.lightGray};
  padding: 20px 30px;
  max-width: 526px;
  box-sizing: border-box;
`
export const AuctionInfoText = styled.p`
  font-size: 12px;
  line-height: 20px;
  margin: 0;
  color: ${colors.textPrimary};
  background: ${colors.lightGray};
`
