
import initialState from '../initial-state'


let boardReducer = function(board = initialState.board, action){

  switch(action.type){

    case 'SUBMIT_OINK_REQUEST':
      return Object.assign({}, board, {
        isFetching: true
      })

    case 'SUBMIT_OINK_SUCCESS':
      return Object.assign({}, board, {
        isFetching: false,
        oinks: [...board['oinks'], action.oink]
      });

    case 'SUBMIT_OINK_ERROR':
      return Object.assign({}, board, {
        isFetching: false,
        error: action.error
      })

    case 'FETCH_OINKS_REQUEST':
      return Object.assign({}, board, {
        isFetching: true
      })

    case 'FETCH_OINKS_SUCCESS':
      return Object.assign({}, board, {
        isFetching: false,
        oinks: action.oinks
      });

    case 'FETCH_OINKS_ERROR':
      return Object.assign({}, board, {
        isFetching: false,
        error: action.error
      })

    default:
      return board;
  }

}

export default boardReducer
