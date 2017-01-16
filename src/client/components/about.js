
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
    } else if (this.props.feedback.success){
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
            This is a portfolio project I'm making to demonstrate good web development practices. The app is meant to mock Twitter's basic functionality. Currently the app's features include creating and editing user accounts, uploading user pictures, and "oinking" (like tweeting). I will be adding new features and improvements as they come.
          </p>
          <p className='about-description-text'>
            The app's stack includes a <a target='_blank' href='https://facebook.github.io/react/'>React.js</a>/<a target='_blank' href='http://redux.js.org/'>Redux</a> front end, authentication with <a target='_blank' href='https://jwt.io/'>JSON web tokens</a>, and a <a target='_blank' href='https://nodejs.org/en/'>Node.js</a> back end with an <a target='_blank' href='http://expressjs.com'>Express</a> RESTful API and a <a target='_blank' href='https://www.postgresql.org/'>PostgreSQL</a> database.
            The app is hosted on Ubuntu <a target='_blank' href='https://aws.amazon.com'>AWS</a> EC2s and I am using <a target='_blank' href='http://pm2.keymetrics.io/'>pm2</a> for deployment.
          </p>
          <p className='about-description-text'>
            Source code is <a target='_blank' href='https://github.com/lsimmons2/oinkster'>here</a> and my personal website is <a target='_blank' href='http://leosimmons.me'>here</a>.
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
