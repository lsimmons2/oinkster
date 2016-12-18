
import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import history from '../history'
import Nav from './nav'
import Board from './board'
import Home from './home'
import SignUp from './sign-up'
import '../style/main.scss'


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


class App extends React.Component {

  render(){

    return (
      <div>
        <Router
          key={Math.random()}
          history={history}
        >
          <Route path='/' component={Nav}>
            <Route name='home' path='/home' component={Home}/>
            <Route name='board' path='/board' component={Board}/>
            <Route name='signup' path='/signup' component={SignUp}/>
            <IndexRoute component={Home} />
          </Route>
        </Router>
      </div>
    )

  }

}


export default App
