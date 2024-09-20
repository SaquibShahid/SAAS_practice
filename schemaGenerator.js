const fs = require('fs');
const path = require('path');

function generateModelFile(modelName, schemaFields) {
    const schemaFieldsString = Object.entries(schemaFields).map(([key, value]) => {
        const fieldString = JSON.stringify(value, (k, v) => v, 4);
        return `${key}: ${fieldString.replace(/\"/g, '')}`;
    }).join(',\n    ');

    const modelFileContent = `
        const mongoose = require('mongoose');
        const Schema = mongoose.Schema;
        const conn = require('./conn');

        const ${modelName}Schema = new Schema({
            ${schemaFieldsString}
        });

        const ${modelName} = conn.model('${modelName}', ${modelName}Schema);

        module.exports = ${modelName};
    `;
    const connectionContent = `
    const clientModel = require('../masterDB/client.db')

    async function getClientDbConnection(clientId) {
        const client = await clientModel.findById({ clientName: clientId });

        if (!client) {
                throw new Error('Client not found');
        }

        const clientDbConnection = mongoose.createConnection(client.databaseURI);

        return clientDbConnection;
    }   

    getClientDbConnection('${modelName}').then((conn) => {
            console.log("Connected to client")
            return conn;
    });
    `;

    if (!fs.existsSync(path.join(__dirname, `models/${modelName}`))) {
        fs.mkdirSync(path.join(__dirname, `models/${modelName}`));
    }

    const filePath = path.join(__dirname, `models/${modelName}`, `${modelName}.db.js`);
    const connectionFilePath = path.join(__dirname, `models/${modelName}`, `conn.js`);

    fs.writeFileSync(filePath, modelFileContent, 'utf8');
    fs.writeFileSync(connectionFilePath, connectionContent, 'utf8');

    console.log(`${modelName} model file has been generated successfully at ${filePath}`);
}


const userSchemaFields = {
    name: { required: true, type: "String" },
    email: { type: "String", required: true },
    age: { type: "Number" },
    createAt: { type: "Date", default: "Date.now()" },
};

generateModelFile('newsFlick', userSchemaFields);