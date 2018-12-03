console.log('starting app.js');
const fs = require('fs');
const os = require('os');
const notes = require('./notes');

const user = os.userInfo();

const res = notes.addNote();
console.log(res);
console.log('result:', notes.add(3, 8));

// console.log(user);

// fs.appendFile('greetings.txt', `Hello ${user.username}, your age is ${notes.age} \n`, (err) => {
//     if (err) {
//         console.log(err)
//     }
// });
