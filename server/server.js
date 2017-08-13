require('./config/config');
const _ = require('lodash');
const { ObjectID } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var {authenticate} = require('./middleware/authenticate')


var app = express();
var port = process.env.PORT;

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

// GET all todos
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
        res.send({ todo }); //return object 
        //error
        //404 with empty body
    }).catch((e) => {
        return res.status(400).send();
    });
});


// UPDATE route

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']); //_.pick(Object, [proprties]) 


    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Not Valid ID');
    }
    // update completed todo
    if (_.isBoolean(body.completed) && body.completed) { //check completed value
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    // find and update todo text and completed
    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });

    }).catch((e) => {
        res.status(400).send();
    })
});

// USER Route
// POST /users
//signup route
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});



// login route private route
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
 var body = _.pick(req.body, ['email', 'password']);
 var user = new User(body);

 User.findByCredentials(body.email,body.password).then((user) => {
    user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
    });
 }).catch((e) => {
    res.status(400).send();
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