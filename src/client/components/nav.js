
import React from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/auth-actions'


class Nav extends React.Component {

  componentWillMount(){
    if (localStorage.jwt){
      this.props.actions.loggedIn();
    }
  }

  logOut(){
    localStorage.removeItem('jwt')
    this.props.actions.logOut();
  }

  render(){

    let navItems = [

      <Link
        id='nav-logo'
        key='home'
        to='/home'
        className='nav-item'
      >
        <img src='thick-logo'/>
      </Link>,

      <Link
        id='inkster'
        key='inkster'
        to='/home'
        className='nav-item nav-other'
      >
        inkster
      </Link>,

      <Link
        key='board'
        to='/board'
        className='nav-item nav-other'
      >
        Board
      </Link>

    ];

    if (!this.props.auth.authenticated){
      navItems.push(
        <Link
          key='auth'
          to='/signup'
          className='nav-item nav-auth'
        >
          Sign Up / Log In
        </Link>
      )
    } else {
      navItems.push(
        <Link
          key='auth'
          className='nav-item nav-auth'
          onClick={this.logOut.bind(this)}
        >
          Log Out
        </Link>
      )
    }

    return (
      <div>
        <nav id='nav'>
          <div id='inner-nav-container'>
            {navItems}
          </div>
        </nav>
          {this.props.children}
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

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
