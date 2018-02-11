var expect = require('expect');
var {generateMessage, generateLocationMessage } = require('./message');
describe('generateMessage', () => {
	it('should generate correct message object', () => {
		// console.log('from: ', from);
		// console.log('text: ', text);
		var from = 'Paul';
		var text = 'My Message!!!!!!!!!!';
		var message = generateMessage(from, text);
		// console.log('message: ', message);
		expect(message).toBeTruthy();
		// expect(message.from).toBe(from);
		// expect(message.text).toBe(text);
		expect(message).toMatchObject({from, text});
		expect(typeof message.createdAt).toBe('number');

	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		var from = 'ug';
		var lat = '123';
		var long = '456';
		var url ='https://www.google.com/maps?q=123,456';
		var locationMessage = generateLocationMessage(from, lat, long);
		expect(typeof locationMessage.createdAt).toBe('number');
		expect(locationMessage).toMatchObject({from, url});
		// expect(locationMessage).toBeTruthy();
		// expect(locationMessage.url).toBe(url);
	});
});