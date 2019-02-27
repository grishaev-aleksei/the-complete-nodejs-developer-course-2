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


it('should pass object with correct values to save only once', function() {
    const info = {name: 'test'};
    const expectedUser = {
        name: info.name,
        nameLowercase: info.name.toLowerCase()
    };
    const database = sinon.mock(db);
    database.expects('save').once().withArgs(expectedUser);

    setupNewUser(info, function() { });

    database.verify();
    database.restore();
});