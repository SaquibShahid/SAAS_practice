
const clientModel = require('../masterDB/client.db')

async function getClientDbConnection(clientId) {
        const client = await clientModel.findById({ clientName: clientId });

        if (!client) {
                throw new Error('Client not found');
        }

        const clientDbConnection = mongoose.createConnection(client.databaseURI);

        return clientDbConnection;
}

getClientDbConnection('newsFlick').then((conn) => {
        console.log("Connected to client")
        return conn;
});
