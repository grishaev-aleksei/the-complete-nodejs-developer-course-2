console.log('starting notes.js');

const fs = require('fs');

const notesPath = 'notes-data.json';

const fetchNotes = () => {
    try {
        const notesString = fs.readFileSync(notesPath);
        return JSON.parse(notesString.toString());
    } catch (e) {
        return []
    }
};

const saveNotes = (notes) => {
    fs.writeFileSync(notesPath, JSON.stringify(notes))
};

const addNote = (title, body) => {
    const notes = fetchNotes();
    const note = {
        title,
        body
    };

    const duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note
    }
};

const getAll = () => {
    const notes = fetchNotes();
    if (notes.length > 0) {
        notes.forEach((note) => {
            console.log(note)
        });
    } else console.log('empty array')
};

const getOne = (title) => {
    const notes = fetchNotes();
    const filteredNote = notes.filter((note) => note.title === title);
    return filteredNote[0];
};

const removeOne = (title) => {
    const notes = fetchNotes();
    // const filteredNotes = notes.filter((note) => note.title !== title);
    const noteIndex = notes.findIndex(note => note.title === title);
    if (noteIndex >= 0) {
        const noteForRemove = notes[noteIndex];
        notes.splice(noteIndex, 1);
        saveNotes(notes);
        console.log(noteForRemove);
        return noteForRemove
    } else {
        return false
    }

};

module.exports = {
    addNote,
    getAll,
    getOne,
    removeOne
};

