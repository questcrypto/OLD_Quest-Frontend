import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
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
  font-family: RobotoRegular;
  span {
    opacity: 0.5;
  }
`

export const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  line-height: 29px;
  color: ${colors.textPrimary};
  font-family: RobotoBold;
`
