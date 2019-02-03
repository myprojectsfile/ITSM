import Parse from 'parse'

export default ({ Vue }) => {
  Parse.initialize('UCZVB5TLA4')
  Parse.serverURL = 'http://localhost:1337/parse'
  Vue.prototype.$parse = Parse
}
