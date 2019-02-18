const serverConfig = require('./server.config')

// check if user a is member of AD
function checkUserOfAD (username) {
  const prefix = serverConfig.DOMAIN_USER_PREFIX.toUpperCase() + '\\'
  const usernameUpp = username.toUpperCase()
  return usernameUpp.startsWith(prefix)
}

function checkIsUserExistInParse (username) {

}

function updateUserRoles (userGroups) { }

function resetPassword (username) { return '' }

function signUpUser (username) { }

function authByAD (username, userGroups) {
  // check if user a is member of AD
  if (checkUserOfAD(username)) { // Yes
    // Check if user is exist in parse db
    if (checkIsUserExistInParse(username)) { // Yes user exist
      // Update user gropus
      updateUserRoles(userGroups)
      // Reset password and send via response
      const newPass = 'asdlkfja;sidf;alsdf' // resetPassword(username)
      return newPass
    } else { // No user doesnot exist
      // Signup the user with default password
      signUpUser(username)
      // Update user gropus
      updateUserRoles(userGroups)
      const newPass = 'asdlkfja;sidf;alsdf' // resetPassword(username)
      return newPass
    }
  } else { // No
    return false
  }
}

module.exports = {
  authByAD: authByAD
}
