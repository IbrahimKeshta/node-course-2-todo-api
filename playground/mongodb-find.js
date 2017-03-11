// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// connect 
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('connected to MongoDB server');

    // find return mongodb curser not the actual document them selves
    // curser method (toArray) it return promise return back documents 
    // db.collection('Todos').find({
    //     _id: new ObjectID("58c30fa86e00081ac081b243")
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    //challenge
    db.collection('Users').find({
        name: "Ibrahim Keshta"
    }).toArray().then((users) => {
        console.log('users');
        console.log(JSON.stringify(users, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch users', err);
    });
    // db.close();
});