console.log('starting app.js');
const fs = require('fs');
const _ = require('lodash');

// const notes = require('./notes');

const command = process.argv[2];


console.log('command: ', command);

if (command === 'add') {
    console.log('adding new note')
} else if (command === 'list') {
    console.log('listing all notes')
} else if (command === 'read') {
    console.log('read one note')
} else if (command === 'delete') {
    console.log('delete one note')
} else {
    console.log('invalid command or does not exist')
}