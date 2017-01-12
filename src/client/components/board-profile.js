
import React from 'react'

class BoardProfile extends React.Component {

  render(){

    return (
      <div id='board-profile'>
        <div id='board-profile-top'>
          <img src={this.props.avatar}/>
          <h4>{this.props.username}</h4>
        </div>
        <div id='board-profile-bottom'>
          {this.props.profileBottom}
        </div>
      </div>
    )
  }

}

export default BoardProfile
