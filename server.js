// BotCP by General Wrex
//var forever = require('forever-monitor');
var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname });
});

var DBM = null;

var isRunning = false;
let botPath;
let mainPath;

app.post('/start', function (req, res) {
    botPath = req.body.path;

    if(!isRunning){
        console.log("Initializing Bot Startup..")
        mainPath = path.join(botPath, 'js' ,'Main.js');

        process.chdir(botPath);
        DBM = require(mainPath);
        
        console.log("Starting Bot...")
        DBM.Files.initStandalone();
        isRunning = true;
    }

    res.send('done');
});

app.post('/stop', function (req, res) {
    if(isRunning){

        var promise = DBM.Bot.bot.destroy();
  
        promise.then((successMessage) => {
            isRunning = false;        
            res.send('done');
          });       
    }    
});

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
