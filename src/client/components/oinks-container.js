
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Oink from './oink'
import { submitOink } from '../actions/board-actions'

class OinksContainer extends React.Component {

  submitOinka(e){
    e.preventDefault();
    let oink = {
      text: this.refs.text.value
    };
    this.props.submitOink(oink);
  }

  render(){

    let submitOinkInput = null;
    if (this.props.auth.authenticated){
      submitOinkInput = (
        <div id='submit-oink'>

          <div className="form-group" id='submit-oink-input'>
            <textarea className="form-control" ref='text' placeholder="What's poppin?"></textarea>
            <div className='submit-oink-button-wrapper'>
              <input id='upload-image-button' type='submit' className='form-control' value='Upload Image'/>
            </div>
            <div className='submit-oink-button-wrapper'>
              <input id='submit-oink-button' type='submit' onClick={this.submitOinka.bind(this)} className='form-control' value='Oink!'/>
            </div>
          </div>
        </div>
      )
    }

    let oinksFeed;
    let id;
    let avatar;
    let user;
    let text;

    if (this.props.board.oinks.length){
      oinksFeed = (
          this.props.board.oinks.map( oink => {
            if (oink.avatar){
              avatar = oink.avatar;
            } else {
              avatar = 'images/generic-avatar.png'
            }
            id = oink.id;
            user = oink.user;
            text = oink.text;

            return (
              < Oink
                avatar={avatar}
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
