
import React from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/auth-actions'


class Nav extends React.Component {

  componentWillMount(){
    let jwt = localStorage.getItem('jwt');
    if (jwt){
      this.props.actions.verify(jwt);
    } else {
      this.props.actions.notVerified();
    }
  }

  logOut(e){
    e.preventDefault();
    this.props.actions.logOut();
  }

  render(){

    let navItems = [

      <Link
        id='nav-logo'
        key='home'
        to='/home'
      >
        <img src='/images/thick-logo.png'/>
      </Link>,

      <Link
        id='inkster'
        key='inkster'
        to='/home'
      >
        INKSTER
      </Link>,

      <Link
        key='about'
        to='/about'
        activeClassName='active-nav-item'
        className='nav-item nav-left'
      >
        ABOUT
      </Link>,

      <Link
        key='board'
        to='/board'
        activeClassName='active-nav-item'
        className='nav-item nav-left'
      >
        BOARD
      </Link>,

      <Link
        key='users'
        to='/allusers'
        activeClassName='active-nav-item'
        className='nav-item nav-left'
      >
        USERS
      </Link>

    ];

    if (!this.props.auth.authenticated){
      navItems.push(
        <Link
          key='login'
          to='/login'
          activeClassName='active-nav-item'
          className='nav-item nav-auth'
        >
          LOG IN
        </Link>
      );
      navItems.push(
        <Link
          key='signup'
          to='/signup'
          activeClassName='active-nav-item'
          className='nav-item nav-auth'
        >
          SIGN UP
        </Link>
      );
    } else {
      let userId = this.props.auth.userId;
      navItems.push(
        <Link
          key='logout'
          activeClassName='active-nav-item'
          className='nav-item nav-auth'
          onClick={this.logOut.bind(this)}
        >
          LOG OUT
        </Link>
      );
      navItems.push(
        <Link
          key='profile'
          activeClassName='active-nav-item'
          className='nav-item nav-auth'
          to={'/user/' + userId}
        >
          PROFILE
        </Link>
      );
      navItems.push(
        <Link
          key='settings'
          activeClassName='active-nav-item'
          className='nav-item nav-auth'
          to={'/settings/' + userId}
        >
          SETTINGS
        </Link>
      );
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
