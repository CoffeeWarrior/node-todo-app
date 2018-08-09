const expect = require("expect");
const request = require("supertest");
const {ObjectID} = require("mongodb");

const {app} = require("./../server");
const {Todo} = require("./../models/todo");

const todos = [
    {
        _id: new ObjectID(),
        text: "First test todo"
    },{
        _id: new ObjectID(),
        text: "Second test todo"
    } 
]

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe("POST /todos", () => {
    it("Should create a new todo", (done) => {
        var text = "test todo text";


        request(app)
        .post("/todos")
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if(err){
                return done(err)
            } 

            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done()
            }).catch((e) => done(e))
        })
    });
    //make a post request. Send an empty object. exoect 400 back 
    //database : length of todos should be zero. 
    it("should not create todo with invalid body data", (done) => {
        request(app)
        .post("/todos")
        .send({})
        .expect(400)
        .end((err, res) => {
            if(err){
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done()
            }).catch((e) => done(e));
        })
    })
})


describe("GET /todos", () => {
    it("should get all todos", (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2)
        })
        .end(done);
    })
})


describe("GET /todos/:id", () => {
    it("Should return todo doc", (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text)
            })
        .end(done);
    })

    it("Shoud return a 404 if todo not found", (done) => {
        //make a request with a real id. valid id but not found in collection. Expect status code 404 status code back.
        request(app)
            .get(`/todos/${new ObjectID}`)
            .expect(404)
            .end(done)
    })

    it("Should return a 404 for non-object ids", (done) => {
        // pass /todos/123 expect 404 status code.
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done)
    })
})