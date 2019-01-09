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

    // if (fs.existsSync(notesPath)) {
    //     const notesString = fs.readFileSync(notesPath);
    //     if (notesString.length !== 0) {
    //         notes = JSON.parse(notesString.toString());
    //     }
    // }

};

const getAll = () => {
    console.log(fetchNotes())
};

const getOne = (title) => {
    console.log('getOne', title)
};

const removeOne = (title) => {
    console.log('removeOne', title)
};

module.exports = {
    addNote,
    getAll,
    getOne,
    removeOne
};

