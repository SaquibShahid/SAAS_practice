const express = require('express');
const app = express();
require('dotenv').config();

require('./models/masterDB/conn');
const Client = require('./models/masterDB/client.db');
const { default: mongoose, connection } = require('mongoose');

let connections = {};

(async function () {
    const clients = await Client.find({});
    clients.map((client) => {
        let conn = mongoose.createConnection(client.databaseURI);
        connections[client.clientName] = conn;
        console.log(`DB ${client.clientName} connected`)
    })
})();

app.get('/', (req, res) => {
    res.send("Welcome 123");
})

app.get('/create-client', async (req, res) => {
    let clientName = req.query.clientName;
    const newDatabaseName = `client_${clientName}`;
    const databaseURI = `mongodb+srv://saquibshahid508:1234@cluster0.ytjnm7u.mongodb.net/${newDatabaseName}`;
    const newClient = new Client({
        clientName,
        databaseURI
    });
    await newClient.save();
    return res.send(`Database created for client: ${clientName} at URI: ${databaseURI}`);
})

app.get('/users', async (req, res) => {
    const users = await require(`./models/${req.query.app}/${req.query.app}.db.js`).find().select({ __v: 0 });
    res.json(users);
})

app.listen(5001, () => {
    console.log("Server listening on port 5001")
})

module.exports = connections;