import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { makeStyles } from '@material-ui/core/styles'

export const useStyle = makeStyles({
  root: { background: 'white' },
  inputStyle: { margin: '50px', required: true },
  formGroup: {
    width: '100%',
    maxWidth: '96%',
    '@media (min-width: 600px)': {
      width: '400px',
      maxWidth: '400px',
    },
  },
  dividerStyle: {
    margin: '50px 0 !important',
  },
  saveBtn: {
    color: colors.white,
    backgroundColor: colors.primary,
    '&:hover': {
      backgroundColor: colors.primary,
    },
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
})

export const PropertyFormWrapper = styled.div`
  margin: 15%;
  padding: 10px 10px;
  margin-top: 5px;
`
export const PropertyFormCont = styled.div`
  box-sizing: border-box;
  width: 800px;
  max-width: 800px;
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
export const FormTitleCont = styled.div`
  margin-bottom: 20px;
`
export const FormTitle = styled.h4`
  font-size: 20px;
  line-height: 24px;
  color: ${colors.textPrimary};
  margin: 0;
`
export const FormSubTitle = styled.p`
  font-size: 16px;
  line-height: 19px;
  color: ${colors.textSecondary};
  margin: 6px 0 0 0;
`
export const SelectedFileCont = styled.div`
  margin-top: 20px;
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
  img {
    width: 70px;
    height: 70px;
  }
`

export const DocText = styled.p`
  font-size: 16px;
  line-height: 19px;
  color: ${colors.textSecondary};
  margin: 0 10px;
  border-bottom: 1px solid ${colors.textSecondary};
  padding-bottom: 5px;
  text-align: center;
`

export const FileImageList = styled.div``
export const FieldMsgBox = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 35px;
    height: 35px;
    margin-left: 24px;
    margin-bottom: 20px;
  }
`
