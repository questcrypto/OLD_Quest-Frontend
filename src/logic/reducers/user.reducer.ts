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
} from '../actions/action.config'
// import history from 'modules/app/components/history'

const initialState = {
  authLoading: false,
  loading: false,
  loggedIn: false,
  isLoaded: false,
  userInfo: '',
  isNav: true,
  isWalletCon: false,
  walletConAddress: '',
  KNABBalance: 0.0,
  applicationAccess: false,
  web3Instance: '',
}

export const userReducer = (state = initialState, action: any) => {
  const { type, payload } = action
  switch (type) {
    case AUTH_START:
      return {
        ...state,
        authLoading: true,
      }
    case LOGIN_START:
      return {
        ...state,
        loading: true,
      }
    case AUTH_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        loading: false,
        loggedIn: true,
        isLoaded: true,
        authLoading: false,
        userInfo: payload.userInfo,
        isWalletCon: true,
      }
    case AUTH_FAIL:
    case LOGIN_FAIL:
      localStorage.removeItem('token')
      return {
        ...state,
        loading: false,
        loggedIn: false,
        isLoaded: true,
        authLoading: false,
      }
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        loading: false,
        loggedIn: false,
        isLoaded: true,
        authLoading: false,
        isNav: false,
        isWalletCon: false,
      }
    case LOGOUT2:
      localStorage.removeItem('token')
      return {
        ...state,
        loading: false,
        loggedIn: false,
        isLoaded: true,
        authLoading: false,
        isWalletCon: false,
        isNav: true,
      }
    case WALLET_CONNECT:
      return {
        ...state,
        isWalletCon: payload,
      }
    case WALLET_CONNECT_ADDRESS:
      return {
        ...state,
        walletConAddress: payload,
      }
    case KNAB_BALANCE:
      return {
        ...state,
        KNABBalance: payload,
      }
    case APPLICATION_ACCESS:
      return {
        ...state,
        applicationAccess: payload,
      }
    case WEB3_INSTANCE:
      return {
        ...state,
        web3Instance: payload,
      }
    default:
      return state
  }
}
