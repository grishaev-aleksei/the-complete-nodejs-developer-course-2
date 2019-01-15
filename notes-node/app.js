const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of note',
    demand: false,
    alias: 'b'
};

const argv = yargs
    .command('add', 'add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'list all notes one by one')
    .command('read', 'return one note by title', {
        title: titleOptions
    })
    .command('remove', 'remove one note by title', {
        title: titleOptions
    })
    .help()
    .argv;
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

