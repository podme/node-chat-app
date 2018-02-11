var moment = require('moment');

var date = moment();//represents moment of calling

date.add(100, 'years').subtract(9, 'months');
console.log(date.format('Do MMM YYYY'));

// console.log(date.format('H:mm'));
console.log(date.format('h:mma'));//h:1 2 ... 11 12, mm	:00 01 ... 58 59, a	:am pm

var someTimestamp = moment().valueOf();
console.log('someTimestamp: ', someTimestamp);