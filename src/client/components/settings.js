
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions/settings-actions'



class Settings extends React.Component {

  updateFirstName(e){
    e.preventDefault();
    this.props.actions.updateFirstName(this.refs.firstName.value);
  }

  updateLastName(e){
    e.preventDefault();
    this.props.actions.updateLastName(this.refs.lastName.value);
  }

  updateUsername(e){
    e.preventDefault();
    this.props.actions.updateUsername(this.refs.username.value);
  }

  updateEmail(e){
    e.preventDefault();
    this.props.actions.updateEmail(this.refs.email.value);
  }

  saveSettings(e){
    e.preventDefault();
    let settings = {
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      username: this.refs.username.value,
      email: this.refs.email.value
    };
    let user = JSON.parse(localStorage.getItem('user'));
    let id = user.id;
    this.props.actions.saveSettings(id, settings);
  }

  render(){

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
              value={this.props.settings.data.firstname}
              onChange={this.updateFirstName.bind(this)}/>
          </div>

          <div className='form-group'>
            <label htmlFor='settings-last-name'>Last Name</label>
            <input
              id='settings-last-name'
              ref='lastName'
              type='text'
              className='form-control'
              value={this.props.settings.data.lastname}
              onChange={this.updateLastName.bind(this)}/>
          </div>

          <div className='form-group'>
            <label htmlFor='settings-username'>Username</label>
            <input
              id='settings-username'
              ref='username'
              type='text'
              className='form-control'
              value={this.props.settings.data.username}
              onChange={this.updateUsername.bind(this)}/>
          </div>

          <div className='form-group'>
            <label htmlFor='settings-email'>Email</label>
            <input
              id='settings-email'
              ref='email'
              type='text'
              className='form-control'
              value={this.props.settings.data.email}
              onChange={this.updateEmail.bind(this)}/>
          </div>

          <div className='form-group'>
            <input
              type='submit'
              className='form-control'
              value='Save Settings'
              onClick={this.saveSettings.bind(this)}/>
          </div>

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
