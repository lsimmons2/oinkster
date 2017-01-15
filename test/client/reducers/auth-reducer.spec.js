
import reducer from '../../../src/client/reducers/auth-reducer'
import chai from 'chai'
import state from '../../../src/client/initial-state'

const should = chai.should();


describe('authReducer()', function(){
  
  let auth;
  beforeEach(function(){
    auth = state.board;
  })

  describe('LOGGED_IN', function(){
    it('should work', function(){
      let someUser = {
        name: 'javier'
      };
      let action = {
        type: 'LOGGED_IN',
        user: someUser
      };
      let returnedState = reducer(auth, action);
      returnedState.authenticated.should.equal(true);
      returnedState.user.should.equal(someUser);
    })
  })

  describe('LOGGED_OUT', function(){
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
      should.not.exist(returnedState.user);
    })
  })

})
