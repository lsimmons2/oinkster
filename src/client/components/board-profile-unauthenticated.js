
import React from 'react'
import { Link } from 'react-router'

class BoardProfileUnauthenticated extends React.Component {

  render(){

    return (
      <div id='board-profile'>
        <div id='board-profile-top'>
          <img src='/pig'/>
          <h4>Really Cool User</h4>
        </div>
        <div id='board-profile-bottom'>
          <p>
            This could be you! <Link to='/signup'>Sign up now</Link> so you can join the fun and oink with the other oinksters!
          </p>
        </div>
      </div>
    )
  }

}

export default BoardProfileUnauthenticated
