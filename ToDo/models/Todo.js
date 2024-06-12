// contains the structure of Todo

const mongoose = require("mongoose");

//create schema to store todo data
const TodoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
    },
}); 

module.exports = new mongoose.model("Todo", TodoSchema); //export the schema