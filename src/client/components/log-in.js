
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions/auth-actions'


class LogIn extends React.Component {

  logIn(e){
    e.preventDefault();
    let userInfo = {
      usernameEmail: this.refs.logInEmailUsername.value,
      password: this.refs.logInPassword.value
    };
    console.log(userInfo);
    this.props.actions.logIn(userInfo);
  }

  render(){
    return (
      <div id='log-in'>
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
