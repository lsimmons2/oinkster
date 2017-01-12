
require('es6-promise').polyfill();
import 'whatwg-fetch'
import history from '../history'

function redirectToLogin(user){
  return {
    type: 'REDIRECT_TO_LOGIN',
    user
  }
}

function loggedIn(){
  return {
    type: 'LOGGED_IN'
  }
}

function logOut(){
  localStorage.removeItem('jwt');
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
          return dispatch(redirectToLogin(resp.data.user));
        }
        if (resp.status === 400){
          console.log(resp.data);
        }
        if (resp.status === 200){
          localStorage.setItem('jwt', resp.data.token);
          return dispatch(loggedIn())
        }
      })
      .catch( err => {
        console.log('err..');
        console.log(err);
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
        if (resp.status === 200){
          localStorage.setItem('jwt', resp.data.token);
          dispatch(loggedIn());
          history.push('/board');
        }
      })


  }
}

export { signUp, logIn, loggedIn, logOut }
