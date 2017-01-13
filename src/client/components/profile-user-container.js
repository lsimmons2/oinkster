
import React from 'react'
import { connect } from 'react-redux'
import ProfileUser from './profile-user'

import Oink from './oink'


class ProfileUserContainer extends React.Component {

  render(){

    let user = this.props.profile.summary.user;
    let avatar = '/images/profile-pic-pig.jpg';
    let profileBottom = <p>sah?</p>;

    return (
      < ProfileUser
        avatar={avatar}
        username='lsimmons'
        profileBottom='sup?'
      />
    )
  }

}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(ProfileUserContainer)
