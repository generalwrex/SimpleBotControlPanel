// BotCP by General Wrex
var forever = require('forever-monitor');
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname });
});

var child = null;
var isRunning = false;
let bPath;

app.post('/start', function (req, res) {
    bPath = req.body.path;

    if(!child && bPath){
        child = new (forever.Monitor)('bot.js', {
            
            max: 3,
            silent: false,
            sourceDir: bPath,
            watchDirectory: bPath,
            cwd: bPath,
            args: []
          });
        
          child.on('exit', function () {
            console.log('bot.js has exited');
          });

          child.on('error', function (error) {
            console.log('Error! ' + error);
          });
    }   

    if(child && !isRunning){
        try {
            child.start();
            isRunning = true; 
        } catch (error) {
            console.log('Error! ' + error);
        }

    }

    res.send('done');
});

app.post('/stop', function (req, res) {
    if(child && isRunning){
        child.stop();
        isRunning = false; 
    }   
    res.send('done');
});

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});






