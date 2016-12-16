
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../actions'
import Board from './board'
import '../style/main.scss'


class App extends React.Component {

  render(){

    return (
      <div className="container">
        <div id="header-container">
          <h1>
            OINKS
          </h1>
        </div>
        < Board
          actions={this.props.actions}
          board={this.props.board}
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
