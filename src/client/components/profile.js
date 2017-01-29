
import React from 'react'
import { Link } from 'react-router'
import Modal from 'react-modal'

class Profile extends React.Component {

  followUser(e){
    e.preventDefault();
    this.props.followUser(this.props.userId);
  }

  renderFollowButton(){
    if (!this.props.auth.authenticated){
      return (
        <div>
          <Link to='/signup'>Sign up to follow!</Link>
        </div>
      )
    }
    for (let i = 0; i < this.props.followers.length; i++) {
      if (this.props.followers[i].id === this.props.auth.userId){
        return (
          <div>
            Check! You're following {this.props.username}
          </div>
        )
      }
    }
    return (
      <div onClick={this.followUser.bind(this)}>
        Follow {this.props.username}
      </div>
    )
  }

  toggleFollowersModal(e){
    e.preventDefault();
    this.props.toggleFollowersModal();
  }

  toggleFolloweesModal(e){
    e.preventDefault();
    this.props.toggleFolloweesModal();
  }

  render(){

    let followerList = null;
    if (this.props.followers){
      followerList = this.props.followers.map( follower => {
        return (
          <p key={follower.id}>{follower.username}</p>
        )
      })
    }

    let followeeList = null;
    if (this.props.followees){
      followeeList = this.props.followees.map( followee => {
        return (
          <p key={followee.id}>{followee.username}</p>
        )
      })
    }

    let followBox = null;

    // if this profile component is in a user profile page and
    // not on the board - should make these different components
    // to make this less confusing
    if (this.props.followers && this.props.followees){
      followBox = (
        <div>
          <span onClick={this.toggleFolloweesModal.bind(this)}>
            Following {this.props.followees.length}
          </span>
          <span onClick={this.toggleFollowersModal.bind(this)}>
            {this.props.followers.length} followers
          </span>
          {this.renderFollowButton()}
        </div>
      );
    }

    return (
      <div className='col-xs-12 col-sm-4'>

        <Modal
          isOpen={this.props.showFollowersModal}
          onRequestClose={this.toggleFollowersModal.bind(this)}
          closeTimeoutMS={0}
          contentLabel="Modal"
        >
          {followerList}
          <button onClick={this.toggleFollowersModal.bind(this)}>Close modal</button>
        </Modal>

        <Modal
          isOpen={this.props.showFolloweesModal}
          onRequestClose={this.toggleFolloweesModal.bind(this)}
          closeTimeoutMS={0}
          contentLabel="Modal"
        >
          {followeeList}
          <button onClick={this.toggleFolloweesModal.bind(this)}>Close modal</button>
        </Modal>

        <div className='profile'>
          <div className='profile-top'>
            <div className='profile-avatar-wrapper'>
              <img src={'https://s3.amazonaws.com/oinkster/' + this.props.picture} onError={(e)=>{e.target.src='https://s3.amazonaws.com/oinkster/generic-avatar.png'}}/>
            </div>
            <div className='profile-username-wrapper'>
              <h3>{this.props.fullName}</h3>
              <h4>@{this.props.username}</h4>
            </div>
          </div>
          <div className='profile-bottom'>
            {this.props.profileBottom}
          </div>
          {followBox}
        </div>
      </div>
    )
  }

}

export default Profile
