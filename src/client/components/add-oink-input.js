
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
          <input type="text" ref="oinkInputValue"/>
          <input type="submit" value="Add Oink"/>
        </form>
      </div>
    )
  }

}

export default AddOinkInput
