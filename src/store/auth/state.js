import Parse from '../parse-init'

export default {
  currentUser: Parse.User.current(),
  isLoggedIn: !!Parse.User.current()
}
