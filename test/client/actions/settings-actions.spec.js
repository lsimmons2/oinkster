
import * as actions from '../../../src/client/actions/settings-actions'
import chai from 'chai'

const should = chai.should();


describe('fetchSettingsRequest()', function(){
  it('should return actions of type FETCH_SETTINGS_REQUEST', function(){
    let action = actions.fetchSettingsRequest();
    action.type.should.equal('FETCH_SETTINGS_REQUEST');
  })
})

describe('fetchSettingsSuccess()', function(){
  it('should return actions of type FETCH_SETTINGS_SUCCESS', function(){
    let settings = {settings:'settings'};
    let action = actions.fetchSettingsSuccess(settings);
    action.type.should.equal('FETCH_SETTINGS_SUCCESS');
  })
  it('should return actions with settings passed to it', function(){
    let settings = {settings:'settings'};
    let action = actions.fetchSettingsSuccess(settings);
    action.settings.should.equal(settings);
  })
})

describe('fetchSettingsError()', function(){
  it('should return actions of type FETCH_SETTINGS_ERROR', function(){
    let err = new Error('Some error')
    let action = actions.fetchSettingsError(err);
    action.type.should.equal('FETCH_SETTINGS_ERROR');
  })
  it('should return actions with error passed to it', function(){
    let err = new Error('Some error')
    let action = actions.fetchSettingsError(err);
    action.error.should.equal(err);
  })
})

describe('updateSettings()', function(){
  it('should return actions of type UPDATE_SETTINGS', function(){
    let settings = {settings:'settings'};
    let action = actions.updateSettings(settings);
    action.type.should.equal('UPDATE_SETTINGS');
  })
  it('should return actions with profile passed to it', function(){
    let settings = {settings:'settings'};
    let action = actions.updateSettings(settings);
    action.settings.should.equal(settings);
  })
})

describe('uploadPictureRequest()', function(){
  it('should return actions of type UPLOAD_PICTURE_REQUEST', function(){
    let action = actions.uploadPictureRequest();
    action.type.should.equal('UPLOAD_PICTURE_REQUEST');
  })
})

describe('uploadPictureSuccess()', function(){
  it('should return actions of type UPLOAD_PICTURE_SUCCESS', function(){
    let picture = 'picture';
    let action = actions.uploadPictureSuccess(picture);
    action.type.should.equal('UPLOAD_PICTURE_SUCCESS');
  })
  it('should return actions with picture passed to it', function(){
    let picture = 'picture';
    let action = actions.uploadPictureSuccess(picture);
    action.picture.should.equal(picture);
  })
})

describe('uploadPictureError()', function(){
  it('should return actions of type UPLOAD_PICTURE_ERROR', function(){
    let action = actions.uploadPictureError();
    action.type.should.equal('UPLOAD_PICTURE_ERROR');
  })
})

describe('resetPicture()', function(){
  it('should return actions of type RESET_PICTURE', function(){
    let action = actions.resetPicture();
    action.type.should.equal('RESET_PICTURE');
  })
})

describe('saveSettingsRequest()', function(){
  it('should return actions of type SAVE_SETTINGS_REQUEST', function(){
    let action = actions.saveSettingsRequest();
    action.type.should.equal('SAVE_SETTINGS_REQUEST');
  })
})

describe('saveSettingsSuccess()', function(){
  it('should return actions of type SAVE_SETTINGS_SUCCESS', function(){
    let settings = {settings:'settings'};
    let action = actions.saveSettingsSuccess(settings);
    action.type.should.equal('SAVE_SETTINGS_SUCCESS');
  })
  it('should return actions with settings passed to it', function(){
    let settings = {settings:'settings'};
    let action = actions.saveSettingsSuccess(settings);
    action.settings.should.equal(settings);
  })
})

describe('saveSettingsError()', function(){
  it('should return actions of type SAVE_SETTINGS_ERROR', function(){
    let err = new Error('Some error')
    let action = actions.saveSettingsError(err);
    action.type.should.equal('SAVE_SETTINGS_ERROR');
  })
  it('should return actions with error passed to it', function(){
    let err = new Error('Some error')
    let action = actions.saveSettingsError(err);
    action.error.should.equal(err);
  })
})
