const serverConfig = require('./server.config')
const Parse = require('parse/node')

// Initialize Parse Server
Parse.initialize(serverConfig.PARSE_APP_ID)
Parse.serverURL = 'http://localhost:1337/parse'

// check if user a is member of AD
function checkUserOfAD (username) {
  const prefix = serverConfig.DOMAIN_USER_PREFIX.toUpperCase() + '\\'
  const usernameUpp = username.toUpperCase()
  return usernameUpp.startsWith(prefix)
}

async function checkIsUserExistInParse (username) {
  // Remove \ from username
  username = (username.split('\\'))[1]
  // Find user by username
  const query = new Parse.Query(Parse.User)
  query.equalTo('username', username.toLowerCase())
  const user = await query.find()
  const result = !!user.length > 0
  return result
}

function updateUserRoles (userGroups) {}

function resetPassword (username) {
  return ''
}

function signUpUser (username) {}

async function authByAD (username, userGroups) {
  // check if user a is member of AD
  if (checkUserOfAD(username)) { // Yes
    // Check if user is exist in parse db
    const userexist = await checkIsUserExistInParse(username)
    if (userexist) { // Yes user exist
      // Update user gropus
      updateUserRoles(userGroups)
      return userGroups
      // Reset password and send via response
      // const newPass = 'userexist' // resetPassword(username)
      // return newPass
    } else { // No user doesnot exist
      // Signup the user with default password
      signUpUser(username)
      // Update user gropus
      updateUserRoles(userGroups)
      const newPass = 'usernotexist' // resetPassword(username)
      return newPass
    }
  } else { // No
    return false
  }
}

module.exports = {
  authByAD: authByAD
}
