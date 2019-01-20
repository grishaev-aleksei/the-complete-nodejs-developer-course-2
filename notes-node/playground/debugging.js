const person = {
    name: 'Aleksei'
};
person.age = 25;
// node inspect debugging.js
// c - continue
// repl - view variables
debugger;
person.name = 'Mike';
debugger;
console.log(person);