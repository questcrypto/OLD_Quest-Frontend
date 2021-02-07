import React, { useState } from 'react'
import { err, Error } from 'shared/styles/styled'
import { useStyle, UploadDataWrapper, ModalHeader, CloseModalBtnCont, DocFormWrapper, UploadDocBtnGroup } from './style'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import { DropzoneAreaBase } from 'material-ui-dropzone'
import CustomTextField from 'shared/components/custom-text-field'

const initialValues = {
  name: '',
  tag: '',
  description: '',
}
const documentUploadSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
})

const UploadDocument = (props: any) => {
  const [files, setFiles] = useState<any>([])
  const [showFileError, setShowFileError] = useState(false)
  const { documentList, setDocumentList, documentData, setDocumentData, setShowDocModal } = props
  const classes = useStyle()

  const handleSubmit = (values: any) => {
    if (files.length > 0) {
      const docData = [...documentData]
      const newDocData = {
        Name: values.name,
        Description: values.description,
        OriginalName: files[0].file.name,
      }
      docData.push(newDocData)
      setDocumentData([...docData])
      const newDocList = [...documentList]
      newDocList.push(files[0].file)
      setDocumentList([...newDocList])
      setShowDocModal(false)
      setFiles([])
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
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values)
          setSubmitting(false)
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
              acceptedFiles={['application/pdf']}
              fileObjects={files}
              showFileNames
              onAdd={handleAdd}
              onDelete={handleDelete}
              classes={{ root: classes.uploadDocStyle }}
            />
            {showFileError && files.length === 0 && <Error>Document is required</Error>}
            <DocFormWrapper>
              <CustomTextField label="Name" name="name" />
              <ErrorMessage component={err} name="name" />

              <CustomTextField label="Description" name="description" />
              <ErrorMessage component={err} name="description" />
              <UploadDocBtnGroup>
                <Button
                  type="button"
                  variant="contained"
                  classes={{
                    root: classes.cancelFileBtnStyle,
                  }}
                  onClick={() => setShowDocModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  classes={{
                    root: classes.insertFileBtnStyle,
                  }}
                >
                  Insert files
                </Button>
              </UploadDocBtnGroup>
            </DocFormWrapper>
          </Form>
        )}
      </Formik>
    </UploadDataWrapper>
  )
}
export default UploadDocument
