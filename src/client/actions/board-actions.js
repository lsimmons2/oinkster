
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

function fetchOinks(jwt){
  return function(dispatch){

    dispatch(fetchOinksRequest());

    let url = `/oinks`;
    if(process.env.NODE_ENV === 'test'){
      url = 'http://localhost:8080' + url;
    }

    let req = {
      method: 'GET',
      headers: {}
    };
    if (jwt){
      req.headers['Authorization'] = jwt;
    }

    return fetch(url, req)
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

function submitOinkRequest(oink) {
  return {
    type: 'SUBMIT_OINK_REQUEST',
    oink
  }
}

function submitOinkSuccess(oink) {
  return {
    type: 'SUBMIT_OINK_SUCCESS',
    oink
  }
}

function submitOinkError(error) {
  return {
    type: 'SUBMIT_OINK_ERROR',
    error
  }
}

function submitOink(oink){

  return function(dispatch){

    dispatch(submitOinkRequest(oink));

    let url = `/oinks`;
    if(process.env.NODE_ENV === 'test'){
      url = 'http://localhost:8080' + url;
    }

    let token = 'Bearer ' + localStorage.getItem('jwt');

    let req = {
      method: 'POST',
      body: JSON.stringify(oink),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    };

    return fetch(url, req)
      .then( resp => {
          if(!resp.ok){
            throw new Error(resp.statusText);
          }
          return resp.json();
      })
      .then( stampedOink => {
        dispatch(submitOinkSuccess(stampedOink));
      })
      .catch( error => {
        dispatch(submitOinkError(error));
      })

  }

}

function fetchBoardRequest() {
  return {
    type: 'FETCH_BOARD_REQUEST'
  }
}

function fetchBoardSuccess(profile) {
  return {
    type: 'FETCH_BOARD_SUCCESS',
    profile
  }
}

function fetchBoardError(error) {
  return {
    type: 'FETCH_BOARD_ERROR',
    error
  }
}

function fetchBoardProfile(userId){
  return function(dispatch){

    dispatch(fetchBoardRequest());

    let url = `/users/${userId}/board`;
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
      .then( profile => {
        dispatch(fetchBoardSuccess(profile.user));
      })
      .catch( error => {
        dispatch(fetchBoardError(error));
      })

  }
}

export {
  fetchOinksRequest,
  fetchOinksSuccess,
  fetchOinksError,
  fetchOinks,
  fetchBoardProfile,
  submitOinkRequest,
  submitOinkSuccess,
  submitOinkError,
  submitOink
}
