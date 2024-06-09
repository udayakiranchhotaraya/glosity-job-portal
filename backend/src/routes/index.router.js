const express = require('express');

const UserRouter = require('./users.router');
const EmployerRouter = require('./employer.router');

const router = express.Router();

router.use('/users', UserRouter);
router.use('/employers', EmployerRouter);

module.exports = router;