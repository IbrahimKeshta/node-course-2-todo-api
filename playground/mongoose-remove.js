const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');


// Todo.remove({}) everything will remove
// Todo.remove({}).then((result) => {
//  console.log(result);
// });

// Todo.findOneAndRemove // find it and remove and docs can be back to user
// Todo.findByIdAndRemove

// Todo.findOneAndRemove({_id: '594a00c28d5b700194e45e8a'}).then((todo) => {
//     // bla bla
// });

Todo.findByIdAndRemove('594a00c28d5b700194e45e8a').then((todo) => {
    console.log(todo);
});