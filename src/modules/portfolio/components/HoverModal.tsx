import React from 'react'
import { makeStyles } from '@material-ui/core'
import CustomModal from '../../../shared/custom-modal/CustomModal'
import styled from 'styled-components'
import closeIcon from 'assets/icons/closeIcon.svg'

const useStyles = makeStyles((theme) => ({
  bcDiv: {
    minWidth: '464px',
    // padding: theme.spacing(4)
  },
  modalBody: {
    padding: theme.spacing(4),
  },
  closeIcon: {
    width: '12px',
    height: '12px',
    cursor: 'pointer',
  },
  line: {
    height: '1px',
    width: '100%',
    backgroundColor: '#DEDEDE',
    // margin: '24px 0px'
  },
}))

export default function HoverModal(props: any) {
  const classes = useStyles()
  const { show, toggleModal, onClose, headerText } = props
  return (
    <CustomModal show={show} toggleModal={toggleModal}>
      <div className={classes.bcDiv}>
        <ModalHeaderDiv>
          <ModalHeaderText>{headerText}</ModalHeaderText>
          <div onClick={onClose}>
            <img src={closeIcon} alt="close" className={classes.closeIcon} />
          </div>
        </ModalHeaderDiv>
      </div>
    </CustomModal>
  )
}
export const ModalHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px;
  padding-bottom: 16px;
`

export const ModalHeaderText = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  color: #777777;
`
