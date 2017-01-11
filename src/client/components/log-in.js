
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
      <form>
        <label htmlFor='log-in-email-username'>Email or Username</label>
        <br/>
        <input name='log-in-email-username' ref='logInEmailUsername' type='text'/>
        <br/>
        <label htmlFor='log-in-password'>Password</label>
        <br/>
        <input name='log-in-password' ref='logInPassword' type='text'/>
        <br/>
        {/* <input type='submit' value='Show Sign Up' onClick={this.showSignUp.bind(this)}/> */}
        <input type='submit' value='Log In' onClick={this.logIn.bind(this)}/>
      </form>
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
