
import React from 'react'
import { Link } from 'react-router'

class Oink extends React.Component {

  render(){

    return (
      <div className='oink'>

        <div className='avatar-container'>
          <Link to={'/user/'+this.props.userId}>
            <img className='avatar' src={'https://s3.amazonaws.com/oinkster/' + this.props.userId} onError={(e)=>{e.target.src='https://s3.amazonaws.com/oinkster/generic-avatar.png'}}/>
          </Link>
        </div>

        <div className='right-container'>
          <Link to={'/user/'+this.props.userId} className='oink-username-link'>
            <h4>{this.props.user}</h4>
          </Link>
          <span className='date-time'>{this.props.created}</span>
          <div className="oink-field">
            <span>{this.props.text}</span>
          </div>
        </div>

      </div>
    )
  }


}

export default Oink
