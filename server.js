// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express')
var ParseServer = require('parse-server').ParseServer
var path = require('path')
var ntlm = require('express-ntlm')
const serverConfig = require('./server.config')
var NodeSSPI = require('node-sspi')
const CircularJSON = require('circular-json')

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.')
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/parsquadb',
  cloud: process.env.CLOUD_CODE_MAIN || path.join(__dirname, '/cloud/main.js'),
  appId: process.env.APP_ID || 'UCZVB5TLA4',
  masterKey: process.env.MASTER_KEY || '5n84nvuhXrRt2C5L', // Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse', // Don't forget to change to https if needed
  liveQuery: {
    classNames: ['Posts', 'Comments'] // List of classes to support for query subscriptions
  }
})
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express()

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')))

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse'
app.use(mountPath, api)

// Config NTLM
if (serverConfig.USE_NTLM) {
  app.use(ntlm({
    debug: function () {
      var args = Array.prototype.slice.apply(arguments)
      console.log.apply(null, args)
    },
    domain: serverConfig.DOMAIN || 'bpmo.local',
    domaincontroller: serverConfig.DOMAIN_CONTROLLER || 'ldap://10.1.1.110:389'
  }))
}

// Config SSPI
if (serverConfig.USE_SSPI) {
  var nodeSSPIObj = new NodeSSPI({
    retrieveGroups: true,
    authoritative: true,
    sspiPackagesUsed: ['NTLM']
  })

  app.use(function (req, res, next) {
    nodeSSPIObj.authenticate(req, res, (err) => {
      if (err) res.send(err)
      res.finished || next()
    })
  })
}

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
  res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!')
})

app.get('/ntlm', (req, res) => {
  if (serverConfig.USE_NTLM) {
    res.end(JSON.stringify(req.ntlm))
  } else res.end('NTLM Not Enabled')
})

app.get('/sspi', (req, res) => {
  // res.end(req.connection.user)
  if (serverConfig.USE_SSPI) {
    var nodeSSPIObj = new NodeSSPI({
      retrieveGroups: true,
      domain: 'BPMO',
      authoritative: false
    })
    nodeSSPIObj.authenticate(req, res, (err) => {
      if (err) res.send(err)
      const fs = require('fs')
      res.write(req.connection.user)
      fs.writeFile('./fake-user.json', CircularJSON.stringify(req.connection.user), function (err) {
        if (err) {
          return console.log(err)
        }
        console.log('The file was saved!')
      })
      res.end((req.connection.userGroups[0]))
      fs.writeFile('./fake-userGroup.json', req.connection.userGroups, function (err) {
        if (err) {
          return console.log(err)
        }
        console.log('The file was saved!')
      })
    })
  } else res.end('SSPI Not Enabled')
})

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'))
})

var port = process.env.PORT || 1337
var httpServer = require('http').createServer(app)
httpServer.listen(port, function () {
  console.log('parse-server-example running on port ' + port + '.')
})

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer)
