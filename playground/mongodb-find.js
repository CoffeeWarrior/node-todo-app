//const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");


MongoClient.connect("mongodb://localhost:27017/TodoApp" , (err, client) => {
    if(err){
        return console.log("unable to connect to MongoDB server.");
    }
    console.log("Connected to MongoDB server.");

    const db = client.db("TodoApp");

    // db.collection("Todos").find({_id: new ObjectID('5b5212021750c0e0aee0040f')}).toArray().then((docs) => {
    //     console.log("Todos");
    //     console.log(JSON.stringify(docs, undefined, 4));
    // }, (err) => {
    //     console.log(`Unable to fetch todos ${err}`)
    // })
    

    
    // db.collection("Todos").find( ).count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log(`Unable to fetch todos ${err}`)
    // })

    db.collection("Users").find({name: "Lucas"}).toArray().then((res)=> {
        console.log(JSON.stringify(res, undefined, 4));
        client.close();
    }, (err) => {
        console.log(`An error occured fetching documents: ${err}`)
    })


    //  client.close();
});

