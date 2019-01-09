console.log('starting notes.js');

const fs = require('fs');

const notesPath = 'notes-data.json';

const addNote = (title, body) => {
    let notes = [];
    const note = {
        title,
        body
    };
    try {
        const notesString = fs.readFileSync(notesPath);
        notes = JSON.parse(notesString.toString());
    } catch (e) {

    }

    const duplicateNotes = notes.filter((note) => note.title === title);


    if (duplicateNotes.length === 0) {
        notes.push(note);
        fs.writeFileSync(notesPath, JSON.stringify(notes))
    }

    // if (fs.existsSync(notesPath)) {
    //     const notesString = fs.readFileSync(notesPath);
    //     if (notesString.length !== 0) {
    //         notes = JSON.parse(notesString.toString());
    //     }
    // }

};

const getAll = () => {
    console.log('getAll')
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

