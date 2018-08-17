const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const {ObjectID} = require("mongodb");

const {mongoose} = require("./db/mongoose.js");
const {Todo} = require("./models/todo");
const {User} = require("./models/user");

const app = express();
const port = 3000;


app.use(bodyParser.json());

app.post("/todos", (req, res) => {
    const todo = new Todo({
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
        res.status(404).send({})
    }).catch(() => {return});
})

app.delete("/todos/:id", (req, res) => {
    //get the id
    const id = req.params.id;


    //validate the id -> if not valid return 404
    if(!ObjectID.isValid(id)){
        console.log("Invalid id")
        return res.status(404).send({})
    }
    //remove todo by id
    Todo.findByIdAndRemove(id).then((todo) => {
        if(todo){
            res.status(200).send({todo})
        } else {
            res.status(404).send()
        }
    }).catch(e => {
        res.status(400).send()
    })
        //success
            //if no doc, send 404
            //if doc, send 200 and doc

        //error
            //return 400 with empty body

    
    })  

    app.patch("/todos/:id", (req, res) => {
        const id = req.params.id;
        const body = _.pick(req.body, ["text", "completed"]);

        if(!ObjectID.isValid(id)){
            return res.status(404).send();
        }

        if(_.isBoolean(body.completed) && body.completed){
            body.completedAt = new Date().getTime()
        } else {
            body.completed = false;
            body.completedAt = null;
        }

        Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
            if(!todo){
                return res.status(404).send();
            }
            res.send({todo});

        }).catch((e) => {
            res.status(400).send();
        })


    })




app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {
    app
}