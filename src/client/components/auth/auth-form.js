
import React from 'react'

class AuthForm extends React.Component {

  signUp(e){
    e.preventDefault();
    console.log('time to sign up');
    console.log(this.refs.emailUsername.value);
    console.log(this.refs.password.value);
  }

  logIn(e){
    e.preventDefault();
    console.log('time to log in');
    console.log(this.refs.emailUsername.value);
    console.log(this.refs.password.value);
  }

  render(){
    return (
      <form>
        <label htmlFor='email-username'>Email or Username</label>
        <br/>
        <input name='email-username' ref='emailUsername' type='text'/>
        <br/>
        <label htmlFor='password'>Password</label>
        <br/>
        <input name='password' ref='password' type='text'/>
        <br/>
        <input type='submit' value='Sign Up' onClick={this.signUp.bind(this)}/>
        <input type='submit' value='Log In' onClick={this.logIn.bind(this)}/>
      </form>
    )
  }

}

export default AuthForm
