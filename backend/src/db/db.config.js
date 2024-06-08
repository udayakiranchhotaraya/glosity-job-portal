const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnect() {
    DBURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/`;
    DBNAME = `${process.env.MONGO_DATABASE}`

    try {
        const connectionInstance = await mongoose.connect(`${DBURL}${DBNAME}`);
        console.log(`Database \`${DBNAME}\` connected;\nDB HOST: \`${connectionInstance.connection.host}\``);
    } catch (error) {
        console.error(`Connection error: ${error}`);
        process.exit(1);
    }
}

module.exports = dbConnect;