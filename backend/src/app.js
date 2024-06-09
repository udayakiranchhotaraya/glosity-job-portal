const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

const { requestLogger } = require('./middlewares/requestLogger.middleware');

const ApiRouter = require('./routes/index.router');

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static('/public'));

app.use('/api', requestLogger, ApiRouter);

module.exports = app;