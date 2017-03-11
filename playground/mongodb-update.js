// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// connect 
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('58c4588cf6f4510321ce2e27')
    // }, {
    //         $set: {
    //             completed: true
    //         }
    //     }, {
    //         returnOriginal: false
    //     }).then((result) => {
    //         console.log(result);
    //     });

    //challenge 
    // change name 
    // increase age 1
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('58c310ffadd7122dc45046d2')
    }, {
            $set: {
                name: 'Ibrahim'
            },
            $inc: {
                age: 1
            }

        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result);
        });
    // db.close();
});