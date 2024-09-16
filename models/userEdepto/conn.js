const clientModel = require('../masterDB/client.db')

// async function getClientDbConnection(clientId) {
//         const client = await clientModel.findOne({ clientName: clientId });

//         const conn = mongoose.createConnection(client.databaseURI);
//         module.exports = conn;
// }

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
        module.exports = conn;
});