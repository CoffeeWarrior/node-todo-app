//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");


MongoClient.connect("mongodb://localhost:27017/TodoApp" , (err, client) => {
    if(err){
        return console.log("unable to connect to MongoDB server.");
    }
    console.log("Connected to MongoDB server.");

    const db = client.db("TodoApp");

    // db.collection("Todos").insertOne({
    //     text: "drink water, stay hydrated",
    //     completed: false
    // }, (err, res) => {
    //     if(err){
    //         return console.log("Unable to insert todo", err);
    //     }

    //     console.log(JSON.stringify(res.ops, undefined, 4))
    // });

    // Insert new doc into Users (name, age, location)

    db.collection("users").insertOne({
        name: "Max",
        email: "adflkjsdf@gmail.com"
    }, (err, res) => {
        if(err){
            return console.log("Unable to insert User");
        }

        console.log(JSON.stringify(res.ops, undefined, 4));
        console.log(res.ops[0]._id.getTimestamp());
    });
    
    client.close();
});

