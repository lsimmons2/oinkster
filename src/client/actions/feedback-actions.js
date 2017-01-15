
require('es6-promise').polyfill();
import 'whatwg-fetch'

function updateContact(input){
  return {
    type: 'UPDATE_CONTACT',
    input
  }
}

function updateFeedback(input){
  return {
    type: 'UPDATE_FEEDBACK',
    input
  }
}

function feedbackRequest(){
  return {
    type: 'FEEDBACK_REQUEST'
  }
}

function feedbackSuccess(){
  return {
    type: 'FEEDBACK_SUCCESS'
  }
}

function feedbackError(){
  return {
    type: 'FEEDBACK_ERROR'
  }
}

function sendFeedback(feedbackData){
  return function(dispatch){

    dispatch(feedbackRequest());

    let url = `/feedback`;
    if(process.env.NODE_ENV === 'test'){
      url = 'http://localhost:8080' + url;
    }
    let req = {
      method: 'POST',
      body: JSON.stringify(feedbackData),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch(url, req)
      .then( resp => {
        if(!resp.ok){
          throw new Error('Feedback error');
        }
        return resp.json();
      })
      .then( data => {
        return dispatch(feedbackSuccess());
      })
      .catch( err => {
        return dispatch(feedbackError());
      })

  }
}

export {
  updateContact,
  updateFeedback,
  feedbackRequest,
  feedbackSuccess,
  feedbackError,
  sendFeedback
}
