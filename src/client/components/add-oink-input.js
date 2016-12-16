
import React from 'react'

class AddOinkInput extends React.Component {

  submitOink(){
    event.preventDefault();
    let oink = {
      text: this.refs.oinkInputValue.value
    }
    console.log('oink to submit: ', oink);
    this.props.actions.submitOink(oink);
  }

  render(){

    return (
      <div id="add-oink-input-container">
        <form onSubmit={this.submitOink.bind(this)}>
          <input type="text" ref="oinkInputValue"/>
        </form>
      </div>
    )
  }

}

export default AddOinkInput
