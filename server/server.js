var express = require('express');
var bodyParser = require('body-parser');


var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }, (e) => {
        res.status(400).send(e);
    });
});

module.exports = {app};

// GET /todos/123432


















app.listen(3000, () => {
    console.log('started on port 3000');
});


                                                // Testing // 
// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//     console.log('Save todo', doc);
// }, (e) => {
//     console.log('Unable to save todo');
// });

// var newTodo = new Todo({
//     text: '  Creating new model '
// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unable to save todo', e);
// });

// challenge
// user model -> email - password
// email - require it - trim it - set type - set min length of 1



// var newUser = new User({
//     email: '     keshta95@hotmail.com  ',
//     password: '123'
// });

// newUser.save().then((doc) => {
//     console.log('User created', doc);
// }, (e) => {
//     console.log('Unable to create user', e);
// });