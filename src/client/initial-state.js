export default {
  auth: {
    authenticated: false,
    showSignUp: true,
    signUpUsernameConflict: false,
    signUpEmailConflict: false,
    user: null
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
