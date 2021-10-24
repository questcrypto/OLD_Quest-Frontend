import styled from 'styled-components'
import { colors, screenSizes } from '../styles/theme'

interface ModalBodyProps {
  show: boolean
}

export const ModalBody = styled.div<ModalBodyProps>`
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.3);
`
export const ModalContent = styled.div<any>`
  border-radius: ${(props: any) => props.borderRadius && `${props.borderRadius}px`};
  background-color: ${colors.white};
  display: inline-block;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-height: 100%;
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  width: auto;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`
