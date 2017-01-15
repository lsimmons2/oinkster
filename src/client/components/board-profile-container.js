
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Profile from './profile'
import { submitOink } from '../actions/profile-actions'
import AddOinkInput from './add-oink-input'
import BoardProfileSignUp from './board-profile-sign-up'

class BoardProfileContainer extends React.Component {

  componentWillMount(){
    console.log(this.props.settings);
  }

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
      < Profile
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
