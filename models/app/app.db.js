
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let connections = require('../../app');

const appSchema = new Schema({
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

const app = connections['app'].model('app', appSchema);

module.exports = app;
