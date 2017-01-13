
import React from 'react'

class ProfileUser extends React.Component {

  render(){

    return (
      <div id='profile-user'>
        <div id='profile-user-top'>
          <img src={this.props.avatar}/>
          <h4>{this.props.username}</h4>
        </div>
        <div id='profile-user-bottom'>
          {this.props.profileBottom}
        </div>
      </div>
    )
  }

}

export default ProfileUser
