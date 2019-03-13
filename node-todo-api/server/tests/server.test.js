const request = require('supertest');
const {assert} = require('chai');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');


const todos = [{
    text: 'First test todo'
}, {
    text: 'Second test todo'
}];

beforeEach('prepare database', function (done) {
    Todo.deleteMany({})
        .then(() => {
            return Todo.insertMany(todos)
        }).then(done())

});

//todo mock database call
describe('POST /todos', () => {


    it('should create a new todo', function (done) {

        const text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                assert.isOk(res.body);
                assert.deepEqual(res.body.text, text)
            })
            .end((err, res) => {
                if (err) return done(err);

                Todo.find({text})
                    .then(todos => {
                        assert.equal(todos.length, 1);
                        assert.deepEqual(todos[0].text, text);
                        done()
                    })
                    .catch(err => done(err))

            });

    });

    it('should not create todo with invalid body data', function (done) {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);

                Todo.find()
                    .then(todos => {
                        assert.equal(todos.length, 2);
                        done()
                    })
                    .catch(err => done(err))

            });

    });


});
describe('GET /todos', function () {

    it('should get all todos', function (done) {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                assert.equal(res.body.todos.length, 2)
            })
            .end(done)

    });
});