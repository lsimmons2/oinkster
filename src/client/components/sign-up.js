
import React from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions/auth-actions'


export class SignUp extends React.Component {

  validForm(){
    if (!this.refs.signUpFirstName.value){
      return false;
    }
    if (!this.refs.signUpLastName.value){
      return false;
    }
    if (!this.refs.signUpUsername.value){
      return false;
    }
    if (!this.refs.signUpEmail.value){
      return false;
    }
    if (!this.refs.signUpPassword.value){
      return false;
    }
    return true;
  }

  signUp(e){
    e.preventDefault();
    if (!this.validForm()){
      return this.props.actions.invalidSignUpForm();
    }
    let userInfo = {
      firstName: this.refs.signUpFirstName.value,
      lastName: this.refs.signUpLastName.value,
      username: this.refs.signUpUsername.value,
      email: this.refs.signUpEmail.value,
      password: this.refs.signUpPassword.value,
      bio: '',
      picture: 'profile-pic-pig.jpg'
    };
    this.props.actions.signUp(userInfo);
  }

  renderSignUpConflict(){
    if (this.props.auth.signUpConflict.conflictType === 'username'){
      return (
        <p className='sign-up-warning'>
          The username {this.props.auth.signUpConflict.username} already exists.
        </p>
      )
    } else {
      return (
        <p className='sign-up-warning'>
          The email {this.props.auth.signUpConflict.email} already exists. Would you like to <Link to='/login'>log in?</Link>
        </p>
      )
    }
  }



  render(){

    let signUpWarning = null;
    if (this.props.auth.invalidSignUpForm){
      signUpWarning = (
        <p className='sign-up-warning'>All fields are required.</p>
      );
    } else if (this.props.auth.signUpConflict){
      signUpWarning = this.renderSignUpConflict();
    } else if (this.props.auth.signUpError){
      signUpWarning = (
        <p className='sign-up-warning'>
          Woops! There was an error signing you up. Please try again later.
        </p>
      )
    }

    return (
      <div id='sign-up' className='view'>

        <h3>Sign Up</h3>

        <form onSubmit={this.signUp.bind(this)}>

          <div className='form-group'>
            <input className='form-control' name='sign-up-first-name' ref='signUpFirstName' type='text' placeholder='First Name'/>
          </div>

          <div className='form-group'>
            <input className='form-control' name='sign-up-last-name' ref='signUpLastName' type='text' placeholder='Last Name'/>
          </div>

          <div className='form-group'>
            <input className='form-control' name='sign-up-username' ref='signUpUsername' type='text' placeholder='Username'/>
          </div>

          <div className='form-group'>
            <input className='form-control' name='sign-up-email' ref='signUpEmail' type='text' placeholder='Email'/>
          </div>

          <div className='form-group'>
            <input className='form-control' name='sign-up-password' ref='signUpPassword' type='password' placeholder='Password'/>
          </div>

          <div className='form-group'>
            <input className='form-control' type='submit' value='Sign Up'/>
          </div>

          {signUpWarning}

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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
