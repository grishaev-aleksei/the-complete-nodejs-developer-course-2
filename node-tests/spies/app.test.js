const assert = require('chai').assert;
const sinon = require('sinon');
const db = require('./db');
const app = require('./app');

describe('app', () => {


    it('should call the spy correctly', function () {
        const fake = sinon.fake();

        fake('Andrew', 25);
        sinon.assert.calledWith(fake, 'Andrew', 25)

    });

    it('should call saveUser with user object', function () {

        const saveUser = sinon.stub(db, 'saveUser');
        const spy = sinon.spy(app, 'handleSignUp');

        const email = 'lolo';
        const password = 'olol';
        app.handleSignUp(email, password);

        //
        // const db = {
        //     saveUser: sinon.fake()
        // };

        // app.handleSignUp(email, password);

        sinon.assert.calledWith(saveUser, {email, password});
        sinon.assert.calledOnce(spy);

    });
});