var express = require('express');
var app = express();
var server = app.listen(4000);

app.use(express.static('public'));

console.log('This is my server here!');

var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('We have a new connection: ' + socket.id);
    socket.on('mouse', mouseMsg);

    function mouseMsg(data) {
        console.log(data);
        socket.broadcast.emit('mouse', data);
    }
}
