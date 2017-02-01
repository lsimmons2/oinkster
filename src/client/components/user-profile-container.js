
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Profile from './profile'
import * as actions from '../actions/profile-actions'

import Oink from './oink'


class UserProfileContainer extends React.Component {

  render(){

    let user = this.props.profile.summary.user;
    let userId = user.id;
    let fullName = user.firstName + ' ' + user.lastName;
    let username = user.username;
    let picture = user.id || 'profile-pic-pig.jpg';

    let bio = null;
    if (user.bio) {
      bio = (
        <p>
          {user.bio}
        </p>
      )
    } else {
      bio = (
        <p>
          {username} has not made a bio yet.
        </p>
      )
    }

    return (
      <div id='user-profile'>
        < Profile
          fullName={fullName}
          username={username}
          userId={userId}
          picture={picture}
          profileBottom={bio}
          followers={user.followers}
          followees={user.followees}
          auth={this.props.auth}
          followUser={this.props.actions.followUser}
          toggleFollowersModal={this.props.actions.toggleFollowersModal}
          toggleFolloweesModal={this.props.actions.toggleFolloweesModal}
          showFollowersModal={this.props.profile.showFollowersModal}
          showFolloweesModal={this.props.profile.showFolloweesModal}
        />
      </div>
    )
  }

}

function mapStateToProps(state){
  return state;
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer)
