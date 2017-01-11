
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import BoardProfileAuthenticated from './board-profile-authenticated'
import BoardProfileUnauthenticated from './board-profile-unauthenticated'
import OinksContainer from './oinks-container'
import submitOink from '../actions/submit-oink-actions'


class Board extends React.Component {


  render(){

    let boardProfile;
    if (this.props.auth.authenticated){
      boardProfile = (
        <BoardProfileAuthenticated
          auth={this.props.auth}
        />
      )
    } else {
      boardProfile = (
        <BoardProfileUnauthenticated
          auth={this.props.auth}
        />
      )
    }

    return (
      <div id='board'>
        {boardProfile}
        < OinksContainer
          auth={this.props.auth}
          oinks={this.props.board.oinks}
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
    submitOink: bindActionCreators(submitOink, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
