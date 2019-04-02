process.env.NODE_ENV = 'test';

const request = require('supertest');
const {assert} = require('chai');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {todo} = require('./../models/todo');
const {user} = require('./../models/user');

const {todos, populateTodos, populateUsers, users} = require('./seed/seed');


describe('root', () => {

    after('disconnect DB and exit express', () => {

        process.exit()

    });


    before('populateUsers', populateUsers);
    beforeEach('populateTodos', populateTodos);

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
                .end((err) => {
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
                .end((err) => {
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
                .end((err) => {
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
                .end((err) => {
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
                .end((err) => {
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
    });

    describe('GET /users/me', () => {

        it('should return user if authenticated', function (done) {

            request(app)
                .get('/users/me')
                .set('x-auth', users[0].tokens[0].token)
                .expect(200)
                .expect((res) => {
                    assert.equal(res.body._id, users[0]._id);
                    assert.equal(res.body.email, users[0].email)
                })
                .end(done)
        });

        it('should return 401 if not authenticated', function (done) {

            request(app)
                .get('/users/me')
                .expect(401)
                .expect(res => {
                    assert.isEmpty(res.body)
                })
                .end(done);

        });
    });

    describe('POST /users', () => {

        it('should create a user', function (done) {

            const email = 'example@example.com';
            const password = '123mnb!';

            request(app)
                .post('/users')
                .send({email, password})
                .expect(200)
                .expect(res => {
                    assert.exists(res.headers['x-auth']);
                    assert.exists(res.body._id);
                    assert.equal(res.body.email, email)
                })
                .end(err => {
                    if (err) return done(err);
                    user.findOne({email})
                        .then(user => {
                            assert.exists(user);
                            assert.notEqual(user.password, password);
                            done()
                        })
                })

        });

        it('should return error if request invalid', function (done) {

            const email = '';
            const password = '123mnb!';

            request(app)
                .post('/users')
                .send({email, password})
                .expect(400)
                .end(done)

        });

        it('should not create user if email already used', function (done) {
            const email = users[0].email;
            const password = '123mnb!';

            request(app)
                .post('/users')
                .send({email, password})
                .expect(400)
                .end(done)
        });
    });

    describe('POST /users/login', () => {

        it('should login user and return auth token', function (done) {

            request(app)
                .post('/users/login')
                .send({
                    email: users[1].email,
                    password: users[1].password
                })
                .expect(200)
                .expect(res => {
                    assert.equal(res.body.email, users[1].email);
                    assert.exists(res.headers['x-auth']);
                })
                .end((err, res) => {
                    if (err) return done(err);
                    user.findById(users[1]._id)
                        .then(resUser => {
                            assert.include(resUser.tokens[0], {
                                access: 'auth',
                                token: res.headers['x-auth']
                            });
                            done()
                        })
                        .catch(err => done(err))
                })

        });

        it('should reject invalid login', function (done) {

            request(app)
                .post('/users/login')
                .send({
                    email: users[1].email,
                    password: 'this invalid password'
                })
                .expect(400)
                .expect(res => {
                    assert.notExists(res.headers['x-auth']);
                })
                .end((err) => {
                    if (err) return done(err);
                    user.findById(users[1]._id)
                        .then(resUser => {
                            assert.isUndefined(resUser.tokens[1]);
                            done()
                        })
                        .catch(err => done(err))
                })

        });
    });

    describe('DELETE /users/me/token', () => {

        it('should remove auth token on logout', function (done) {
            // this.skip();
            request(app)
                .delete('/users/me/token')
                .set('x-auth', users[0].tokens[0].token)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    user.findById(users[0]._id)
                        .then(resUser => {
                            assert.equal(resUser.tokens.length, 0);
                            done()
                        })
                        .catch(err => done(err))
                })
        });
    })
});

