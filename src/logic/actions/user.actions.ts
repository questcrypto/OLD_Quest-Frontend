import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT,
  LOGOUT2,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  WALLET_CONNECT,
  WALLET_CONNECT_ADDRESS,
  KNAB_BALANCE,
  APPLICATION_ACCESS,
  WEB3_INSTANCE,
  CHAIN_ID,
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  NOTIFICATIONS
} from './action.config'

export const authStart = () => {
  return {
    type: AUTH_START,
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
export const logout = (data: any) => {
  return {
    type: LOGOUT,
    payload: data,
  }
}
export const logout2 = (data: any) => {
  return {
    type: LOGOUT2,
    payload: data,
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
export const loginFail = (data: any) => {
  return {
    type: LOGIN_FAIL,
    payload: data,
  }
}
export const walletConnect = (data: any) => {
  return {
    type: WALLET_CONNECT,
    payload: data,
  }
}
export const walletConnectAddress = (data: any) => {
  return {
    type: WALLET_CONNECT_ADDRESS,
    payload: data,
  }
}

export const getKNABbalance = (data: any) => {
  return {
    type: KNAB_BALANCE,
    payload: data,
  }
}

export const hasApplcationAccess = (data: any) => {
  return {
    type: APPLICATION_ACCESS,
    payload: data,
  }
}

export const setWeb3Instance = (data: any) => {
  return {
    type: WEB3_INSTANCE,
    payload: data,
  }
}

export const setChainId = (data: any) => {
  return {
    type: CHAIN_ID,
    payload: data,
  }
}

export const openLoginModal = () => {
  return {
    type: OPEN_LOGIN_MODAL,
  }
}

export const closeLoginModal = () => {
  return {
    type: CLOSE_LOGIN_MODAL,
  }
}

export const setNotifications = (data: any) => {
  return {
    type: NOTIFICATIONS,
    payload: data,
  }
}
