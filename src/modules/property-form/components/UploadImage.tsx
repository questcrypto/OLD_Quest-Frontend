import React, { useState } from 'react'
import { err } from 'shared/styles/styled'
import { useStyle, UploadDataWrapper, ModalHeader, CloseModalBtnCont, DocFormWrapper, NameTagCont, UploadDocBtnGroup } from './style'
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
const imageUploadSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  tag: Yup.string().required('Tag is required'),
  description: Yup.string().required('Description is required'),
})

const UploadImage = (props: any) => {
  const [file, setFile] = useState<any>([])
  const { imageList, setImageList, setShowImgModal } = props
  const classes = useStyle()

  const handleSubmit = (values: any) => {
    const newImgList = [...imageList]
    newImgList.push(file[0])
    setImageList([...file])
  }
  const handleFileChange = (files: any) => {
    setFile([...files])
  }

  return (
    <UploadDataWrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={imageUploadSchema}
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
                <CloseIcon style={{ cursor: 'pointer' }} onClick={() => setShowImgModal(false)} />
              </CloseModalBtnCont>
            </ModalHeader>
            <DropzoneArea
              filesLimit={10}
              showFileNames
              acceptedFiles={['image/jpeg', 'image/png', 'image/jpg']}
              onChange={(file: any) => handleFileChange(file)}
              classes={{ root: classes.uploadDocStyle }}
            />

            <DocFormWrapper>
              <NameTagCont>
                <div>
                  <CustomTextField label="Name" name="name" />
                  <ErrorMessage component={err} name="name" />
                </div>
                <div>
                  <CustomTextField label="Tag" name="tag" />
                  <ErrorMessage component={err} name="tag" />
                </div>
              </NameTagCont>
              <CustomTextField label="Description" name="description" />
              <ErrorMessage component={err} name="description" />
              <UploadDocBtnGroup>
                <Button
                  type="button"
                  variant="contained"
                  classes={{
                    root: classes.cancelFileBtnStyle,
                  }}
                  onClick={() => setShowImgModal(false)}
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
export default UploadImage
