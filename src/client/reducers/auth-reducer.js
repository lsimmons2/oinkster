
import initialState from '../initial-state'


let authReducer = function(auth = initialState.auth, action){

  switch(action.type){

    case 'SHOW_SIGN_UP':
      return { ...auth,
        showSignUp: true
      }

    case 'SHOW_LOG_IN':
      return { ...auth,
        showSignUp: false
      }

    default:
      return auth;
  }

}

export default authReducer
