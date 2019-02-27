const sinon = require('sinon');
const assert = require('chai').assert;
const db = require('./../spies/db');

function setupNewUser(info, callback) {
    const user = {
        name: info.name,
        nameLowercase: info.name.toLowerCase()
    };

    try {
        db.save(user, callback);
    } catch (err) {
        callback(err);
    }
}


it('should pass object with correct values to save', function() {

    const save = sinon.stub(db, 'save');
    const info = {name: 'test'};
    const expectedUser = {
        name: info.name,
        nameLowercase: info.name.toLowerCase()
    };

    setupNewUser(info, function() { });

    save.restore();
    sinon.assert.calledWith(save, expectedUser);
});

it('should pass the error into the callback if save fails', function() {
    const expectedError = new Error('oops');
    const save = sinon.stub(db, 'save');
    save.throws(expectedError);
    const callback = sinon.spy();

    setupNewUser({ name: 'foo' }, callback);

    save.restore();
    sinon.assert.calledWith(callback, expectedError);
});

it('should pass the database result into the callback', function() {

    const expectedResult = {success: true};

    const save = sinon.stub(db, 'save');

    save.yields(null, expectedResult);

    const callback = sinon.spy();

    setupNewUser({ name: 'foo' }, callback);

    save.restore();
    sinon.assert.calledWith(callback, null, expectedResult);
});
