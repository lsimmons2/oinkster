
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Oink from './oink'


class Oinks extends React.Component {

  render(){

    let oinks;
    let id;
    let avatar;
    let user;
    let text;

    if (this.props.board.oinks.length){

      oinks = this.props.board.oinks.map( oink => {

        if (oink.avatar){
          avatar = oink.avatar;
        } else {
          avatar = '/generic-avatar'
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

    } else {
      oinks = <div><h2>No oinks could be loaded!</h2></div>
    }

    return (
      <div id="oinks-container">
        {oinks}
      </div>
    )
  }

}


function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(Oinks)
