
import React from 'react'

class Profile extends React.Component {

  render(){

    return (
      <div id='profile'>
        <div id='profile-top'>
          <img src={this.props.avatar}/>
          <h4>{this.props.username}</h4>
        </div>
        <div id='profile-bottom'>
          {this.props.profileBottom}
        </div>
      </div>
    )
  }

}

export default Profile
