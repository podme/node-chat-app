// [{
// 	id: 'bjhbj/(IJHGTZ/U',
// 	name: 'Ug',
// 	room: 'The Office Fans'
// }]

class Users {
	constructor () {
		this.users = [];
	}
	addUser (id, name, room) {
		var user = {id, name, room};
		this.users.push(user);
		return user
	}
	removeUser (id) {
		var user = this.getUser(id);
		if(user){
			this.users = this.users.filter((user) => user.id !== id);
		}
		return user
		// var newUsers = this.users.filter((user) => user.id !== id);
		// this.users = newUsers;
		// return this
	}
	getUser (id) {
		return this.users.filter((user) => user.id === id)[0];
	}
	getUserList (room) {
		var users = this.users.filter((user) => user.room === room);
		var namesArray = users.map((user) => user.name);
		return namesArray;
	}
	getRoomList () {
		//singleInstancesOfRooms
		// return this.users.map(a => a.room);
		return [...new Set(this.users.map(i => i.room))]; //https://stackoverflow.com/a/35092559/5350539
	}
}
module.exports = {Users};

// class Person {
// 	constructor (name, age) {
// 		console.log(name, age);
// 		this.name = name;
// 		this.age = age;
// 	}
// 	getUserDescription () {
// 		return `${this.name} is ${this.age} year(s) old.`;
// 	}
// }
// var me = new Person ('uggles', 87);
// var description = me.getUserDescription();
// console.log('me.name: ', me.name);
// console.log('description: ' , description);