
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Router, Route, hashHistory } from 'react-router'

import * as actions from '../actions'
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
              actions={this.props.actions}
              board={this.props.board}
            />
            <Route path='/signup' component={SignUp}/>
            <Route path='*' component={Home}/>
          </Route>
        </Router>
      </div>
    )

  }

}

function mapStateToProps(state){
  return state;
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
