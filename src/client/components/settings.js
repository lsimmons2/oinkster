
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
    let user = JSON.parse(localStorage.getItem('user'));
    let id = user.id;
    this.props.actions.saveSettings(id, settings);
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
    let id = JSON.parse(localStorage.getItem('user')).id;
    this.props.actions.uploadPicture(picture, id);
  }

  resetPicture(){
    this.props.actions.resetPicture();
  }

  render(){

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

    let savingStatus = null;
    if (this.props.settings.modified || this.props.settings.pictureModified){
      savingStatus = (
        <div className='form-group'>
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

    let picture = null;
    if (this.props.settings.current.picture){
      let base = 'https://s3.amazonaws.com/oinkster/'
      picture = base + this.props.settings.current.picture;
    }

    let resetImage = null;
    if (this.props.settings.pictureModified){
      resetImage = (
        <div className='form-group'>
          <input
            type='submit'
            className='form-control'
            value='Reset picture'
            onClick={this.resetPicture.bind(this)}/>
        </div>
      )
    }

    return (
      <div id='settings'>

        <h1>Settings</h1>

        <Dropzone
          ref={(node) => { this.dropzone = node; }}
          onDrop={this.onDrop.bind(this)}
          className='settings-picture'
          multiple={false}
        >
          {/* <div> */}
            <img src={picture}/>
          {/* </div> */}
        </Dropzone>

        {resetImage}

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

          {fetchingStatus}
          {savingStatus}

        </form>
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
