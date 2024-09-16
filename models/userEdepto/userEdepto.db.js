
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const conn = require('./conn');

const userEdeptoSchema = new Schema({
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

const userEdepto = mongoose.model('userEdepto', userEdeptoSchema);

module.exports = userEdepto;
