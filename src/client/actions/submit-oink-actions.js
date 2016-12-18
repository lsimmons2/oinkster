
require('es6-promise').polyfill();
import 'whatwg-fetch'

function submitOinkRequest(oink) {
  return {
    type: 'SUBMIT_OINK_REQUEST',
    oink
  }
}

function submitOinkSuccess(oink) {
  return {
    type: 'SUBMIT_OINK_SUCCESS',
    oink
  }
}

function submitOinkError(error) {
  return {
    type: 'SUBMIT_OINK_ERROR',
    error
  }
}

export default function submitOink(oink){

  return function(dispatch){

    dispatch(submitOinkRequest(oink));

    let url = `/oinks`;
    if(process.env.NODE_ENV === 'test'){
      url = 'http://localhost:8080' + url;
    }

    let req = {
      method: 'POST',
      body: JSON.stringify(oink),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return fetch(url, req)
      .then( resp => {
          if(!resp.ok){
            throw new Error(resp.statusText);
          }
          return resp.json();
      })
      .then( oink => {
        dispatch(submitOinkSuccess(oink));
      })
      .catch( error => {
        dispatch(submitOinkError(error));
      })

  }

}
