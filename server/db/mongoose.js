const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI);
//changed above from localhost to 127.0.0.1
module.exports = {
    mongoose
};