
import initialState from '../initial-state'


let profileReducer = function(profile = initialState.profile, action){

  switch(action.type){

    case 'TOGGLE_FOLLOWERS_MODAL':
      return { ...profile,
        showFollowersModal: !profile.showFollowersModal,
        showFolloweesModal: false,
      }

    case 'TOGGLE_FOLLOWEES_MODAL':
      return { ...profile,
        showFollowersModal: false,
        showFolloweesModal: !profile.showFolloweesModal,
      }

    case 'FETCH_USER_SUMMARY_REQUEST':
      return { ...profile,
        isFetching: true,
        fetchingSuccess: false,
        fetchingError: false
      }

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

    case 'FOLLOW_USER_REQUEST':
      return { ...profile,
        isFetching: true,
        fetchingSuccess: false,
        fetchingError: false
      }

    case 'FOLLOW_USER_SUCCESS':
      profile.summary.user.followers.push(action.user);
      return { ...profile,
        isFetching: false,
        fetchingSuccess: false,
        fetchingError: false
      }

    case 'FOLLOW_USER_ERROR':
      return { ...profile,
        isFetching: false,
        fetchingError: true
      }

    default:
      return profile;
  }

}

export default profileReducer
