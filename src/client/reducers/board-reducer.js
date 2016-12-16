
const defBoard = {
  oinks: [
    {
      user: 'bob',
      text: 'sahh?'
    },
    {
      user: 'maria',
      text: 'supp?'
    },
    {
      user: 'francis',
      text: 'waddupp?'
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
      let newOinks = board.oinks.push(action.oink)
      return Object.assign({}, board, {
        isFetching: false,
        oinks: newOinks
      })

    case 'SUBMIT_OINK_ERROR':
      return Object.assign({}, board, {
        isFetching: false,
        error: action.error
      })

    default:
      return board;
  }

}

export default boardReduer
