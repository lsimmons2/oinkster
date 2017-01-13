
import initialState from '../initial-state'


let profileReducer = function(profile = initialState.profile, action){

  switch(action.type){

    case 'FETCH_USER_SUMMARY_REQUEST':
      return { ...profile,
        isFetching: true,
        success: false,
        error: false,
        summary: {}
      }

    case 'FETCH_USER_SUMMARY_SUCCESS':
      return { ...profile,
        isFetching: false,
        success: true,
        error: false,
        summary: action.userSummary
      }

    case 'FETCH_USER_SUMMARY_ERROR':
      return { ...profile,
        isFetching: false,
        success: false,
        error: true,
        summary: {}
      }

    default:
      return profile;
  }

}

export default profileReducer
