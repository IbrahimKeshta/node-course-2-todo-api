const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');
const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo'
}];

//insertmany to insert all docs of todos array
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                //we make find for {text} to we have above and equal 1
                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1); // we add one todo item
                    expect(todos[0].text).toBe(text); // expect the same text we add
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        // challenge
        // send empty object to /todos
        // status 400
        //check errors
        // assumtion the length of todos
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2); // because add todos arrays and text above
                    done();
                }).catch((e) => done(e));
            });

    });
});

describe('GET /todos', () => {
    it('Should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`) //first todos item with id property and convert it to string with toHexString()
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text); // as we used in server {todo} property
            })
            .end(done);
    });
    //challenge
    it('should return 404 if todo not found', (done) => {
        // make sure you get 404 back
        var fakeId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${fakeId}`)
            .expect(404)
            .end(done);

    });
    it('should return 404 for non-object ids', (done) => {
        // /todos/123
        request(app)
            .get(`/todos/123abc`)
            .expect(404)
            .end(done);
    });
});