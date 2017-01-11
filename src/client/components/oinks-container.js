
import React from 'react'
import AddOinkInput from './add-oink-input'

class Oinks extends React.Component {

  render(){

    let oinksHeader;
    if (!this.props.auth.authenticated){
      oinksHeader = null;
    } else {
      oinksHeader = (
        < AddOinkInput
          submitOink={this.props.submitOink}
        />
      )
    }


    let oinks;
    let avatar;
    if (this.props.oinks.length){
      oinks = this.props.oinks.map( oink => {
        if (oink.avatar){
          avatar = oink.avatar;
        } else {
          avatar = '/generic-avatar'
        }
        return (
          <div key={oink.id} className='oink'>

            <div className='avatar-container'>
              <img className='avatar' src={avatar}/>
            </div>

            <div className='right-container'>
              <h4>{oink.user}</h4>
              <div className="oink-field">
                <span>{oink.text}</span>
              </div>
            </div>

          </div>
        )
      })
    } else {
      oinks = <li key="0"><h2>No oinks could be loaded!</h2></li>
    }

    return (
      <div id="oinks-container">
        {oinksHeader}
        {oinks}
      </div>
    )
  }

}

export default Oinks
