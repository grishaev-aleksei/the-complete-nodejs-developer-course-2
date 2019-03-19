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
        text: 'Second test todo'
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
                    assert.deepEqual(res.body.text, text)
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

    describe('GET /todos/:id', ()=>{

        it('should return todo doc', function (done) {

            request(app)
                .get(`/todos/${todos[0]._id.toString()}`)
                .expect(200)
                .expect((res)=>{
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
    })

});