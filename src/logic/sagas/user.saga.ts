import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'
import { loginSuccess, loginFail } from '../actions/user.actions'
import { LOGIN_START } from '../actions/action.config'
import { setAuthToken } from '../helpers/set-auth-token'
import history from 'modules/app/components/history'
import { Paths } from 'modules/app/components/routes/types'

/* ============== LOGIN SAGA =============== */

export function* loginWatcher() {
  yield takeLatest(LOGIN_START, loginWorker)
}

function* loginWorker(action: any) {
  try {
    const data = action.payload
    const res = yield call(loginUser, data)

    const userInfo = yield call(getUserInfo, res.data.token)
    const successData = { token: res.data.token, userInfo }
    yield put(loginSuccess(successData))
    history.push(`${Paths.dashboard}`)
  } catch (error) {
    yield put(loginFail())
  }
}

function loginUser(data: any) {
  return axios.post(`${apiBaseUrl}/user/login`, { email: data.email, hash: data.password })
}

/*=======================getUserInfo  ============================*/
async function getUserInfo(token: any) {
  setAuthToken(token)
  try {
    const res = await axios.get(`${apiBaseUrl}/user/info`)
    if (res) {
      return res.data
    }
  } catch (error) {
    return []
  }
}
