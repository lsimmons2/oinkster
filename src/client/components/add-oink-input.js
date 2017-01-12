
import React from 'react'

class AddOinkInput extends React.Component {

  submitOink(e){
    e.preventDefault();
    let user = JSON.parse(localStorage.user);
    let oink = {
      text: this.refs.oinkInputValue.value
    };
    this.props.submitOink(oink)
  }

  render(){

    return (
      <form onSubmit={this.submitOink.bind(this)}>
        <div className='form-group'>
          <input className='form-control' ref='oinkInputValue' type='text' placeholder="What's on your mind?"/>
          <input type='submit' className='form-control' value='Oink!'/>
        </div>
      </form>
    )
  }

}

export default AddOinkInput
