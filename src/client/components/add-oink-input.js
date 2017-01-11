
import React from 'react'

class AddOinkInput extends React.Component {

  submitOink(event){
    event.preventDefault();
    let oink = {
      text: this.refs.oinkInputValue.value,
      user: 'bob sah'
    }
    this.props.submitOink(oink);
  }

  render(){

    return (
      <div id="add-oink-input-container">
        <form onSubmit={this.submitOink.bind(this)}>
          <div className='form-group'>
            <input className='form-control' type="text" ref="oinkInputValue"/>
            <input className='form-control' type="submit" value="Add Oink"/>
          </div>
        </form>
      </div>
    )
  }

}

export default AddOinkInput
