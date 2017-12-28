var express = require('express');
var socket = require('socket.io');
var app = express();
var server = app.listen( process.env.PORT || 8080);
app.use(express.static('public'));
console.log('Server listening on port 8080');
var io = socket(server);

io.sockets.on('connection', connection);

var text = {
    text: ''
};

function connection(socket){
    console.log('a new user with id ' + socket.id + " has entered");
    socket.emit('newUser', text);

    socket.on('text', handleTextSent);

    function handleTextSent(data){
        text.text = data.text
        io.sockets.emit('text', data);
    }
}

