import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyle = makeStyles(() =>
  createStyles({
    root: {
      height: '90vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto',
    },
    loginBoxStyle: {
      backgroundColor: colors.paperBackground,
      width: '400px',
      maxWidth: '400px',
      padding: '20px',
    },
    loginBtnStyle: {
      height: '50px',
      marginTop: '20px',
    },
  })
)

export const LoginText = styled.p`
  font-size: 18x;
  font-family: RobotoRegular;
  text-align: center;
  margin: 0 0 100px 0;
`
export const LoginImgCont = styled.div`
  margin: 20px 0;
  text-align: center;
  img {
    width: 50px;
    height: 50px;
  }
`
