import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './configure-store'
import App from './components/app'


let initialState = {
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

let store = configureStore(initialState);


render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
)
