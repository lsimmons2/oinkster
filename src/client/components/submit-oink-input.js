
import React from 'react'

class SubmitOinkInput extends React.Component {

  submitOink(e){
    e.preventDefault();
    let oink = {
      text: this.refs.text.value
    };
    this.props.submitOink(oink);
    this.refs.text.value = '';
  }

  render(){

    return (
      <div id='submit-oink'>

        <div className="form-group" id='submit-oink-input'>
          <textarea className="form-control" ref='text' placeholder="What's poppin?"></textarea>
          <div className='submit-oink-button-wrapper'>
            <input id='submit-oink-button' type='submit' onClick={this.submitOink.bind(this)} className='form-control' value='Oink!'/>
          </div>
        </div>
      </div>
    )

  }

}

export default SubmitOinkInput
