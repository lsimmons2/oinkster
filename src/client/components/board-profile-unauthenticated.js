
import React from 'react'

class BoardProfileUnauthenticated extends React.Component {

  render(){

    let boardProfileAvatar;
    if (this.props.auth.authenticated){
      boardProfileAvatar = null;
    } else {
      boardProfileAvatar = '/generic-avatar';
    }

    let boardProfileTitle;
    if (this.props.auth.authenticated){
      boardProfileTitle = null;
    } else {
      boardProfileTitle = 'Really Cool Person';
    }

    return (
      <div id='board-profile'>
        <div id='board-profile-avatar-container'>
          <img id='board-profile-avatar' src={boardProfileAvatar}/>
        </div>
        <div id='board-profile-avatar-container'>
          <h4>{boardProfileTitle}</h4>
        </div>
      </div>
    )
  }

}

export default BoardProfileUnauthenticated
