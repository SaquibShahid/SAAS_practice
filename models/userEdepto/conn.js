const clientModel = require('../masterDB/client.db')
const mongoose = require('mongoose');

let conn = null;

async function getClientDbConnection(clientId) {
        const client = await clientModel.findOne({ clientName: clientId });

        if (!client) {
                throw new Error('Client not found');
        }

        const clientDbConnection = mongoose.createConnection(client.databaseURI);

        return clientDbConnection;
}

(async function () {
        conn = await getClientDbConnection('userEdepto');
})();

module.exports = conn;