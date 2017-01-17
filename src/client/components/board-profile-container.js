
import React from 'react'
import { connect } from 'react-redux'

import Profile from './profile'
import { submitOink } from '../actions/profile-actions'
import { fetchBoardProfile } from '../actions/board-actions'
import BoardProfileSignUp from './board-profile-sign-up'


export class BoardProfileContainer extends React.Component {

  render(){

    let picture;
    let fullName;
    let username;
    let profileBottom;

    if (this.props.auth.authenticated){
      picture = this.props.auth.userId || '';
      fullName = this.props.board.profile.firstName + ' ' + this.props.board.profile.lastName || '';
      username = this.props.board.profile.username || '';
      profileBottom = (
        <p>
          {this.props.board.profile.bio}
        </p>
      );
    } else {
      picture = 'pig.jpg';
      username = 'reallyCoolPerson';
      fullName = 'You!'
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
