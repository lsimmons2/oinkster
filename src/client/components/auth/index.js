
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AuthForm from './auth-form'
import * as actions from '../../actions/auth-actions'


class Auth extends React.Component {
  render(){
    return (
      <div>
        <h2>Sign Up / Log In</h2>
        < AuthForm
          actions={this.props.actions}
          auth={this.props.auth}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
