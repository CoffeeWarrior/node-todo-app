const {ObjectID} = require("mongodb");

const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");

// var id = "5b574a12433ee21f482dd720";

// if(!ObjectID.isValid(id)){
//     console.log("ID not valid")
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log("Todos: ", todos);
// })

// Todo.findOne({
//     _id: id
// }).then((todos) => {
//     console.log("findOne: ", todos);
// });

// Todo.findById(id).then((todos) => {
//     if(!todo){
//         return console.log("Id not found")
//     }
//     console.log("findById: ", todos);
// }).catch((e) => console.log(e))



//query users collection.
//load in user mongoose model
//user.findbyId (pick an id in roboMongo)

//query works, but no user, 
//user found (print to screen)
//error handler

const {User} = require("./../server/models/user");
const id = "5b576e3b252e5b17405ae1f0";


User.findById(id).then((user) => {
    if(!user){
        return console.log("Unable to find user");
    } 
    
    console.log(JSON.stringify(user, undefined, 4));
}, (e) => {
    console.log("user not found")
});

