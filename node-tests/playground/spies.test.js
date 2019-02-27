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

it('should call save once', function () {
    const save = sinon.spy(db, 'save');

    for (let i = 0; i < 2; i++) {
        setupNewUser({name: 'Test'}, function (err,result) {
            console.log(result)
        });
    }
    save.restore();

    sinon.assert.calledTwice(save);
});

it('should pass object with correct values to save', function() {
    const save = sinon.spy(db, 'save');
    const info = {name: 'test'};
    const expectedUser = {
        name: 'test',
        nameLowercase: 'test'
    };

    setupNewUser(info, function() { });

    save.restore();
    sinon.assert.calledWith(save, expectedUser);
});