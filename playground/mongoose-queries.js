const {ObjectID} = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');


// var id = '58fd227854374b4afcc1150f11';
// if (!ObjectID.isValid(id)) {
//     console.log('id not valid');
// }
// Todo.find({
//     _id: id // mongoose can convert string id to object id 
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id // mongoose can convert string id to object id 
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));

/**
 * Challenge
 * query users collection
 * handle the three cases
 * *user not found *case1*
 * *user found *case2*
 * *handle any error *case3*
 * load user model
 */  
var userId = '58d30b9c7dba1726a413306f';
if (!ObjectID.isValid(userId)){ // Validate User ID
    console.log('ID not valid'); 
}
User.findById(userId).then((user) => {
    if (!user) {
        return console.log('user not found'); //case 1
    }

    console.log('User By Id',JSON.stringify(user, undefined, 2)); // case 2
}).catch((e) => console.log(e)); // case 3