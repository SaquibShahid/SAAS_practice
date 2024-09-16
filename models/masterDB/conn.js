const mongoose = require('mongoose');
const conn = mongoose.createConnection(process.env.MONGO_URI);
if (conn) {
    console.log("DB connected successfully");
}
module.exports = conn;