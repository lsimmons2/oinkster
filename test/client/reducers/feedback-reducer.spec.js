
import reducer from '../../../src/client/reducers/feedback-reducer'
import chai from 'chai'
import state from '../../../src/client/initial-state'

const should = chai.should();


describe('feedbackReducer()', function(){
  
  let feedback;
  beforeEach(function(){
    feedback = state.feedback;
  })

  describe('UPDATE_CONTACT', function(){
    it('should set contact to action.input', function(){
      let newInput = 'some new input';
      let action = {
        type: 'UPDATE_CONTACT',
        input: newInput
      };
      let returnedState = reducer(feedback, action);
      returnedState.contact.should.equal(newInput);
    })
  })

  describe('UPDATE_FEEDBACK', function(){
    it('should set feedback to action.input', function(){
      let newInput = 'some new input';
      let action = {
        type: 'UPDATE_FEEDBACK',
        input: newInput
      };
      let returnedState = reducer(feedback, action);
      returnedState.feedback.should.equal(newInput);
    })
  })

  describe('FEEDBACK_REQUEST', function(){
    it('should work', function(){
      let action = {
        type: 'FEEDBACK_REQUEST'
      };
      // wouldn't actually happen
      feedback.success = true;
      feedback.error = true;
      let returnedState = reducer(feedback, action);
      returnedState.isFetching.should.equal(true);
      returnedState.success.should.equal(false);
      returnedState.error.should.equal(false);
    })
  })

  describe('FEEDBACK_SUCCESS', function(){
    it('should work', function(){
      let action = {
        type: 'FEEDBACK_SUCCESS'
      };
      // wouldn't actually happen
      feedback.isFetching = true;
      feedback.error = true;
      feedback.contact = 'blah';
      feedback.feedback = 'blahblah';
      let returnedState = reducer(feedback, action);
      returnedState.isFetching.should.equal(false);
      returnedState.success.should.equal(true);
      returnedState.error.should.equal(false);
      returnedState.contact.should.equal('');
      returnedState.feedback.should.equal('');
    })
  })

  describe('FEEDBACK_ERROR', function(){
    it('should work', function(){
      let action = {
        type: 'FEEDBACK_ERROR'
      };
      // wouldn't actually happen
      feedback.isFetching = true;
      feedback.success = true;
      let returnedState = reducer(feedback, action);
      returnedState.isFetching.should.equal(false);
      returnedState.success.should.equal(false);
      returnedState.error.should.equal(true);
    })
  })

})
