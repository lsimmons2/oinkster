
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

    case 'REDIRECT_TO_LOGIN':
      return { ...auth,
        signUpConflict: action.user
      }

    case 'LOGGED_IN':
      return { ...auth,
        authenticated: true
      }

    case 'LOG_OUT':
      return { ...auth,
        authenticated: false
      }

    default:
      return auth;
  }

}

export default authReducer
