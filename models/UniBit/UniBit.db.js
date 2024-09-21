
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let connections = require('../../app');

const UniBitSchema = new Schema({
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

const UniBit = connections['UniBit'].model('UniBit', UniBitSchema);

module.exports = UniBit;
