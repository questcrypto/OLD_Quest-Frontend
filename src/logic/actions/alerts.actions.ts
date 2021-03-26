import { SUCCESS_ALERT, INFO_ALERT, WARNING_ALERT, ERROR_ALERT, CLEAR_ALERT_STATE } from './action.config'

export function successAlert(message: any) {
  return {
    type: SUCCESS_ALERT,
    message,
  }
}
export function infoAlert(message: any) {
  return {
    type: INFO_ALERT,
    message,
  }
}
export function warningAlert(message: any) {
  return {
    type: WARNING_ALERT,
    message,
  }
}
export function errorAlert(message: any) {
  return {
    type: ERROR_ALERT,
    message,
  }
}
export function clearAlert() {
  return {
    type: CLEAR_ALERT_STATE,
  }
}
