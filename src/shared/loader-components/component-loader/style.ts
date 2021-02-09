import styled, { keyframes } from 'styled-components'

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
`
const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`
export const Loader = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid grey;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 0.8s linear infinite;
`
