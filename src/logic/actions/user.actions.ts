import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL } from './action.config'

export const loginStart = (data: any) => {
  return {
    type: LOGIN_START,
    payload: data,
  }
}
export const loginSuccess = (data: any) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  }
}
export const loginFail = () => {
  return {
    type: LOGIN_FAIL,
  }
}
