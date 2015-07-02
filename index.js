var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket) {
  console.log(socket.conn.server['clientsCount']);
  io.emit('connect', 'user connected');
  socket.on('disconnect', function() {
    io.emit('disconnect', 'user disconnected');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});