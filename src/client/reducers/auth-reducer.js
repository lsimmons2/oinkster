
import initialState from '../initial-state'


let authReducer = function(auth = initialState.auth, action){

  switch(action.type){

    case 'SIGN_UP_ERROR':
      return { ...auth,
        invalidSignUpForm: false,
        signUpError: true,
        signUpUsernameConflict: false,
        signUpEmailConflict: false
      }

    case 'INVALID_SIGN_UP_FORM':
      return { ...auth,
        invalidSignUpForm: true,
        signUpError: false,
        signUpUsernameConflict: false,
        signUpEmailConflict: false
      }

    case 'REDIRECT_TO_LOGIN':
      return { ...auth,
        signUpConflict: action.user
      }

    case 'COMBO_NOT_FOUND':
      return { ...auth,
        comboNotFound: true,
        logInError: false,
        invalidLogInForm: true
      }

    case 'INVALID_LOG_IN_FORM':
      return { ...auth,
        comboNotFound: false,
        logInError: false,
        invalidLogInForm: true
      }

    case 'LOG_IN_ERROR':
      return { ...auth,
        comboNotFound: false,
        logInError: true,
        invalidLogInForm: false
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
