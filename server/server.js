const path = require('path');
const http = require('http');
const express = require('express');

const publicPath = path.join(__dirname, '../public');//so we can go directly, rather than in and out again as before with __dirname + '/../public'
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
const socketIO = require('socket.io');
var io = socketIO(server);
const {generateMessage, generateLocationMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new user connected');
	

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));	

	// broadcasts to everyone except this socket (sender) 
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
	socket.on('createMessage', (msg, callback) => {
		// broadcasts to everyone except this socket (sender) 
		io.emit('newMessage', generateMessage(msg.from, msg.text));
		callback('This is from the server');
	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});

	socket.on('disconnect', () => {
		console.log('client disconnected');
	});


});

server.listen(port, () => {
    console.log(`Server up on ${port}`);
});