
require('es6-promise').polyfill();
import 'whatwg-fetch'

function fetchUserSummaryRequest() {
  return {
    type: 'FETCH_USER_SUMMARY_REQUEST'
  }
}

function fetchUserSummarySuccess(userSummary) {
  return {
    type: 'FETCH_USER_SUMMARY_SUCCESS',
    userSummary
  }
}

function fetchUserSummaryError(error) {
  return {
    type: 'FETCH_USER_SUMMARY_ERROR',
    error
  }
}

function fetchUserSummary(id){

  return function(dispatch){

    dispatch(fetchUserSummaryRequest());

    let url = `/users/${id}/summary`;
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
      .then( userSummary => {
        dispatch(fetchUserSummarySuccess(userSummary));
      })
      .catch( error => {
        dispatch(fetchUserSummaryError(error));
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
      .then( oink => {
        dispatch(submitOinkSuccess(oink));
      })
      .catch( error => {
        dispatch(submitOinkError(error));
      })

  }

}

export { fetchUserSummary, submitOink }
