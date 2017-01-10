
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

  getStyle(){
    let color;
    if (this.props.auth.authenticated){
      color = 'green';
    } else {
      color = 'red'
    }
    return {
      'backgroundColor': color
    }
  }

  render(){
    let navItems = [
      <Link key='home' to='/home' activeClassName='active-nav-item'>Home</Link>,
      <Link key='board' to='/board' activeClassName='active-nav-item'>Board</Link>
    ];
    if (!this.props.auth.authenticated){
      navItems.push(
        <Link key='auth' to='/signup' activeClassName='active-nav-item'>Sign Up / Log In</Link>
      )
    } else {
      navItems.push(
        <Link key='auth' onClick={this.logOut.bind(this)} activeClassName='active-nav-item'>Log Out</Link>
      )
    }
    return (
      <div style={this.getStyle()}>
        {navItems}
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
