const { ObjectID } = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Post
app.post('/todos', (req, res) => {
    console.log(req.body);
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
        res.send({ todos })
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET /todos/123432
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    //challenge
    //valid id using isValid
    //404 - send back empty send
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    //findById
    //success
    // if todo - send it back
    // if not todo - send back 404 with empty body 
    //error
    //400 - send empty body back
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200).send({ todo }); //es6 todos property
    }).catch((e) => {
        return res.status(400).send();
    });
});

// DELETE route /todos/1234

app.delete('/todos/:id', (req, res) => {
    //challenge
    //get the id
    var id = req.params.id;

    //validate id -> not valid? return 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Not Valid ID');
    }
    //remove todo by id
    //success
    // if no doc, send 404
    // if doc send doc back
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send('Todo not found');
        }
        res.status(200).send({ todo });
        //error
        //404 with empty body
    }).catch((e) => {
        return res.status(400).send();
    });
});













app.listen(port, () => {
    console.log(`started on port ${port}`);
});

module.exports = { app };

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