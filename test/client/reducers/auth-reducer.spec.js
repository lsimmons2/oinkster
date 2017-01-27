
import reducer from '../../../src/client/reducers/auth-reducer'
import chai from 'chai'
import state from '../../../src/client/initial-state'

const should = chai.should();


describe('authReducer()', function(){

  let auth;
  beforeEach(function(){
    auth = state.auth;
  })

  describe('LOGGED_IN', function(){
    it('should work', function(){
      let someUserId = 'someUserId'
      let action = {
        type: 'LOGGED_IN',
        userId: someUserId
      };
      let returnedState = reducer(auth, action);
      console.log(returnedState);
      returnedState.authenticated.should.equal(true);
      returnedState.userId.should.equal(someUserId);
    })
  })

  describe('LOG_OUT', function(){
    it('should work', function(){
      let someUser = {
        name: 'javier'
      };
      let action = {
        type: 'LOG_OUT'
      };
      auth.authenticated = true;
      auth.user = someUser;
      let returnedState = reducer(auth, action);
      returnedState.authenticated.should.equal(false);
      returnedState.userId.should.equal('');
    })
  })

})
