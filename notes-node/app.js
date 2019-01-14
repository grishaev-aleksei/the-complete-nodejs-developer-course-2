const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const argv = yargs.argv;
const command = process.argv[2];

console.log('command is', command);

if (command === 'add') {
    const note = notes.addNote(argv.title, argv.body);
    if (note) {
        notes.notePrint(note)
    } else {
        console.log('note has not saved');
    }

} else if (command === 'list') {
    const note = notes.getAll();
    note.forEach((note) => notes.notePrint(note));

} else if (command === 'read') {
    const note = notes.getOne(argv.title);
    if (note) {
        notes.notePrint(note)
    } else {
        console.log('note not found')
    }

} else if (command === 'remove') {
    const note = notes.removeOne(argv.title);
    const message = !note ? 'note not found' : `note was deleted`;
    console.log(message, note)

} else {
    console.log('invalid command or does not exist')
}

