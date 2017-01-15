
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Profile from './profile'
import { submitOink } from '../actions/profile-actions'
import AddOinkInput from './add-oink-input'
import BoardProfileSignUp from './board-profile-sign-up'

export class BoardProfileContainer extends React.Component {

  render(){

    let avatar;
    let fullName;
    let username;
    let profileBottom;

    if (this.props.auth.authenticated){
      avatar = this.props.auth.user.avatar || 'images/profile-pic-pig.jpg';
      fullName = this.props.auth.user.firstname + ' ' + this.props.auth.user.lastname; 
      username = this.props.auth.user.username;
      profileBottom = (
        <p>
          User info
        </p>
      );
    } else {
      avatar = 'images/pig.jpg';
      username = 'Really Cool User';
      profileBottom = <BoardProfileSignUp/>;
    }

    return (
      < Profile
        avatar={avatar}
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

function mapDispatchToProps(dispatch){
  return {
    submitOink: bindActionCreators(submitOink, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardProfileContainer)
