
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

function uploadPictureRequest(){
  return {
    type: 'UPLOAD_PICTURE_REQUEST'
  }
}

function uploadPictureSuccess(picture){
  return {
    type: 'UPLOAD_PICTURE_SUCCESS',
    picture
  }
}

function uploadPictureError(){
  return {
    type: 'UPLOAD_PICTURE_ERROR'
  }
}

function uploadPicture(file, id){
  return function(dispatch){

    dispatch(uploadPictureRequest());

    let url = `/aws/upload/${id}`;
    if(process.env.NODE_ENV === 'test'){
      url = 'http://localhost:8080' + url;
    }

    let fileData = new FormData();
    fileData.append('file', file)
    fileData.append('user', 'me')

    let req = {
      method: 'POST',
      body: fileData
    };

    return fetch(url, req)
      .then( resp => {
          if(!resp.ok){
            throw new Error(resp.statusText)
          }
          return resp.json();
      })
      .then( data => {
        dispatch(uploadPictureSuccess(data.key));
      })
      .catch( error => {
        dispatch(uploadPictureError());
      })

  }
}

function resetPicture(){
  return {
    type: 'RESET_PICTURE'
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
      .then( () => {
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
  updateSettings,
  uploadPicture,
  resetPicture
}
