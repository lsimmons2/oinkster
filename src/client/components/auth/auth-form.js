
import React from 'react'

class AuthForm extends React.Component {

  showSignUp(e){
    e.preventDefault();
    this.props.actions.showSignUp();
  }

  signUp(e){

    e.preventDefault();
    let userInfo = {
      firstName: this.refs.signUpFirstName.value,
      lastName: this.refs.signUpLastName.value,
      username: this.refs.signUpUsername.value,
      email: this.refs.signUpEmail.value,
      password: this.refs.signUpPassword.value
    };
    this.props.actions.signUp(userInfo);

  }

  showLogIn(e){
    e.preventDefault();
    this.props.actions.showLogIn();
  }

  logIn(e){
    e.preventDefault();
    let userInfo = {
      usernameEmail: this.refs.logInEmailUsername.value,
      password: this.refs.logInPassword.value
    };
    console.log(userInfo);
    this.props.actions.logIn(userInfo);
  }

  renderLogIn(){
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
        <input type='submit' value='Show Sign Up' onClick={this.showSignUp.bind(this)}/>
        <input type='submit' value='Log In' onClick={this.logIn.bind(this)}/>
      </form>
    )
  }

  renderSignUp(){
    return (
      <form>

        <label htmlFor='sign-up-username'>First Name</label>
        <br/>
        <input name='sign-up-first-name' ref='signUpFirstName' type='text'/>
        <br/>

        <label htmlFor='sign-up-username'>Last Name</label>
        <br/>
        <input name='sign-up-last-name' ref='signUpLastName' type='text'/>
        <br/>

        <label htmlFor='sign-up-username'>Username</label>
        <br/>
        <input name='sign-up-username' ref='signUpUsername' type='text'/>
        <br/>

        <label htmlFor='sign-up-email'>Email</label>
        <br/>
        <input name='sign-up-email' ref='signUpEmail' type='text'/>
        <br/>

        <label htmlFor='sign-up-password'>Password</label>
        <br/>
        <input name='sign-up-password' ref='signUpPassword' type='text'/>
        <br/>

        <input type='submit' value='Sign Up' onClick={this.signUp.bind(this)}/>

        <input type='submit' value='Show Log In' onClick={this.showLogIn.bind(this)}/>

      </form>
    )
  }

  renderSignUpConflict(){
    if (this.props.auth.signUpConflict.conflictType === 'username'){
      return (
        <div>
          The username {this.props.auth.signUpConflict.username} already exists.
        </div>
      )
    } else {
      return (
        <div>
          This email {this.props.auth.signUpConflict.email} already exists. Would you like to <a href='login'>log in?</a>
        </div>
      )
    }
  }



  render(){

    let authForm;
    let signUpConflict = null;

    if (this.props.auth.signUpConflict){
      signUpConflict = this.renderSignUpConflict();
    }

    if (this.props.auth.showSignUp){
      authForm = this.renderSignUp();
    } else {
      authForm = this.renderLogIn();
    }

    return (
      <div>
        {signUpConflict}
        {authForm}
      </div>
    )
  }

}

export default AuthForm
