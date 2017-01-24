
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
    let username;
    let userId;
    let text;
    let created = null;

    if (this.props.board.oinks.length){
      oinksFeed = (
          this.props.board.oinks.map( oink => {

            id = oink.id;
            username = oink.user.username;
            picture = oink.user.id;
            userId = oink.user.id;
            text = oink.text;
            if (oink.createdAt) {

              let now = new Date();
              let oinkCreated = new Date(oink.createdAt);

              let time = oinkCreated.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
              let date;

              let day = ((now.getTime() - oinkCreated.getTime()) / (24*60*60*1000));
              if ( day > 7 ) {
                date = oinkCreated.toDateString().slice(0, oinkCreated.toDateString().length - 5);
              } else if (1 > day){
                date = 'today';
              } else if (2 > day > 1){
                date = 'yesterday';
              } else {
                let days = [
                  'Sunday',
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday'
                ];
                date = 'on ' + days[oinkCreated.getDay()];
              }
              created = `at ${time} ${date}`;
            }
            return (
              < Oink
                picture={picture}
                key={id}
                user={username}
                userId={userId}
                text={text}
                created={created}
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
