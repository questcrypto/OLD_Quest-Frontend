import { all, fork } from 'redux-saga/effects'
import { loginWatcher } from './user.saga'
function* rootSaga() {
  yield all([fork(loginWatcher)])
}
export default rootSaga
