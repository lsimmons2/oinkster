
import initialState from '../initial-state'


let profileReducer = function(profile = initialState.profile, action){

  switch(action.type){

    case 'FETCH_USER_SUMMARY_REQUEST':
      return { ...profile,
        isFetching: true,
        fetchingSuccess: false,
        fetchingError: false
      }

    case 'FETCH_USER_SUMMARY_SUCCESS':
      return { ...profile,
        isFetching: false,
        fetchingSuccess: true,
        summary: action.userSummary
      }

    case 'FETCH_USER_SUMMARY_ERROR':
      return { ...profile,
        isFetching: false,
        fetchingError: true
      }

    default:
      return profile;
  }

}

export default profileReducer
