//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");


MongoClient.connect("mongodb://localhost:27017/TodoApp" , (err, client) => {
    if(err){
        return console.log("unable to connect to MongoDB server.");
    }
    console.log("Connected to MongoDB server.");

    const db = client.db("TodoApp");

    //deleteMany
    
    // db.collection("Todos").deleteMany({text: "go make coffee"}).then((res) => {
    //     console.log(res);
    // });

    //deleteOne

    // db.collection("Todos").deleteOne({text: "drink coffee"}).then((res) => {
    //     console.log(res);
    // })

    //findOneAndDelete

    // db.collection("Todos").findOneAndDelete({text: "drink coffee"}).then((res) => {
    //     console.log(res);
    // }) 

    //CHALLENGE: findoneandDelete 1, delete all lucas from users.

    db.collection("Users").deleteMany({name: "Lucas"}).then((res) => {
        console.log(res);
        console.log("all users Lucas deleted")
    }, (e) => {
        return;
    })

    db.collection("Users").deleteOne({name: "Max"}).then((res) => {
        console.log(res);
        console.log("1 Max deleted")
    })
    //  client.close();
});

