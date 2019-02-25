const request = require('supertest');
const assert = require('chai').assert;

const app = require('./server').app;


it('should return hello world response', function (done) {
    request(app)
        .get('/')
        .expect(404)
        .expect((res) => {
            assert.include(res.body, {
                error: 'page not found'
            })
        })
        .end(done)
});

it('should return proper users', function (done) {
    request(app)
        .get('/users')
        .expect((res) => {
            assert.equal(res.status, 200);
            assert.deepInclude(res.body, {
                name: 'Aleksei',
                age: 28
            });
        })
        .end(done)

});


