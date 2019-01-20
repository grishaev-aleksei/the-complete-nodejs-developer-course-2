// const obj = {
//     "name": "john",
//     "lastName": "Sonmez"
// };
//
// const stringObj = JSON.stringify(obj);
//
// console.log(`${typeof stringObj}\n${typeof obj}`);
//
// const personString = '{"name":"andrew","age":25}';
// const person = JSON.parse(personString);
//
// console.log(typeof personString);

const fs = require('fs');

const originalNote = {
    title: 'Some title',
    body: 'Some body'
};
originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json', originalNoteString);

const noteString = fs.readFileSync('notes.json');

const note = JSON.parse(noteString.toString());

console.log(typeof noteString);
console.log(note.title);