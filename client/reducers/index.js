
import { combineReducers } from 'redux'
import boardReduer from './board-reducer'


const rootReducer = combineReducers({
  board: boardReduer
})

export default rootReducer
