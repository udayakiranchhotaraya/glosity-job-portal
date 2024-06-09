const express = require('express');

const UserRouter = require('./users.router');

const router = express.Router();

router.use('/users', UserRouter);

module.exports = router;