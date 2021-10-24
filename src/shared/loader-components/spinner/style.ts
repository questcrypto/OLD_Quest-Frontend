import styled from 'styled-components'
import { keyframes } from 'styled-components'

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const SpinnerLogo = styled.div`
  height: 12px;
  width: 12px;
  border: 3px solid white;
  border-radius: 50%;
  border-bottom: 3px solid #676767;
  animation: ${rotate} 0.5s linear infinite;
`
