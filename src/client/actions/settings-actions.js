
require('es6-promise').polyfill();
import 'whatwg-fetch'

function fetchSettingsRequest() {
  return {
    type: 'FETCH_SETTINGS_REQUEST'
  }
}

function fetchSettingsSuccess(settings) {
  return {
    type: 'FETCH_SETTINGS_SUCCESS',
    settings
  }
}

function fetchSettingsError(error) {
  return {
    type: 'FETCH_SETTINGS_ERROR',
    error
  }
}

function fetchSettings(id){

  return function(dispatch){

    dispatch(fetchSettingsRequest());

    let url = `/users/${id}/settings`;
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
      .then( setttings => {
        dispatch(fetchSettingsSuccess(setttings));
      })
      .catch( error => {
        dispatch(fetchSettingsError(error));
      })

  }

}

function updateFirstName(firstName){
  return {
    type: 'UPDATE_FIRST_NAME',
    firstName
  }
}

function updateLastName(lastName){
  return {
    type: 'UPDATE_LAST_NAME',
    lastName
  }
}

function updateUsername(username){
  return {
    type: 'UPDATE_USERNAME',
    username
  }
}

function updateEmail(email){
  return {
    type: 'UPDATE_EMAIL',
    email
  }
}

function saveSettingsRequest() {
  return {
    type: 'SAVE_SETTINGS_REQUEST'
  }
}

function saveSettingsSuccess() {
  return {
    type: 'SAVE_SETTINGS_SUCCESS'
  }
}

function saveSettingsError(error) {
  return {
    type: 'SAVE_SETTINGS_ERROR',
    error
  }
}

function saveSettings(id, settings){

  return function(dispatch){

    dispatch(saveSettingsRequest());

    let url = `/users/${id}/settings`;
    if(process.env.NODE_ENV === 'test'){
      url = 'http://localhost:8080' + url;
    }
    let req = {
      method: 'POST',
      body: JSON.stringify(settings),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return fetch(url, req)
      .then( resp => {
          if(!resp.ok){
            throw new Error(resp.statusText)
          }
          return resp.json();
      })
      .then( setttings => {
        dispatch(fetchSettingsSuccess(setttings));
      })
      .catch( error => {
        dispatch(fetchSettingsError(error));
      })

  }

}
export {
  fetchSettings,
  updateFirstName,
  updateLastName,
  updateUsername,
  updateEmail,
  saveSettings
}
