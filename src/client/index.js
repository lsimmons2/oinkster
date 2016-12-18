import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
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


render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
)
