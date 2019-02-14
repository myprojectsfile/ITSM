export const logOut = (state) => {
  state.currentUser = {}
  state.isLoggedIn = false
}

export const logIn = (state, payload) => {
  state.currentUser = payload
  state.isLoggedIn = true
}
