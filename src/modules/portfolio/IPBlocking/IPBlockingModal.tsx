import { makeStyles, Typography, Grid } from '@material-ui/core'
import styled from 'styled-components'
import CustomModal from '../../../shared/custom-modal/CustomModal'
import CustomButton from '../components/shared/Button'

const useStyles = makeStyles((theme) => ({
  bcDiv: {
    minWidth: '650px',
  },
  modalBody: {
    padding: theme.spacing(4),
  },
  closeIcon: {
    width: '12px',
    height: '12px',
    cursor: 'pointer',
  },
  line: {
    height: '1px',
    width: '100%',
    backgroundColor: '#DEDEDE',
  },

  confirmDialog: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '32px 0px',
  },
  confirmDialogText: {
    color: '#293854',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '1.2rem'
  },
  link: {
    color: 'rgb(230, 186, 115)'
  },
  confirmDialogBtn: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16px',
    marginBottom: '16px',
  },
  hr: {
    width: '100%',
  },
  body: {
    padding: '0px 48px',
    paddingBottom: '16px'
  }
}))

const IPBlockingModal = (props: any) => {
  const classes = useStyles()
  const { show, toggleModal, onClose } = props

  return (
    <CustomModal show={show} toggleModal={toggleModal}>
      <div className={classes.bcDiv}>
        <div className={classes.confirmDialog}>
          <div className={classes.confirmDialogText}>
            <Typography variant="subtitle1" style={{ lineHeight: 2 }}>
              It seems you are accessing <a className={classes.link} href="https://questcrypto.app">https://questcrypto.app</a> <br />
              from an IP address belonging to one of <br />
              the following countries:
            </Typography>
          </div>
          <hr />
          <Grid container spacing={4} className={classes.body}>
            <Grid item md={8} xs={12}>
              <Typography>United States of America</Typography>
              <Typography>Albania</Typography>
              <Typography>Bosnia and Herzegovina</Typography>
              <Typography>Belarus</Typography>
              <Typography>Congo (DRC)</Typography>
              <Typography>Cote d'lvoire</Typography>
              <Typography>Criemea</Typography>
              <Typography>Cuba</Typography>
              <Typography>Iraq</Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography>North Korea</Typography>
              <Typography>Liberia</Typography>
              <Typography>Macedonia</Typography>
              <Typography>Myanmar</Typography>
              <Typography>Serbia</Typography>
              <Typography>Sudan</Typography>
              <Typography>Syria</Typography>
              <Typography>Zimbabwe</Typography>
            </Grid>
          </Grid>
          <hr className={classes.hr} />
          <div className={classes.confirmDialogBtn}>
            <CustomButton size="large" style={{ backgroundColor: '#1E3444', padding: '8px 24px', width: '100%' }} onClick={onClose}>
              I ACKNOWLEGDGE
            </CustomButton>
          </div>
        </div>
      </div>
    </CustomModal>
  )
}

export default IPBlockingModal

export const ModalHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px;
  padding-bottom: 16px;
`

export const ModalHeaderText = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  color: #777777;
`
