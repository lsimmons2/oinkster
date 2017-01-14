
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
      .then( settings => {
        dispatch(fetchSettingsSuccess(settings));
      })
      .catch( error => {
        dispatch(fetchSettingsError(error));
      })

  }

}

function updateSettings(settings){
  return {
    type: 'UPDATE_SETTINGS',
    settings
  }
}

function saveSettingsRequest() {
  return {
    type: 'SAVE_SETTINGS_REQUEST'
  }
}

function saveSettingsSuccess(settings) {
  return {
    type: 'SAVE_SETTINGS_SUCCESS',
    settings
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
      .then( settings => {
        dispatch(saveSettingsSuccess(settings));
      })
      .catch( error => {
        dispatch(saveSettingsError(error));
      })

  }

}
export {
  fetchSettings,
  saveSettings,
  updateSettings
}
