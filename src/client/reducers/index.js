
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import boardReducer from './board-reducer'
import authReducer from './auth-reducer'
import feedbackReducer from './feedback-reducer'
import profileReducer from './profile-reducer'


const rootReducer = combineReducers({
  auth: authReducer,
  board: boardReducer,
  routing: routerReducer,
  feedback: feedbackReducer,
  profile: profileReducer
})


export default rootReducer
