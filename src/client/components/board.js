
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AddOinkInput from './add-oink-input'
import Oinks from './oinks'
import submitOink from '../actions/submit-oink-actions'



class Board extends React.Component {

  getStyle(){
    let color;
    if (this.props.auth.authenticated){
      color = 'green';
    } else {
      color = 'red'
    }
    return {
      'backgroundColor': color
    }
  }


  render(){

    return (
      <div style={this.getStyle()}>
        <h1>Board</h1>
        < AddOinkInput
          submitOink={this.props.submitOink}
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
    submitOink: bindActionCreators(submitOink, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
