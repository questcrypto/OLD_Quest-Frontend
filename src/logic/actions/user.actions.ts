import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, LOGOUT, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, SET_SOCKET_CONNECTION } from './action.config'

export const authStart = () => {
  return {
    type: AUTH_START,
  }
}

export const setSocketConnection = (data: any) => {
  return {
    type: SET_SOCKET_CONNECTION,
    payload: data,
  }
}

export const authSuccess = (data: any) => {
  return {
    type: AUTH_SUCCESS,
    payload: data,
  }
}
export const authFail = () => {
  return {
    type: AUTH_FAIL,
  }
}
export const logout = () => {
  return {
    type: LOGOUT,
  }
}
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
