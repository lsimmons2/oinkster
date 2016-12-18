
import React from 'react'

import AddOinkInput from './add-oink-input'
import Oinks from './oinks'

class Board extends React.Component {

  render(){

    return (
      <div>
        <h1>Board</h1>
        < AddOinkInput
          actions={this.props.route.actions}
        />
        < Oinks
          board={this.props.route.board}
        />
      </div>
    )

  }

}

export default Board
