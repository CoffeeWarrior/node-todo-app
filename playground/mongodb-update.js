//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");


MongoClient.connect("mongodb://localhost:27017/TodoApp" , (err, client) => {
    if(err){
        return console.log("unable to connect to MongoDB server.");
    }
    console.log("Connected to MongoDB server.");

    const db = client.db("TodoApp");


    // db.collection("Todos").findOneAndUpdate({
    //     _id: new ObjectID("5b52350e2dba6c06706df72c")
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, 
    // {returnOriginal: false})
    // .then((res) => {
    //     console.log(res);
    // })

    db.collection("Users").findOneAndUpdate({
        name: "Lucas"
    }, {
        $set:{
            name: "Max"
        }
    }, {returnOriginal: false})
    .then((res) => {
        console.log(res);
    });

    db.collection("Users").findOneAndUpdate({
        name: "Max"
    }, {
        $inc: {
            age: 1
        }
    });

    //  client.close();
});

