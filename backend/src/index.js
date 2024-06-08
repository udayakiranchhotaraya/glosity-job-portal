require('dotenv').config();

const dbConnect = require('./db/db.config');

const app = require('./app');

const PORT = process.env.PORT || 5000;
const SERVER_URL = `http://localhost:${PORT}`;

(async function () {
    try {
        await dbConnect();
        app.on('error', (error) => {
            console.error(`Express app initialisation error: ${error}`);
        })
        app.listen(PORT, () => console.log(`Server started at ${SERVER_URL}`));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})()