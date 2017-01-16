
import React from 'react'

class Oink extends React.Component {

  render(){
    return (
      <div className='oink'>

        <div className='avatar-container'>
          <img className='avatar' src={'https://s3.amazonaws.com/oinkster/' + this.props.picture}/>
        </div>

        <div className='right-container'>
          <h4>{this.props.user}</h4>
          <div className="oink-field">
            <span>{this.props.text}</span>
          </div>
        </div>

      </div>
    )
  }


}

export default Oink
