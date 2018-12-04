console.log('starting app.js');
const fs = require('fs');
const os = require('os');
const notes = require('./notes');
const _ = require('lodash');

const user = os.userInfo();
const res = notes.addNote();

const str = 'string';
const filteredArray = _.uniq([2,5,5,5,6,7,3,6,8,9,0,4,2,5]);

console.log(_.isString(str));

console.log(filteredArray);

// console.log(res);
// console.log('result:', notes.add(3, 8));

// console.log(user);

// fs.appendFile('greetings.txt', `Hello ${user.username}, your age is ${notes.age} \n`, (err) => {
//     if (err) {
//         console.log(err)
//     }
// });
