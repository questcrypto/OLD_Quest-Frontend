import styled from 'styled-components'
import { colors } from 'shared/styles/theme'

export const colorChangeDelay = '1s'

export const Container = styled.div`
  width: 100%;
`
export const Error = styled.p`
  font-size: 12px;
  font-family: RobotoRegular;
  color: red;
`
export const err = styled.p`
  color: red;
  font-size: 12px;
  margin: -10px 0 1rem 5px;
  font-family: RobotoRegular;
  text-align: left;
`
export const WinLossText = styled.div<any>`
  border: 2px solid ${colors.white};
  width: 200px;
  height: 45px;
  font-size: 18px;
  font-family: RobotoBold;
  text-transform: uppercase;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.white};
  background: ${(props: any) => (props.winStatus ? colors.greenColor : colors.darkRed)};
  position: absolute;
  top: 25px;
  left: -50px;
  z-index: 100;
  transform: rotate(-42deg);
  box-sizing: border-box;
`
