
import reducer from '../../../src/client/reducers/board-reducer'
import chai from 'chai'
import state from '../../../src/client/initial-state'

const should = chai.should();


describe('boardReducer()', function(){

  let board;
  beforeEach(function(){
    board = state.board;
  })

  describe('SUBMIT_OINK_REQUEST', function(){
    it('works', function(){
      let action = {
        type: 'SUBMIT_OINK_REQUEST'
      };
      let returnedState = reducer(board, action);
      returnedState.isFetching.should.equal(true);
    })
  })

  describe('SUBMIT_OINK_SUCCESS', function(){
    it('works', function(){
      let fetchedOinks = [{text:'Oink brah!'}, {text:'oinkkkkkk'}];
      let action = {
        type: 'FETCH_OINKS_SUCCESS',
        oinks: fetchedOinks
      };
      board.isFetching = true;
      let returnedState = reducer(board, action);
      returnedState.isFetching.should.equal(false);
      returnedState.oinks.should.equal(fetchedOinks);
    })
  })

  describe('SUBMIT_OINK_ERROR', function(){
    it('works', function(){
      let err = new Error('Some error');
      let action = {
        type: 'SUBMIT_OINK_ERROR',
        error: err
      };
      board.isFetching = true;
      let returnedState = reducer(board, action);
      returnedState.isFetching.should.equal(false);
      returnedState.fetchingError.should.equal(true);
    })
  })

})
