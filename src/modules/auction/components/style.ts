import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles'

export const cardStyle = makeStyles(() =>
  createStyles({
    root: {
      width: 320,
      maxWidth: 320,
    },
    media: {
      height: 250,
      width: '100%',
      maxWidth: 320,
      boxSizing: 'border-box',
    },
    btnContStyle: {
      marginBottom: '10px',
    },
    btnStyle: {
      fontSize: '12px !important',
      fontWeight: 'bold',
      height: '31px',
    },
    upcomingBtnStyle: {
      fontSize: '12px !important',
      fontWeight: 'bold',
      height: '40px',
      marginBottom: '10px',
    },
  })
)

export const StyledLinearProgress = withStyles({
  root: {
    width: '120px',
  },
  colorPrimary: {
    backgroundColor: '#949DA4',
  },
  barColorPrimary: {
    backgroundColor: colors.primary,
  },
})(LinearProgress)

export const Title = styled.h4`
  font-size: 16px;
  color: ${colors.textPrimary};
  text-align: left;
  margin: 0;
`
export const CardBoldText = styled.h4`
  font-size: 14px;
  line-height: 16px;
  color: ${colors.textPrimary};
  margin: 0;
`
export const CardLightText = styled.p`
  font-size: 12px;
  line-height: 26px;
  color: ${colors.textPrimary};
  opacity: 0.87;
  margin: 0;
  span {
    opacity: 1;
    font-weight: bold;
  }
`
export const UpgradeBidTxt = styled.p`
  font-size: 12px;
  color: ${colors.textPrimary};
  opacity: 0.87;
  margin: 0;
  border-bottom: 1px solid ${colors.textPrimary};
  cursor: pointer;
`
export const NoDataContainer = styled.div`
  margin-top: 100px;
  p {
    text-align: center;
  }
`
export const PassedPropertyCont = styled.div`
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
`

/* ================Modal style ============== */

export const claimModalStyle = makeStyles(() =>
  createStyles({
    root: {
      padding: '30px',
      background: colors.paperBackground,
      width: '100%',
      maxWidth: '400px',
    },
  })
)

export const ClaimTitle = styled.h2`
  font-size: 24px;
  color: ${colors.textPrimary};
  text-align: left;
  margin: 0;
`
export const ClaimBoldText = styled.h4`
  font-size: 16px;
  line-height: 20px;
  color: ${colors.textPrimary};
  margin: 0;
`
export const ClaimLightText = styled.p`
  font-size: 16px;
  line-height: 26px;
  color: ${colors.textPrimary};
  margin: 0;
  opacity: 0.87;
`
export const ClaimBtnGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
  button {
    margin-left: 20px;
  }
`
