
require('es6-promise').polyfill();
import 'whatwg-fetch'

// if (process.env.NODE_ENV !== 'test'){
  import history from '../history'
// }

function invalidSignUpForm(){
  return {
    type: 'INVALID_SIGN_UP_FORM'
  }
}

function signUpError(){
  return {
    type: 'SIGN_UP_ERROR'
  }
}

function redirectToLogin(user){
  return {
    type: 'REDIRECT_TO_LOGIN',
    user
  }
}

function comboNotFound(){
  return {
    type: 'COMBO_NOT_FOUND'
  }
}

function invalidLogInForm(){
  return {
    type: 'INVALID_LOG_IN_FORM'
  }
}

function logInError(){
  return {
    type: 'LOG_IN_ERROR'
  }
}

function logInError(){
  return {
    type: 'LOG_IN_ERROR'
  }
}

function loggedIn(userId, jwt){
  localStorage.setItem('jwt', jwt);
  localStorage.setItem('userId', userId);
  history.push('/board');
  return {
    type: 'LOGGED_IN',
    userId
  }
}

function logOut(){
  localStorage.removeItem('jwt');
  localStorage.removeItem('userId');
  history.push('/home');
  return {
    type: 'LOG_OUT'
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

    let url = `/users`;
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
          return dispatch(redirectToLogin(resp.data.user));
        }
        if (resp.status === 200){
          return dispatch(loggedIn(resp.data.userId, resp.data.token));
        } else {
          throw new Error();
        }
      })
      .catch( err => {
        dispatch(signUpError());
      })

  }
}

function logIn(userInfo){
  return function(dispatch){

    let url = `/auth/login`;
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
        if (resp.status === 404 || resp.status === 403){
          dispatch(comboNotFound());
        }
        else if (resp.status === 200){
          dispatch(loggedIn(resp.data.userId, resp.data.token));
        } else {
          dispatch(logInError());
        }
      })

  }
}

function verified(userId){
  localStorage.setItem('userId', userId);
  return {
    type: 'VERIFIED',
    userId
  }
}

function notVerified(){
  localStorage.removeItem('jwt');
  localStorage.removeItem('userId');
  return {
    type: 'NOT_VERIFIED'
  }
}

function verify(jwt){
  return function(dispatch){

    let url = `/auth/verify`;
    if(process.env.NODE_ENV === 'test'){
      url = 'http://localhost:8080' + url;
    }

    let token = 'Bearer ' + jwt;

    let req = {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    };

    fetch(url, req)
      .then(parseStream)
      .then( resp => {
        if (resp.status !== 200){
          return dispatch(notVerified());
        }
        dispatch(verified(resp.data.userId));
      })
      .catch( err => {
        return dispatch(notVerified());
      })

  }
}


export {
  invalidSignUpForm,
  redirectToLogin,
  invalidLogInForm,
  loggedIn,
  logOut,
  parseStream,
  signUp,
  logIn,
  verify,
  verified,
  notVerified
}
