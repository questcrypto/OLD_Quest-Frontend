import React, { useState } from 'react'
import { err, Error } from 'shared/styles/styled'
import { useStyle, UploadDataWrapper, ModalHeader, CloseModalBtnCont, DocFormWrapper, NameTagCont, UploadDocBtnGroup } from './style'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Typography from '@material-ui/core/Typography'
import { PrimaryButton, SecondaryButton } from 'shared/components/buttons'
import CloseIcon from '@material-ui/icons/Close'
import { DropzoneAreaBase } from 'material-ui-dropzone'
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
  const [files, setFiles] = useState<any>([])
  const [showFileError, setShowFileError] = useState(false)
  const { imageList, setImageList, imageData, setImageData, setShowImgModal } = props
  const classes = useStyle()

  const handleSubmit = (values: any) => {
    if (files.length > 0) {
      const imgData = [...imageData]
      const newImgData = {
        Name: values.name,
        Description: values.description,
        OriginalName: files[0].file.name,
        Tag: values.tag,
      }
      imgData.push(newImgData)
      const newImgList = [...imageList]
      newImgList.push(files[0].file)
      setImageData([...imgData])
      setImageList([...newImgList])
      setShowImgModal(false)
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
                Upload property images
              </Typography>
              <CloseModalBtnCont>
                <CloseIcon style={{ cursor: 'pointer' }} onClick={() => setShowImgModal(false)} />
              </CloseModalBtnCont>
            </ModalHeader>

            <DropzoneAreaBase
              filesLimit={1}
              acceptedFiles={['image/jpeg', 'image/png', 'image/jpg']}
              fileObjects={files}
              showFileNames
              onAdd={handleAdd}
              onDelete={handleDelete}
              classes={{ root: classes.uploadDocStyle }}
            />
            {showFileError && files.length === 0 && <Error>Image is required</Error>}
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
                <SecondaryButton type="button" onClick={() => setShowImgModal(false)}>
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
export default UploadImage
