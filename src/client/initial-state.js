export default {
  auth: {
    authenticated: false,
    showSignUp: true,
    signUpUsernameConflict: false,
    signUpEmailConflict: false,
    user: undefined
  },
  profile: {
    isFetching: false,
    fetchingSuccess: false,
    fetchingError: false,
    summary: {
      user: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        bio: '',
        picture: ''
      },
      oinks: []
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
    isFetching: false,
    fetchingError: false,
    count: 0
  },
  feedback: {
    isFetching: false,
    fetchingSuccess: false,
    fetchingError: false,
    contact: '',
    feedback: ''
  }
}
