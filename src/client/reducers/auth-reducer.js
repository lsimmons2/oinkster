
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
        userId: action.userId
      }

    case 'LOG_OUT':
      return { ...auth,
        authenticated: false,
        userId: ''
      }

    case 'VERIFIED':
      return { ...auth,
        authenticated: true,
        userId: action.userId
      }

    case 'NOT_VERIFIED':
      return { ...auth,
        authenticated: false,
        userId: ''
      }

    default:
      return auth;
  }

}

export default authReducer
