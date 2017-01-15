
import * as actions from '../../../src/client/actions/feedback-actions'
import chai from 'chai'

const should = chai.should();


describe('updateContact()', function(){
  it('should return actions of type UPDATE_CONTACT', function(){
    let action = actions.updateContact();
    action.type.should.equal('UPDATE_CONTACT');
  })
})

describe('updateFeedback()', function(){
  it('should return actions of type UPDATE_FEEDBACK', function(){
    let action = actions.updateFeedback('newFeedback');
    action.type.should.equal('UPDATE_FEEDBACK');
  })
  it('should return actions with feedback passed to it', function(){
    let action = actions.updateFeedback('newFeedback');
    action.input.should.equal('newFeedback');
  })
})

describe('feedbackRequest()', function(){
  it('should return actions of type FEEDBACK_REQUEST', function(){
    let action = actions.feedbackRequest();
    action.type.should.equal('FEEDBACK_REQUEST');
  })
})

describe('feedbackSuccess()', function(){
  it('should return actions of type FEEDBACK_SUCCESS', function(){
    let action = actions.feedbackSuccess();
    action.type.should.equal('FEEDBACK_SUCCESS');
  })
})

describe('feedbackError()', function(){
  it('should return actions of type FEEDBACK_ERROR', function(){
    let action = actions.feedbackError();
    action.type.should.equal('FEEDBACK_ERROR');
  })
})
