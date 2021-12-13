import { Divider, Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { FileContainer, FormTitle, FormTitleNumber, SelectedFileImgCont, useStyle } from '../style'
import { Error } from 'shared/styles/styled'
import ImageIconSVG from '../../../shared/components/imageIcon'

const UploadPropertyImageSection = (props: any) => {
  const classes = useStyle()
  const { formName, showImgError, setShowImgError, imageData, setImageData, imageList, setImageList, showImgModal, setShowImgModal } = props
  // const [showImgModal, setShowImgModal] = useState(false)

  const renderSelectedFileImage = (fileList: any) => {
    return fileList.map((item: any, k: number) => {
      const objectURL = URL.createObjectURL(item)
      return (
        <FileContainer key={k}>
          <img src={objectURL} alt="" />
        </FileContainer>
      )
    })
  }

  return (
    <>
      <Grid item xs={2} className={classes.titleNumberStyle}>
        <FormTitleNumber>6</FormTitleNumber>
      </Grid>
      <Grid item xs={10} container direction="column">
        <FormTitle>Upload property images</FormTitle>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper
              elevation={1}
              onClick={() => setShowImgModal(true)}
              classes={{
                root: classes.uploadDataStyle,
              }}
            >
              Add property image
            </Paper>
            {showImgError && imageList.length === 0 && <Error>At least one Image is required</Error>}
          </Grid>
          <Grid item xs={12} sm={6} className="photo-progress">
            {!!imageList && imageList.length > 0 && (
              <div>
                <h4>Uploading</h4>
                {imageList?.map((image: any) => (
                  <div className="photo-progress-row">
                    <div className="photo-icon">
                      <ImageIconSVG />
                    </div>
                    <div className="photo-progress">
                      <div className="progresstext">
                        <p>{image.name}</p>
                        <p>{(image.size / 1024 / 1024).toFixed(2)} Mb</p>
                      </div>
                      <div className="progressline">
                        <span></span>
                      </div>
                      <div className="progressbotto">100%</div>
                    </div>
                  </div>
                ))}
                <SelectedFileImgCont>{renderSelectedFileImage(imageList)}</SelectedFileImgCont>
              </div>
            )}
            {/* <h4>Uploading</h4>
                        <div className="photo-progress-row">
                          <div className="photo-icon">
                            <ImageIconSVG />
                          </div>
                          <div className="photo-progress">
                            <div className="progresstext">
                              <p>Photo.png</p>
                              <p>1.2 Mb</p>
                            </div>
                            <div className="progressline">
                              <span></span>
                            </div>
                            <div className="progressbotto">
                              60%
                            </div>
                          </div>
                          <div className="progress-close">
                            <CloseIcon />
                          </div>
                        </div>
                        <div className="photo-progress-row">
                          <div className="photo-icon">
                            <ImageIconSVG />
                          </div>
                          <div className="photo-progress">
                            <div className="progresstext">
                              <p>Photo.png</p>
                              <p>1.2 Mb</p>
                            </div>
                            <div className="progressline">
                              <span></span>
                            </div>
                            <div className="progressbotto">
                              60%
                            </div>
                          </div>
                          <div className="progress-close">
                            <CloseIcon />
                          </div>
                        </div>
                        <div className="photorow">
                          <div className="photobox">
                            <img src={scenery} alt="scenery" />
                          </div>
                          <div className="photobox">
                            <img src={scenery} alt="scenery" />
                          </div>
                          <div className="photobox">
                            <img src={scenery} alt="scenery" />
                          </div>
                          <div className="photobox">
                            <img src={scenery} alt="scenery" />
                          </div>
                        </div> */}
          </Grid>
        </Grid>
        <Divider className={classes.dividerStyle} />
      </Grid>
    </>
  )
}

export default UploadPropertyImageSection
