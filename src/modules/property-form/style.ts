import styled from 'styled-components'
import { FieldArray } from 'formik'
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
    margin: '45px 0 !important',
    width: '590px',
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
  fileNameStyle: {
    marginBottom: '20px',
  },
})
export const useStyle01 = makeStyles((theme) => ({
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
    left: '100%',
    marginLeft: '28px',
  },
}))

export const PropertyFormWrapper = styled.div``
export const FromHeader = styled.div`
  margin-bottom: 50px;
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
  margin-top: 25px;
`
export const FormTitleCont = styled.div`
  margin-bottom: 20px;
  margin-top: 30px;
`
export const FormTitle = styled.h4`
  font-size: 20px;
  line-height: 24px;
  margin-top: 25px;
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
`
export const FileContainer = styled.div`
  box-sizing: border-box;
  img {
    width: 100%;
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
export const AddAnotherCont = styled.div`
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
