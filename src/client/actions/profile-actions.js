
require('es6-promise').polyfill();
import 'whatwg-fetch'

function toggleFollowersModal(){
  return {
    type: 'TOGGLE_FOLLOWERS_MODAL'
  }
}

function toggleFolloweesModal(){
  return {
    type: 'TOGGLE_FOLLOWEES_MODAL'
  }
}

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

function followerUserSuccess(user) {
  return {
    type: 'FOLLOW_USER_SUCCESS',
    user
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
      .then( data => {
        dispatch(followerUserSuccess({
          id: data.follower.id,
          username: data.follower.username
        }));
      })
      .catch( error => {
        dispatch(followUserError());
      })

  }
}



export {
  toggleFollowersModal,
  toggleFolloweesModal,
  fetchUserSummaryRequest,
  fetchUserSummarySuccess,
  fetchUserSummaryError,
  fetchUserSummary,
  followUser
}
