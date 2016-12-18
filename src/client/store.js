
import { applyMiddleware, compose, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from './reducers'
import initialState from './initial-state'




let finalCreateStore = compose(
  applyMiddleware(
    thunk,
    logger()
  )
)(createStore)


const store = finalCreateStore(rootReducer, initialState);

export default store
