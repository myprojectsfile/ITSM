import Parse from '../parse-init'

export const logOut = ({commit}) => {
  Parse.User.logOut().then(
    () => {
      commit('logOut')
    },
    () => {})
}

export const logIn = ({commit}, payload) => {
  Parse.User.logIn(payload.username, payload.password).then(
    (user) => {
      console.log(user)
      commit('logIn', user)
    },
    () => {})
}
