
import React from 'react'

import ProfileFeed from './profile-feed'
import UserProfileContainer from './user-profile-container'

class UserProfile extends React.Component {

  render(){
    return (
      <div id='user-profile'>
        <div>User Profile</div>
        < UserProfileContainer />
        < ProfileFeed />
      </div>
    )
  }

}

export default UserProfile
