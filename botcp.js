// BotCP by General Wrex
// edited by trq
const forever = require('forever-monitor')
const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', function(req, res) {
  res.sendFile('index.html', {
    root: __dirname
  })
})

const child = null
const isRunning = false
let bPath
let bStart

app.post('/start', function(req, res) {
  bPath = req.body.path
  bStart = req.body.startup

  if (!child && bPath && bStart) {
    child = new(forever.Monitor)(bStart, {

      max: 3,
      silent: false,
      sourceDir: bPath,
      watchDirectory: bPath,
      cwd: bPath,
      args: []
    })

    child.on('exit', function() {
      console.log(bStart + ' has exited')
    })

    child.on('error', function(error) {
      console.log('Error! ' + error)
    })
  }

  if (child && !isRunning) {
    try {
      child.start()
      isRunning = true
    } catch (error) {
      console.log('Error! ' + error)
    }

  }

  res.send('done')
})

app.post('/stop', function(req, res) {
  if (child && isRunning) {
    child.stop()
    isRunning = false
  }
  res.send('done')
})

const server = app.listen(3000, function() {
  console.log("Listening on port %s...", server.address().port)
})