
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Oink from './oink'
import SubmitOinkInput from './submit-oink-input'
import { submitOink } from '../actions/board-actions'

class OinksContainer extends React.Component {

  render(){

    let submitOinkInput = null;
    if (this.props.auth.authenticated){
      submitOinkInput = (
        <SubmitOinkInput
          submitOink={this.props.submitOink}
        />
      );
    }

    let oinksFeed;
    let id;
    let picture;
    let user;
    let text;

    if (this.props.board.oinks.length){
      oinksFeed = (
          this.props.board.oinks.map( oink => {
            picture = 'pig.jpg'
            id = oink.id;
            user = oink.user;
            text = oink.text;

            return (
              < Oink
                picture={picture}
                key={id}
                user={user}
                text={text}
              />
            )
          })
      )
    } else {
      oinksFeed = <div><h2>No oinks could be loaded!</h2></div>
    }

    return (
      <div id="oinks-container" className='col-xs-12 col-sm-7'>
        {submitOinkInput}
        <div id='oinks-feed'>
          {oinksFeed}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OinksContainer)
