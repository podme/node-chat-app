var expect = require('expect');
var {generateMessage} = require('./message');
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