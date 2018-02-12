const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
	var users;
	beforeEach(() => {
		users = new Users();
		users.users = [{
			id : '1',
			name: 'mike',
			room: 'node course'
		},{
			id : '2',
			name: 'sara',
			room: 'react course'
		},{
			id : '3',
			name: 'ug',
			room: 'node course'
		},];
	});

	it('should add a new user', () => {
		var users = new Users();
		var user = {
			id : '123',
			name: 'ug',
			room: 'hairy'
		};
		var resUser = users.addUser(user.id, user.name, user.room);

		// assert that the users array was updated
		expect(users.users).toEqual([user]);
	});

	it('should return names for node course', () => {
		var names = users.getUserList('node course');
		expect(names).toEqual(['mike', 'ug']);
	});
	it('should return names for react course', () => {
		var names = users.getUserList('react course');
		expect(names).toEqual(['sara']);
	});
	it('should remove a user', () => {
		var user = users.removeUser('1');
		expect(user.id).toBe('1');
		expect(users.users.length).toBe(2);
		// var origLen = JSON.parse(JSON.stringify(users.users.length));
		// users.removeUser('1');
		// console.log(users.users.filter(function(user){
		// 	return user.id === 1;
		// }));
		// expect(users.users.indexOf('1')).toBe(-1);
		// expect(users.users.indexOf('ug')).not.toBe(-1);
		// expect(users.users.length).not.toBe(origLen);
	});
	it('should not remove a nonexistent user', () => {
		var user = users.removeUser('99');
		expect(user).toBeFalsy();
		expect(users.users.length).toBe(3);
		// var origLen = users.users.length;
		// expect();
	});

	it('should find user', () => {
		var user = users.getUser('1');
		expect(user.name).toBe('mike');
	});

	it('should not find a nonexistent user', () => {
		var user = users.getUser('7');
		expect(user).toBeFalsy();
	});
});