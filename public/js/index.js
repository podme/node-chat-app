var socket = io();
socket.on('connect', function () {
	console.log('connected to server');
	// socket.emit('createMessage', {
	// 	from: 'client@example.com',
	// 	text: 'Hey ho'
	// });
});
socket.on('disconnect', function () {
	console.log('Disconnected from server');
});
socket.on('newMessage', function (message) {
	console.log('New Message:', JSON.stringify(message, undefined, 2));
});