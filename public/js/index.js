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
	var li = $('<li></li>');
	li.text(`${message.from}: ${message.text}`);
	$('#messages').append(li);
});

// socket.emit('createMessage', {
// 	from: 'paul client',
// 	text: 'hellooooo'
// }, function (data) {
// 	console.log('Got it. data: ', JSON.stringify(data, undefined, 2));
// });

$('#message-form').on('submit', function(e) {
	e.preventDefault();
	socket.emit('createMessage', {
		from: 'User',
		text: $('[name=message]').val()
	}, function () {

	})
});