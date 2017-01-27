
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions/auth-actions'


class LogIn extends React.Component {

  logIn(e){
    e.preventDefault();
    if (!this.refs.logInEmailUsername.value || !this.refs.logInPassword.value){
      return this.props.actions.invalidLogInForm();
    }
    let userInfo = {
      usernameEmail: this.refs.logInEmailUsername.value,
      password: this.refs.logInPassword.value
    };
    this.props.actions.logIn(userInfo);
  }

  render(){

    let logInWarning = null;
    if (this.props.auth.comboNotFound){
      logInWarning = (
        <p className='log-in-warning'>
          This combination of username/email and password does not exist.
        </p>
      )
    } else if (this.props.auth.logInError){
      logInWarning = (
        <p className='log-in-warning'>
          Woops! There was an error loggin you in. Please try again later.
        </p>
      )
    } else if (this.props.auth.invalidLogInForm){
      logInWarning = (
        <p className='log-in-warning'>
          Both fields are required.
        </p>
      )
    }

    return (
      <div id='log-in' className='view'>
        <h3>Log In</h3>
        <form onSubmit={this.logIn.bind(this)}>
          <div className='form-group'>
            <input className='form-control' name='log-in-email-username' ref='logInEmailUsername' type='text' placeholder='Username / Email'/>
          </div>
          <div className='form-group'>
            <input className='form-control' name='log-in-password' ref='logInPassword' type='password' placeholder='Password'/>
          </div>
          <div className='form-group'>
            <input className='form-control' type='submit' value='Log In To Oinkster'/>
          </div>
        </form>
        {logInWarning}
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

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)
