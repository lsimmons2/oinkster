
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import BoardProfile from './board-profile'
import submitOink from '../actions/submit-oink-actions'

class BoardProfileContainer extends React.Component {

  render(){

    let avatar;
    let username;
    let profileBottom;

    if (this.props.auth.authenticated){
      avatar = this.props.auth.user.avatar || 'profile-pic-pig';
      username = this.props.auth.user.username;
      profileBottom = (
        <form>
          <div className='form-group'>
            <h5 id='board-profile-input'>Oink something!</h5>
            <textarea className='form-control' placeholder="What's on your mind?"></textarea>
          </div>
        </form>
      );
    } else {
      avatar = 'pig';
      username = 'Really Cool User';
      profileBottom = (
        <p>
          This could be you! <Link to='/signup'>Sign up now</Link> so you can join the fun and oink with the other oinksters!
        </p>
      );
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
