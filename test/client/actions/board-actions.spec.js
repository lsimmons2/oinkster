
import * as actions from '../../../src/client/actions/board-actions'
import chai from 'chai'

const should = chai.should();


describe('fetchOinksRequest()', function(){
  it('should return actions of type FETCH_OINKS_REQUEST', function(){
    let action = actions.fetchOinksRequest();
    action.type.should.equal('FETCH_OINKS_REQUEST');
  })
})

describe('fetchOinksSuccess()', function(){
  it('should return actions of type FETCH_OINKS_SUCCESS', function(){
    let oinks = [ { oink1: 'oink1' }, { oink2: 'oink2' } ];
    let action = actions.fetchOinksSuccess(oinks);
    action.type.should.equal('FETCH_OINKS_SUCCESS');
  })
  it('should return actions with oinks passed to it', function(){
    let oinks = [ { oink1: 'oink1' }, { oink2: 'oink2' } ];
    let action = actions.fetchOinksSuccess(oinks);
    action.oinks.should.equal(oinks);
  })
})

describe('fetchOinksError()', function(){
  it('should return actions of type FETCH_OINKS_ERROR', function(){
    let action = actions.fetchOinksError('mary');
    action.type.should.equal('FETCH_OINKS_ERROR');
  })
  it('should return actions with error passed to it', function(){
    let err = new Error('Some error')
    let action = actions.fetchOinksError(err);
    action.error.should.equal(err);
  })
})

describe('submitOinkRequest()', function(){
  it('should return actions of type SUBMIT_OINK_REQUEST', function(){
    let oink = {oink:'oink'};
    let action = actions.submitOinkRequest(oink);
    action.type.should.equal('SUBMIT_OINK_REQUEST');
  })
  it('should return actions with profile passed to it', function(){
    let oink = {oink:'oink'};
    let action = actions.submitOinkRequest(oink);
    action.oink.should.equal(oink);
  })
})

describe('submitOinkSuccess()', function(){
  it('should return actions of type SUBMIT_OINK_SUCCESS', function(){
    let oink = {oink:'oink'};
    let action = actions.submitOinkSuccess(oink);
    action.type.should.equal('SUBMIT_OINK_SUCCESS');
  })
  it('should return actions with profile passed to it', function(){
    let oink = {oink:'oink'};
    let action = actions.submitOinkSuccess(oink);
    action.oink.should.equal(oink);
  })
})

describe('submitOinkError()', function(){
  it('should return actions of type SUBMIT_OINK_ERROR', function(){
    let err = new Error('Some error')
    let action = actions.submitOinkError(err);
    action.type.should.equal('SUBMIT_OINK_ERROR');
  })
  it('should return actions with profile passed to it', function(){
    let err = new Error('Some error')
    let action = actions.submitOinkError(err);
    action.error.should.equal(err);
  })
})
