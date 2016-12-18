
import React from 'react'
import { Router, Route, hashHistory } from 'react-router'

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
          history={hashHistory}
        >
          <Route path='/' component={Nav}>
            <Route path='/home' component={Home}/>
            <Route
              path='/board'
              component={Board}
            />
            <Route path='/signup' component={SignUp}/>
            <Route path='*' component={Home}/>
          </Route>
        </Router>
      </div>
    )

  }

}


export default App
