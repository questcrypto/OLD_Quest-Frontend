import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'
import { authSuccess, authFail, loginSuccess, loginFail } from '../actions/user.actions'
import { AUTH_START, LOGIN_START } from '../actions/action.config'
import { setAuthToken } from '../helpers/set-auth-token'
import history from 'modules/app/components/history'
import { Paths } from 'modules/app/components/routes/types'

/* ============== USER AUTH SAGA =============== */

export function* authWatcher() {
  yield takeLatest(AUTH_START, authWorker)
}

export function* authWorker(): any {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    const res = yield call(authenticateToken)
    const userInfo = yield call(getUserInfo, res.data.token)
    const successData = { token: res.data.token, userInfo }
    yield put(authSuccess(successData))
  } catch (error) {
    yield put(authFail())
  }
}
const authenticateToken = async () => await axios.get(`${apiBaseUrl}/auth/auth`)
/* ============== LOGIN SAGA =============== */

export function* loginWatcher() {
  yield takeLatest(LOGIN_START, loginWorker)
}

function* loginWorker(action: any): any {
  try {
    const data = action.payload
    const res = yield call(loginUser, data)
    const userInfoRes = yield call(getUserInfo, res.data.accessToken)
    const successData = { userInfo: userInfoRes, token: res.data.accessToken }
    yield put(loginSuccess(successData))
    history.push(`${Paths.dashboard}`)
  } catch (error) {
    yield put(loginFail())
  }
}

function loginUser(data: any) {
  return axios.post(`${apiBaseUrl}/user/getAuth`, { publicaddress: data.publicaddress, signature: data.signature, email: data.email })
}

/*=======================getUserInfo  ============================*/

async function getUserInfo(token: any) {
  setAuthToken(token)
  try {
    const res = await axios.get(`${apiBaseUrl}/auth/token/${token}`)
    if (res) {
      return res.data
    }
  } catch (error) {}
}
