
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

  fetchOinks(event){
    event.preventDefault();
    this.props.fetchOinks();
  }

  render(){

    return (
      <div id="add-oink-input-container">
        <form onSubmit={this.submitOink.bind(this)}>
          <input type="text" ref="oinkInputValue"/>
          <input type="submit" value="Add Oink"/>
        </form>
        <form>
          {/* temporary solution before I set up fetching actions based on url */}
          <input type="submit" value="Fetch all oinks"
            onClick={this.fetchOinks.bind(this)}
          />
        </form>
      </div>
    )
  }

}

export default AddOinkInput
