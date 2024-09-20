const clientModel = require('../masterDB/client.db')
const mongoose = require('mongoose');

async function getClientDbConnection(clientId) {
        const client = await clientModel.findById({ clientName: clientId });

        if (!client) {
                throw new Error('Client not found');
        }

        const clientDbConnection = mongoose.createConnection(client.databaseURI);

        return clientDbConnection;
}

getClientDbConnection('userEdepto').then((conn) => {
        console.log("Connected to client")
        return conn;
});