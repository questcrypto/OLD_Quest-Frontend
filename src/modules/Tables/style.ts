import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button';

export const useStyles = makeStyles(() =>
  createStyles({
    paginationCont: {
      marginTop: '50px',
    },
    tableHeadStyle: {
      boxShadow: '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 1px 8px rgba(0, 0, 0, 0.12);',
    },
    tableCellStyle: {
      color: colors.textPrimary,
    },
    tableRowStyle: {
      '&:nth-child(even)': {
        background: '#F8F3ED',
      },
      '&:th': {
        color: colors.textPrimary,
        fontSize: '20px !important',
      },
    },
  })
)
export const NoDataContainer = styled.div`
  margin: 50px 0;
  width: 100%;
  p {
    text-align: center;
  }
`

/* ================== Auction-stats-style ======================= */

export const AuctionStatsCont = styled.div`
  position: relative;
`

export const auctionStatsStyle = makeStyles(() =>
  createStyles({
    root: {
      width: 320,
      maxWidth: 320,
    },
    media: {
      height: '100%',
      minHeight: '160px',
      maxHeight: '200px',
      width: '100%',
      maxWidth: 320,
      boxSizing: 'border-box',
    },

    titleContStyle: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      marginBottom: '20px',
    },
    cardDataContStyle: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
    },
    iconTxtContStyle: {
      display: 'flex',
      alignItems: 'center',
      '& img': {
        marginRight: '10px',
      },
    },
    endDateContStyle: {
      marginTop: '10px',
    },
    dividerStyle: {
      margin: '8px 0',
    },
    btnStyle: {
      fontSize: '12px !important',
      height: '31px',
      marginBottom: '16px',
      width: '140px',
    },
  })
)
export const StyledLinearProgress = withStyles({
  root: {
    width: '100%',
  },
  colorPrimary: {
    backgroundColor: '#C4C4C4',
  },
  barColorPrimary: {
    backgroundColor: '#FC440A',
  },
})(LinearProgress)

export const CloseIcon = styled.img`
  position: absolute;
  top: -14px;
  right: -10px;
  cursor: pointer;
`
export const Title = styled.h4`
  font-size: 16px;
  color: ${colors.textPrimary};
  text-align: left;
  font-family: RobotoBold;
  margin: 0;
`
export const EndDateCont = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-right: 5px;
  }
`
export const EndDateTxt = styled.p`
  font-size: 10px;
  line-height: 18px;
  color: ${colors.textPrimary};
  font-family: RobotoRegular;
  margin: 0;
`
export const CardLightText = styled.p`
  font-size: 12px;
  line-height: 16px;
  color: ${colors.textPrimary};
  font-family: RobotoRegular;
  opacity: 0.87;
  margin: 0;
  span {
    opacity: 1;
    font-family: RobotoBold;
  }
`
export const CardBoldText = styled.h4`
  font-size: 14px;
  line-height: 20px;
  color: ${colors.textPrimary};
  font-family: RobotoBold;
  margin: 0;
`

export const ReservePriceCont = styled.div<any>`
  background: ${(props: any) => (props.confirmStatus ? colors.greenColor : colors.lightYellow)};
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  box-sizing: border-box;
  svg {
    color: ${colors.white};
    margin-right: 6px;
    width: 22px;
    height: 22px;
  }
`
export const ReserverAmountTxt = styled.p`
  font-size: 14px;
  line-height: 26px;
  color: ${colors.white};
  font-family: RobotoRegular;
  margin: 0;
`

export const FullDetailsBtn = styled(Button)`
  font-family: RobotoRegular;
  margin-top: 20px;
  background-color: rgba(30, 52, 68, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  &:hover {
    background-color: rgba(30, 52, 68, 1);
  }
`;