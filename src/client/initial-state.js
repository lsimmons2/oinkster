export default {
  auth: {
    authenticated: false,
    userId: '',
    invalidSignUpForm: false,
    signUpError: false,
    showSignUp: true,
    signUpUsernameConflict: false,
    signUpEmailConflict: false,
    comboNotFound: false,
    logInError: false
  },
  profile: {
    isFetching: false,
    fetchingSuccess: false,
    fetchingError: false,
    showFollowersModal: false,
    showFolloweesModal: false,
    summary: {
      user: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        bio: '',
        picture: '',
        oinks: []
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
    uploadingPictureSuccess: false,
    modified: false,
    pictureModified: false,
    initial: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      bio: '',
      picture: ''
    },
    current: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      bio: '',
      picture: ''
    }
  },
  board: {
    oinks: [],
    profile: {
      firstName: '',
      lastName: '',
      username: '',
      bio: ''
    },
    isFetching: false,
    fetchingError: false,
    count: 0
  },
  users: {
    isFetching: false,
    fetchingError: false,
    users: []
  },
  feedback: {
    isFetching: false,
    fetchingSuccess: false,
    fetchingError: false,
    contact: '',
    feedback: ''
  }
}
