
require('es6-promise').polyfill();
import 'whatwg-fetch'

function showSignUp(){
  return {
    type: 'SHOW_SIGN_UP'
  }
}

function showLogIn(){
  return {
    type: 'SHOW_LOG_IN'
  }
}

function redirectToLogin(){
  return {
    type: 'REDIRECT_TO_LOGIN'
  }
}

function parseStream(resp){
  return new Promise((resolve) => resp.json()
    .then(json => resolve({
      status: resp.status,
      data: json
    })))
}

function signUp(userInfo){
  return function(dispatch){

    let url = `/auth/signup`;
    if(process.env.NODE_ENV === 'test'){
      url = 'http://localhost:8080' + url;
    }
    let req = {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch(url, req)
      .then(parseStream)
      .then( resp => {
        if (resp.status === 409 && resp.data.message === 'User already exists'){
          return dispatch(redirectToLogin());
        }
      })
      .catch( err => {
        console.log('err..');
        console.log(err);
      })

  }
}

export { showSignUp, showLogIn, signUp }
