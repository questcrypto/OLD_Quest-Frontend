import styled from 'styled-components'
import { colors, screenSizes } from 'shared/styles/theme'
import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyle = makeStyles(() =>
  createStyles({
    headerTitle: {
      fontSize: '20px',
      lineHeight: '20px',
      color: colors.textPrimary,
      fontFamily: 'RobotoBold',
    },
    uploadDocStyle: {
      backgroundColor: '#F3F3F3 !important',
      borderRadius: '4px',
      padding: '20px 30px',
      dropzoneClass: {
        background: 'red',
      },
    },

    cancelFileBtnStyle: {
      marginRight: '20px',
    },
    insertFileBtnStyle: {
      color: colors.white,
      backgroundColor: colors.primary,
      '&:hover': {
        backgroundColor: colors.primary,
      },
    },
  })
)

export const UploadDataWrapper = styled.div`
  padding: 30px 50px;
  background: ${colors.white};
`
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
`
export const CloseModalBtnCont = styled.div`
  margin: 5px 0 0 20px;
`
export const DocFormWrapper = styled.div`
  margin-top: 50px;
`
export const NameTagCont = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr;
  @media (min-width: ${screenSizes.mediaM}px) {
    grid-template-columns: 1fr 1fr;
  }
`
export const UploadDocBtnGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
`
