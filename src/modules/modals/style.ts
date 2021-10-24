import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyle = makeStyles(() =>
  createStyles({
    root: {
      background: colors.paperBackground,
      boxSizing: 'border-box',
    },
    infoCont: {
      padding: '30px 40px 0 40px',
    },
    titleCont: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
    },
    closeIconStyle: {
      cursor: 'pointer',
    },
    infoDataStyle: {
      marginBottom: '30px',
    },
    bntGroupStyle: {
      margin: '10px 0',
      '&:button': {
        minWidth: 100,
      },
    },
    agreeButtonStyle: {
      minWidth: '120px',
    },
    infoTextStyle: {
      padding: '10px 40px 10px 20px',
      background: colors.lightGray,
      maxWidth: 450,
    },
  })
)

export const textFieldStyle = makeStyles(() =>
  createStyles({
    root: {
      margin: '20px 0 20px 0',
      lineHeight: '26px',
      color: '#1E3444',
      backgroundColor: colors.white,
    },
  })
)
export const BoldText = styled.h4`
  font-size: 16px;
  line-height: 20px;
  color: ${colors.textPrimary};
  font-family: RobotoBold;
  margin: 0;
`
export const LightText = styled.p`
  font-size: 14px;
  line-height: 26px;
  color: ${colors.textPrimary};
  font-family: RobotoRegular;
  opacity: 0.87;
  margin: 0;
`
export const Title = styled.p`
  font-size: 20px;
  line-height: 24px;
  margin: 0;
  color: ${colors.textPrimary};
  font-family: RobotoBold;
  span {
    font-size: 15px;
    line-height: 18px;
    opacity: 0.87;
    font-weight: normal;
    margin-left: 15px;
  }
`
export const InformationText = styled.p`
  font-size: 12px;
  line-height: 20px;
  color: ${colors.textPrimary};
  font-family: RobotoRegular;
  margin: 0;
`
