
require('es6-promise').polyfill();
import 'whatwg-fetch'

function showSignUp() {
  return {
    type: 'SHOW_SIGN_UP'
  }
}

function showLogIn() {
  return {
    type: 'SHOW_LOG_IN'
  }
}

export { showSignUp, showLogIn }
