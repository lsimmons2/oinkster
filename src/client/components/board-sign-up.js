
import React from 'react'
import { Link } from 'react-router'


class BoardSignUp extends React.Component {
  render(){
    return (
      <div id='board-sign-up'>
        <h3>
          <Link to='/signup' id='board-sign-up-link'>
            Sign up to Oink something!
          </Link>
        </h3>
      </div>
    )
  }
}

export default BoardSignUp
