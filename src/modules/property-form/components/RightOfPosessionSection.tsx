import React, { useEffect, useState } from 'react'
import {
  AddAnotherFloorCont,
  DocText,
  FileContainer,
  FloorDetailsArr,
  FloorDetailsCont,
  FloorFieldMsgBox,
  FormSubTitle,
  FormTitle,
  FormTitleNumber,
  SelectedFileImgCont,
  useStyle,
  useStyle01,
} from '../style'
import { Divider, Grid, Paper } from '@material-ui/core'
import ImageIcon from 'assets/icons/imgIcon.svg'
import FileIcon from 'assets/icons/fileIcon.svg'
import CrossIcon from 'assets/icons/crossIcon.svg'
import { ErrorMessage } from 'formik'
import { err, Error } from 'shared/styles/styled'
import CustomTextField from 'shared/components/custom-text-field'

const RightOfPosessionSection = (props: any) => {
  const classes = useStyle()
  const { setFormName, setShowDocModal, documentList, setDocumentList, showDocError } = props
  const [checkName, setCheckName] = useState('')

  const [imageData, setImageData] = useState<any>([])

  useEffect(() => {
    const data = documentList?.filter((item: any) => {
      if (item.rightofpossesion !== undefined && item.rightofpossesion.file.type === 'image/jpeg') {
        return item
      }
    })
    setImageData(data)
  }, [documentList?.length])

  const renderSelectedFileImage = (fileList: any) => {
    return fileList.map((item: any, k: number) => {
      if (item.rightofpossesion !== undefined) {
        const objectURL = URL.createObjectURL(item.rightofpossesion.file)
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
      if (item.rightofpossesion !== undefined) {
        return (
          <Grid key={k} container spacing={1} className={classes.fileNameStyle}>
            <Grid item xs={1}>
              <img src={item?.rightofgovernace?.file?.type === 'image/jpeg' ? ImageIcon : FileIcon} alt="" />
            </Grid>
            <Grid item xs={10}>
              <DocText>{item.rightofpossesion.file.name}</DocText>
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
        <FormTitleNumber>14</FormTitleNumber>
      </Grid>
      <Grid item xs={10} container direction="column">
        <FormTitle>Right of Occupancy (NFT)</FormTitle>
        {/* <p>
          Representing possession and enjoyment of property. This right assumes all existing and future covenants with the HOA and/or
          managing entity.
        </p> */}
        <Grid
          container
          spacing={3}
          onClick={() => {
            setFormName('rightofpossesion')
            setCheckName('rightofpossesion')
          }}
        >
          <Grid item xs={12} sm={6}>
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
                {checkName === 'rightofpossesion' ? (
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
          <CustomTextField label="Number of fractional tokens needed to be minted" name="rightofpossesionNumberOfFractional" />
          <ErrorMessage component={err} name="rightofpossesionNumberOfFractional" />
          <CustomTextField label="Listing price of each fractional token" name="rightofpossesionListingPriceFractional" />
          <ErrorMessage component={err} name="rightofpossesionListingPriceFractional" />
          <Divider className={classes.dividerStyle} />
        </Grid>
      </Grid>
    </>
  )
}

export default RightOfPosessionSection
