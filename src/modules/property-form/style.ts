import styled from 'styled-components'
import { FieldArray } from 'formik'
import { colors } from 'shared/styles/theme'
import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyle = makeStyles(() =>
  createStyles({
    root: { background: 'white' },
    inputStyle: { margin: '50px', required: true },
    formGroup: {
      marginTop: '5px',
      width: '100%',
      maxWidth: '96%',
      '@media (min-width: 600px)': {
        maxWidth: '400px',
      },
    },
    editFormGroup: {
      marginTop: '5px',
      width: '100%',
      maxWidth: '96%',
      '@media (min-width: 600px)': {
        maxWidth: '450px',
      },
    },
    titleNumberStyle: {
      maxWidth: '70px',
    },
    dividerStyle: {
      margin: '45px -86px 45px 0 !important',
    },
    uploadDataStyle: {
      minWidth: 200,
      maxHeight: 240,
      minHeight: 240,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      border: '1px dashed #BDBDBD',
      backgroundColor: '#F3F3F3 !important',
      borderRadius: '4px',
    },
    fileNameStyle: {
      marginBottom: '16px',
    },
    saveAsDraftStyle: {
      color: '#302E35',
      marginRight: '20px',
      backgroundColor: '#E0E0E0',
    },
    saveAndReviewStyle: {
      color: colors.white,
      minWidth: '200px',
      backgroundColor: colors.primary,
      '&:hover': {
        backgroundColor: colors.primary,
      },
    },
    accordionStyle: {
      width: '100%',
      maxWidth: '90%',
    },
    commentDividerStyle: {
      margin: '40px 0 25px 0 !important',
    },
    editDividerStyle: {
      margin: ' 45px 0 !important',
    },
    commentAreaStyle: {
      minHeight: '100px',
      width: '100%',
      maxWidth: '100%',
      minWidth: '100%',
      padding: '10px',
      boxSizing: 'border-box',
      outline: 'none',
    },
    commentBtnStyle: {
      marginTop: '20px',
      width: '100%',
      color: colors.white,
      backgroundColor: colors.primary,
      '&:hover': {
        backgroundColor: colors.primary,
      },
    },
    docImgStyle: {
      marginRight: '24px',
    },
  })
)

export const useStyle01 = makeStyles((theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    headerStyle: {
      background: '#E0E0E0',
      border: '1px solid #E0E0E0',
      marginBottom: '0',
    },
    detailsCont: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '16px',
    },
    deleteBtnStyle: {
      position: 'absolute',
      color: '#EB5757',
      cursor: 'pointer',
      top: '14px',
      left: '96%',
    },
    deleteBtn2Style: {
      position: 'absolute',
      color: '#EB5757',
      cursor: 'pointer',
      top: '14px',
      left: '100%',
      marginLeft: '20px',
    },
  })
)

export const fieldSetStyle = {
  border: 0,
  padding: 0,
  margin: 0,
  minWidth: 0,
}

export const PropertyFormWrapper = styled.div``
export const FormHeader = styled.div`
  margin-bottom: 20px;
`
export const HeaderPath = styled.div`
  margin: 0 0 24px 0;
  font-size: 16px;
  line-height: 19px;
  span {
    opacity: 0.5;
  }
`

export const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  line-height: 29px;
  color: ${colors.textPrimary};
`
export const PropertyFormCont = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 736px;
  background: ${colors.paperBackground};
  padding: 30px 50px;
  border-radius: 4px;
`
export const FormTitleNumber = styled.div`
  background: ${colors.primary};
  font-size: 16px;
  color: ${colors.white};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`
export const FormTitle = styled.h4`
  font-size: 20px;
  line-height: 24px;
  color: ${colors.textPrimary};
  margin: 0 20px 30px 0;
`
export const FormSubTitle = styled.p`
  font-size: 16px;
  line-height: 19px;
  color: ${colors.textSecondary};
  margin: 6px 0 20px 0;
`
export const SelectedFileCont = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
`
export const SelectedFileImgCont = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-height: 300px;
  grid-gap: 10px;
`
export const FileContainer = styled.div`
  box-sizing: border-box;
  img {
    width: 80px;
    height: 80px;
  }
`

export const DocText = styled.p`
  font-size: 14px;
  line-height: 19px;
  color: ${colors.textSecondary};
  margin: 0 10px;
  border-bottom: 1px solid ${colors.textSecondary};
  padding-bottom: 5px;
  text-align: center;
  word-break: break-all;
`

export const FieldMsgBox = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 35px;
    height: 35px;
    margin-left: 24px;
    margin-bottom: 20px;
    cursor: pointer;
  }
`
export const TitleMsgBox = styled.div`
  position: relative;
  img {
    width: 35px;
    height: 35px;
    cursor: pointer;
  }
  span {
    position: absolute;
    right: 0;
    top: 0;
  }
`
export const FloorDetailsArr = styled(FieldArray)`
  display: flex;
  flex-direction: column;
`
export const FloorDetailsCont = styled.div`
  margin-bottom: 20px;
  position: relative;
`
export const FloorFieldMsgBox = styled.div`
  position: relative;
  img {
    width: 35px;
    height: 35px;
    position: absolute;
    top: 14px;
    left: 100%;
    margin-left: 40px;
  }
`
export const AddAnotherFloorCont = styled.div`
  display: flex;
  align-items: center;
  width: 170px;
  margin-top: 28px;
  span {
    margin-left: 10px;
    font-size: 16px;
    line-height: 19px;
    color: ${colors.textPrimary};
  }
  cursor: pointer;
`
export const CheckBoxCont = styled.div`
  display: flex;
  align-items: center;
`
export const CheckBoxText = styled.p`
  margin: 0;
  font-size: 16px;
  color: ${colors.primary};
`
export const FormButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
`
export const SubmitContainer = styled.div`
  margin-left: 60px;
`

export const UpLoadedDocCont = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  max-width: 400px;
`
export const UpLoadedDocImages = styled.div`
  img {
    width: 100px;
    height: 100px;
  }
  p {
    font-size: 14px;
    line-height: 19px;
    color: ${colors.textSecondary};
    margin: 5px 0 0 0;
    text-align: center;
  }
`
export const EditFormCont = styled.div`
  box-sizing: border-box;
  background: ${colors.paperBackground};
  padding: 30px 50px;
  border-radius: 4px;
`
export const EditFormTitle = styled.p`
  margin: 0 0 12px 0;
  font-size: 24px;
  color: ${colors.textPrimary};
  font-weight: 600;
`
export const CommentWrapper = styled.div<any>`
  display: ${(props: any) => (props.showComments ? 'block' : 'none')};
  background: ${colors.paperBackground};
  height: 100%;
`
export const CommentHeader = styled.div`
  padding: 0 30px;
  background: ${colors.themeBackground};
`
export const CommentTitleCont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #bdbdbd;
  img {
    margin-bottom: 12px;
    cursor: pointer;
  }
`
export const CommentContainer = styled.div`
  box-sizing: border-box;
  padding: 30px;
  border-radius: 4px;
`
export const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`
export const SenderName = styled.p`
  margin: 0 0 10px 0;
  font-size: 16px;
  color: ${colors.textPrimary};
  word-break: break-all;
`

export const CommentText = styled.p`
  color: #4f4f4f;
  font-size: 14px;
  margin: 0;
`
