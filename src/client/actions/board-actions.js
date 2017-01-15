
require('es6-promise').polyfill();
import 'whatwg-fetch'

function fetchOinksRequest() {
  return {
    type: 'FETCH_OINKS_REQUEST'
  }
}

function fetchOinksSuccess(oinks) {
  return {
    type: 'FETCH_OINKS_SUCCESS',
    oinks
  }
}

function fetchOinksError(error) {
  return {
    type: 'FETCH_OINKS_ERROR',
    error
  }
}

function fetchOinks(){

  return function(dispatch){

    dispatch(fetchOinksRequest());

    let url = `/oinks`;
    if(process.env.NODE_ENV === 'test'){
      url = 'http://localhost:8080' + url;
    }

    return fetch(url)
      .then( resp => {
          if(!resp.ok){
            throw new Error(resp.statusText)
          }
          return resp.json();
      })
      .then( oinks => {
        dispatch(fetchOinksSuccess(oinks));
      })
      .catch( error => {
        dispatch(fetchOinksError(error));
      })

  }

}

export {
  fetchOinksRequest,
  fetchOinksSuccess,
  fetchOinksError,
  fetchOinks
}
