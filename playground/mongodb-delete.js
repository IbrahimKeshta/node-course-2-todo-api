// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// connect 
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('connected to MongoDB server');

    // deleteMany (delete many documents)
    // db.collection('Todos').deleteMany({text: 'eat launch'}).then((result) => {
    //     console.log(result);
    // });
    // deleteOne
    // db.collection('Todos').deleteOne({text: 'eat launch'}).then((result) => {
    //     console.log(result);
    // });
    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });


    //challenge
    // delete all duplicated users
    // db.collection('Users').deleteMany({name: 'Ibrahim Keshta'}).then((result) => {
    //     console.log(result);
    // });

    //Delete by id 
    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('58c322ece160fa10688b7884')
    }).then((result) => {
        console.log(result);
    });
    // db.close();
});