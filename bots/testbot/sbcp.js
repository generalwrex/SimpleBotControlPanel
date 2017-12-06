var SBCP = {};

SBCP.fs = require('fs');
SBCP.path = require('path');

SBCP.Bot = require('./sbcp.bot')(SBCP);



SBCP.Bot.Load(__dirname);
console.log("starting");
SBCP.Bot.Start();
console.log("started");



module.exports = SBCP;
