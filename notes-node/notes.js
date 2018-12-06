console.log('starting notes.js');

const addNote = (title, body) => {
    console.log('add note', title, body)
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

