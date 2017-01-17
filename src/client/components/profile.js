
import React from 'react'

class Profile extends React.Component {
  
  render(){

    return (
      <div className='col-xs-12 col-sm-4'>
        <div className='profile'>
          <div className='profile-top'>
            <div className='profile-avatar-wrapper'>
              <img src={'https://s3.amazonaws.com/oinkster/' + this.props.picture} onError={(e)=>{e.target.src='https://s3.amazonaws.com/oinkster/generic-avatar.png'}}/>
            </div>
            <div className='profile-username-wrapper'>
              <h3>{this.props.fullName}</h3>
              <h4>@{this.props.username}</h4>
            </div>
          </div>
          <div className='profile-bottom'>
            {this.props.profileBottom}
          </div>
        </div>
      </div>
    )
  }

}

export default Profile
