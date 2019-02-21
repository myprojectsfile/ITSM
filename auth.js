const serverConfig = require('./server.config')
const Parse = require('parse/node')

// Initialize Parse Server
Parse.initialize(serverConfig.PARSE_APP_ID, null, serverConfig.PARSE_MASTER_KEY)
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
  query.equalTo('username', username)
  const user = await query.first()

  if (user) return [true, user]
  else return [false, {}]
}

async function updateUserRoles (parseUser, userGroups) {
  userGroups.forEach((group, index) => {
    userGroups[index] = (group.split('\\'))[1]
  })
  var roleQuery = new Parse.Query(Parse.Role)
  roleQuery.containedIn('name', userGroups)
  var roles = await roleQuery.find()
  roles.forEach((role) => {
    role.getUsers().add(parseUser)
    role.save(null, {
      useMasterKey: true
    }).then(() => {
      console.log('save ok')
    }, (error) => {
      console.error(`save failed with error:${JSON.stringify(error)}`)
    })
  })
  return roles
}

async function resetPassword (parseUser) {
  parseUser.set('password', serverConfig.DEFAULT_PASS)
  await parseUser.save(null, {
    useMasterKey: true
  })
  return serverConfig.DEFAULT_PASS
}

async function signUpUser (username) {
  var user = new Parse.User()
  user.set('username', username)
  user.set('password', serverConfig.DEFAULT_PASS)
  await user.save(null, {
    useMasterKey: true
  })
  return user
}

async function authByAD (username, userGroups) {
  // check if user a is member of AD
  if (checkUserOfAD(username)) { // Yes, user is AD user
    // Check if user is exist in parse db
    const [userexist, parseUser] = await checkIsUserExistInParse(username)
    if (userexist) { // Yes user exist
      // Update user gropus
      await updateUserRoles(parseUser, userGroups)
      // Reset password and send via response
      const newPassword = await resetPassword(parseUser)
      return [username.split('\\')[1], newPassword]
    } else { // No user doesnot exist
      // Signup the user with default password
      let parseUser = await signUpUser(username.split('\\')[1])
      // Update user gropus
      await updateUserRoles(parseUser, userGroups)
      return [username.split('\\')[1], serverConfig.DEFAULT_PASS]
    }
  } else { // No, user is't AD user
    return []
  }
}

module.exports = {
  authByAD: authByAD
}
