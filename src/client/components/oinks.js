
import React from 'react'


class Oinks extends React.Component {

  render(){

    let oinks;
    if (this.props.oinks.length){
      oinks = this.props.oinks.map( oink => {
        return (
          <li key={oink.id}>
            <h4>{oink.user}</h4>
            <div className="oink-field">
              <span>{oink.text}</span>
            </div>
            <div className="oink-field">
              <span>{oink.date}</span>
            </div>
            <div className="oink-field">
              <span>{oink.time}</span>
            </div>
          </li>
        )
      })
    } else {
      oinks = <h2>No oinks could be loaded!</h2>
    }

    return (
      <div>
        <div id="oinks-container">
          <ul>
            {oinks}
          </ul>
        </div>
      </div>
    )
  }

}

export default Oinks
