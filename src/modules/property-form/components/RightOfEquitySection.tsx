import { useEffect, useState } from 'react'
import { DocText, FileContainer, FormSubTitle, FormTitle, FormTitleNumber, SelectedFileImgCont, useStyle, useStyle01 } from '../style'
import { Divider, Grid, Paper } from '@material-ui/core'
import ImageIcon from 'assets/icons/imgIcon.svg'
import FileIcon from 'assets/icons/fileIcon.svg'
import CrossIcon from 'assets/icons/crossIcon.svg'
import { ErrorMessage } from 'formik'
import { err, Error } from 'shared/styles/styled'
import CustomTextField from 'shared/components/custom-text-field'

const RightOfEquitySection = (props: any) => {
  const { setFormName, setShowDocModal, documentList, setDocumentList, showDocError } = props
  const classes = useStyle()
  const [checkName, setCheckName] = useState('')
  const [imageData, setImageData] = useState<any>([])

  useEffect(() => {
    const data = documentList?.filter((item: any) => {
      if (item.rightofequity !== undefined && item.rightofequity.file.type === 'image/jpeg') {
        return item
      }
    })
    setImageData(data)
  }, [documentList?.length])

  const renderSelectedFileImage = (fileList: any) => {
    return fileList.map((item: any, k: number) => {
      if (item.rightofequity !== undefined) {
        const objectURL = URL.createObjectURL(item.rightofequity.file)
        return (
          <FileContainer key={k}>
            <img src={objectURL} alt="" />
          </FileContainer>
        )
      }
    })
  }

  const handleDeleteFile = (type: string, index: number) => {
    const newDocList: any = [...documentList]
    newDocList.splice(index, 1)
    setDocumentList([...newDocList])
  }

  const renderSelectedFileName = (fileList: any, type: string) => {
    return fileList.map((item: any, k: number) => {
      if (item.rightofequity !== undefined) {
        return (
          <>
            <Grid key={k} container spacing={1} className={classes.fileNameStyle}>
              <Grid item xs={1}>
                <img src={item?.rightofequity?.file?.type === 'image/jpeg' ? ImageIcon : FileIcon} alt="" />
              </Grid>
              <Grid item xs={10}>
                <DocText>{item.rightofequity.file.name}</DocText>
              </Grid>
              <Grid item xs={1}>
                <img style={{ cursor: 'pointer' }} src={CrossIcon} alt="" onClick={() => handleDeleteFile(type, k)} />
              </Grid>
            </Grid>
          </>
        )
      }
    })
  }

  return (
    <>
      <Grid item xs={2} className={classes.titleNumberStyle}>
        <FormTitleNumber>13</FormTitleNumber>
      </Grid>
      <Grid item xs={10} container direction="column">
        <FormTitle>Right of Equity</FormTitle>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={6}
            onClick={() => {
              setFormName('rightofequity')
              setCheckName('rightofequity')
            }}
          >
            <Paper
              elevation={1}
              onClick={() => setShowDocModal(true)}
              classes={{
                root: classes.uploadDocumentStyle,
              }}
            >
              Add property document
            </Paper>
            {showDocError && documentList.length === 0 && <Error>At least one Document is required</Error>}
          </Grid>
          <Grid item xs={12} sm={6}>
            {!!documentList && documentList.length > 0 && (
              <div>
                {checkName === 'rightofequity' ? (
                  <>
                    <FormSubTitle>Selected Documents</FormSubTitle>
                    <div>{renderSelectedFileName(documentList, 'doc')}</div>
                    <SelectedFileImgCont>{renderSelectedFileImage(imageData)}</SelectedFileImgCont>
                  </>
                ) : null}
              </div>
            )}
          </Grid>
        </Grid>
        <Grid item className={classes.formGroup}>
          <CustomTextField label="Number of fractional tokens needed to be minted" name="rightofEquityNumberOfFractional" />
          <ErrorMessage component={err} name="rightofEquityNumberOfFractional" />
          <CustomTextField label="Listing price of each fractional token" name="rightofEquityListingPriceFractional" />
          <ErrorMessage component={err} name="rightofEquityListingPriceFractional" />
          <Divider className={classes.dividerStyle} />
        </Grid>
      </Grid>
    </>
  )
}

export default RightOfEquitySection
