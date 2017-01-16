
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/auth-actions'

import Oink from './oink'


class ProfileFeed extends React.Component {

  render(){
    let userOinks = null;
    if (this.props.profile.summary.oinks){
      userOinks = this.props.profile.summary.oinks.map( oink => {
        return (
          < Oink
            key={oink.id}
            picture = 'pig.jpg'
            user = {this.props.profile.summary.user.username}
            userId = {this.props.profile.summary.user.id}
            text = {oink.text}
          />
        )
      })
    }
    return (
      <div id='profile-feed' className='col-xs-12 col-sm-7'>
        {userOinks}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFeed)
