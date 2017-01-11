
import React from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions/auth-actions'


class SignUp extends React.Component {

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
          This email {this.props.auth.signUpConflict.email} already exists. Would you like to <Link to='/login'>log in?</Link>
        </div>
      )
    }
  }



  render(){

    let signUpConflict = null;

    if (this.props.auth.signUpConflict){
      signUpConflict = this.renderSignUpConflict();
    }

    return (
      <div>

        {signUpConflict}

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
