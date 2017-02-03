
require('es6-promise').polyfill();
import 'whatwg-fetch'

function fetchUsersRequest() {
  return {
    type: 'FETCH_USERS_REQUEST'
  }
}

function fetchUsersSuccess(users) {
  return {
    type: 'FETCH_USERS_SUCCESS',
    users
  }
}

function fetchUsersError() {
  return {
    type: 'FETCH_USERS_ERROR'
  }
}

function fetchUsers(){
  return function(dispatch){

    dispatch(fetchUsersRequest());

    let url = '/users/';
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
      .then( data => {
        dispatch(fetchUsersSuccess(data.users));
      })
      .catch( error => {
        dispatch(fetchUsersError());
      })

  }
}

export {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersError,
  fetchUsers
}
