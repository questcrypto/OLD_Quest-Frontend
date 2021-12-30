import { useState } from 'react'
import { err, Error } from 'shared/styles/styled'
import { useStyle, UploadDataWrapper, ModalHeader, CloseModalBtnCont, DocFormWrapper, UploadDocBtnGroup } from './style'
import { Formik, Form, ErrorMessage, useFormik } from 'formik'
import * as Yup from 'yup'
import Typography from '@material-ui/core/Typography'
import { PrimaryButton, SecondaryButton } from 'shared/components/buttons'
import CloseIcon from '@material-ui/icons/Close'
import { DropzoneAreaBase } from 'material-ui-dropzone'
import CustomTextField from 'shared/components/custom-text-field'

const initialValues: any = {
  name: '',
  description: '',
}
const documentUploadSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
})

const UploadDocument = (props: any) => {
  const [files, setFiles] = useState<any>([])
  const [showFileError, setShowFileError] = useState(false)
  const {
    formName,
    documentList,
    setDocumentList,
    documentData,
    setDocumentData,
    setShowDocModal,
  } = props
  const classes = useStyle()

  const handleSubmit = (values: any , resetForm:any) => {
    console.log(values, 'formik submit ')
    if (files.length > 0) {
      const docData = [...documentData]
      const typeName = `${formName}`
      const newDocData = {
        [typeName]: {
          data: {
            Name: values.name,
            Description: values.description,
            OriginalName: files[0].file.name,
          },
          file: files[0].file,
        },
      }

      docData.push(newDocData[typeName])
      const newDocList = [...documentList]
      newDocList.push(newDocData)
      setDocumentData([...docData])
      setDocumentList([...newDocList])
      setFiles([])
      resetForm();      
      setShowDocModal(false)
      setShowFileError(false)
    } else {
      setShowFileError(true)
    }
  }
  const handleAdd = (newFiles: any) => {
    newFiles = newFiles.filter((file: any) => !files.find((f: any) => f.data === file.data))
    setFiles([...files, ...newFiles])
  }

  const handleDelete = (deleted: any) => {
    setFiles(files.filter((f: any) => f !== deleted))
  }


  return (
    <UploadDataWrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={documentUploadSchema}
        onSubmit={(values: any, {resetForm}) => {
          handleSubmit(values ,resetForm);
          resetForm()
        }}
      >
        {() => (
          <Form>
            <ModalHeader>
              <Typography
                classes={{
                  root: classes.headerTitle,
                }}
              >
                Upload property documents
              </Typography>
              <CloseModalBtnCont>
                <CloseIcon style={{ cursor: 'pointer' }} onClick={() => setShowDocModal(false)} />
              </CloseModalBtnCont>
            </ModalHeader>
            <DropzoneAreaBase
              filesLimit={1}
              acceptedFiles={['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']}
              fileObjects={files}
              showFileNames
              onAdd={handleAdd}
              onDelete={handleDelete}
              classes={{ root: classes.uploadDocStyle }}
            />
            {showFileError && files.length === 0 && <Error>Document is required</Error>}
            <DocFormWrapper>
              <CustomTextField label="Name" name="name" showTooltip = {true}/>
              <ErrorMessage component={err} name="name" />
              <CustomTextField label="Description" name="description" showTooltip = {true}/>
              <ErrorMessage component={err} name="description" />
              <UploadDocBtnGroup>
                <SecondaryButton type="button" onClick={() => setShowDocModal(false)}>
                  Cancel
                </SecondaryButton>
                <PrimaryButton type="submit">Insert files</PrimaryButton>
              </UploadDocBtnGroup>
            </DocFormWrapper>
          </Form>
        )}
      </Formik>
    </UploadDataWrapper>
  )
}
export default UploadDocument
