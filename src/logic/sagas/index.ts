import { all, fork } from 'redux-saga/effects'
import { authWatcher, loginWatcher } from './user.saga'

function* rootSaga() {
  yield all([fork(authWatcher)])
  yield all([fork(loginWatcher)])
}
export default rootSaga
