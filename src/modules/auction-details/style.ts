import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    imgStyle: {
      height: 250,
      width: '100%',
    },
    smallImgCont: {
      margin: '20px 0 12px 0',
      boxSizing: 'border-box',
    },
    imgOnHoverStyle: {
      '&:hover': {
        transform: 'scale(1.3)',
        transition: 'transform .2s',
      },
    },
    smallImgStyle: {
      height: 57,
      width: 72,
      cursor: 'pointer',
      borderRadius: '5px',
    },
  })
)
export const NoDetailsAvailable = styled.div`
  margin-bottom: 30px;
  p {
    text-align: center;
  }
`
export const HeaderContainer = styled.div`
  margin-bottom: 20px;
`
export const HeaderPath = styled.div`
  margin: 0 0 24px 0;
  font-size: 16px;
  line-height: 19px;
  span {
    opacity: 0.5;
  }
`

export const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  line-height: 29px;
  color: ${colors.textPrimary};
`
export const BoldText = styled.h4`
  font-size: 16px;
  line-height: 20px;
  color: ${colors.textPrimary};
  margin: 0;
`
export const LightText = styled.p`
  font-size: 14px;
  line-height: 26px;
  color: ${colors.textPrimary};
  opacity: 0.87;
  margin: 0;
`
