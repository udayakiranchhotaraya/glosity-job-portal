const express = require('express');

const { jwtMiddleware } = require('../middlewares/jwt.middleware');

const {
    registerUser,
    loginUser,
    applyJob,
    appliedJobs
} = require('../controllers/users.controller');

const UserRouter = express.Router();

UserRouter.get('/appliedJobs', jwtMiddleware, appliedJobs);
UserRouter.post('/signup', registerUser);
UserRouter.post('/signin', loginUser);
UserRouter.put('/apply/:jobId', jwtMiddleware, applyJob);

module.exports = UserRouter;