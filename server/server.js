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
	
	socket.on('arrive', (params, callback) => {
		// when someone arrives, they need the room list
		socket.emit('updateRoomList', users.getRoomList());
	});

	socket.on('join', (params, callback) => {
		if(!isRealString(params.name)||(!isRealString(params.room)&&params.selectroom==='')){
			return callback('Name and room name are required.');
		}

		// reject duplicate usernames
		var existingSameName = users.users.filter((user) => user.name === params.name);
		if(existingSameName.length){
			return callback('User already exists');
		}
		params.room = params.room === '' ? params.selectroom : params.room;

		socket.join(params.room);
		users.removeUser(socket.id);//remove them from any potential previous rooms
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		socket.emit('newMessage', generateMessage('Admin', `Welcome to the <b>${params.room}</b> chat room!`));	
		// broadcasts to everyone in this room except this socket (sender) 
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
	
		// when a new room is created, anyone else about to log in needs to see it immediately in the drop down select
		socket.broadcast.emit('updateRoomList', users.getRoomList());

		callback();//pass no error
	});

	socket.on('createMessage', (msg, callback) => {
		var user = users.getUser(socket.id);
		if(user && isRealString(msg.text)){
			// broadcasts to everyone in this room except this socket (sender) 
			io.to(user.room).emit('newMessage', generateMessage(user.name, msg.text));
		}
		// clear the textbox
		callback();
	});

	socket.on('createLocationMessage', (coords) => {
		var user = users.getUser(socket.id);
		if(user){
			// broadcasts to everyone in this room except this socket (sender) 
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
		}
		
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