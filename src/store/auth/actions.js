import {Parse} from 'parse'

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
      commit('logIn', user)
    },
    () => {})
}
