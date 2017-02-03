
import initialState from '../initial-state'


let usersReducer = function(users = initialState.users, action){

  switch(action.type){

    case 'FETCH_USERS_REQUEST':
      return { ...users,
        isFetching: true,
        fetchingError: false
      }

    case 'FETCH_USERS_SUCCESS':
      return { ...users,
        isFetching: false,
        fetchingError: false,
        users: action.users
      };

    case 'FETCH_USERS_ERROR':
      return { ...users,
        isFetching: false,
        fetchingError: true
      }

    default:
      return users;
  }

}

export default usersReducer
