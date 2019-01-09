console.log('starting app.js');
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const argv = yargs.argv;
const command = process.argv[2];

// console.log('process:', process.argv);
// console.log('yargs', argv);
// console.log('command: ', command);

if (command === 'add') {
    notes.addNote(argv.title, argv.body)
} else if (command === 'list') {
    notes.getAll();
} else if (command === 'read') {
    notes.getOne(argv.title)
} else if (command === 'remove') {
    notes.removeOne(argv.title)
} else {
    console.log('invalid command or does not exist')
}