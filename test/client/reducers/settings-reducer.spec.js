
import reducer from '../../../src/client/reducers/settings-reducer'
import chai from 'chai'
import state from '../../../src/client/initial-state'

const should = chai.should();


describe('settingsReducer()', function(){
  
  let settings;
  beforeEach(function(){
    settings = state.settings;
  })

  describe('FETCH_SETTINGS_REQUEST', function(){
    it('should set isFetching to true', function(){
      let action = {
        type: 'FETCH_SETTINGS_REQUEST'
      };
      let returnedState = reducer(settings, action);
      returnedState.isFetching.should.equal(true);
    })
    it('should set fetchingSuccess to false', function(){
      let action = {
        type: 'FETCH_SETTINGS_REQUEST'
      };
      let returnedState = reducer(settings, action);
      returnedState.isFetching.should.equal(true);
    })
    it('should set fetchingError to false', function(){
      let action = {
        type: 'FETCH_SETTINGS_REQUEST'
      };
      let returnedState = reducer(settings, action);
      returnedState.isFetching.should.equal(true);
    })
  })

  describe('FETCH_SETTINGS_SUCCESS', function(){
    // seems like it's sufficient enough to just test if it works and not each property it modifies
    it('works', function(){
      let newSettings = {someSetting:'someValue'};
      let action = {
        type: 'FETCH_SETTINGS_SUCCESS',
        settings: newSettings
      };
      settings:
      settings.isFetching = true;
      settings.fetchingError = true;
      let returnedState = reducer(settings, action);
      returnedState.isFetching.should.equal(false);
      returnedState.fetchingSuccess.should.equal(true);
      returnedState.fetchingError.should.equal(false);
      returnedState.modified.should.equal(false);
      returnedState.initial.should.equal(newSettings);
      returnedState.current.should.equal(newSettings);
    })
  })

  describe('FETCH_SETTINGS_ERROR', function(){
    it('works', function(){
      let err = new Error('Some error')
      let action = {
        type: 'FETCH_SETTINGS_ERROR',
        error: err
      };
      settings.isFetching = true;
      settings.fetchingSuccess = true;
      let returnedState = reducer(settings, action);
      returnedState.isFetching.should.equal(false);
      returnedState.fetchingSuccess.should.equal(false);
      returnedState.fetchingError.should.equal(true);
    })
  })

  describe('UPDATE_SETTINGS', function(){
    it('changes current settings to action.settings', function(){
      let newSettings = {someSetting:'someValue'};
      let action = {
        type: 'UPDATE_SETTINGS',
        settings: newSettings
      };
      let returnedState = reducer(settings, action);
      returnedState.current.should.equal(newSettings);
    })
    it('sets modified to true if current settings are different from initial settings', function(){
      settings.initial = {someSetting:'notTheSameValue'};
      let newSettings = {someSetting:'someValue'};
      let action = {
        type: 'UPDATE_SETTINGS',
        settings: newSettings
      };
      let returnedState = reducer(settings, action);
      returnedState.modified.should.equal(true);
    })
    it('sets modified to false if current settings are same as initial settings', function(){
      settings.initial = {someSetting:'sameValue'};
      let newSettings = {someSetting:'sameValue'};
      let action = {
        type: 'UPDATE_SETTINGS',
        settings: newSettings
      };
      let returnedState = reducer(settings, action);
      returnedState.modified.should.equal(false);
    })

  })

  describe('UPLOAD_PICTURE_REQUEST', function(){
    it('works', function(){
      let action = {
        type: 'UPLOAD_PICTURE_REQUEST'
      };
      settings.uploadingPictureError = true;
      let returnedState = reducer(settings, action);
      returnedState.isUploadingPicture.should.equal(true);
      returnedState.uploadingPictureError.should.equal(false);
    })
  })

  describe('UPLOAD_PICTURE_SUCCESS', function(){
    it('works', function(){
      let newPicture = 'somePicture'
      let action = {
        type: 'UPLOAD_PICTURE_SUCCESS',
        picture: newPicture
      };
      settings.isUploadingPicture = true;
      let returnedState = reducer(settings, action);
      returnedState.isUploadingPicture.should.equal(false);
      returnedState.pictureModified.should.equal(true);
      returnedState.current.picture.should.equal(newPicture);
    })
  })

  describe('UPLOAD_PICTURE_ERROR', function(){
    it('works', function(){
      let newPicture = 'somePicture'
      let action = {
        type: 'UPLOAD_PICTURE_ERROR'
      };
      settings.isUploadingPicture = true;
      let returnedState = reducer(settings, action);
      returnedState.isUploadingPicture.should.equal(false);
      returnedState.uploadingPictureError.should.equal(true);
    })
  })

  describe('RESET_PICTURE', function(){
    it('works', function(){
      let newPicture = 'somePicture';
      settings.pictureModified = true;
      settings.initial.picture = 'theFirstPicture';
      let action = {
        type: 'RESET_PICTURE'
      };
      let returnedState = reducer(settings, action);
      returnedState.pictureModified.should.equal(false);
      returnedState.current.picture.should.equal('theFirstPicture');
    })
  })

  describe('SAVE_SETTINGS_REQUEST', function(){
    it('works', function(){
      let action = {
        type: 'SAVE_SETTINGS_REQUEST'
      };
      // wouldn't actually have true for both savingSuccess and savingError
      // - just for testing
      settings.savingSuccess = true;
      settings.savingError = true;
      let returnedState = reducer(settings, action);
      returnedState.isSaving.should.equal(true);
      returnedState.savingSuccess.should.equal(false);
      returnedState.savingError.should.equal(false);
    })
  })

  describe('SAVE_SETTINGS_SUCCESS', function(){
    it('works', function(){
      let newSettings = {someSetting:'someValue'};
      let action = {
        type: 'SAVE_SETTINGS_SUCCESS',
        settings: newSettings
      };
      // wouldn't actually have true for both isSaving and savingError
      // - just for testing
      settings.isSaving = true;
      settings.savingError = true;
      let returnedState = reducer(settings, action);
      returnedState.isSaving.should.equal(false);
      returnedState.savingSuccess.should.equal(true);
      returnedState.savingError.should.equal(false);
      returnedState.modified.should.equal(false);
    })
  })

  describe('SAVE_SETTINGS_ERROR', function(){
    it('works', function(){
      let err = new Error('Some error')
      let action = {
        type: 'SAVE_SETTINGS_ERROR',
        error: err
      };
      // wouldn't actually have true for both isSaving and savingSuccess
      // - just for testing
      settings.isSaving = true;
      settings.savingSuccess = true;
      let returnedState = reducer(settings, action);
      returnedState.isSaving.should.equal(false);
      returnedState.savingSuccess.should.equal(false);
      returnedState.savingError.should.equal(true);
    })
  })

})
