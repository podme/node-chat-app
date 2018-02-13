var socket = io();

function scrollToBottom () {
	// selectors
	var messages = $('#messages'); 
	var newMessage = messages.children('li:last-child');
	// heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
		console.log('should scroll');
		messages.scrollTop(scrollHeight);
	}
}

socket.on('connect', function () {
	console.log('connected to server');
	var params = $.deparam(window.location.search);
	params.room = params.room.toLowerCase();
	socket.emit('join', params, function (err) {
		if(err){
			alert(err);
			window.location.href = '/';
		}else{
			console.log('no error');
		}
	});

	var template = $('#room-template').html();
	var html = Mustache.render(template, {
		room: params.room === '' ? params.selectroom : params.room
	});
	$('#roomName').append(html);
});
socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
	console.log('users list: ', users);
	var ol = $('<ol></ol>');
	users.forEach(function (user) {
		ol.append($('<li></li>').text(user));
	});
	$('#users').html(ol);
});

socket.on('newMessage', function (message) {
	var formattedTime = moment(message.createdAt).format('h:mma');
	var template = $('#message-template').html();
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});
	$('#messages').append(html);
	scrollToBottom();
	// var formattedTime = moment(message.createdAt).format('h:mma');
	// console.log('New Message:', JSON.stringify(message, undefined, 2));
	// var li = $('<li></li>');
	// li.text(`${message.from} ${formattedTime}: ${message.text}`);
	// $('#messages').append(li);
});
socket.on('newLocationMessage', function(message){
	var formattedTime = moment(message.createdAt).format('h:mma');
	var template = $('#location-message-template').html();
	var html = Mustache.render(template, {
		from: message.from,
		createdAt: formattedTime,
		url: message.url
	});
	$('#messages').append(html);
	scrollToBottom();
	// var formattedTime = moment(message.createdAt).format('h:mma');
	// var li = $('<li></li>');
	// var a = $('<a target="_blank">My Current Location</a>');
	// li.text(`${message.from} ${formattedTime}: `);
	// a.attr('href', message.url);
	// li.append(a);
	// $('#messages').append(li);
});
// socket.emit('createMessage', {
// 	from: 'paul client',
// 	text: 'hellooooo'
// }, function (data) {
// 	console.log('Got it. data: ', JSON.stringify(data, undefined, 2));
// });

$('#message-form').on('submit', function(e) {
	e.preventDefault();
	var messageTextbox = $('[name=message]');
	socket.emit('createMessage', {
		text: messageTextbox.val()
	}, function () {
		// a callback that clears it once complete
		messageTextbox.val('');
	})
});

var locationButton = $('#send-location');
locationButton.on('click', function(){
	if(!navigator.geolocation){
		return alert('Geolocation not supported by your browser');
	}
	locationButton.attr('disabled', 'disabled').text('Sending location...');
	navigator.geolocation.getCurrentPosition(function(position){
		locationButton.removeAttr('disabled').text('Send location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function () {
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location');
	});
})