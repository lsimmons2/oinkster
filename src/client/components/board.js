
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AddOinkInput from './add-oink-input'
import Oinks from './oinks'
import submitOink from '../actions/submit-oink-actions'
import fetchOinks from '../actions/fetch-oinks-actions'



class Board extends React.Component {

  render(){

    return (
      <div>
        <h1>Board</h1>
        < AddOinkInput
          submitOink={this.props.submitOink}
          fetchOinks={this.props.fetchOinks}
        />
        < Oinks
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
    submitOink: bindActionCreators(submitOink, dispatch),
    fetchOinks: bindActionCreators(fetchOinks, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
