
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'

import * as actions from '../actions/settings-actions'



class Settings extends React.Component {

  updateSettings(e){
    e.preventDefault();
    let settings = {
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      username: this.refs.username.value,
      email: this.refs.email.value,
      bio: this.refs.bio.value,
      picture: this.props.settings.current.picture
    };
    this.props.actions.updateSettings(settings);
  }

  saveSettings(e){
    e.preventDefault();
    let settings = {
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      username: this.refs.username.value,
      email: this.refs.email.value,
      bio: this.refs.bio.value,
      picture: this.props.settings.current.picture
    };
    let userId = localStorage.getItem('userId');
    this.props.actions.saveSettings(userId, settings);
  }

  onDrop(files){
    let picture = files[0];
    let parts = picture.name.split('.');
    if (parts.length < 2){
      alert('Please make sure your image file has the proper extension.');
      return;
    }
    let ext = parts[parts.length - 1];
    if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg'){
      alert('Only JPEGs or PNGs please.');
      return;
    }
    let userId = localStorage.getItem('userId');
    this.props.actions.uploadPicture(picture, userId);
  }

  resetPicture(){
    this.props.actions.resetPicture();
  }

  render(){

    let id = localStorage.getItem('userId');

    let fetchingStatus = null;
    if (this.props.settings.isFetching){
      fetchingStatus = (
        <p>Retrieving your settings...</p>
      );
    } else if (this.props.settings.fetchingError){
      fetchingStatus = (
        <p>Woops! There was an error fetching your settings.</p>
      );
    }

    let picture = 'https://s3.amazonaws.com/oinkster/' + id;

    let imageStatus;
    if (this.props.settings.isUploadingPicture){
      imageStatus = (
        <p>Uploading image...</p>
      );
    } else if (this.props.settings.uploadingPictureError){
      imageStatus = (
        <p>Woops! There was an error uploading your profile picture.</p>
      );
    } else if (this.props.settings.uploadingPictureSuccess){
      imageStatus = (
        <p>Successfully changed your profile picture.</p>
      )
      picture = 'https://s3.amazonaws.com/oinkster/' + id + '?v=' + Math.random();
    } else {
      picture = 'https://s3.amazonaws.com/oinkster/' + id + '?v=' + Math.random();
    }

    let savingStatus = null;
    if (this.props.settings.modified){
      savingStatus = (
        <div className='form-group' id='save-button'>
          <input
            type='submit'
            className='form-control'
            value='Save Settings'
            onClick={this.saveSettings.bind(this)}/>
        </div>
      )
    }  else if (this.props.settings.isSaving){
      savingStatus = (
        <p>Saving your settings...</p>
      );
    } else if (this.props.settings.savingError){
      savingStatus = (
        <p>Woops! There was an error saving your settings.</p>
      );
    } else if (this.props.settings.savingSuccess){
      savingStatus = (
        <p>Settings successfully saved.</p>
      );
    }


    let resetImage = null;

    return (

      <div id='settings' className='view'>

        <div className='row'>

          <div className='col-xs-12 col-sm-6'>

            <form>

              <div className='form-group'>
                <label htmlFor='settings-first-name'>First Name</label>
                <input
                  id='settings-first-name'
                  ref='firstName'
                  type='text'
                  className='form-control'
                  value={this.props.settings.current.firstName}
                  onChange={this.updateSettings.bind(this)}/>
              </div>

              <div className='form-group'>
                <label htmlFor='settings-last-name'>Last Name</label>
                <input
                  id='settings-last-name'
                  ref='lastName'
                  type='text'
                  className='form-control'
                  value={this.props.settings.current.lastName}
                  onChange={this.updateSettings.bind(this)}/>
              </div>

              <div className='form-group'>
                <label htmlFor='settings-username'>Username</label>
                <input
                  id='settings-username'
                  ref='username'
                  type='text'
                  className='form-control'
                  value={this.props.settings.current.username}
                  onChange={this.updateSettings.bind(this)}/>
              </div>

              <div className='form-group'>
                <label htmlFor='settings-email'>Email</label>
                <input
                  id='settings-email'
                  ref='email'
                  type='text'
                  className='form-control'
                  value={this.props.settings.current.email}
                  onChange={this.updateSettings.bind(this)}/>
              </div>

              <div className='form-group'>
                <label htmlFor='settings-bio'>Bio</label>
                <textarea
                  id='settings-bio'
                  ref='bio'
                  type='text'
                  className='form-control'
                  value={this.props.settings.current.bio}
                  onChange={this.updateSettings.bind(this)}>
                </textarea>
              </div>

            </form>

          </div>

          <div className='col-xs-12 col-sm-6'>
            <div id='picture-container'>
              <label>Picture</label>
              <Dropzone
                ref={(node) => { this.dropzone = node; }}
                onDrop={this.onDrop.bind(this)}
                className='settings-picture'
                multiple={false}
              >
                <img src={picture} onError={(e)=>{e.target.src='https://s3.amazonaws.com/oinkster/generic-avatar.png'}}/>
              </Dropzone>
              {resetImage}
              {imageStatus}
            </div>
          </div>

          <div className='col-xs-12'>
            <div id='settings-status'>
              {fetchingStatus}
              {savingStatus}
            </div>
          </div>

        </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
