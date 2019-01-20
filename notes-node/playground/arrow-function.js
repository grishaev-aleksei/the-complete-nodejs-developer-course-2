const square = (x) => x * x;

console.log(square(2));

const user = {
    name: 'Andrew',
    sayHi: () => {
        console.log(arguments);
        console.log(`hi, i'm ${this.name}`)
    },
    sayHiAlt() {
        console.log(arguments);
        console.log(`hi, i'm ${this.name}`)
    }
};

user.sayHi(1,3,5);
user.sayHiAlt(1,3,5);