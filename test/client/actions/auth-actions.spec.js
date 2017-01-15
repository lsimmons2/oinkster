
import * as actions from '../../../src/client/actions/auth-actions'
import chai from 'chai'

const should = chai.should();


describe('redirectToLogin()', function(){
  it('should return actions of type REDIRECT_TO_LOGIN', function(){
    let action = actions.redirectToLogin('mary');
    action.type.should.equal('REDIRECT_TO_LOGIN');
  })
  it('should return actions with user passed to it', function(){
    let action = actions.redirectToLogin('mary');
    action.user.should.equal('mary');
  })
})

describe('loggedIn()', function(){
  it('should return actions of type LOGGED_IN', function(){
    let action = actions.loggedIn('mary');
    action.type.should.equal('LOGGED_IN');
  })
  it('should return actions with user passed to it', function(){
    let action = actions.loggedIn('mary');
    action.user.should.equal('mary');
  })
})
