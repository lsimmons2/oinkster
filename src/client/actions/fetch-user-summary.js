
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

export default function fetchUserSummary(id){

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
