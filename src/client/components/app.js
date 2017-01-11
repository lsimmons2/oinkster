
import React from 'react'
import { Router, Route, IndexRedirect, Redirect } from 'react-router'

import initialState from '../initial-state'
import history from '../history'

import Nav from './nav'
import Home from './home'
import About from './about'
import Board from './board'
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
            <IndexRedirect to='/home' />
            <Route name='home' path='/home' component={Home}/>
            <Route name='about' path='/about' component={About}/>
            <Route name='board' path='/board' component={Board}/>
            <Route name='auth' path='/signup' component={Auth}/>
            <Redirect from='*' to='/home'/>
          </Route>
        </Router>
      </div>
    )

  }

}


export default App
