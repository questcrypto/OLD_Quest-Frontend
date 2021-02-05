import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/action.config'

const initialState = {
  authLoading: false,
  loading: false,
  loggedIn: false,
  isLoaded: true,
  userInfo: '',
}

export const userReducer = (state = initialState, action: any) => {
  const { type, payload } = action
  switch (type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
      }
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        loading: false,
        loggedIn: true,
        isLoaded: true,
        userInfo: payload.userInfo,
      }
    case LOGIN_FAIL:
      localStorage.removeItem('token')
      return {
        ...state,
        loading: false,
        loggedIn: false,
        isLoaded: true,
      }
    default:
      return state
  }
}
