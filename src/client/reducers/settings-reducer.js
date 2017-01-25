
import initialState from '../initial-state'


let settingsReducer = function(settings = initialState.settings, action){

  switch(action.type){

    case 'FETCH_SETTINGS_REQUEST':
      return { ...settings,
        isFetching: true
      }

    case 'FETCH_SETTINGS_SUCCESS':
      return { ...settings,
        isFetching: false,
        fetchingSuccess: true,
        fetchingError: false,
        initial: action.settings,
        current: action.settings
      }

    case 'FETCH_SETTINGS_ERROR':
      return { ...settings,
        isFetching: false,
        fetchingSuccess: false,
        fetchingError: true
      }

    case 'UPDATE_SETTINGS':
      let oldSettings = JSON.stringify(settings.initial);
      let newSettings = JSON.stringify(action.settings);
      let isModified = oldSettings !== newSettings;
      return { ...settings,
        current: action.settings,
        modified: isModified
      }

    case 'UPLOAD_PICTURE_REQUEST':
      return { ...settings,
        isUploadingPicture: true,
        uploadingPictureError: false
      }

    case 'UPLOAD_PICTURE_SUCCESS':
      return { ...settings,
        isUploadingPicture: false,
        pictureModified: true,
        uploadingPictureError: false,
        uploadingPictureSuccess: true,
        current: { ...settings.current,
          picture: action.picture
        }
      }

    case 'UPLOAD_PICTURE_ERROR':
      return { ...settings,
        isUploadingPicture: false,
        uploadingPictureError: true,
        uploadingPictureSuccess: false,
        uploadingPictureError: true
      }

    case 'RESET_PICTURE':
      return { ...settings,
        pictureModified: false,
        current: { ...settings.current,
          picture: settings.initial.picture
        }
      }

    case 'SAVE_SETTINGS_REQUEST':
      return { ...settings,
        isSaving: true,
        savingSuccess: false,
        savingError: false
      }

    case 'SAVE_SETTINGS_SUCCESS':
      return { ...settings,
        isSaving: false,
        savingSuccess: true,
        savingError: false,
        initial: action.settings,
        current: action.settings,
        modified: false
      }

    case 'SAVE_SETTINGS_ERROR':
      return { ...settings,
        isSaving: false,
        savingSuccess: false,
        savingError: true
      }

    default:
      return settings;
  }

}

export default settingsReducer
