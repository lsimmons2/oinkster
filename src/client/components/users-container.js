
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as actions from '../actions/users-actions'
import history from '../history'

class UsersContainer extends React.Component {

  render(){

    let usersHeader;
    if (!this.props.users.users.length){
      usersHeader = (
        <div id='users-header-container'>
          <h3 id='users-header'>Users couldn't be loaded! Please try again later.</h3>
        </div>
      );
    } else {
      usersHeader = (
        <div id='users-header-container'>
          <h3 id='users-header'>Users on Oinkster</h3>
        </div>
      );
    }

    let userList;
    let created;
    if (this.props.users.users.length){
      userList = this.props.users.users.map( user => {

        if (user.createdAt) {

          let now = new Date();
          let userCreated = new Date(user.createdAt);

          let date;

          let day = ((now.getTime() - userCreated.getTime()) / (24*60*60*1000));
          if ( day > 6 ) {
            date = 'on ' + userCreated.toDateString().slice(0, userCreated.toDateString().length - 5);
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
            date = 'on ' + days[userCreated.getDay()];
          }
          created = `${date}`;
        }

        return (
          <div className='user' key={user.id}>
            <Link to={'/user/' + user.id} className='user-link'>
              <div className='picture-container'>
                <img className='picture' src={'https://s3.amazonaws.com/oinkster/' + user.id} onError={(e)=>{e.target.src='https://s3.amazonaws.com/oinkster/generic-avatar.png'}}/>
              </div>
              <div className='name-container'>
                <p>
                  {user.firstName} {user.lastName}
                </p>
                <p>
                  @{user.username}
                </p>
              </div>
              <div className='joined-container'>
                <p>joined {created}</p>
              </div>
            </Link>
          </div>
        );
      })
    }

    return (
      <div id='users'>
        {usersHeader}
        {userList}
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

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
