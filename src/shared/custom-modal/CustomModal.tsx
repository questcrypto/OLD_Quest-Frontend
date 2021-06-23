import * as React from 'react'
import { ModalBody, ModalContent } from './style'

const CustomModal = (props: any) => {
  const { show, toggleModal, borderRadius } = props
  const handleClickOutside = (e: any) => {
    if (e.target === e.currentTarget) {
      toggleModal()
    }
  }
  return (
    <ModalBody show={show} onMouseDown={handleClickOutside} >
      <ModalContent borderRadius={borderRadius}>{props.children}</ModalContent>
    </ModalBody>
  )
}
export default CustomModal
