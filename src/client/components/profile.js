
import React from 'react'

import ProfileFeed from './profile-feed'
import ProfileUserContainer from './profile-user-container'

class Profile extends React.Component {

  render(){
    return (
      <div id='profile'>
        <div>Profile</div>
        < ProfileUserContainer />
        < ProfileFeed />
      </div>
    )
  }

}

export default Profile
