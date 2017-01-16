
import initialState from '../initial-state'


let authReducer = function(auth = initialState.auth, action){

  switch(action.type){

    case 'REDIRECT_TO_LOGIN':
      return { ...auth,
        signUpConflict: action.user
      }

    case 'LOGGED_IN':
      return { ...auth,
        authenticated: true,
        user: JSON.parse(action.user)
      }

    case 'LOG_OUT':
      return { ...auth,
        authenticated: false,
        user: undefined
      }

    default:
      return auth;
  }

}

export default authReducer
