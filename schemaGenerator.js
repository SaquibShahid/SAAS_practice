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
        let connections = require('../../app');

        const ${modelName}Schema = new Schema({
            ${schemaFieldsString}
        });

        const ${modelName} = connections['${modelName}'].model('${modelName}', ${modelName}Schema);

        module.exports = ${modelName};
    `;

    if (!fs.existsSync(path.join(__dirname, `models/${modelName}`))) {
        fs.mkdirSync(path.join(__dirname, `models/${modelName}`));
    }

    const filePath = path.join(__dirname, `models/${modelName}`, `${modelName}.db.js`);

    fs.writeFileSync(filePath, modelFileContent, 'utf8');

    console.log(`${modelName} model file has been generated successfully at ${filePath}`);
}


const userSchemaFields = {
    name: { required: true, type: "String" },
    email: { type: "String", required: true },
    age: { type: "Number" },
    createAt: { type: "Date", default: "Date.now()" },
};

generateModelFile('app', userSchemaFields);