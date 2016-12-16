
import { applyMiddleware, compose, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from './reducers'


let finalCreateStore = compose(
  applyMiddleware(
    thunk,
    logger()
  )
)(createStore)

let defInitialState = {
  board: {
    oinks: [
      {
        user: 'bob',
        text: 'sahh?'
      },
      {
        user: 'maria',
        text: 'supp?'
      },
      {
        user: 'francis',
        text: 'waddupp?'
      }
    ],
    isFetching: false,
    error: false,
    count: 0
  }
};

export default function configureStore(initialState = defInitialState){
  return finalCreateStore(rootReducer, initialState)
}
