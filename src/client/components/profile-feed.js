
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/auth-actions'

import Oink from './oink'


class ProfileFeed extends React.Component {

  render(){

    let feedHeader;
    if (this.props.profile.summary.user.oinks.length){
      feedHeader = (
        <h2 id='profile-feed-header'>{this.props.profile.summary.user.username}'s oinks</h2>
      );
    } else {
      feedHeader = (
        <h2 id='profile-feed-header'>{this.props.profile.summary.user.username} has not oinked anything yet</h2>
      )
    }

    let userOinks = null;

    if (this.props.profile.summary.user.oinks){

      let created = null;

      userOinks = this.props.profile.summary.user.oinks.map( oink => {

        if (oink.createdAt) {

          let now = new Date();
          let oinkCreated = new Date(oink.createdAt);

          let time = oinkCreated.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
          let date;

          let day = ((now.getTime() - oinkCreated.getTime()) / (24*60*60*1000));
          if ( day > 7 ) {
            date = oinkCreated.toDateString().slice(0, oinkCreated.toDateString().length - 5);
          } else if (1 > day){
            date = 'today'
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
            key={oink.id}
            picture = 'pig.jpg'
            user = {this.props.profile.summary.user.username}
            userId = {this.props.profile.summary.user.id}
            text = {oink.text}
            created = {created}
          />
        )
      })
    }
    return (
      <div id='profile-feed' className='col-xs-12 col-sm-7'>
        <div id='profile-feed-header-container'>
          {feedHeader}
        </div>
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
