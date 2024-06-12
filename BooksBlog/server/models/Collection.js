const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'This field is required.'
    },
    description:{
        type: String,
        required: 'This field is required.'
    },
    author:{
        type: String,
        required: 'This field is required.'
    },
    rate:{
        type: String,
        required: 'This field is required.'
    },
    category:{
        type: String,
        enum: ['Romance','Thriller','Fantasy','Historical Fiction','Science Fiction','Young Adult','Biography or Autobiography','History','Science','Travel','Finance','Philosophy','Art','Comics'],
        required: 'This field is required.'
    },
    image:{
        type: String,
        required: 'This field is required.'
    },
});

collectionSchema.index({name:'text',description:'text'});
// Wildcard indexing
// collectionSchema.index({"$**": 'text'});

module.exports = mongoose.model('Collection', collectionSchema);