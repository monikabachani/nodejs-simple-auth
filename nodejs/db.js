const mongoose = require("mongoose");
function connectDb() {
    mongoose.connect("mongodb://localhost:27017/authapp")
        .then(() => {
            console.log("Mongo DB is connected");
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = { connectDb }