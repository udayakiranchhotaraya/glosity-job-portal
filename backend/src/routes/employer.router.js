const express = require('express');

const { jwtMiddleware } = require('../middlewares/jwt.middleware');

const {
    registerEmployer,
    login,
    addOrUpdateCompanyDetails
} = require('../controllers/employer.controller');

const EmployerRouter = express.Router();

EmployerRouter.post('/register', registerEmployer);
EmployerRouter.post('/login', login);
EmployerRouter.put('/addOrUpdateCompanyDetails', jwtMiddleware, addOrUpdateCompanyDetails);

module.exports = EmployerRouter;