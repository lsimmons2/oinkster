
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import boardReducer from './board-reducer'


const rootReducer = combineReducers({
  board: boardReducer,
  routing: routerReducer
})


export default rootReducer
