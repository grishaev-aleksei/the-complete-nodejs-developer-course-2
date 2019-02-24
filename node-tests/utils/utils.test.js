const utils = require('./utils');
const describe = require('mocha').describe;
const assert = require('chai').assert;

describe('this', () => {
    it('should add two numbers', function () {
        const result = utils.add(33, 11);
        assert.equal(result, 44);
        assert.isNumber(result);

    });

    it('should async add two numbers', function (done) {
        utils.promiseAdd(3, 4)
            .then((sum) => {
                assert.equal(sum, 7);
                done()
            })
            .catch((e) => {
                done(e)
            })
    });

    it('should square number', function () {
        const result = utils.square(3);
        assert.equal(result, 9);
        assert.isNumber(result);
    });

    it('should async square number', function (done) {
        utils.asyncSquare(4)
            .then((result) => {
                assert.equal(result, 16);
                assert.isNumber(result);
                done()
            })
            .catch((e) => {
                done(e)
            })
    });

    it('should verify first and last names are set', function () {
        const user = utils.setName({
            age: 25,
            location: 'Philadelphia'
        }, 'Andrew Mead');
        assert.include(user, {firstName: 'Andrew'}, 'first name comes first');
        assert.include(user, {lastName: 'Mead'}, 'last name comes last')
    });

// it('should expect some values', function () {
//     assert.equal(12, 12);
//     obj = {
//         name: 'twan'
//     };
//     // assert.notDeepEqual(obj, {name: 'Twan'});
//     assert.include([1,2,3], 66, 'array contains value');
//     assert.notDeepInclude()
// });
})
;

