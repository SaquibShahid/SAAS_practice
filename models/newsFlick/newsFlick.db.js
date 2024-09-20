
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const conn = require('./conn');

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

const newsFlick = conn.model('newsFlick', newsFlickSchema);

module.exports = newsFlick;
