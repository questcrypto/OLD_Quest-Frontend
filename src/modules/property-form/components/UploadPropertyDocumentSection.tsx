import { Divider, Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import ImageIcon from 'assets/icons/imgIcon.svg'
import FileIcon from 'assets/icons/fileIcon.svg'
import { DocText, FormSubTitle, FormTitle, FormTitleNumber, useStyle } from '../style'
import { Error } from 'shared/styles/styled'
import CrossIcon from 'assets/icons/crossIcon.svg'
import { useState } from 'react'

const UploadPropertyDocumentSection = (props: any) => {
  const classes = useStyle()
  const { formName, setFormName, setShowDocModal, documentList, setDocumentList, showDocError, setuploadPropertyDocStatus } = props
  const [checkName, setCheckName] = useState('')

  const handleDeleteFile = (type: string, index: number) => {
    if (type === 'doc') {
      const newDocList: any = [...documentList]
      newDocList.splice(index, 1)
      setDocumentList([...newDocList])
    }
  }

  const renderSelectedFileName = (fileList: any, type: string) => {
    return fileList.map((item: any, k: number) => {
      if (item.uploadpropertydocument !== undefined) {
        return (
          <Grid key={k} container spacing={1} className={classes.fileNameStyle}>
            <Grid item xs={1}>
              <img src={type === 'img' ? ImageIcon : FileIcon} alt="" />
            </Grid>
            <Grid item xs={10}>
              <DocText>{item.uploadpropertydocument.file.name}</DocText>
            </Grid>
            <Grid item xs={1}>
              <img style={{ cursor: 'pointer' }} src={CrossIcon} alt="" onClick={() => handleDeleteFile(type, k)} />
            </Grid>
          </Grid>
        )
      }
    })
  }

  return (
    <>
      <Grid item xs={2} className={classes.titleNumberStyle}>
        <FormTitleNumber>7</FormTitleNumber>
      </Grid>
      <Grid item xs={10} container direction="column">
        <FormTitle>Upload property documents</FormTitle>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing eits</p>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={6}
            onClick={() => {
              setFormName('uploadpropertydocument')
              setCheckName('uploadpropertydocument')
            }}
          >
            <Paper
              elevation={1}
              onClick={() => setShowDocModal(true)}
              classes={{
                root: classes.uploadDataStyle,
              }}
            >
              Add property document
            </Paper>
            {showDocError && documentList.length === 0 && <Error>At least one Document is required</Error>}
          </Grid>
          <Grid item xs={12} sm={6}>
            {!!documentList && documentList.length > 0 && (
              <div>
                {checkName === 'uploadpropertydocument' ? (
                  <>
                    <FormSubTitle>Selected Documents</FormSubTitle>
                    <div>{renderSelectedFileName(documentList, 'doc')}</div>
                  </>
                ) : null}
              </div>
            )}
          </Grid>
        </Grid>
        <Divider className={classes.dividerStyle} />
      </Grid>
    </>
  )
}

export default UploadPropertyDocumentSection
