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
    summary: {}
  },
  settings: {
    isFetching: false,
    fetchingSuccess: false,
    fetchingError: false,
    isSaving: false,
    savingSuccess: false,
    savingError: false,
    modified: false,
    initial: {
      firstname: '',
      lastname: '',
      username: '',
      email: ''
    },
    current: {
      firstname: '',
      lastname: '',
      username: '',
      email: ''
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
