
import React from 'react'
import { connect } from 'react-redux'

import Profile from './profile'
import { submitOink } from '../actions/profile-actions'
import BoardProfileSignUp from './board-profile-sign-up'

export class BoardProfileContainer extends React.Component {

  render(){

    let picture;
    let fullName;
    let username;
    let profileBottom;

    if (this.props.auth.authenticated){
      picture = this.props.auth.user.picture || 'profile-pic-pig.jpg';
      fullName = this.props.auth.user.firstName + ' ' + this.props.auth.user.lastName;
      username = this.props.auth.user.username;
      profileBottom = (
        <p>
          {this.props.auth.user.bio}
        </p>
      );
    } else {
      picture = 'pig.jpg';
      username = 'Really Cool User';
      profileBottom = <BoardProfileSignUp/>;
    }

    return (
      < Profile
        picture={picture}
        fullName={fullName}
        username={username}
        profileBottom={profileBottom}
      />
    )

  }

}


function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(BoardProfileContainer)
