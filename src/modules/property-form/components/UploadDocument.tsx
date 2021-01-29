import React, { useState } from 'react'
import { err } from 'shared/styles/styled'
import { useStyle, UploadDataWrapper, ModalHeader, CloseModalBtnCont, DocFormWrapper, UploadDocBtnGroup } from './style'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import { DropzoneArea } from 'material-ui-dropzone'
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
  const [file, setFile] = useState<any>([])
  const { documentList, setDocumentList, setShowDocModal } = props
  const classes = useStyle()

  const handleSubmit = (values: any) => {
    const newDocList = [...documentList]
    newDocList.push(file[0])
    setDocumentList([...file])
  }
  const handleFileChange = (files: any) => {
    setFile([...files])
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
            <DropzoneArea
              filesLimit={1}
              showFileNames
              acceptedFiles={['application/pdf', 'application/doc', '/csv']}
              onChange={(file: any) => handleFileChange(file)}
              classes={{ root: classes.uploadDocStyle }}
            />
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
