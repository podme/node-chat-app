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

	socket.on('createMessage', (msg) => {
		msg.createdAt = 0987654;
		io.emit('newMessage', msg);
	});

	socket.on('disconnect', () => {
		console.log('client disconnected');
	});
});

server.listen(port, () => {
    console.log(`Server up on ${port}`);
});