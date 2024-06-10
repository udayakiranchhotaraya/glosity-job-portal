const express = require('express');

const { jwtMiddleware } = require('../middlewares/jwt.middleware');

const {
    registerEmployer,
    login,
    addOrUpdateCompanyDetails,
    getJobDetails,
    getApplicants
} = require('../controllers/employer.controller');

const EmployerRouter = express.Router();

EmployerRouter.get('/job/:jobId/details', jwtMiddleware, getJobDetails);
EmployerRouter.get('/job/:jobId/applicants', jwtMiddleware, getApplicants);
EmployerRouter.post('/register', registerEmployer);
EmployerRouter.post('/login', login);
EmployerRouter.put('/addOrUpdateCompanyDetails', jwtMiddleware, addOrUpdateCompanyDetails);

module.exports = EmployerRouter;