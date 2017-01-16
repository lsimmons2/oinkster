
import React from 'react'

import BoardProfileContainer from './board-profile-container'
import OinksContainer from './oinks-container'


class Board extends React.Component {

  render(){
    return (
      <div id='board' className='row view'>
        < BoardProfileContainer />
        < OinksContainer />
      </div>
    )
  }

}

export default Board
