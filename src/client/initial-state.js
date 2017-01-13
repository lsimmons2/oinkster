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
    success: false,
    error: false,
    data: {
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
