var socket_io = require('socket.io');
var io = socket_io();
var sockets = {};

sockets.io = io;

var events = require('./events')(io)


io.on('connection', function(socket){
    console.log("Client Connection Established from " + (socket.conn.remoteAddress == "::1" ? "localhost" : socket.conn.remoteAddress));

    HandleEvents(socket);

    socket.emit('test',{msg: "hello"});

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
});

function HandleEvents(socket){
  var _emit = socket.emit;
  _onevent = socket.onevent;

  socket.emit = function () { //Override outgoing
      //Do your logic here
      console.log('***', 'emit', arguments);
      _emit.apply(socket, arguments);
  };

  socket.onevent = function (packet) { //Override incoming
      var args = packet.data || [];
      //Do your logic here
      console.log('***', 'onevent', packet);
      _onevent.call(socket, packet);
  };


}

module.exports = sockets;