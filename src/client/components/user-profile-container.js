
import React from 'react'
import { connect } from 'react-redux'
import Profile from './profile'

import Oink from './oink'


class UserProfileContainer extends React.Component {

  render(){

    let user = this.props.profile.summary.user;
    let fullName = user.firstName + user.lastName;
    let username = user.username;
    let picture = user.picture || 'profile-pic-pig.jpg';
    let profileBottom = (
      <p>{user.bio}</p>
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
