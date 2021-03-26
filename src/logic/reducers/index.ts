import { combineReducers } from 'redux'
import { alertsReducer } from './alerts.reducers'
import { userReducer } from './user.reducer'
import { drawerReducer } from './drawer.reducer'

const rootReducer = combineReducers({
  alerts: alertsReducer,
  user: userReducer,
  drawer: drawerReducer,
})
export default rootReducer
