const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let connections = require('../../app');


const newsFlickSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});

const newsFlick = connections['newsFlick'].model('newsFlick', newsFlickSchema);

module.exports = newsFlick;
