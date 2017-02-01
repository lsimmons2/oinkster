
import React from 'react'
import { Link } from 'react-router'
import Modal from 'react-modal'
import history from '../history'

class Profile extends React.Component {

  followUser(e){
    e.preventDefault();
    this.props.followUser(this.props.userId);
  }

  renderFollowButton(){
    if (!this.props.auth.authenticated){
      return (
        <button className='follow-button btn'>
          <Link to='/signup' className='no-underline'>Sign up to follow!</Link>
        </button>
      )
    }
    if (this.props.auth.userId === this.props.userId){
      return null;
    }
    for (let i = 0; i < this.props.followers.length; i++) {
      if (this.props.followers[i].id === this.props.auth.userId){
        return (
          <button className='follow-button btn not-clickable'>
            You're following {this.props.username}
          </button>
        )
      }
    }
    return (
      <button className='follow-button btn' onClick={this.followUser.bind(this)}>
        Follow {this.props.username}
      </button>
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

  goToUserPage(id, modalType, e){
    e.preventDefault();
    if (modalType === 'followers'){
      this.props.toggleFollowersModal();
    } else {
      this.props.toggleFolloweesModal();
    }
    history.push('/user/' + id);
  }

  render(){

    let followerList = null;
    if (this.props.followers){
      followerList = this.props.followers.map( follower => {
        return (
          <div onClick={this.goToUserPage.bind(this, follower.id, 'followers')} className='following-modal-block-container' key={follower.id}>
            <div className='following-modal-block'>
              <div className='following-modal-block-picture-container'>
                <div className='following-modal-block-picture-wrapper'>
                  <img src={'https://s3.amazonaws.com/oinkster/' + follower.id} onError={(e)=>{e.target.src='https://s3.amazonaws.com/oinkster/generic-avatar.png'}}/>
                </div>
              </div>
              <div className='following-modal-block-info-container'>
                <span>{follower.username}</span>
              </div>
            </div>
            <div className='following-modal-block-separator'></div>
          </div>
        )
      })
    }

    let followeeList = null;
    if (this.props.followees){
      followeeList = this.props.followees.map( followee => {
        return (
          <div onClick={this.goToUserPage.bind(this, followee.id, 'followees')} className='following-modal-block-container' key={followee.id}>
            <div className='following-modal-block'>
              <div className='following-modal-block-picture-container'>
                <div className='following-modal-block-picture-wrapper'>
                  <img src={'https://s3.amazonaws.com/oinkster/' + followee.id} onError={(e)=>{e.target.src='https://s3.amazonaws.com/oinkster/generic-avatar.png'}}/>
                </div>
              </div>
              <div className='following-modal-block-info-container'>
                <span>{followee.username}</span>
              </div>
            </div>
            <div className='following-modal-block-separator'></div>
          </div>
        )
      })
    }

    let followBox = null;
    // if this profile component is in a user profile page and
    // not on the board - should make these different components
    // to make this less confusing
    if (this.props.followers && this.props.followees){

      let followers;
      let followees;
      if (this.props.followers.length){
        let followerOrFollowers = ' followers';
        if (this.props.followers.length === 1){
          followerOrFollowers = ' follower'
        }
        followers = (
          <b onClick={this.toggleFollowersModal.bind(this)} className='clickable'>
            {this.props.followers.length}{followerOrFollowers}
          </b>
        )
      } else {
        followers = (
          <b>
            {this.props.username} has no followers
          </b>
        )
      }
      if (this.props.followees.length){
        followees = (
          <b onClick={this.toggleFolloweesModal.bind(this)} className='clickable'>
            Following {this.props.followees.length}
          </b>
        )
      } else {
        followees = (
          <b>
            {this.props.username} is not following anyone
          </b>
        )
      }
      followBox = (
        <div className='profile-following-container'>
          <div className='profile-following-inner-container'>
            {followers}
          </div>
          <div className='profile-following-inner-container'>
            {followees}
          </div>
          <div className='profile-follow-button-container'>
            {this.renderFollowButton()}
          </div>
        </div>
      );

    }

    return (
      <div className='col-xs-12 col-sm-4'>

        <Modal
          isOpen={this.props.showFollowersModal}
          onRequestClose={this.toggleFollowersModal.bind(this)}
          // overlayClassName='modal-overlay'
          className='following-modal'
          closeTimeoutMS={0}
          contentLabel="Modal"
        >
          <div className='following-modal-header-container'>
            <h4>{this.props.username}'s followers</h4>
          </div>
          <div className='following-modal-list-container'>
            {followerList}
          </div>
          <div className='modal-close-button-container'>
            <button className='form-control modal-close-button' onClick={this.toggleFollowersModal.bind(this)}>Close</button>
          </div>
        </Modal>

        <Modal
          isOpen={this.props.showFolloweesModal}
          onRequestClose={this.toggleFolloweesModal.bind(this)}
          // overlayClassName='modal-overlay'
          className='following-modal'
          closeTimeoutMS={0}
          contentLabel="Modal"
        >
          <div className='following-modal-header-container'>
            <h4>{this.props.username} is following</h4>
          </div>
          <div className='following-modal-list-container'>
            {followeeList}
          </div>
          <div className='modal-close-button-container'>
            <button className='form-control modal-close-button' onClick={this.toggleFolloweesModal.bind(this)}>Close</button>
          </div>
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
          <div className='profile-bio-container'>
            {this.props.profileBottom}
          </div>
          {followBox}
        </div>
      </div>
    )
  }

}

export default Profile
