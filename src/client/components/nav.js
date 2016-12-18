
import React from 'react'
import { Link } from 'react-router'


class Nav extends React.Component {
  render(){
    return (
      <div>
        <Link to='/home' activeClassName='active-nav-item'>Home</Link>
        <Link to='/board' activeClassName='active-nav-item'>Board</Link>
        <Link to='/signup' activeClassName='active-nav-item'>Signup</Link>
        {this.props.children}
      </div>
    )
  }
}

export default Nav
