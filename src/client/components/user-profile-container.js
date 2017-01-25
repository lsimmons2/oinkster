
import React from 'react'
import { connect } from 'react-redux'
import Profile from './profile'

import Oink from './oink'


class UserProfileContainer extends React.Component {

  render(){

    let user = this.props.profile.summary.user;
    let fullName = user.firstName + ' ' + user.lastName;
    let username = user.username;
    let picture = user.id || 'profile-pic-pig.jpg';

    let bio = null;
    if (user.bio) {
      bio = (
        <p>{user.bio}</p>
      )
    } else {
      bio = (
        <p>{username} has not made a bio yet.</p>
      )
    }

    let profileBottom = (
      <div>
        {bio}
      </div>
    );

    return (
      <div id='user-profile'>
        < Profile
          fullName={fullName}
          username={username}
          picture={picture}
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
