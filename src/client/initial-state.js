export default {
  auth: {
    authenticated: false,
    showSignUp: true,
    signUpUsernameConflict: false,
    signUpEmailConflict: false,
    user: null
  },
  profile: {
    isFetching: false,
    success: false,
    error: false,
    summary: {
      user: {
        username: '',
        bio: ''
      }
    }
  },
  settings: {
    isFetching: false,
    fetchingSuccess: false,
    fetchingError: false,
    isSaving: false,
    savingSuccess: false,
    savingError: false,
    isUploadingPicture: false,
    uploadingPictureError: false,
    modified: false,
    pictureModified: false,
    initial: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      bio: '',
      picture: ''
    },
    current: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      bio: '',
      picture: ''
    }
  },
  board: {
    oinks: [],
    isFetching: false,
    error: false,
    count: 0
  },
  feedback: {
    isFetching: false,
    success: false,
    error: false,
    contact: '',
    feedback: ''
  }
}
