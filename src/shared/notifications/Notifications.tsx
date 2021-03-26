import React from 'react'
import { connect } from 'react-redux'
import { clearAlert } from 'logic/actions/alerts.actions'
import { useStyles } from './style'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const Notifications = (props: any) => {
  const classes = useStyles()
  const { alertStatus, messageType, message, clearAlert } = props

  const handleClose = () => {
    clearAlert()
  }

  return (
    <div className={classes.root}>
      <Snackbar
        open={alertStatus}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {messageType && (
          <Alert onClose={handleClose} severity={messageType}>
            {message}
          </Alert>
        )}
      </Snackbar>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  message: state.alerts.message,
  messageType: state.alerts.type,
  alertStatus: state.alerts.alertStatus,
})

export default connect(mapStateToProps, { clearAlert })(Notifications)
