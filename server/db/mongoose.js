const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/TodoApp");
//changed above from localhost to 127.0.0.1
module.exports = {
    mongoose
};