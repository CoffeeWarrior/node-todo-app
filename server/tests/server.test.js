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
        text: "Second test todo",
        completed: true,
        completedAt: 42969
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

describe("DELETE /todos/:id", () => {
    it("should remove a todo", (done) => {
        var hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId); 
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.findById(hexId).then((res) => {
                    expect(res).toNotExist()
                    done()
                }).catch(e => done(e))
            })
    });

    it("should return 404 if todo not found", (done) => {
        request(app)
            .delete(`/todo/${new ObjectID()}`)
            .expect(404)
            .end((err, res) => {
                if(err){
                    return done(err);
                }
               done()
            })
    });

    it("should return 404 if object id is invalid", (done) => {
        request(app)
            .delete(`/todo/12345`)
            .expect(404)
            .end((err, res) => {
                if(err){
                    return done(err);
                }
               done()
            })
    })
})


describe("PATCH /todos/:id", () => {
    it("should update the todo", (done) => {
        //grab id of first item
        const hexId = todos[0]._id.toHexString()
        //make patch request. Update text, set completed to true
        //should get 200 back
        //text is changed, completed is true, completedAt is a number. Use .toBeA(num)
        const text = "sample text LuL";

        request(app)
            .patch(`/todos/${hexId}`)
            .send({text})
            .send({completed: true})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text)
                expect(res.body.todo.completed).toBe(true)
                expect(res.body.todo.completedAt).toBeA("number");
            })
            .end(done)
            //.send({field: value})
    });
    
    it("should clear completedAt when todo is not completed", (done) => {
        //grab id of second item
        //update text, set completed to false
        //expect 200
        //text is changed, completed is false, check completedAt is null .toNotExist
        const hexId = todos[1]._id.toHexString();

        text = "new sample text for second it block I guess";

        request(app)
            .patch(`/todos/${hexId}`)
            .send({text})
            .send({completed: false})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text)
                expect(res.body.todo.completed).toBe(false)
                expect(res.body.todo.completedAt).toNotExist()
            })
            .end(done)
    });
})