
const clientModel = require('../masterDB/client.db')

let conn = null;

async function getClientDbConnection(clientId) {
        const client = await clientModel.findById({ clientName: clientId });

        if (!client) {
                throw new Error('Client not found');
        }

        const clientDbConnection = mongoose.createConnection(client.databaseURI);

        conn = clientDbConnection;
}

getClientDbConnection('newsFlick').then((conn) => {
        return this.conn;
});

module.exports = getClientDbConnection;