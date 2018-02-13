var socket = io();

socket.on('connect', function () {
	console.log('connected to server from index');

	socket.emit('arrive', {}, function(){

	});

	socket.on('updateRoomList', function(rooms) {
		if(rooms.length){		
			console.log(JSON.stringify(rooms));
			// existing = $('#existing-rooms');
			//<label for="">Join an existing room</label>
			//<select name="existing-rooms" ></select>
			var sel = $('<select name="selectroom"></select>');
			sel.append($('<option value="" selected="selected">Select a room</option>'));
			rooms.forEach(function(room){
				sel.append($('<option></option>').text(room).val(room));
				 // value="' + room + '"
			});
			$('#existing-rooms').append('<label>Join an existing room</label>');
			$('#existing-rooms').append(sel);
		}
	})
	



// socket.on('updateUserList', function (users) {
// 	console.log('users list: ', users);
// 	var ol = $('<ol></ol>');
// 	users.forEach(function (user) {
// 		ol.append($('<li></li>').text(user));
// 	});
// 	$('#users').html(ol);
// });


	// params.room = params.room.toLowerCase();
	// // alert(JSON.stringify(params));
	// socket.emit('join', params, function (err) {
	// 	if(err){
	// 		alert(err);
	// 		window.location.href = '/';
	// 	}else{
	// 		console.log('no error');
	// 	}
	// });
});