
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import BoardProfile from './board-profile'
import submitOink from '../actions/submit-oink-actions'
import AddOinkInput from './add-oink-input'
import BoardProfileSignUp from './board-profile-sign-up'

class BoardProfileContainer extends React.Component {

  render(){

    let avatar;
    let username;
    let profileBottom;

    if (this.props.auth.authenticated){
      avatar = this.props.auth.user.avatar || 'images/profile-pic-pig.jpg';
      username = this.props.auth.user.username;
      profileBottom = <AddOinkInput submitOink={this.props.submitOink}/>;
    } else {
      avatar = 'images/pig.jpg';
      username = 'Really Cool User';
      profileBottom = <BoardProfileSignUp/>;
    }

    return (
      < BoardProfile
        avatar={avatar}
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
