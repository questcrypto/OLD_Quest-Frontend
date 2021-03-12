import { combineReducers } from 'redux'
import { userReducer } from './user.reducer'
import {drawerReducer} from './drawer.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  drawer: drawerReducer
})
export default rootReducer
