
import React from 'react'
import { Router, Route, IndexRedirect, Redirect } from 'react-router'

import initialState from '../initial-state'
import history from '../history'

import Nav from './nav'
import Home from './home'
import About from './about'
import Board from './board'
import Users from './users'
import SignUp from './sign-up'
import LogIn from './log-in'
import UserProfile from './user-profile'
import Settings from './settings'
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
            <IndexRedirect to='/home'/>
            <Route name='home' path='/home' component={Home}/>
            <Route name='about' path='/about' component={About}/>
            <Route name='board' path='/board' component={Board}/>
            <Route name='users' path='/allusers' component={Users}/>
            <Route name='signup' path='/signup' component={SignUp}/>
            <Route name='login' path='/login' component={LogIn}/>
            <Route name='profile' path='/user/:id' component={UserProfile}/>
            <Route name='settings' path='/settings/:id' component={Settings}/>
            <Redirect from='*' to='/home'/>
          </Route>
        </Router>
      </div>
    )

  }

}


export default App
