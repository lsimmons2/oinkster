
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

function followUserRequest() {
  return {
    type: 'FOLLOW_USER_REQUEST'
  }
}

function followerUserSuccess() {
  return {
    type: 'FOLLOW_USER_SUCCESS'
  }
}

function followUserError() {
  return {
    type: 'FOLLOW_USER_ERROR'
  }
}

function followUser(followeeId){
  return function(dispatch){

    dispatch(followUserRequest());

    let url = '/relationships';
    if(process.env.NODE_ENV === 'test'){
      url = 'http://localhost:8080' + url;
    }

    let req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        followeeId: followeeId
      })
    }

    return fetch(url, req)
      .then( resp => {
          if(!resp.ok){
            throw new Error(resp.statusText)
          }
          return resp.json();
      })
      .then( () => {
        dispatch(followerUserSuccess());
      })
      .catch( error => {
        dispatch(followUserError());
      })

  }
}



export {
  fetchUserSummaryRequest,
  fetchUserSummarySuccess,
  fetchUserSummaryError,
  fetchUserSummary,
  followUser
}
