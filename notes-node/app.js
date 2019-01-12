console.log('starting app.js');
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const argv = yargs.argv;
const command = process.argv[2];

if (command === 'add') {
    const note = notes.addNote(argv.title, argv.body);
    if (note) {
        notePrint(note.title, note.body)
    } else {
        console.log('note has not saved');
    }

} else if (command === 'list') {
    notes.getAll();

} else if (command === 'read') {
    const note = notes.getOne(argv.title);
    if (note) {
        notePrint(note.title, note.body)
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

function notePrint(title, body) {
    console.log('-----');
    console.log(command);
    console.log('-----');
    console.log(`title: ${title}`);
    console.log(`body: ${body}`);
}