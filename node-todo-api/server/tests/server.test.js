const request = require('supertest');
const {assert} = require('chai');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {todo} = require('./../models/todo');
const {user} = require('./../models/user');


describe('root', () => {

    after('disconnect DB and exit express', () => {

        process.exit()

    });


    const todos = [{
        _id: new ObjectID(),
        text: 'First test todo'
    }, {
        _id: new ObjectID(),
        text: 'Second test todo',
        completed: true,
        completedAt: 333
    }];

    beforeEach('prepare database', function (done) {
        todo.deleteMany({})
            .then(() => {
                return todo.insertMany(todos)
            }).then(done())

    });

    describe('POST /todos', () => {


        it('should create a new todo', function (done) {

            const text = 'Test todo text';

            request(app)
                .post('/todos')
                .send({text})
                .expect(200)
                .expect((res) => {
                    assert.isOk(res.body);
                    assert.deepEqual(res.body.text, text);

                })
                .end((err, res) => {
                    if (err) return done(err);

                    todo.find({text})
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

                    todo.find()
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

    describe('GET /todos/:id', () => {

        it('should return todo doc', function (done) {

            request(app)
                .get(`/todos/${todos[0]._id.toString()}`)
                .expect(200)
                .expect((res) => {
                    assert.equal(res.body.text, todos[0].text)
                })
                .end(done)

        });

        it('should return 404 if todo not found', function (done) {

            request(app)
                .get(`/todos/${new ObjectID().toString()}`)
                .expect(404)
                .end(done)

        });

        it('should return 400 for invalid ID', function (done) {

            request(app)
                .get(`/todos/${'some invalid ID'}`)
                .expect(400)
                .end(done)
        });
    });

    describe('DELETE /todos/:id', () => {

        it('should remove a todo', function (done) {

            const todoID = todos[1]._id.toString();

            request(app)
                .delete(`/todos/${todoID}`)
                .expect(200)
                .expect(res => {
                    assert.equal(res.body.text, todos[1].text)
                })
                .end((err, res) => {
                    if (err) done(err);
                    todo.findById(todoID)
                        .then(todos => {
                            assert.isNull(todos);
                            done()
                        })
                })
        });

        it('should return 404 if todo not found', function (done) {

            request(app)
                .delete(`/todos/${new ObjectID()}`)
                .expect(404)
                .end(done)

        });

        it('should return 400 if ID is invalid', function (done) {

            request(app)
                .delete(`/todos/${'looks like invalid ID'}`)
                .expect(400)
                .end(done)
        });
    });

    describe('PATCH /todos/:id', () => {

        it('should update the todo', function (done) {

            const todoID = todos[0]._id.toString();

            const data = {
                text: 'this is a new text',
                completed: true
            };

            request(app)
                .patch(`/todos/${todoID}`)
                .send(data)
                .expect(200)
                .expect(res => {
                    assert.equal(res.body.text, data.text)
                })
                .end((err, res) => {
                    if (err) return done(err);

                    todo.findById(todoID)
                        .then(todo => {
                            assert.isOk(todo.completed);
                            assert.isNotNull(todo.completedAt);
                            done()
                        })
                        .catch(err => done(err))
                })

        });

        it('should clear completedAt when todo is not completed', function (done) {

            const todoID = todos[1]._id.toString();

            const data = {
                completed: false
            };

            request(app)
                .patch(`/todos/${todoID}`)
                .send(data)
                .expect(200)
                .expect(res => {
                    assert.isNotOk(res.body.completed);
                    assert.isNull(res.body.completedAt)
                })
                .end((err, res) => {
                    if (err) return done(err);

                    todo.findById(todoID)
                        .then(todo => {
                            assert.isNotOk(todo.completed);
                            assert.isNull(todo.completedAt);
                            done()
                        })
                        .catch(err => done(err))
                })
        });
    })
});