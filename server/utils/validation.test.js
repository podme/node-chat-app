var expect = require('expect');
var {isRealString} = require('./validation');

//isRealString
	//should reject non-string values
	//should reject string with only spaces
	//should allow string with non-space characters
describe('isRealString', () => {
	it('should reject non-string values', () => {
		var res = isRealString(9999);
		expect(res).toBeFalsy();
	});
	it('should reject string with only spaces', () => {
		var res = isRealString('    ');
		expect(res).toBeFalsy();
	});
	it('should allow string with non-space characters', () => {
		var res = isRealString('   cool   ');
		expect(res).toBeTruthy();
	});
});