
import initialState from '../initial-state'


let settingsReducer = function(settings = initialState.settings, action){

  switch(action.type){

    case 'FETCH_SETTINGS_REQUEST':
      return { ...settings,
        isFetching: true,
        success: false,
        error: false,
        data: {}
      }

    case 'FETCH_SETTINGS_SUCCESS':
      return { ...settings,
        isFetching: false,
        success: true,
        error: false,
        data: action.settings
      }

    case 'FETCH_SETTINGS_ERROR':
      return { ...settings,
        isFetching: false,
        success: false,
        error: true,
        data: {}
      }

    case 'UPDATE_FIRST_NAME':
      return { ...settings,
        data: { ...settings.data,
          firstname: action.firstName
        }
      }

    case 'UPDATE_LAST_NAME':
      return { ...settings,
        data: { ...settings.data,
          lastname: action.lastName
        }
      }

    case 'UPDATE_USERNAME':
      return { ...settings,
        data: { ...settings.data,
          username: action.username
        }
      }

    case 'UPDATE_EMAIL':
      return { ...settings,
        data: { ...settings.data,
          email: action.email
        }
      }

    default:
      return settings;
  }

}

export default settingsReducer
