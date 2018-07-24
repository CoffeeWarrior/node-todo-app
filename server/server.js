var express = require("express");
var bodyParser = require("body-parser");
var {ObjectID} = require("mongodb");

var {mongoose} = require("./db/mongoose.js");
var {Todo} = require("./models/todo");
var {User} = require("./models/user");

var app = express()

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
        console.log("todo saved")
    }, (err) => {
        res.status(400).send(err);
    })
})

app.get("/todos", (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    })
});


//validate id using isValid, if not respond with 404
    //send empty body
    
    //if it is valid: query database findById 
        //error => send back 400 & empty body
    
        //if there is todo:
        //send it back
    //if there is no todo - send back 404

app.get("/todos/:id", (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        console.log("Invalid id")
        return res.status(404).send({});
    }

    Todo.findById(id).then((todo) => {
        if(!todo){
            res.status(404).send({});
        }
        res.status(200).send({todo});
    })
    .catch((err) => {
        res.status(404).send({});
    })
})






app.listen(3000, () => {
    console.log("Started on port 3000");
});

module.exports = {
    app
}