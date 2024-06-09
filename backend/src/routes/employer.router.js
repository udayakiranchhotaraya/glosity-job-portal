const express = require('express');

const { jwtMiddleware } = require('../middlewares/jwt.middleware');

const {
    registerEmployer,
    login
} = require('../controllers/employer.controller');

const EmployerRouter = express.Router();

EmployerRouter.post('/register', registerEmployer);
EmployerRouter.post('/login', login);

module.exports = EmployerRouter;