const serverConfig = require('./server.config')

// check if user a is member of AD
function checkUserOfAD (username) {
  console.log(serverConfig.DOMAIN)
}

module.exports = {
  checkUserOfAD: checkUserOfAD
}
