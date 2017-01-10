
import React from 'react'
import { Router, Route, IndexRedirect } from 'react-router'

import initialState from '../initial-state'
import history from '../history'

import Nav from './nav'
import Board from './board'
import Home from './home'
import Auth from './auth/'
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
            <IndexRedirect to='/signup' />
            <Route name='home' path='/home' component={Home}/>
            <Route name='board' path='/board' component={Board}/>
            <Route name='auth' path='/signup' component={Auth}/>
          </Route>
        </Router>
      </div>
    )

  }

}


export default App
