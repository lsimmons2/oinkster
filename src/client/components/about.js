
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions/feedback-actions'

export class About extends React.Component {

  sendFeedback(e){
    e.preventDefault();
    if (this.refs.feedback.value.length){
      let feedbackData = {
        contact: this.refs.contact.value,
        feedback: this.refs.feedback.value
      };
      this.props.actions.sendFeedback(feedbackData);
    }
  }

  updateContact(e){
    this.props.actions.updateContact(this.refs.contact.value);
  }

  updateFeedback(e){
    this.props.actions.updateFeedback(this.refs.feedback.value);
  }

  render(){

    let feedbackStatus = null;
    if (this.props.feedback.isFetching){
      feedbackStatus = <div className="feedback-waiting"/>
    } else if (this.props.feedback.fetchingSuccess){
      feedbackStatus = (
        <p className='feedback-status'>
          Feedback sent successfully. Thanks!
        </p>
      )
    } else if (this.props.feedback.fetchingError){
      feedbackStatus = (
        <p className='feedback-status'>
          Woops! There was an error submitting your feedback. Would appreciate it if you could email me at leooscar.simmons@gmail.com. Thanks!
        </p>
      )
    }


    return (
      <div id='about' className='view'>

        <div id='about-description'>
          <h2>
            About Oinkster
          </h2>
          <p className='about-description-text'>
            This is a portfolio project I've made to showcase my web development skills. The app isn't meant to be original, but to demonstrate good web development code and architecture.
          </p>
          <p className='about-description-text'>
            The app currently consists of a front end made with React.js/Redux, authentication with JSON web tokens, a RESTful API built with Express, and a PostgreSQL database. I will try to push improvements and new features to production daily (with pm2).
          </p>
          <p className='about-description-text'>
            Source code <a href='https://github.com/lsimmons2/oinkster'>here</a>, my personal website <a href='http://leosimmons.me'>here</a>.
          </p>
        </div>

        <div id='feedback'>
          <h4>Have feedback? Found a bug? Please let me know!</h4>
          <form>

            <div className='form-group'>
              <input
                className='form-control'
                type='text'
                placeholder='Name, contact info (optional)'
                ref='contact'
                value={this.props.feedback.contact}
                onChange={this.updateContact.bind(this)}
              />
            </div>
            <div className='form-group'>
              <textarea
                className='form-control'
                placeholder='Feedback'
                ref='feedback'
                value={this.props.feedback.feedback}
                onChange={this.updateFeedback.bind(this)}
              ></textarea>
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                type='submit'
                value='Send'
                onClick={this.sendFeedback.bind(this)}
              />
            </div>

          </form>

          {feedbackStatus}

        </div>


      </div>
    )
  }

}


function mapStateToProps(state){
  return state;
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
