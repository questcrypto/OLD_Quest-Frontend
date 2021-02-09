import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, LOGOUT, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/action.config'

const initialState = {
  authLoading: false,
  loading: false,
  loggedIn: false,
  isLoaded: false,
  userInfo: '',
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
      }
    case AUTH_FAIL:
    case LOGOUT:
    case LOGIN_FAIL:
      localStorage.removeItem('token')
      return {
        ...state,
        loading: false,
        loggedIn: false,
        isLoaded: true,
        authLoading: false,
      }
    default:
      return state
  }
}
