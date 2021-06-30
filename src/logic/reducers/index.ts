import { combineReducers } from 'redux'
import { alertsReducer } from './alerts.reducers'
import { userReducer } from './user.reducer'
import { drawerReducer } from './drawer.reducer'
import { stakingReducer } from './staking.reducer'

const rootReducer = combineReducers({
  alerts: alertsReducer,
  user: userReducer,
  drawer: drawerReducer,
  staking: stakingReducer
})
export default rootReducer
