
import React from 'react'
import { connect } from 'react-redux'
import Profile from './profile'

import Oink from './oink'


class UserProfileContainer extends React.Component {

  render(){

    let username = this.props.profile.summary.user.username;
    let avatar = '/images/profile-pic-pig.jpg';
    let profileBottom = (
      <p>{this.props.profile.summary.user.bio}</p>
    );

    return (
      <div id='user-profile'>
        <p>sah?</p>
        < Profile
          avatar={avatar}
          username={username}
          profileBottom={profileBottom}
        />
      </div>
    )
  }

}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(UserProfileContainer)
