import styled from 'styled-components'
import { colors } from 'shared/styles/theme'

export const colorChangeDelay = '1s'

export const Container = styled.div`
  width: 100%;
`
export const Error = styled.p`
  font-size: 12px;
  color: red;
`
export const err = styled.p`
  color: red;
  font-size: 12px;
  margin: -10px 0 1rem 5px;
  text-align: left;
`
export const WinLossButton = styled.button<any>`
  border: 2px solid ${colors.white};
  width: 200px;
  height: 45px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${colors.white};
  background: ${(props: any) => (props.winStatus ? colors.greenColor : colors.darkRed)};
  position: absolute;
  top: 25px;
  left: -50px;
  z-index: 100;
  transform: rotate(-42deg);
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
`
