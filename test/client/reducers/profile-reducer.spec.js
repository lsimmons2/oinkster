
import reducer from '../../../src/client/reducers/profile-reducer'
import chai from 'chai'
import state from '../../../src/client/initial-state'

const should = chai.should();


describe('profileReducer()', function(){
  
  let profile;
  beforeEach(function(){
    profile = state.board;
  })

  describe('FETCH_USER_SUMMARY_REQUEST', function(){
    it('should work', function(){
      let action = {
        type: 'FETCH_USER_SUMMARY_REQUEST'
      };
      profile.fetchingSuccess = true;
      profile.fetchingError = true;
      let returnedState = reducer(profile, action);
      returnedState.isFetching.should.equal(true);
      returnedState.fetchingSuccess.should.equal(false);
      returnedState.fetchingSuccess.should.equal(false);
    })
  })

  describe('FETCH_USER_SUMMARY_SUCCESS', function(){
    it('should work', function(){
      let profile = {
        myProfile: 'is my profile'
      };
      let action = {
        type: 'FETCH_USER_SUMMARY_SUCCESS',
        userSummary: profile
      };
      profile.isFetching = true;
      let returnedState = reducer(profile, action);
      returnedState.isFetching.should.equal(false);
      returnedState.fetchingSuccess.should.equal(true);
      returnedState.summary.should.equal(profile);
    })
  })

  describe('FETCH_USER_SUMMARY_SUCCESS', function(){
    it('should work', function(){
      let err = new Error('Some error');
      let action = {
        type: 'FETCH_USER_SUMMARY_ERROR',
        error: err
      };
      profile.isFetching = true;
      let returnedState = reducer(profile, action);
      returnedState.isFetching.should.equal(false);
      returnedState.fetchingError.should.equal(true);
    })
  })

})
