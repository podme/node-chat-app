const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');//so we can go directly, rather than in and out again as before with __dirname + '/../public'
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new user connected');
	
	// broadcasts to everyone except this socket (sender) 

	socket.on('join', (params, callback) => {
		if(!isRealString(params.name)||!isRealString(params.room)){
			return callback('Name and room name are required.');
		}
		socket.join(params.room);
		users.removeUser(socket.id);//remove them from any potential previous rooms
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));	
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
	
		callback();//pass no error
	});

	socket.on('createMessage', (msg, callback) => {
		// broadcasts to everyone except this socket (sender) 
		io.emit('newMessage', generateMessage(msg.from, msg.text));
		// clear the textbox
		callback();
	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});

	socket.on('disconnect', () => {
		console.log('client disconnected');
		var user = users.removeUser(socket.id);
		if(user){//if a user was removed
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
		}
	});


});

server.listen(port, () => {
    console.log(`Server up on ${port}`);
});