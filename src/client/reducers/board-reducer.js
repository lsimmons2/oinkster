
const defBoard = {
  oinks: [
    {
      user: 'bob',
      text: 'sahh?',
      id: 1
    },
    {
      user: 'maaaria',
      text: 'supp?',
      id: 2
    },
    {
      user: 'francis',
      text: 'waddupp?',
      id: 3
    }
  ],
  isFetching: false,
  error: false,
  count: 0
};


let boardReduer = function(board = defBoard, action){

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
        oinks: board['oinks'].concat(action.oinks)
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

export default boardReduer
