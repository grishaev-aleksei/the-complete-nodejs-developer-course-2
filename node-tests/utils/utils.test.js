const utils = require('./utils');


it('should add two numbers', function () {
    const result = utils.add(33, 11);
    if (result !== 44) {
        throw new Error(`expected 44 but returned ${result}`)
    }
});

it('should square number', function (done) {
    const res = utils.square(3);
    if (res !== 9) {
        throw new Error(`expected 9 but returned ${res}`)
    }

});