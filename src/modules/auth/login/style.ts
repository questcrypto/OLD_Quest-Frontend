import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { makeStyles } from '@material-ui/core/styles'

export const useStyle = makeStyles((theme) => ({
  loginBoxStyle: {
    padding: '20px',
    width: '400px',
    height: '400px',
    boxSizing: 'border-box',
  },
  loginBtnStyle: {
    width: '100%',
    height: '50px',
    marginTop: '20px',
    color: colors.white,
    backgroundColor: colors.primary,
    '&:hover': {
      backgroundColor: colors.primary,
    },
  },
}))
export const LoginContainer = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
export const LoginText = styled.p`
  font-size: 18x;
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
