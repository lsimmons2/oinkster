
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions/settings-actions'



class Settings extends React.Component {

  updateSettings(e){
    e.preventDefault();
    let settings = {
      firstname: this.refs.firstName.value,
      lastname: this.refs.lastName.value,
      username: this.refs.username.value,
      email: this.refs.email.value,
      bio: this.refs.bio.value
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
      bio: this.refs.bio.value
    };
    let user = JSON.parse(localStorage.getItem('user'));
    let id = user.id;
    this.props.actions.saveSettings(id, settings);
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
    if (this.props.settings.modified){
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

    return (
      <div id='settings'>
        <h1>Settings</h1>
        <form>

          <div className='form-group'>
            <label htmlFor='settings-first-name'>First Name</label>
            <input
              id='settings-first-name'
              ref='firstName'
              type='text'
              className='form-control'
              value={this.props.settings.current.firstname}
              onChange={this.updateSettings.bind(this)}/>
          </div>

          <div className='form-group'>
            <label htmlFor='settings-last-name'>Last Name</label>
            <input
              id='settings-last-name'
              ref='lastName'
              type='text'
              className='form-control'
              value={this.props.settings.current.lastname}
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
