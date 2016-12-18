
import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import initialState from '../initial-state'
import history from '../history'

import Nav from './nav'
import Board from './board'
import Home from './home'
import SignUp from './sign-up'
import '../style/main.scss'



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
