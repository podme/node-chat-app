const path = require('path');
const http = require('http');
const express = require('express');

const publicPath = path.join(__dirname, '../public');//so we can go directly, rather than in and out again as before with __dirname + '/../public'
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
const socketIO = require('socket.io');
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new user connected');
	
	socket.emit('newMessage', {
		from : 'Admin',
		text: 'Welcome to the chat app!',
		createdAt : new Date().getTime()
	});	

	// broadcasts to everyone except this socket (sender) 
	socket.broadcast.emit('newMessage', {
		from : 'Admin',
		text: 'New user joined',
		createdAt : new Date().getTime()
	});
	socket.on('createMessage', (msg) => {
		// broadcasts to everyone.
		// io.emit('newMessage', {
		// 	from : msg.from,
		// 	text: msg.text,
		// 	createdAt : new Date().getTime()
		// });

		// broadcasts to everyone except this socket (sender) 
		socket.broadcast.emit('newMessage', {
			from : msg.from,
			text: msg.text,
			createdAt : new Date().getTime()
		});
	});

	socket.on('disconnect', () => {
		console.log('client disconnected');
	});
});

server.listen(port, () => {
    console.log(`Server up on ${port}`);
});