
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import boardReducer from './board-reducer'
import authReducer from './auth-reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  board: boardReducer,
  routing: routerReducer
})


export default rootReducer
