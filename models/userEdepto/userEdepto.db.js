
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let connections = require('../../app');


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

const userEdepto = connections['userEdepto'].model('userEdepto', userEdeptoSchema);

module.exports = userEdepto;