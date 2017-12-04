// BotCP by General Wrex
//var forever = require('forever-monitor');

var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var app = express();

var Main = require(path.join(__dirname, 'server', 'main.js'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile('client\\index.html', { root: __dirname });
});

app.post('/start', function (req, res) {
    if(Main.Control.startBot(req.body.path)){
        res.send("running");
    }   
});

app.post('/stop', function (req, res) {

    res.send('disabled');
    return;

    if(Main.Control.stopBot()){
        res.json({running : false, error: null });
    }   
});

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
