
import { applyMiddleware, compose, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from './reducers'
import storeObserver from './store-observer'


let defInitialState = {
  board: {
    oinks: [
      {
        user: 'bob',
        text: 'sahh?',
        id: 1
      },
      {
        user: 'maaaria',
        text: 'supp?',
        id: 2
      },
      {
        user: 'francis',
        text: 'waddupp?',
        id: 3
      }
    ],
    isFetching: false,
    error: false,
    count: 0
  }
};


let finalCreateStore = compose(
  applyMiddleware(
    thunk,
    logger()
  )
)(createStore)


const store = finalCreateStore(rootReducer, defInitialState);

export default store
