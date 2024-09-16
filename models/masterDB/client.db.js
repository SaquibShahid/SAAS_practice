const mongoose = require('mongoose');
const conn = require('./conn');

const clientSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    databaseURI: { type: String, required: true }
});

const Client = conn.model('Client', clientSchema);
module.exports = Client;